

import React, { useState, useEffect, useMemo } from 'react'
import { Search, Plus, Calendar, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { DropdownMenu, DropdownMenuItem } from './ui/dropdownMenu'
import { Input } from './ui/input'
import DashboardModal from './DashboardModal/DashboardModal'
import { AppDispatch, RootState } from '../config/store'
import { ChannelsList } from '../types/dashboardTypes'
import Loader from './Loader/Loader'
import { getAccessToken } from '../utility/session'
import { getUserAPI, handleFavoriteChannel } from '../redux/user/userAPI'
import { getActivenessAPI, getDashboardTableData, getDBChannels, saveChannelsAPI } from '../redux/dashboard/dashboardAPI'
import { setChannelLoadingTable, setSelectedCommunities } from '../redux/dashboard/dashboardSlice'
import handleAppEvents from '../utility/toast'
import ActiveChannelModal from './ActiveChannelModal'
import { adjustToLocalDate } from '../utility/adjustToLocalDate'

export default function CommunitiesDashboard() {
  const [communities, setCommunities] = useState<ChannelsList[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [communitiesPerPage] = useState(5)
  const [openCommunitiesModal, setOpenCommunitiesModal] = useState(false)
  const [openConfirmModal, setOpenConfirmModal] = useState({
    open: false,
    active: false,  // true for activate, false for deactivate
    ids: [] as string[],
  });

  const dispatch = useDispatch<AppDispatch>()
  const { allChannels, channelLoadingTable, selectedCommunities, dashboardDateRange } = useSelector((state: RootState) => state.dashboardData)
  const { userData } = useSelector((state: RootState) => state.userData);

  const hideDashboardModal = JSON.parse(localStorage.getItem("hideDashboardModal") ?? "false");

  const indexOfLastCommunity = currentPage * communitiesPerPage
  const indexOfFirstCommunity = indexOfLastCommunity - communitiesPerPage
  const currentCommunities = communities.slice(indexOfFirstCommunity, indexOfLastCommunity)
  const totalPages = Math.ceil(communities.length / communitiesPerPage)

  const hideChannelTable = useMemo(() =>
    !channelLoadingTable && currentCommunities.length <= 0
    , [channelLoadingTable, currentCommunities.length])

  useEffect(() => {
    setCurrentPage(1)
  }, [communities])

  useEffect(() => {
    if (allChannels.length > 0) {
      setCommunities(allChannels)
    }
  }, [allChannels])

  useEffect(() => {
    if (getAccessToken())
      setOpenCommunitiesModal(!hideDashboardModal)
  }, [hideDashboardModal])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    const filtered = allChannels.filter(community =>
      community.title.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setCommunities(filtered)
  }

  const toggleFavorite = (id: string) => {
    dispatch(handleFavoriteChannel({ selectedChannelId: id })).then((response) => {
      if (response.type !== "handleFavoriteChannel/fulfilled") {
        handleAppEvents(response?.payload?.message, "error")
      }
    })
  }

  const toggleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedCommunities.length === currentCommunities.length) {
      dispatch(setSelectedCommunities([]))
    } else {
      dispatch(setSelectedCommunities(currentCommunities.map(c => c.id)))
    }
    if (!event?.target?.checked) {
      handleUnselect([])
    }
  }

  const toggleSelect = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const selected = selectedCommunities.includes(id) ? selectedCommunities.filter(cId => cId !== id) : [...selectedCommunities, id]
    dispatch(setSelectedCommunities(selected))
    if (!event?.target?.checked) {
      handleUnselect(selected)
    }
  }

  const handleUnselect = (ids: string[]) => {
    getSentimentsActiveness(ids)
  }

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Activated':
        return 'bg-green-500 hover:bg-green-600 text-[#0E0C15])'
      case 'Deactivate':
        return 'bg-red-500 hover:bg-red-600 text-white'
      case 'Activate':
        return 'bg-gray-700 hover:bg-gray-600 text-gray-300'
      default:
        return 'bg-gray-700 hover:bg-gray-600 text-gray-300'
    }
  }

  const handleModalClose = () => {
    setOpenCommunitiesModal(false)
  }

  const getSentimentsActiveness = (ids?: string[]) => {
    const { startDate, endDate } = dashboardDateRange[0] || {};
    const formattedStartDate = startDate ? `${adjustToLocalDate(new Date(startDate))}` : undefined;
    const formattedEndDate = endDate ? `${adjustToLocalDate(new Date(endDate))}` : undefined;

    const payload = {
      channelIds: ids ?? selectedCommunities,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };

    dispatch(getDashboardTableData(payload));
    dispatch(getActivenessAPI(payload));
  };

  const confirmUpdateChannel = (isActive: boolean, channelId: string = '') => {
    setOpenConfirmModal({
      open: true,
      active: isActive,
      ids: [channelId],
    });
  };

  // Function to update channels after confirmation
  const updateChannels = (updatedChannels: string[], successMessage: string) => {
    dispatch(saveChannelsAPI(updatedChannels)).then((response) => {
      if (response?.payload?.success) {
        localStorage.setItem("hideDashboardModal", "true");
        dispatch(getUserAPI());
        dispatch(getDashboardTableData());
        dispatch(getActivenessAPI());
        dispatch(getDBChannels());
        handleAppEvents(successMessage, "success");
        dispatch(setSelectedCommunities([]));
        return;
      }
      handleAppEvents(response?.payload?.message || "An error occurred", "error");
    }).finally(() =>
      dispatch(setChannelLoadingTable(false))
    );
  };

  // Activate channels
  const activateChannels = async() => {
    const channelId = openConfirmModal.ids[0];
    if (!channelId) return;

    const activatedChannels = userData?.channels || [];
    const newSelectedCommunities = [...selectedCommunities, channelId];
    const updatedChannels = [...newSelectedCommunities, ...activatedChannels];
    dispatch(setChannelLoadingTable(true))
    setOpenConfirmModal({ open: false, active: false, ids: [] });
    updateChannels(updatedChannels, "Channels activated successfully!");
  };

  // Deactivate a specific channel
  const deactivateChannel = () => {
    const channelId = openConfirmModal.ids[0];
    if (!channelId) return;

    const activatedChannels = userData?.channels || [];
    const updatedChannels = activatedChannels.filter((id) => id !== channelId);
    dispatch(setChannelLoadingTable(true))
    setOpenConfirmModal({ open: false, active: false, ids: [] });
    updateChannels(updatedChannels, "Channel deactivated successfully!");
  };

  return (
    <div className="w-full text-white p-6 rounded-xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">All Communities</h1>
        {!hideChannelTable &&
          <div className="flex space-x-2">
            {showSearch ? (
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search community"
                  className="py-2 bg-[#252134] border-gray-700 pl-10"
                  value={searchTerm}
                  onChange={handleSearch}
                  autoFocus
                  onBlur={() => setShowSearch(false)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            ) : (
              <Button
                variant="outline"
                className="bg-[#252134] border-gray-700"
                onClick={() => setShowSearch(true)}
              >
                <Search size={20} />
              </Button>
            )}
            <DropdownMenu trigger={<Button disabled={selectedCommunities?.length === 0} variant="outline" className="bg-[#252134] border-gray-700">
              <Plus size={20} />
            </Button>} >

              <DropdownMenuItem onClick={() => getSentimentsActiveness()}>Add to Dashboard</DropdownMenuItem>
              {/* <DropdownMenuItem onClick={() =>

                confirmUpdateChannel(true)
              }>Active</DropdownMenuItem> */}
            </DropdownMenu>
            <DropdownMenu trigger={<Button variant="outline" className="bg-[#252134] border-gray-700">
              <Calendar size={20} />
            </Button>} >

              <DropdownMenuItem>Download Report</DropdownMenuItem>
              <DropdownMenuItem>Subscribe to Monthly Reports</DropdownMenuItem>
            </DropdownMenu>
          </div>}
      </div>
      {(hideChannelTable) ?
        <div className="flex justify-center items-center h-full">
          <p>No data found</p>
        </div>
        :
        <>
          <div className="overflow-x-auto ">
            <table className="w-[700px] lg:w-full">
              {channelLoadingTable ?
                <div className='h-44'> <Loader fullPage={false} /> </div> :
                <>
                  <thead>
                    <tr className="text-left text-gray-400 ">
                      <th className="pb-4 font-normal">
                        <div className="flex items-center">
                          <Checkbox
                            checked={selectedCommunities.length === currentCommunities.length}
                            onChange={toggleSelectAll}
                            className="mr-4"
                          />
                          Community Name
                        </div>
                      </th>
                      <th className="pb-4 font-normal">Role</th>
                      <th className="pb-4 font-normal">Community Size</th>
                      <th className="pb-4 font-normal">Status</th>
                      <th className="pb-4 font-normal">Favorites</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCommunities.map((community: ChannelsList) => (
                      <tr key={community.id} className="border-t border-gray-800">
                        <td className="py-4">
                          <div className="flex items-center">
                            <Checkbox
                              id={`check-${community.id}`}
                              className="mr-4"
                              checked={selectedCommunities.includes(community.id)}
                              onChange={(event) => toggleSelect(event, community.id)}
                            />
                            <span>{community.title}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          {community.role.map((r, index) => (
                            <span key={index} className="inline-block w-6 h-6 rounded-full bg-gray-700 text-center mr-1">{r}</span>
                          ))}
                        </td>
                        <td className="py-4">{community.participants.toLocaleString()}</td>
                        <td className="py-4">
                          <Button
                            // disabled={community.status !== "Activated"}
                            variant="outline"
                            size="sm"
                            className={getStatusStyles(community.status)}
                            onClick={() => {
                              confirmUpdateChannel(community.status === "Deactivated", community.id);
                            }}
                            // onClick={() => community.status ? community.status === "Activated" && confirmUpdateChannel(community.status !== "Activated", community.id) : community.status === "Deactivated" && confirmUpdateChannel(true)}
                          >
                            {community.status}
                          </Button>
                        </td>
                        <td className="py-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(community.id)}
                          >
                            <Star className={community.favorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'} size={20} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              }

            </table>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-4">
            <div className="text-sm text-gray-400">
              Showing {indexOfFirstCommunity + 1} to {Math.min(indexOfLastCommunity, communities.length)} of {communities.length} results
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-[#252134] border-gray-700"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant="outline"
                  size="sm"
                  className={`bg-[#252134] border-gray-700 ${currentPage === page ? 'bg-gray-700' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="bg-[#252134] border-gray-700"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </>
      }
      {openCommunitiesModal && <DashboardModal closeModal={handleModalClose} modalIsOpen={openCommunitiesModal} />}
      {openConfirmModal.open && <ActiveChannelModal
        isOpen={openConfirmModal.open}
        onClose={() => setOpenConfirmModal({ open: false, active: false, ids: [] })}
        onConfirm={openConfirmModal.active ? activateChannels : deactivateChannel}
        isActive={openConfirmModal.active}
      />
      }
    </div>
  )
}

