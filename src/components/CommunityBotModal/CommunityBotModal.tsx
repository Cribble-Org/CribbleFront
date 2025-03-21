import Modal from "react-modal";
import { customStylesCommunityBotModal } from "../../constants/styles";

// Define types for the props
interface CommunityBotModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
}

const CommunityBotModal : React.FC<CommunityBotModalProps> = ({ modalIsOpen, closeModal }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStylesCommunityBotModal}
      contentLabel="Example Modal"
    >
      {/* Modal content */}
      {/* {addingChannelsLoading && <Loader />} */}
      <div className="pt-7 px-10 pb-5">
        <h1 className="font-sora text-white font-semibold text-[32px]">
          {" "}
          Enter Telegram Bot Token
        </h1>
        <p className="font-sora font-light text-base text-[#3B3B3B]">
          Data Protection Commitment: At Cribble, we analyze your messages
          solely for sentiment and KPI assessments, strictly within the scope of
          your provided permissions. We do not store, share, or retain any of
          your messages or personal data. Additionally, we never access any
          communities or groups beyond those you have authorized.
        </p>

        <div className="py-8">
          <label className="block Sora text-white text-base font-semibold mb-3">
            Get the token for your bot from botfather & Enter Below
          </label>
          <input
            type="text"
            placeholder="Enter Bot Token"
            className="border border-[#ADA8C3] bg-[#15131D] rounded-[12px] h-[70px] px-5 py-3 mb-5 w-full focus:outline-none focus:shadow-outline font-normal text-base bot-input"
          />

          <button
            type="submit"
            className="w-[250px] bg-[#B3FF53] shadow-[0px 0px 20px 0px #00000005] h-[43px] rounded-[12px] text-[#000] Sora text-base font-semibold my-3"
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CommunityBotModal;
