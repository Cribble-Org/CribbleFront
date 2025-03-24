import { useEffect, useState } from "react";
import CommunityBotModal from "./CommunityBotModal/CommunityBotModal";
import BotImg from "../../src/assets/Images/bot-ellipse.png";
import { getBotListAPI } from "../redux/botAgent/botAgentAPI";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../config/store";

export default function CommunityAgent() {
  const [openCommunitiesModal, setOpenCommunitiesModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const botAgentListData = useSelector(
    (state: RootState) => state.botData.botAgentListData ?? []
  );

  useEffect(() => {
    dispatch(getBotListAPI());
  }, [dispatch]);

  const showCommunityModal = () => {
    setOpenCommunitiesModal(true);
  };

  const hideCommunityModal = () => {
    setOpenCommunitiesModal(false);
  };

  return (
    <div>
      <div className=" text-white flex flex-col bg-black lg:bg-transparent border-b-[#3F3A52] border-b-[1px] border-solid pb-4">
        <h1 className="text-xl font-semibold hidden lg:block px-4">
          All Cribble Agnets
        </h1>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-3 gap-4">
          {botAgentListData && botAgentListData.length > 0 &&
            botAgentListData?.map((botItem, index) => {
              return (
                <>
                  <div key={index} className="rounded-2xl h-[400px] p-10 bg-[#15131D]">
                    <div className="flex justify-between">
                      <div className="inline-block w-[calc(100%-100px)]">
                        <h3 className="font-sora text-2xl font-semibold mb-2">
                          {botItem?.botName}
                        </h3>
                        <p
                          className="font-sora font-extralight text-sm line-clamp-2
"
                        >
                          Description : Lorem ipsum doler mites lorem ipsum
                          Lorem ipsum doler mites lorem ipsum Lorem ipsum doler
                          mites lorem ipsum Lorem ipsum doler mites lorem ipsum
                        </p>
                      </div>
                      <div className="inline-block">
                        <img src={BotImg} alt="" />
                      </div>
                    </div>
                    <div className="py-4">
                      <div className="flex mb-4 items-center">
                        <div className="w-2/3">
                          <h6 className="font-sora font-light text-base text-white">
                            Status :{" "}
                          </h6>
                        </div>
                        <div className="w-1/3">
                          <p className="font-sora font-light text-base text-white">
                            Connected{" "}
                            <span className="bg-[#B3FF53] h-[8px] w-[8px] rounded-full inline-block"></span>
                          </p>
                        </div>
                      </div>

                      <div className="flex mb-4 items-center">
                        <div className="w-2/3">
                          <h6 className="font-sora font-light text-base text-white">
                            Switch :
                          </h6>
                        </div>
                        <div className="w-1/3">
                          <p className="font-sora font-light text-base text-white">
                            On/Off
                          </p>
                        </div>
                      </div>

                      <div className="flex mb-4 items-center">
                        <div className="w-2/3">
                          <h6 className="font-sora font-light text-base text-white">
                            Version :
                          </h6>
                        </div>
                        <div className="w-1/3">
                          <p className="font-sora font-light text-base text-white">
                            V.1.29.02
                          </p>
                        </div>
                      </div>

                      <div className="flex mb-4 items-center">
                        <div className="w-2/3">
                          <h6 className="font-sora font-light text-base text-white">
                            Active <br /> Communities :
                          </h6>
                        </div>
                        <div className="w-1/3">
                          <p className="font-sora font-light text-base text-white">
                            10
                          </p>
                        </div>
                      </div>

                      <div className="flex mb-4 items-center">
                        <div className="w-2/3">
                          <h6 className="font-sora font-light text-base text-white">
                            Active Announcement <br />
                            Groups :
                          </h6>
                        </div>
                        <div className="w-1/3">
                          <p className="font-sora font-light text-base text-white">
                            06
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}

          <div
            className="rounded-2xl h-[400px] px-24 bg-[#15131D] flex flex-col items-center justify-center cursor-pointer"
            onClick={showCommunityModal}
          >
            <span className="text-[103px]">+</span>
            <p className="pt-10">Connect a Bot</p>
          </div>

          {/* <div className="rounded-2xl h-[400px] px-24 bg-[#15131D] flex flex-col items-center justify-center"></div>

          <div className="rounded-2xl h-[400px] px-24 bg-[#15131D] flex flex-col items-center justify-center"></div>

          <div className="rounded-2xl h-[400px] px-24 bg-[#15131D] flex flex-col items-center justify-center"></div>
          <div className="rounded-2xl h-[400px] px-24 bg-[#15131D] flex flex-col items-center justify-center"></div>
          <div className="rounded-2xl h-[400px] px-24 bg-[#15131D] flex flex-col items-center justify-center"></div> */}
        </div>
      </div>

      {/* <button onClick={showCommunityModal}>Open modal</button> */}
      {openCommunitiesModal && (
        <CommunityBotModal
          closeModal={hideCommunityModal}
          modalIsOpen={openCommunitiesModal}
        />
      )}
    </div>
  );
}
