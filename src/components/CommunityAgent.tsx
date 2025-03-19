import { useState } from "react";
import CommunityBotModal from "./CommunityBotModal/CommunityBotModal";

export default function CommunityAgent() {
  const [openCommunitiesModal, setOpenCommunitiesModal] = useState(false);

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
          <div
            className="rounded-2xl h-[400px] px-24 bg-[#15131D] flex flex-col items-center justify-center cursor-pointer"
            onClick={showCommunityModal}
          >
            <span className="text-[103px]">+</span>
            <p className="pt-10">Connect a Bot</p>
          </div>

          <div className="rounded-2xl h-[400px] px-24 bg-[#15131D] flex flex-col items-center justify-center"></div>

          <div className="rounded-2xl h-[400px] px-24 bg-[#15131D] flex flex-col items-center justify-center"></div>

          <div className="rounded-2xl h-[400px] px-24 bg-[#15131D] flex flex-col items-center justify-center"></div>
          <div className="rounded-2xl h-[400px] px-24 bg-[#15131D] flex flex-col items-center justify-center"></div>
          <div className="rounded-2xl h-[400px] px-24 bg-[#15131D] flex flex-col items-center justify-center"></div>
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
