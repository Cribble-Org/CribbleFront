import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import LoginLogo from "../components/LoginLogo";
import Login from "../assets/Images/login.png";
import ArrowLeft from "../assets/Images/arrow-left.png";
import EyeImg from "../assets/Images/eye.png";
import EyeSelected from "../assets/Images/eyeSelected.svg";
import { ResetPasswordSchema } from "../utility/schemas";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../config/store";
import { resetPasswordAPI } from "../redux/user/userAPI";
import handleAppEvents from "../utility/toast";
import { LOGIN_URL } from "../constants/urls";
import { useState } from "react";
import { cn } from "../lib/utils";

const InitialValues = {
  password: "",
  confirmPassword: "",
}

export default function ResetPassword() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const otp = localStorage.getItem("updatePassCode") || ""
  const userEmail = localStorage.getItem("userEmail") || ""

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleResetPassword = (values: typeof InitialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    dispatch(resetPasswordAPI({ otp, email: userEmail, newPassword: values?.password })).then((res) => {
      setSubmitting(false);
      if (res?.payload?.success) {
        navigate(LOGIN_URL)
        handleAppEvents(res?.payload?.message, "success")
      } else {
        handleAppEvents(res?.payload?.message, "error")
      }
    })
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
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
              Forgot Password?
            </h1>
            <p className="font-normal text-base text-white font-jakartaSans mb-8 mt-2">
              Lost Your Key? Reset Your Password and Regain Control!
            </p>

            <Formik
              initialValues={InitialValues}
              validationSchema={ResetPasswordSchema}
              onSubmit={handleResetPassword}
            >
              {({errors, touched}) => (
                <Form className="my-5">
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
                      <img className="cursor-pointer" onClick={handleShowPassword} src={showPassword ? EyeSelected : EyeImg} alt="" />
                    </div>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-[-15px] ml-5 mb-5"
                  />

                  <div className={cn("shadow-[0px 0px 20px 0px #00000005] border border-[#0E0C15] bg-[#15131D] rounded-[18px] h-20 px-5 py-3 mb-5 relative",
                      errors.confirmPassword && touched.confirmPassword ? "error-border" : ""
                  )}>
                    <label className="block text-[#CAC6DD] text-base font-normal mb-1">
                      Confirm New Password
                    </label>
                    <Field
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Repeat your new password"
                      className="shadow appearance-none border-none w-full py-0 px-0 text-[#858DFF] focus:outline-none focus:shadow-outline bg-transparent font-light text-sm placeholder-[#858DFF] pr-10"
                    />
                    <div className="absolute right-5 top-7">
                      <img className="cursor-pointer" onClick={handleShowConfirmPassword} src={showConfirmPassword ? EyeSelected : EyeImg} alt="" />
                    </div>
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-[-15px] ml-5"
                  />

                  <button
                    type="submit"
                    className="w-full bg-[#B3FF53] shadow-[0px 0px 20px 0px #00000005] h-[75px] rounded-[18px] text-[#15131D] text-base font-semibold my-3 font-jakartaSans mt-10"
                  >
                    Reset Password
                  </button>

                  <Link
                    to={LOGIN_URL}
                    className="font-jakartaSans justify-center flex mt-6 font-normal text-base"
                  >
                    <img src={ArrowLeft} alt="" style={{ marginRight: "5px" }} />{" "}
                    Back to login Screen
                  </Link>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        <div className="flex justify-end">
          <img src={Login} className="h-dvh" alt="" />
        </div>
      </div>
    </div>
  );
}
