import { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import PhoneNumberInput from "../components/ui/phoneInput";
import { customStylesModal } from "../constants/styles";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../config/store";
import { getUserAPI, sendTelegramConnectCode, sendTelegramOtpSubmit } from "../redux/user/userAPI";
import handleAppEvents from "../utility/toast";
import Loader from "../components/Loader/Loader";
import { DASHBOARD_URL } from "../constants/urls";
import EyeImg from "../assets/Images/eye.png";
import EyeSelected from "../assets/Images/eyeSelected.svg";

interface ConnectTelegramModalProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber?: string
}

export default function ConnectTelegramModal({ isOpen, onClose, phoneNumber = "" }: ConnectTelegramModalProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [phoneValue, setPhoneValue] = useState(phoneNumber);
  const [otpValue, setOtpValue] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [phoneCodeHash, setPhoneCodeHash] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSendTelegramOTP = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLoading(true);

    dispatch(sendTelegramConnectCode({ phoneNumber: phoneValue })).then((response) => {
      setLoading(false);
      if (response?.payload?.success) {
        handleAppEvents(response?.payload?.message, "success");
        setPhoneCodeHash(response?.payload?.phoneCodeHash);
        setCodeSent(true);
        return;
      }
      handleAppEvents(response?.payload?.message, "error");
    });
  };

  const handleSubmitOtp = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setLoading(true);
    const params = {
      phoneNumber: phoneValue,
      phoneCode: otpValue,
      phoneCodeHash: phoneCodeHash,
      twofaPassword: password ? password : undefined
    }

    dispatch(sendTelegramOtpSubmit(params)).then((response) => {
      setLoading(false);
      if (response?.payload?.success) {
        handleAppEvents(response?.payload?.message, "success");
        onClose();
        setPhoneValue("");
        setOtpValue("");
        dispatch(getUserAPI());
        navigate(DASHBOARD_URL);
        return;
      } else if (response?.payload?.is2FAEnabled) {
        setPasswordRequired(true)
        handleAppEvents("Two-Step Verification enabled.", "error");
        return;
      }
      handleAppEvents(response?.payload?.message, "error");
    });
  };

  const handlePhoneNumChange = (value: string) => {
    if (/\d/.test(value)) {
      setPhoneValue(`+${value}`);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStylesModal}
      contentLabel="Connect Telegram"
    >
      {loading && <Loader />}
      <h1 className="font-sora text-white font-bold text-[32px] mb-10">Connect Your Telegram</h1>
      {!codeSent ? (
        <form>
          <div className="mb-5">
            <PhoneNumberInput
              onPhoneChange={handlePhoneNumChange}
              handleSubmit={handleSendTelegramOTP}
              disabled={!!phoneNumber}
              value={phoneNumber}
            />
          </div>
          <div className="mt-7">
            <button type="submit" disabled={!phoneValue || loading} onClick={handleSendTelegramOTP} className="w-[250px] bg-[#B3FF53] shadow-md h-[43px] rounded-[12px] text-black text-base font-semibold">
              Generate OTP
            </button>
          </div>
        </form>
      ) : (
        <form>
          <input
            type="text"
            value={phoneValue}
            className="opacity-[0.5] mb-[47px] border border-[#ADA8C3] bg-[#15131D] rounded-xl h-[70px] w-4/5 px-5 text-white"
            disabled
          />
          <input
            onChange={(event) => setOtpValue(event.target.value)}
            type="number"
            placeholder="Enter OTP"
            className="border mb-[47px] border-[#ADA8C3] bg-[#15131D] rounded-xl h-[70px] w-4/5 px-5 text-white"
          />
          {passwordRequired && (
            <div className="relative w-4/5">
              <input
                autoComplete="new-password"
                autoCorrect="off"
                spellCheck="false"
                onChange={(event) => setPassword(event.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="border border-[#ADA8C3] bg-[#15131D] rounded-xl h-[70px] w-full px-5 text-white pr-12"
              />
              <div className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer">
                <img
                  src={showPassword ? EyeSelected : EyeImg}
                  alt="Show/Hide password"
                  onClick={handleShowPassword}
                />
              </div>
            </div>
          )}
          <div className="mt-7">
            <button disabled={!otpValue || loading} onClick={handleSubmitOtp} className="disableConnectBtn w-[250px] bg-[#B3FF53] shadow-md h-[43px] rounded-[12px] text-black text-base font-semibold">
              Submit
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
