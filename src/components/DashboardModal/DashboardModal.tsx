import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import SearchIcon from "../../assets/Icons/search.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../config/store";
import Loader from "../Loader/Loader";
import { getActivenessAPI, getChannels, getDashboardTableData, getDBChannels, saveChannelsAPI } from "../../redux/dashboard/dashboardAPI";
import handleAppEvents from "../../utility/toast";
import { getUserAPI } from "../../redux/user/userAPI";
import { ChannelsList } from "../../types/dashboardTypes";

// Define types for the props
interface DashboardModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
}

interface ChannelListType {
  channel: ChannelsList[],
  community: ChannelsList[]
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "2px 2px 15px 2px #AC6AFF1A",
    border: "1px solid #ADA8C3",
    background: "#0A080F",
    borderRadius: "30px",
    width: "888px",
    padding: "0px",
  },
};

const DashboardModal: React.FC<DashboardModalProps> = ({
  modalIsOpen,
  closeModal,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { channelsList: channelsListData, channelLoading } = useSelector((state: RootState) => state.dashboardData);
  const { userData } = useSelector((state: RootState) => state.userData);

  const [channelsList, setChannelsList] = useState<ChannelListType>({
    channel: [],
    community: []
  })
  const [channelsAdded, setChannelsAdded] = useState<string[]>([])
  const [addingChannelsLoading, setAddingChannelsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (Object.keys(channelsListData.channel).length <= 0 && Object.keys(channelsListData.community).length <= 0) {
      dispatch(getChannels());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    setChannelsList(channelsListData);
  }, [channelsListData]);

  useEffect(() => {
    const savedChannelsTitle = userData?.channels || [];
    if (savedChannelsTitle.some((channel) => !channelsAdded.includes(channel))) {
      setChannelsAdded((prev) => [...prev, ...savedChannelsTitle]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?.channels]);
  

  const handleSaveChannels = () => {
    setAddingChannelsLoading(true)
    dispatch(saveChannelsAPI(channelsAdded)).then((response) => {
      setAddingChannelsLoading(false)
      if (response?.payload?.success) {
        localStorage.setItem("hideDashboardModal", `true`)
        dispatch(getUserAPI())
        dispatch(getDashboardTableData())
        dispatch(getActivenessAPI())
        dispatch(getDBChannels())
        handleAppEvents(response?.payload?.message, "success")
        return
      }
      handleAppEvents(response?.payload?.message, "error")
    })
  }

  const handleSelectedChannels = (id: string) => {
    setChannelsAdded((prevChannels) => {
      const updatedChannels = new Set(prevChannels);
      if (updatedChannels.has(id)) {
        updatedChannels.delete(id);
      } else {
        updatedChannels.add(id);
      }
      return Array.from(updatedChannels);
    });
  };

  const handleChannelSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setChannelsList({
      ...channelsList,
      channel: value
        ? channelsListData.channel.filter((channel) =>
          channel.title.toLowerCase().includes(value.toLowerCase())
        )
        : channelsListData.channel,
    });
  };

  const handleCommunitySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setChannelsList({
      ...channelsList,
      community: value
        ? channelsListData.community.filter((channel) =>
          channel.title.toLowerCase().includes(value.toLowerCase())
        )
        : channelsListData.community,
    });
  };

  const handleReset = () => {
    setChannelsAdded([])
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {/* Modal content */}
      {addingChannelsLoading && <Loader />}
      <div className="pt-7 px-10 pb-5">
        <h1 className="font-sora text-white font-semibold text-[32px]">
          {" "}
          Select Communities
        </h1>
        <p className="font-sora font-light text-base text-white">
          Select the channels and communities you would like to see on the
          dashboard.
        </p>
      </div>
      <div className="border-b-[0.2px] border-[#ada8c330] mb-0"></div>
      {channelLoading ?
        (<div className="h-[190px]"> <Loader fullPage={false} /> </div>) :
        (
          <div className="grid grid-cols-2 gap-0 divide-x divide-[#ada8c330]">
            <div className="px-6 py-5">
              <h3 className="text-white font-sora font-semibold text-2xl">
                Supported Channels
              </h3>
              <div className="relative">
                <input
                  placeholder="Search..."
                  className="border border-[#3F3A52] h-11 bg-transparent w-[338px] rounded-md my-3 ps-12 pr-3 text-white focus:outline-none"
                  onChange={handleChannelSearch}
                />
                <img
                  src={SearchIcon}
                  className="absolute top-5 left-2"
                  alt=""
                />
              </div>
              <ul className="my-4 overflow-auto max-h-80">
                {
                  channelsList.channel.length > 0 ? (channelsList.channel.map((channel) => {
                    return (
                      <li key={channel?.id} className="flex items-center mb-4">
                        <label className="checkbox-custom text-xl font-light text-white relative font-sora">{" "}
                          <input checked={channelsAdded.includes(channel?.id)} onChange={() => handleSelectedChannels(channel?.id)} type="checkbox" />
                          <span className="checkmark"></span>
                          <span className="ms-10 select-none">{channel?.title}</span>
                        </label>
                      </li>
                    )
                  })) : ""
                }
              </ul>
            </div>

            <div className="pr-7 px-10 py-5">
              <h3 className="text-white font-sora font-semibold text-2xl">
                Select Communities
              </h3>
              <div className="relative">
                <input
                  placeholder="Search..."
                  className="border border-[#3F3A52] h-11 bg-transparent w-[338px] rounded-md my-3 ps-12 pr-3 text-white focus:outline-none"
                  onChange={handleCommunitySearch}
                />
                <img
                  src={SearchIcon}
                  className="absolute top-5 left-2"
                  alt=""
                />
              </div>
              <ul className="my-4 overflow-auto max-h-80">
                {
                  channelsList.community.length > 0 ? (channelsList.community.map((channel) => {
                    return (
                      <li key={channel?.id} className="flex items-center mb-4">
                        <label className="checkbox-custom text-xl font-light text-white relative font-sora">{" "}
                          <input checked={channelsAdded.includes(channel?.id)} onChange={() => handleSelectedChannels(channel?.id)} type="checkbox" />
                          <span className="checkmark"></span>
                          <span className="ms-10 select-none">{channel?.title}</span>
                        </label>
                      </li>
                    )
                  })) : ""
                }
              </ul>
            </div>
          </div>)
      }
      <div className="border-b-[0.2px] border-[#ada8c330] mb-0"></div>
      <div className="flex items-center justify-between px-6 py-8">
        <div>
          <button onClick={handleReset} className="text-[#FFFFFF66] text-[15px] font-light font-sora">
            Reset to default
          </button>
        </div>
        <div>
          <button
            className="border-[0.5px] border-[#75718540] rounded-[10px] w-[124px] h-[48px] text-[#ADA8C3] font-light text-base font-sora"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button onClick={handleSaveChannels} className="border-[0.5px] border-[#75718540] rounded-[10px] w-[124px] h-[48px] text-white font-semibold text-base font-sora bg-[#15131D] ms-3">
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DashboardModal;
