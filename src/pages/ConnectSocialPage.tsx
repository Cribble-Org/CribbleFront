import { useEffect, useState } from "react";
import LoginLogo from "../components/LoginLogo";
import Login from "../assets/Images/login.png";
import TelegramIcon from "../assets/Icons/telegram.svg";
import DiscordIcon from "../assets/Icons/discord.svg";
import TwitterIcon from "../assets/Icons/twitter.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../config/store";
import { getUserAPI } from "../redux/user/userAPI";
import ConnectTelegramModal from "../components/ConnectTelegramModal";

export default function ConnectSocialPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state.userData);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (!userData) {
      dispatch(getUserAPI());
    }
  }, [dispatch, userData]);

  return (
    <div className="p-10">
      {modalIsOpen && <ConnectTelegramModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} />}
      <div className="grid grid-cols-2 gap-0">
        <div className="flex justify-center flex-col">
          <div className="mb-4">
            <LoginLogo />
          </div>
          <div className="py-8">
            <h1 className="font-medium text-[28px] text-white font-jakartaSans">
              Welcome {userData?.firstName || ""}!
            </h1>
            <p className="font-normal text-base text-white font-jakartaSans mb-8 mt-2">
              Connect Your Communities
            </p>

            <div>
              <div className="shadow-md border border-[#0E0C15] bg-[#15131D] rounded-[18px] h-20 px-5 py-3 mb-5 relative">
                <div className="flex justify-between items-center h-full">
                  <div className="flex items-center">
                    <span className="inline-block bg-black h-[51px] w-[51px] rounded-[10px] px-2 py-3">
                      <img src={TelegramIcon} alt="Telegram" />
                    </span>
                    <p className="font-sora font-bold text-2xl ms-4">Telegram</p>
                  </div>
                  <button
                    disabled={!!userData?.telegramConnected}
                    className="disableConnectBtn w-[144px] bg-[#B3FF53] shadow-md h-[29px] rounded-[10px] text-[#15131D] text-base font-semibold"
                    onClick={() => setModalIsOpen(true)}
                  >
                    {`${userData?.telegramConnected ? `Connected` : `Connect`}`}
                  </button>
                </div>
              </div>
              <div className="shadow-[0px 0px 20px 0px #00000005] border border-[#0E0C15] bg-[#15131D] rounded-[18px] h-20 px-5 py-3 mb-5 relative">
                <div className="flex justify-between items-center h-full">
                  <div className="flex items-center">
                    <span className="inline-block bg-black h-[51px] w-[51px] rounded-[10px] px-2 py-3">
                      <img src={TwitterIcon} alt="" />
                    </span>{" "}
                    <p className="font-sora font-bold text-2xl ms-4">
                      X (ex. Twitter)
                    </p>
                  </div>
                  <button className="w-[144px] bg-[#B3FF53] shadow-[0px 0px 20px 0px #00000005] h-[29px] rounded-[10px] text-[#15131D] text-base font-semibold font-jakartaSans">
                    Coming Soon
                  </button>
                </div>
              </div>

              <div className="shadow-[0px 0px 20px 0px #00000005] border border-[#0E0C15] bg-[#15131D] rounded-[18px] h-20 px-5 py-3 mb-5 relative">
                <div className="flex justify-between items-center h-full">
                  <div className="flex items-center">
                    <span className="inline-block bg-black h-[51px] w-[51px] rounded-[10px] px-2 py-3">
                      <img src={DiscordIcon} alt="" />
                    </span>{" "}
                    <p className="font-sora font-bold text-2xl ms-4">Discord</p>
                  </div>
                  <button className="w-[144px] bg-[#B3FF53] shadow-[0px 0px 20px 0px #00000005] h-[29px] rounded-[10px] text-[#15131D] text-base font-semibold font-jakartaSans">
                    Coming Soon
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <img src={Login} className="h-dvh" alt="Login" />
        </div>
      </div>
    </div>
  );
}
