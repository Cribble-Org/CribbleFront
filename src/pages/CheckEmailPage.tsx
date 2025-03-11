import LoginLogo from "../components/LoginLogo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArrowLeft from "../assets/Images/arrow-left.png";
import SignupImg from "../assets/Images/signup.png";
import { LOGIN_URL, VERIFY_EMAIL_URL } from "../constants/urls";

export default function CheckEmailPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const userEmail = localStorage.getItem("userEmail")

  const handleCodeNavigation = () => {
    
    if (location?.state?.newSignup) {
      navigate(VERIFY_EMAIL_URL, {state: {newSignup: true}})
      return;
    }
    navigate(VERIFY_EMAIL_URL)
  }

  return (
    <div className="p-10">
      <div className="grid grid-cols-2 gap-0">
        <div className="flex justify-center flex-col">
          <div className="mb-4">
            <LoginLogo />
          </div>
          <div className="py-8">
            <h1 className="font-medium text-[28px] text-white font-jakartaSans">
              Check your email
            </h1>
            <p className="font-normal text-base	text-white font-jakartaSans mb-8 mt-2">
              We sent a verification code to {userEmail}
            </p>

            <div className="my-5">
              <button onClick={handleCodeNavigation} className="w-full bg-[#B3FF53] shadow-[0px 0px 20px 0px #00000005] h-[75px] rounded-[18px] text-[#15131D] text-base	font-semibold my-3 font-jakartaSans mt-10">
                Enter the code Manually
              </button>

              <Link to={LOGIN_URL} className="font-jakartaSans justify-center flex mt-6 font-normal text-base">
                <img src={ArrowLeft} alt="" style={{ marginRight: "5px" }} />{" "}
                Back to login Screen
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <img src={SignupImg} className="h-dvh" alt="" />
        </div>
      </div>
    </div>
  );
}
