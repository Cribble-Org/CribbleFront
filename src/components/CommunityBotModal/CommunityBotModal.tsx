import Modal from "react-modal";
import { customStylesCommunityBotModal } from "../../constants/styles";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { BotSchema } from "../../utility/schemas";
import { cn } from "../../lib/utils";
import { useState } from "react";
import { addBotAPI, getBotListAPI } from "../../redux/botAgent/botAgentAPI";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../config/store";
import handleAppEvents from "../../utility/toast";

// Define types for the props
interface CommunityBotModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
}

interface BotFormValues {
  botToken: string;
}

const CommunityBotModal: React.FC<CommunityBotModalProps> = ({
  modalIsOpen,
  closeModal,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const initialValues: BotFormValues = {
    botToken: "",
  };

  const botHandleSubmit = async (values: BotFormValues) => {
    setSubmitting(true);
    await dispatch(addBotAPI({ botToken: values.botToken })).then(
      async (res) => {
        setSubmitting(false);
        closeModal();
        if (res?.payload?.message) {
          handleAppEvents(res?.payload?.message, "success");
          dispatch(getBotListAPI());
        } else {
          handleAppEvents(res?.payload?.message, "error");
          closeModal();
        }
      }
    );
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStylesCommunityBotModal}
      contentLabel="Example Modal"
      appElement={document.getElementById("root") || undefined}
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

        <Formik
          initialValues={initialValues}
          validationSchema={BotSchema}
          onSubmit={botHandleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="py-8">
                <label className="block Sora text-white text-base font-semibold mb-3">
                  Get the token for your bot from botfather & Enter Below
                </label>
                <Field
                  type="text"
                  name="botToken"
                  placeholder="Enter Bot Token"
                  className={cn(
                    "border border-[#ADA8C3] bg-[#15131D] rounded-[12px] h-[70px] px-5 py-3 mb-4 w-full focus:outline-none focus:shadow-outline font-normal text-base bot-input",
                    errors.botToken && touched.botToken ? "error-border" : ""
                  )}
                />
                <ErrorMessage
                  name="botToken"
                  component="div"
                  className="text-red-500 text-sm mb-5 ml-2"
                />
                <button
                  type="submit"
                  className="w-[250px] bg-[#B3FF53] shadow-[0px 0px 20px 0px #00000005] h-[43px] rounded-[12px] text-[#000] Sora text-base font-semibold my-3"
                >
                  {submitting ? "Submit..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default CommunityBotModal;
