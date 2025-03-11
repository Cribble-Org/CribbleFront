import { useState } from "react";
import OtpInput from "react-otp-input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginLogo from "../components/LoginLogo";
import loginMaskMan from "../assets/Images/loginMaskMan.svg";
import ArrowLeft from "../assets/Images/arrow-left.png";
import { verifyEmailAPI } from "../redux/user/userAPI";
import { AppDispatch } from "../config/store";
import handleAppEvents from "../utility/toast";
import ResetPassword from "./ResetPassword";
import { CONNECT_SOCIAL_URL, DASHBOARD_URL, LOGIN_URL } from "../constants/urls";
import { setAccessToken } from "../utility/session";

const OTPStyles = {
  width: "85px",
  height: "85px",
  border: "1px solid #0E0C15",
  borderRadius: "8px",
  outline: "none",
  background: "#15131D",
  boxShadow: "0px 1px 2px 0px #1018280D",
  marginRight: "10px",
  color: "#FFFFFF",
  fontSize: "44px",
  fontWeight: 700,
}

export default function EnterCodePage() {
  const dispatch = useDispatch<AppDispatch>()
  const userEmail = localStorage.getItem("userEmail") || ""
  const location = useLocation()
  const navigate = useNavigate()

  const [otp, setOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);

  const handleVerifyCode = () => {
    dispatch(verifyEmailAPI({ otp, email: userEmail, verifyEmail: location?.state?.newSignup })).then((response) => {
      if (response?.payload?.success) {
        if (location?.state?.newSignup) {
          handleAppEvents(response?.payload?.message, "success")
          setAccessToken(response?.payload?.user?.token)
          localStorage.setItem("hideDashboardModal", response?.payload?.user?.isSavedChannels)
          if (response?.payload?.user?.telegramConnected) {
            navigate(DASHBOARD_URL)
            return
          }
          navigate(CONNECT_SOCIAL_URL)
          return;
        } else {
          localStorage.setItem("updatePassCode", otp)
          handleAppEvents(response?.payload?.message, "success")
          setEmailVerified(true)
          return
        }
      }
      handleAppEvents(response?.payload?.message, "error")
    })
  }

  return (
    !emailVerified ?
      <div className="p-10">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex justify-center flex-col">
            <div className="mb-4">
              <LoginLogo />
            </div>
            <div className="py-8">
              <h1 className="font-medium text-[28px] text-[#CAC6DD] font-jakartaSans">
                Enter The Code
              </h1>
              <p className="font-normal text-base text-white font-jakartaSans mb-8">
                "Unlock Your Account: Enter the Code to Regain Control!"
              </p>
              <div className="my-5">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={(index) =>
                    index === 2 ? (
                      <span
                        style={{
                          marginRight: "10px",
                          color: "#CAC6DD",
                          fontSize: "50px",
                        }}
                      >
                        -
                      </span>
                    ) : null
                  }
                  renderInput={(props) => <input {...props} />}
                  inputStyle={OTPStyles}
                />
                <button disabled={!otp} onClick={handleVerifyCode} className="disableConnectBtn w-[582px] bg-[#B3FF53] shadow-[0px 0px 20px 0px #00000005] h-[75px] rounded-[18px] text-[#15131D] text-base  font-semibold my-3 font-jakartaSans mt-10">
                  Verify Code
                </button>
                {/* <Link
                  to={LOGIN_URL}
                  className="w-[582px] font-jakartaSans justify-center flex mt-6 font-normal text-base"
                >
                  Resend code
                </Link> */}
                <Link
                  to={LOGIN_URL}
                  className="w-[582px] font-jakartaSans justify-center flex mt-6 font-normal text-base"
                >
                  <img src={ArrowLeft} alt="" style={{ marginRight: "5px" }} />{" "}
                  Back to login Screen
                </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <img src={loginMaskMan} className="h-dvh" alt="" />
          </div>
        </div>
      </div> :
      <ResetPassword />
  );
}
