import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { RootState } from "../config/store";
import MobileSubNavbar from "./MobileSubNavbar/MobileSubNavbar";

export default function CommunityDetail() {
  const { botDetailData } = useSelector(
    (state: RootState) => state.botData
  );

  return (
    <div>
      <div className=" text-white flex flex-col bg-black lg:bg-transparent border-b-[#3F3A52] border-b-[1px] border-solid pb-4">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold hidden lg:block px-4">
            {`${botDetailData?.botName} > Community Name > Greetings `}
          </h1>
          <Button className="font-sora rounded-[15px] text-xxs bg-[#3F3A52] rounded-2xl w-[140px] h-[45px] p-[9px] mr-3">
            Update
          </Button>
        </div>
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

            <div className="border-l border-l-[#3B3B3B99] pl-[70px] py-[44px]">
              <div>
                <textarea
                  className="font-montserrat font-normal text-sm w-[278px] rounded-[12px] bg-[#D9D9D9] text-black p-[17px] h-[391px] "
                  placeholder="Type your greetings message here......."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
