import MobileSubNavbar from "./MobileSubNavbar/MobileSubNavbar";
import IphoneImage from "../assets/Images/Iphone-frame.png";

export default function CommunityDetail() {
  return (
    <div>
      <div className=" text-white flex flex-col bg-black lg:bg-transparent border-b-[#3F3A52] border-b-[1px] border-solid pb-4">
        <h1 className="text-xl font-semibold hidden lg:block px-4">
          “XYZ” Community “botname” Cribble Agent
        </h1>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {/* sidebar */}
        <MobileSubNavbar />
        <div className="col-span-4">
          <div className=" grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <div className="py-[44px] px-[50px]">
                <textarea
                  className="font-jakartaSans rounded-lg resize-none text-[#757185] text-base w-[504px] h-[321px] p-[25px] bg-transparent border-[1px] border-solid border-[#757185]"
                  placeholder="Type your greetings message here......."
                ></textarea>
                <div className="mt-[35px]">
                  <span className="font-sora text-sm bg-[#252134] py-[11px] px-[18px] rounded-[12px] mr-[20px]">
                    @name
                  </span>
                  <span className="font-sora text-sm bg-[#252134] py-[11px] px-[18px] rounded-[12px] mr-[20px]">
                    @username
                  </span>
                  <span className="font-sora text-sm bg-[#252134] py-[11px] px-[18px] rounded-[12px] mr-[20px]">
                    @user_id
                  </span>
                </div>
                <div className="mt-[24px] ">
                  <button className="font-sora w-[172px] flex justify-center items-center bg-[#252134] rounded-[12px] text-sm py-[11px] px-[18px]">
                    <span className="text-[22px] mr-[5px] ">+</span>Add Media
                  </button>
                </div>
                <button className="font-sora rounded-[15px] mt-[58px] text-xl bg-[#3F3A52] rounded-2xl w-[143px] p-[9px]">
                  Save
                </button>
              </div>
            </div>

            <div className="border-l border-l-[#3B3B3B99] pl-[112px] py-[44px]">
              <div>
                <img src={IphoneImage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
