import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Profilebg from "../assets/Images/profilebg.svg";
import UserImg from "../assets/Images/user.svg";
import UserImg1 from "../assets/Images/icon.png";
import ProfileImg from "../assets/Icons/profile.svg";
import EmailImg from "../assets/Icons/email.svg";
import EditImg from "../assets/Icons/edit.svg";
import LocationImg from "../assets/Icons/location.svg";
import BriefcaseImg from "../assets/Icons/briefcase.svg";
import BuildingImg from "../assets/Icons/buildings.svg";
import AwardImg from "../assets/Icons/award.svg";
import TeacherImg from "../assets/Icons/teacher.svg";
import PhoneImg from "../assets/Icons/phoneIcon.svg";
import TelegramIcon from "../assets/Icons/telegram.svg";
import { AppDispatch, RootState } from "../config/store";
import { getUserAPI } from "../redux/user/userAPI";
import ConnectTelegramModal from "../components/ConnectTelegramModal";
import { getAccessToken } from "../utility/session";

const UserInfo = (title: string, value: string, icon: string) => {
  return (<div className="mb-2 pb-2 border-b border-b-[#0E0C15]">
    <div className="flex items-center justify-between">
      <h4 className="flex items-center font-sora font-light text-sm">
        <span className="mr-2">
          <img src={icon} alt="" />
        </span>{" "}
        {title}
      </h4>
      <p className="font-jakartaSans text-sm font-normal">
        {value}
      </p>
    </div>
  </div>)
}

function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>()
  const { userData } = useSelector((state: RootState) => state.userData)

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (getAccessToken()) {
      dispatch(getUserAPI())
    }
  }, [dispatch])

  const handleOpenModal = () => {
    setModalIsOpen(true)
  }

  return (
    <div className="flex min-h-screen font-sora">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <main className="flex-1 min-w-0 py-6">
        <div className=" text-white flex flex-col bg-black lg:bg-transparent border-b-[#3F3A52] border-b-[1px] border-solid pb-4">
          <h1 className="text-xl font-semibold hidden lg:block px-4">
            Profile
          </h1>
        </div>
        <div className="p-4">
          <div className="w-full overflow-hidden">
            <img src={Profilebg} className="w-full rounded-[18px]" alt="" />
          </div>
          <div className="ps-4 pr-6">
            <div className="flex justify-between items-center">
              <div className="flex">
                <div className="-mt-14">
                  <img src={UserImg} alt="" />
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-medium font-jakartaSans">
                    {`${userData?.firstName} ${userData?.lastName}`}
                  </h2>
                  <p className="font-normal text-lg text-[#B3FF53] font-jakartaSans">
                    CEO
                  </p>
                </div>
              </div>
              <button className="h-16 w-16 bg-[#3F3A52] rounded-2xl">
                <img src={EditImg} className="m-auto" alt="" />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-3">
                <div className="shadow-[0px 0px 30px 0px #0000000F] bg-[#15131D] rounded-3xl p-6">
                  <h3 className="font-light text-white text-base font-jakartaSans">
                    About me
                  </h3>
                  <p className="font-jakartaSans my-3 text-base font-light">
                    Coming soon
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="shadow-[0px 0px 30px 0px #0000000F] bg-[#15131D] rounded-3xl p-6">
                    <h3 className="font-light text-white text-base font-jakartaSans mb-4">
                      Personal Information
                    </h3>

                    {UserInfo("Full Name", `${userData?.firstName} ${userData?.lastName}`, ProfileImg)}
                    {UserInfo("Email Address", userData?.email || "-", EmailImg)}
                    {UserInfo("Address", "Coming soon", LocationImg)}
                    {UserInfo("Phone Number", userData?.phone_number || "-", PhoneImg)}
                  </div>

                  <div className="shadow-[0px 0px 30px 0px #0000000F] bg-[#15131D] rounded-3xl p-6">
                    <h3 className="font-light text-white text-base font-jakartaSans mb-4">
                      Professional Information
                    </h3>

                    {UserInfo("Job Title", "Coming soon", BriefcaseImg)}
                    {UserInfo("Department", "Coming soon", BuildingImg)}
                    {UserInfo("Year of Experience", "Coming soon", AwardImg)}
                    {UserInfo("Degree", "Coming soon", TeacherImg)}
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="shadow-[0px 0px 20px 0px #00000005] border border-[#0E0C15] bg-[#15131D] rounded-[18px] h-20 px-5 py-3 mb-5 relative">
                  <div className="flex justify-between items-center h-full">
                    <div className="flex items-center">
                      <span className="inline-block bg-black h-[51px] w-[51px] rounded-[10px] px-2 py-3">
                        <img src={TelegramIcon} alt="" />
                      </span>{" "}
                      <p className="font-sora font-bold text-2xl ms-4">
                        Telegram
                      </p>
                    </div>
                    <button disabled={!!userData?.telegramConnected} className="disableConnectBtn w-[144px] bg-[#B3FF53] shadow-[0px 0px 20px 0px #00000005] h-[29px] rounded-[10px] text-[#15131D] text-base font-semibold font-jakartaSans"
                      onClick={handleOpenModal}
                    >
                      {`${userData?.telegramConnected ? `Connected` : `Connect`}`}
                    </button>
                  </div>
                </div>
                <div className="shadow-[0px 0px 30px 0px #0000000F] bg-[#15131D] rounded-3xl p-6">
                  <h3 className="font-light text-white text-base font-jakartaSans mb-4">
                    Recent Activity
                  </h3>
                  <div>

                    <div className="mb-6">
                      <div className="flex justify-between">
                        <div className="flex">
                          <div className="relative w-14 inline-block">
                            <img
                              src={UserImg1}
                              className="h-12 w-12 rounded-full"
                              alt=""
                            />
                            <span className="absolute right-2 bottom-1 h-3 w-3 border border-white bg-[#B3FF53] rounded-md"></span>
                          </div>
                          <div className="ms-2">
                            <h4 className="text-white font-medium text-sm">
                              KC{" "}
                              <span className="font-normal text-xs text-[#CAC6DD] ps-2">
                                2 mins ago
                              </span>
                            </h4>
                            <p className="text-[#8C97A1] font-normal text-sm">
                              Invited{" "}
                              <span className="text-[#C0C6A8] font-medium">
                                Alisa Hester
                              </span>{" "}
                              to the community CR3
                            </p>
                          </div>
                        </div>
                        <div>
                          <span className="bg-[#FF776F] h-2 w-2 block rounded-full"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </main >
      {modalIsOpen && <ConnectTelegramModal phoneNumber={userData?.phone_number} isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} />}
    </div >
  );
}

export default ProfilePage;