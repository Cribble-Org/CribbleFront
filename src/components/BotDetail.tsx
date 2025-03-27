import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBotChannelsAndCommunitiesAPI,
  getBotDetailAPI,
} from "../redux/botAgent/botAgentAPI";
import { AppDispatch, RootState } from "../config/store";
import { Button } from "./ui/button";
import CommunityBotModal from "./CommunityBotModal/CommunityBotModal";
import BotDetailsCard from "./BotDetailsCard/BotDetailsCard";

export default function BotDetail() {
  const [openCommunitiesModal, setOpenCommunitiesModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { botId } = useParams() as { botId: string };
  const { botDetailData, channelAndCommunitiesList } = useSelector(
    (state: RootState) => state.botData
  );

  useEffect(() => {
    dispatch(getBotDetailAPI({ botId: botId }));
    dispatch(
      getBotChannelsAndCommunitiesAPI({ botId: botId, channels: "channels" })
    );
  }, [dispatch, botId]);

  const showCommunityModal = () => {
    setOpenCommunitiesModal(true);
  };

  const hideCommunityModal = () => {
    setOpenCommunitiesModal(false);
  };

  const handleCommunityDetail = (botId: string, communityId: string) => {
    navigate(`/bot-agent/${botId}/${communityId}`);
  };

  return (
    <div>
      <div className=" text-white flex flex-col bg-black lg:bg-transparent border-b-[#3F3A52] border-b-[1px] border-solid pb-4">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold hidden lg:block px-4">
            {`Cribble Agnets > ${botDetailData?.botName}`}
          </h1>
          <Button className="font-sora rounded-[15px] text-xxs bg-[#3F3A52] rounded-2xl w-[140px] h-[45px] p-[9px] mr-3">
            Refresh
          </Button>
        </div>
      </div>
      <div className="flex">
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4">
            {channelAndCommunitiesList &&
              channelAndCommunitiesList.length > 0 &&
              channelAndCommunitiesList?.map((botItem, index) => {
                return (
                  <>
                    <BotDetailsCard
                      botItem={botItem}
                      index={index}
                      handleCommunityDetail={handleCommunityDetail}
                    />
                  </>
                );
              })}

            <div
              className="rounded-2xl h-[400px] px-24 bg-[#15131D] flex flex-col items-center justify-center cursor-pointer"
              onClick={showCommunityModal}
            >
              <span className="text-[103px]">+</span>
              <p className="pt-10">Connect a Bot</p>
            </div>
          </div>
        </div>
      </div>

      {/* <button onClick={showCommunityModal}>Open modal</button> */}
      {openCommunitiesModal && (
        <CommunityBotModal
          closeModal={hideCommunityModal}
          modalIsOpen={openCommunitiesModal}
        />
      )}
    </div>
  );
}
