import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import LoginLogo from "../components/LoginLogo";
import Loader from "../components/Loader/Loader";
import { sendEmailVerificationCodeAPI, loginAPI } from "../redux/user/userAPI";
import { AppDispatch } from "../config/store";
import handleAppEvents from "../utility/toast";
import { setAccessToken } from "../utility/session";
import { LoginSchema } from "../utility/schemas";
import { cn } from "../lib/utils";
import { CHECK_EMAIL_URL, CONNECT_SOCIAL_URL, DASHBOARD_URL, FORGOT_PASSWORD_URL, SIGNUP_URL } from "../constants/urls";
import SignupImg from "../assets/Images/signup.png";
import EyeImg from "../assets/Images/eye.png";
import EyeSelected from "../assets/Images/eyeSelected.svg";
import GoogleImg from "../assets/Images/google.png";

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
    remember: false,
  };

  const sendVerifyMail = async (values: { email: string }) => {
    dispatch(sendEmailVerificationCodeAPI(values)).then((res) => {
      setIsLoading(false);
      if (res?.payload?.success) {
        localStorage.setItem("userEmail", values.email)
        handleAppEvents(res?.payload?.message, "success")
        navigate(CHECK_EMAIL_URL, { state: { newSignup: true } })
      } else {
        handleAppEvents(res?.payload?.message, "error")
      }
    })
  }

  const handleSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    dispatch(loginAPI({ email: values.email, password: values.password })).then(async (res) => {
      if (res?.payload?.success) {
        // Check for Email verify
        if (!res?.payload?.isEmailVerified) {
          await sendVerifyMail({ email: values.email })
          return;
        }

        setIsLoading(false);
        setAccessToken(res?.payload?.token)
        localStorage.setItem("hideDashboardModal", res?.payload?.isSavedChannels)
        if (res?.payload?.telegramConnected) {
          navigate(DASHBOARD_URL)
          return
        }
        navigate(CONNECT_SOCIAL_URL)
        return
      }
      setIsLoading(false);
      handleAppEvents(res?.payload?.message, "error")
    })
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSignUpNavigation = () => {
    navigate(SIGNUP_URL)
  }

  const handleForgotNavigation = () => {
    navigate(FORGOT_PASSWORD_URL)
  }

  return (
    <div className="p-10">
      {isLoading && <Loader />}
      <div className="grid grid-cols-2 gap-6">
        <div className="flex justify-center flex-col">
          <div>
            <LoginLogo />
          </div>
          <div className="py-6">
            <h1 className="font-medium text-[28px] text-white font-jakartaSans">
              Login to your account
            </h1>
            <p className="font-normal text-base text-white font-jakartaSans">
              Unlock Your Progress - Securely Access Your Project Hub!
            </p>

            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="my-5">
                  <div className={cn("shadow-[0px 0px 20px 0px #00000005] border border-[#0E0C15] bg-[#15131D] rounded-[18px] h-20 px-5 py-3 mb-5",
                    errors.email && touched.email ? "error-border" : ""
                  )}>
                    <label className="block text-[#CAC6DD] text-base font-normal mb-1">
                      Email Address
                    </label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      className="shadow appearance-none border-none w-full py-0 px-0 text-[#858DFF] focus:outline-none focus:shadow-outline bg-transparent font-light text-sm placeholder-[#858DFF]"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 mt-[-15px] text-sm mb-3 ml-5"
                  />

                  <div className={cn("shadow-[0px 0px 20px 0px #00000005] border border-[#0E0C15] bg-[#15131D] rounded-[18px] h-20 px-5 py-3 mb-5 relative",
                    errors.password && touched.password ? "error-border" : ""
                  )}>
                    <label className="block text-[#CAC6DD] text-base font-normal mb-1">
                      Password
                    </label>
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="shadow appearance-none border-none w-full py-0 px-0 text-[#858DFF] focus:outline-none focus:shadow-outline bg-transparent font-light text-sm placeholder-[#858DFF] pr-10"
                    />
                    <div className="absolute right-5 top-7">
                      <img className="cursor-pointer" src={showPassword ? EyeSelected : EyeImg} alt="Show/Hide password" onClick={handleShowPassword} />
                    </div>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 mt-[-15px] text-sm mb-3 ml-5"
                  />

                  <div className="my-3 flex justify-between">
                    <div className="flex items-center mb-4">
                      <label className="checkbox-container ms-2 text-base font-medium text-white relative">
                        {" "}
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        <span className="ms-10">Remember for 30 days</span>
                      </label>
                    </div>
                    <span onClick={handleForgotNavigation} className="text-[#B3FF53] font-medium text-base cursor-pointer">
                      Forgot password
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#B3FF53] shadow-[0px 0px 20px 0px #00000005] h-[75px] rounded-[18px] text-[#15131D] text-base font-semibold my-3"
                  >
                    {isSubmitting ? "Signing In..." : "Sign In"}
                  </button>
                  <button
                    type="button"
                    className="w-full bg-[#15131D] border border-[#0E0C15] h-[75px] rounded-[18px] text-white text-base font-semibold my-3 flex items-center justify-center"
                  >
                    <img src={GoogleImg} className="mr-2" alt="Google" />
                    Sign In with Google
                  </button>
                </Form>
              )}
            </Formik>
            <p className="font-normal text-base text-center">
              Don’t have an account?
              <span className="text-[#B3FF53] font-medium ps-1 cursor-pointer" onClick={handleSignUpNavigation}>
                Sign up
              </span>
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <img src={SignupImg} className="h-dvh" alt="Sign Up Illustration" />
        </div>
      </div>
    </div>
  );
}
