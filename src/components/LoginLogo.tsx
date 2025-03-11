import { useNavigate } from "react-router-dom";
import logo from "../assets/Images/o bg.webp";
import { LOGIN_URL } from "../constants/urls";

export default function LoginLogo() {
  const navigate = useNavigate();

  const handleLogoNavigation = () => {
    navigate(LOGIN_URL);
  };

  return (
    <div>
      <a className="inline-flex items-center space-x-2 cursor-pointer w-fit"
        onClick={handleLogoNavigation}
      >
        <div className="relative h-10 w-[70px]">
          <div className="absolute top-4 left-4 flex h-[72px] items-center">
            <div className="relative h-12 w-12 rounded-full -mt-14">
              <div className="absolute inset-0 rounded-full" />
              <div className="relative flex h-full items-center justify-center text-2xl font-bold">
                <img src={logo} className="rounded-full max-w-[59px] h-[59px]" alt="Logo" />
              </div>
              <div className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-br from-purple-500/50 to-pink-500/50 blur-md" />
            </div>
          </div>
        </div>
        <span className="text-[28px] text-white font-sora font-[600]">Cribble</span>
      </a>
    </div>
  );
}
