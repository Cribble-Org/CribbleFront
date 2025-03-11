import Modal from "react-modal";
import { customStylesConfirmModal } from "../constants/styles";

export default function ActiveChannelModal({
  isOpen,
  onClose,
  onConfirm,
  isActive
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isActive: boolean;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStylesConfirmModal}
      contentLabel="Confirm Channel Update"
    >
      <h1 className="font-sora text-white font-bold text-[32px] mb-10">
        {isActive ? "Confirm Channel Activation" : "Confirm Channel Deactivation"}
      </h1>
      <div className="mb-5">
        <p className="font-sora font-light text-base text-white">
          {isActive
            ? "Are you sure you want to activate the selected channels?"
            : "Are you sure you want to deactivate this channel?"}
        </p>
      </div>
      <div className="mt-8 flex gap-4">
        <button
          onClick={onConfirm}
          className="w-[250px] bg-[#B3FF53] shadow-md h-[43px] rounded-[12px] text-black text-base font-semibold"
        >
          Confirm
        </button>
        <button
          onClick={onClose}
          className="w-[250px] bg-gray-600 shadow-md h-[43px] rounded-[12px] text-white text-base font-semibold"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}

