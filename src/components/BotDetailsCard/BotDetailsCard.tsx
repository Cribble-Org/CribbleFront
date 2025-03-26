import { useParams } from "react-router-dom";
import BotImg from "../../../src/assets/Images/bot-ellipse.png";

interface Bot {
  id?: string;
  _id?: string;
  botName?: string;
}

interface BotDetailsCardProps {
  botItem?: Bot;
  index?: string | number;
  handleCommunityDetail?: (
    botId: string,
    communityId: string
  ) => void | ((botId: string) => void);
}

export default function BotDetailsCard({
  botItem,
  index,
  handleCommunityDetail,
}: BotDetailsCardProps) {
  const { botId } = useParams() as { botId: string };

  return (
    <div>
      <div
        key={index}
        className="rounded-2xl h-[400px] p-10 bg-[#15131D]"
        onClick={() => {
          if (handleCommunityDetail) {
            if (botId && botItem?.id) {
              handleCommunityDetail(botId || "", botItem?.id || "");
            } else {
              (handleCommunityDetail as (botId: string) => void)(
                botItem?._id || ""
              );
            }
          }
        }}
      >
        <div className="flex justify-between">
          <div className="inline-block w-[calc(100%-100px)]">
            <h3 className="font-sora text-2xl font-semibold mb-2">
              {botItem?.botName}
            </h3>
            <p
              className="font-sora font-extralight text-sm line-clamp-2
"
            >
              Description : Lorem ipsum doler mites lorem ipsum Lorem ipsum
              doler mites lorem ipsum Lorem ipsum doler mites lorem ipsum Lorem
              ipsum doler mites lorem ipsum
            </p>
          </div>
          <div className="inline-block">
            <img src={BotImg} alt="" />
          </div>
        </div>
        <div className="py-4">
          <div className="flex mb-4 items-center">
            <div className="w-2/3">
              <h6 className="font-sora font-light text-base text-white">
                Status :{" "}
              </h6>
            </div>
            <div className="w-1/3">
              <p className="font-sora font-light text-base text-white">
                Connected{" "}
                <span className="bg-[#B3FF53] h-[8px] w-[8px] rounded-full inline-block"></span>
              </p>
            </div>
          </div>

          <div className="flex mb-4 items-center">
            <div className="w-2/3">
              <h6 className="font-sora font-light text-base text-white">
                Switch :
              </h6>
            </div>
            <div className="w-1/3">
              <p className="font-sora font-light text-base text-white">
                On/Off
              </p>
            </div>
          </div>

          <div className="flex mb-4 items-center">
            <div className="w-2/3">
              <h6 className="font-sora font-light text-base text-white">
                Version :
              </h6>
            </div>
            <div className="w-1/3">
              <p className="font-sora font-light text-base text-white">
                V.1.29.02
              </p>
            </div>
          </div>

          <div className="flex mb-4 items-center">
            <div className="w-2/3">
              <h6 className="font-sora font-light text-base text-white">
                Active <br /> Communities :
              </h6>
            </div>
            <div className="w-1/3">
              <p className="font-sora font-light text-base text-white">10</p>
            </div>
          </div>

          <div className="flex mb-4 items-center">
            <div className="w-2/3">
              <h6 className="font-sora font-light text-base text-white">
                Active Announcement <br />
                Groups :
              </h6>
            </div>
            <div className="w-1/3">
              <p className="font-sora font-light text-base text-white">06</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
