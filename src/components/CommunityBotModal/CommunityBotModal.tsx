import Modal from "react-modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { customStylesCommunityBotModal } from "../../constants/styles";
import { cn } from "../../lib/utils";
import Loader from "../Loader/Loader";
import { CommunityBotModalProps } from "../../types/botTypes";

const CommunityBotModal: React.FC<CommunityBotModalProps> = ({
  modalIsOpen,
  closeModal,
  initialValues,
  validationSchema,
  onSubmit,
  submitting,
  communtyDetailLabel,
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStylesCommunityBotModal}
      contentLabel="Example Modal"
      appElement={document.getElementById("root") || undefined}
    >
      {/* Modal content */}
      {submitting && <Loader />}
      <div className="pt-7 px-10 pb-5">
        <h1 className="font-sora text-white font-semibold text-[32px]">
          {" "}
          {communtyDetailLabel?.title}
        </h1>
        <p className="font-sora font-light text-base text-[#3B3B3B]">
          {communtyDetailLabel?.description}
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="py-8">
                <label className="block Sora text-white text-base font-semibold mb-3">
                  {communtyDetailLabel?.fieldLabel}
                </label>
                <Field
                  type="text"
                  name="token"
                  placeholder={communtyDetailLabel?.placeholder}
                  className={cn(
                    "border border-[#ADA8C3] bg-[#15131D] rounded-[12px] h-[70px] px-5 py-3 mb-4 w-full focus:outline-none focus:shadow-outline font-normal text-base bot-input",
                    errors.token && touched.token ? "error-border" : ""
                  )}
                />
                <ErrorMessage
                  name="token"
                  component="div"
                  className="text-red-500 text-sm mb-5 ml-2"
                />
                <button
                  type="submit"
                  className="w-[250px] bg-[#B3FF53] shadow-[0px 0px 20px 0px #00000005] h-[43px] rounded-[12px] text-[#000] Sora text-base font-semibold my-3"
                >
                  {communtyDetailLabel?.submitButtonLabel}
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
