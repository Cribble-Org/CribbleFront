import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import CheckEmailPage from "./CheckEmailPage";
import LoginLogo from "../components/LoginLogo";
import { forgotPasswordAPI } from "../redux/user/userAPI";
import handleAppEvents from "../utility/toast";
import { AppDispatch } from "../config/store";
import loginMaskMan from "../assets/Images/loginMaskMan.svg";
import ArrowLeft from "../assets/Images/arrow-left.png";
import { ForgotPasswordSchema } from "../utility/schemas";
import { LOGIN_URL } from "../constants/urls";
import Loader from "../components/Loader/Loader";
import { cn } from "../lib/utils";

const InitialValues = {
  email: "",
};

export default function ForgotPassword() {
  const dispatch = useDispatch<AppDispatch>()

  const [emailSent, setEmailSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)


  const handleSubmit = async (values: { email: string }) => {
    setSubmitting(true)
    dispatch(forgotPasswordAPI(values)).then((res) => {
      setSubmitting(false)
      if (res?.payload?.success) {
        localStorage.setItem("userEmail", values.email)
        handleAppEvents(res?.payload?.message, "success")
        setEmailSent(true)
      } else {
        handleAppEvents(res?.payload?.message, "error")
      }
    })
  };

  return (
    !emailSent ?
      (<div className="p-10">
        {submitting && <Loader />}
        < div className="grid grid-cols-2 gap-6" >
          <div className="flex justify-center flex-col">
            <div className="mb-4">
              <LoginLogo />
            </div>
            <div className="py-8">
              <h1 className="font-medium text-[28px] text-white font-jakartaSans">
                Forgot Password?
              </h1>
              <p className="font-normal text-base	text-white font-jakartaSans mb-8 mt-2">
                Lost Your Key? Reset Your Password and Regain Control!
              </p>

              <Formik
                initialValues={InitialValues}
                validationSchema={ForgotPasswordSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form className="my-5">
                    <div className={cn("shadow-[0px 0px 20px 0px #00000005] border border-[#0E0C15] bg-[#15131D] rounded-[18px] h-20 px-5 py-3 mb-5",
                      errors.email && touched.email ? "error-border" : ""
                    )}>
                      <label className="block text-[#CAC6DD] text-base	font-normal mb-1 font-jakartaSans">
                        Email Address
                      </label>
                      <Field
                        name="email"
                        type="email"
                        className="shadow font-jakartaSans appearance-none border-none w-full py-0 px-0 text-[#858DFF] focus:outline-none focus:shadow-outline bg-transparent font-light text-sm placeholder-[#858DFF]"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm ml-5 mt-[-15px]"
                    />

                    <button
                      type="submit"
                      disabled={submitting}
                      className={`w-full bg-[#B3FF53] shadow-[0px 0px 20px 0px #00000005] h-[75px] rounded-[18px] text-[#15131D] text-base	font-semibold my-3 font-jakartaSans mt-10 ${submitting ? "opacity-50" : ""
                        }`}
                    >
                      {submitting ? "Sending..." : " Reset Password"}
                    </button>

                    <Link
                      to={LOGIN_URL}
                      className="font-jakartaSans justify-center flex mt-6 font-normal text-base"
                    >
                      <img
                        src={ArrowLeft}
                        alt="Back to login"
                        style={{ marginRight: "5px" }}
                      />{" "}
                      Back to login Screen
                    </Link>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          <div className="flex justify-end">
            <img src={loginMaskMan} className="h-dvh" alt="Forgot Password Illustration" />
          </div>
        </div >
      </div >)
      :
      <CheckEmailPage />
  );
}
