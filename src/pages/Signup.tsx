import SignupImg from "../assets/Images/signup.png";
import EyeImg from "../assets/Images/eye.png";
import EyeSelected from "../assets/Images/eyeSelected.svg";
import LoginLogo from "../components/LoginLogo";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../config/store";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signUpAPI } from "../redux/user/userAPI";
import handleAppEvents from "../utility/toast";
import { useState } from "react";
import { SignupSchema } from "../utility/schemas";
import { CHECK_EMAIL_URL, LOGIN_URL } from "../constants/urls";
import { cn } from "../lib/utils";
import Loader from "../components/Loader/Loader";

const InitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export default function SignupPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false)


  const handleSubmit = (values: typeof InitialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    dispatch(signUpAPI(values)).then((res) => {
      setSubmitting(false);
      if (res?.payload?.success) {
        navigate(CHECK_EMAIL_URL, { state: { newSignup: true } })
        localStorage.setItem("userEmail", values.email)
        handleAppEvents(res?.payload?.message, "success")
      } else {
        handleAppEvents(res?.payload?.message, "error")
      }
    })
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleLoginNavigation = () => {
    navigate(LOGIN_URL)
  }

  return (
    <div className="p-10">
      <div className="grid grid-cols-2 gap-6">
        <div className="flex justify-center flex-col">
          <div>
            <LoginLogo />
          </div>
          <div className="py-6">
            <h1 className="font-medium text-[28px] text-white">Create an account</h1>
            <p className="font-normal text-base text-white">
              Empower Your Projects, Simplify Your Success!
            </p>

            <Formik
              initialValues={InitialValues}
              validationSchema={SignupSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="my-5">
                  {isSubmitting && <Loader />}
                  <div className="grid grid-cols-2 gap-5 mb-5">
                    <div>
                      <div className={cn("shadow-[0px 0px 20px 0px #00000005] border border-[#0E0C15] bg-[#15131D] rounded-[18px] h-20 px-5 py-3",
                        errors.firstName && touched.firstName ? "error-border" : ""
                      )}>
                        <label className="block text-[#CAC6DD] text-base font-normal mb-1">
                          First Name
                        </label>
                        <Field
                          name="firstName"
                          className="shadow appearance-none border-none w-full py-0 px-0 text-[#858DFF] focus:outline-none focus:shadow-outline bg-transparent font-light text-sm placeholder-[#858DFF]"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-red-500 text-sm mt-1 ml-5"
                      />
                    </div>
                    <div>
                      <div className={cn("shadow-[0px 0px 20px 0px #00000005] border border-[#0E0C15] bg-[#15131D] rounded-[18px] h-20 px-5 py-3",
                        errors.lastName && touched.lastName ? "error-border" : ""
                      )}>
                        <label className="block text-[#CAC6DD] text-base font-normal mb-1">
                          Last Name
                        </label>
                        <Field
                          name="lastName"
                          className="shadow appearance-none border-none w-full py-0 px-0 text-[#858DFF] focus:outline-none focus:shadow-outline bg-transparent font-light text-sm placeholder-[#858DFF]"
                          placeholder="Enter your last name"
                        />
                      </div>
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-red-500 text-sm mt-1 ml-5"
                      />
                    </div>
                  </div>

                  <div className={
                    cn("shadow-[0px 0px 20px 0px #00000005] border border-[#0E0C15] bg-[#15131D] rounded-[18px] h-20 px-5 py-3 mb-5",
                      errors.email && touched.email ? "error-border" : ""
                    )}>
                    <label className="block text-[#CAC6DD] text-base font-normal mb-1">
                      Email Address
                    </label>
                    <Field
                      name="email"
                      type="email"
                      className="shadow appearance-none border-none w-full py-0 px-0 text-[#858DFF] focus:outline-none focus:shadow-outline bg-transparent font-light text-sm placeholder-[#858DFF]"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-[-15px] ml-5 mb-5"
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
                      className="shadow appearance-none border-none w-full py-0 px-0 text-[#858DFF] focus:outline-none focus:shadow-outline bg-transparent font-light text-sm placeholder-[#858DFF] pr-10"
                      placeholder="Enter your password"
                    />
                    <div className="absolute right-5 top-7">
                      <img className="cursor-pointer" src={showPassword ? EyeSelected : EyeImg} alt="" onClick={handleShowPassword} />
                    </div>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 mt-[-15px] ml-5 text-sm mb-5"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#B3FF53] shadow-[0px 0px 20px 0px #00000005] h-[75px] rounded-[18px] text-[#15131D] text-base font-semibold my-3"
                  >
                    Sign Up
                  </button>
                </Form>
              )}
            </Formik>

            <p className="font-normal text-base text-center">
              Do you have an account?{" "}
              <span onClick={handleLoginNavigation} className="text-[#B3FF53] font-medium cursor-pointer">
                Login
              </span>
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <img src={SignupImg} className="h-fit" alt="" />
        </div>
      </div>
    </div>
  );
}
