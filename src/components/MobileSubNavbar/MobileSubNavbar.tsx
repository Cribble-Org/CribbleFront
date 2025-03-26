import CheckImg from "../../assets/Icons/check.svg";
import CommunityImg from "../../assets/Icons/community.svg";
import CardImg from "../../assets/Icons/card.svg";
import NotificationImg from "../../assets/Icons/notification.svg";

const MobileSubNavbar = () => {
  return (
    <>
      <div className="col-span-1 border-r border-r-[#222222] h-full bg-[#0E0C15] pt-10 px-6">
        <ul>
          <li className="pb-5 mb-5 border-b border-b-[#222222]">
            <a href="#" className="flex font-normal text-lg text-white">
              <img src={CheckImg} className="mr-2" alt="" />
              Greetings
            </a>
          </li>
          <li className="pb-5 mb-5 border-b border-b-[#222222]">
            <a href="#" className="flex font-normal text-lg text-[#A1A1A1]">
              <img src={CommunityImg} className="mr-2" alt="" />
              Antispam
            </a>
          </li>
          <li className="pb-5 mb-5 border-b border-b-[#222222]">
            <a href="#" className="flex font-normal text-lg text-[#A1A1A1]">
              <img src={CardImg} className="mr-2" alt="" />
              Filters
            </a>
          </li>
          <li className="pb-5 mb-5">
            <a href="#" className="flex font-normal text-lg text-[#A1A1A1]">
              <img src={NotificationImg} className="mr-2" alt="" />
              Moderation
            </a>
          </li>

          <li className="pb-5 mb-5">
            <a href="#" className="flex font-normal text-lg text-[#A1A1A1]">
              <img src={NotificationImg} className="mr-2" alt="" />
              Silent Actions
            </a>
          </li>

          <li className="pb-5 mb-5">
            <a href="#" className="flex font-normal text-lg text-[#A1A1A1]">
              <img src={NotificationImg} className="mr-2" alt="" />
              Cleaning
            </a>
          </li>

          <li className="pb-5 mb-5">
            <a href="#" className="flex font-normal text-lg text-[#A1A1A1]">
              <img src={NotificationImg} className="mr-2" alt="" />
              Project FAQs
            </a>
          </li>

          <li className="pb-5 mb-5">
            <a href="#" className="flex font-normal text-lg text-[#A1A1A1]">
              <img src={NotificationImg} className="mr-2" alt="" />
              24H Live
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MobileSubNavbar;
