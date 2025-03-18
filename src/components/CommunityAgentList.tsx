import CheckImg from "../assets/Icons/check.svg";
import CommunityImg from "../assets/Icons/community.svg";
import CardImg from "../assets/Icons/card.svg";
import NotificationImg from "../assets/Icons/notification.svg";
import TrashIcon from "../assets/Icons/trash.svg";
import EditIcon from "../assets/Icons/edit-outline.svg";
import { Plus } from "lucide-react";

export default function CommunityAgentList() {
  return (
    <>
      <div className=" text-white flex flex-col bg-black lg:bg-transparent border-b-[#3F3A52] border-b-[1px] border-solid pb-4">
        <h1 className="text-xl font-semibold hidden lg:block px-4">
          “XYZ” Community “botname” Cribble Agent
        </h1>
      </div>

      <div className="grid grid-cols-5 gap-4">
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
        <div className="col-span-4 py-4 px-6">
          <div className="py-6">
            <div className="mb-10">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <h1 className="font-medium text-lg font-jakartaSans">
                    Communities - Pinned
                  </h1>
                  <p className="font-normal font-sora text-base text-[#ADA8C3]">
                    You have pinned the following Communities. You can pin a new
                    community here.
                  </p>
                </div>
                <button className="flex h-[53px] bg-[#B3FF53] border border-[#B3FF53] rounded-xl py-4 px-4 text-[#15131D] font-jakartaSans font-medium text-sm">
                  {" "}
                  <Plus className="mr-2 p-1" />
                  Pin New Community
                </button>
              </div>
              <div className="rounded-lg bg-[#15131D] p-4 mt-4">
                <div className="table-none">
                  <table className="table-auto lg:w-full">
                    <thead>
                      <tr className="text-left font-medium text-sm font-jakartaSans">
                        <th className="pt-5 pb-10"></th>
                        <th className="pt-5 pb-10">Name</th>
                        <th className="pt-5 pb-10">Creation Date</th>
                        <th className="pt-5 pb-10">Total Members</th>
                        <th className="pt-5 pb-10">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="font-sora font-light text-sm border-b border-gray-800">
                        <td className="w-16 py-4">
                          <label className="checkbox-container ms-2 text-base font-medium text-white relative">
                            {" "}
                            <input type="checkbox" />
                            <span className="checkmark border-[#ADA8C3]"></span>
                          </label>
                        </td>
                        <td className="font-semibold text-base flex items-center py-4">
                          <span className="inline-block bg-[#B3FF53] h-14 w-14 rounded-full mr-3"></span>
                          Cribble CR1
                        </td>
                        <td className="py-4">November 7, 2024</td>
                        <td className="py-4">
                          <span className="font-jakartaSans font-semibold text-2xl pr-1">
                            2445
                          </span>
                          member
                        </td>
                        <td className="py-4">
                          <button className="mr-4">
                            <img src={EditIcon} alt="" />
                          </button>
                          <button>
                            <img src={TrashIcon} alt="" />
                          </button>
                        </td>
                      </tr>
                      <tr className="font-sora font-light text-sm">
                        <td className="w-16 py-4">
                          <label className="checkbox-container ms-2 text-base font-medium text-white relative">
                            {" "}
                            <input type="checkbox" />
                            <span className="checkmark border-[#ADA8C3]"></span>
                          </label>
                        </td>
                        <td className="font-semibold text-base flex items-center py-4">
                          <span className="inline-block bg-[#B3FF53] h-14 w-14 rounded-full mr-3"></span>
                          Cribble CR1
                        </td>
                        <td className="py-4">November 7, 2024</td>
                        <td className="py-4">
                          <span className="font-jakartaSans font-semibold text-2xl pr-1">
                            2445
                          </span>
                          member
                        </td>
                        <td className="py-4">
                          <button className="mr-4">
                            <img src={EditIcon} alt="" />
                          </button>
                          <button>
                            <img src={TrashIcon} alt="" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <h2 className="font-medium text-lg font-jakartaSans">
                    All Communities
                  </h2>
                  <p className="font-normal font-sora text-base text-[#ADA8C3]">
                    Manage your existing communities and change
                    roles/permissions.
                  </p>
                </div>
                <button className="flex h-[53px] bg-[#B3FF53] border border-[#B3FF53] rounded-xl py-4 px-4 text-[#15131D] font-jakartaSans font-medium text-sm">
                  {" "}
                  <Plus className="mr-2 p-1" />
                  Add New Community
                </button>
              </div>
              <div className="rounded-lg bg-[#15131D] p-4 mt-4">
                <div className="table-none">
                  <table className="table-auto lg:w-full">
                    <thead>
                      <tr className="text-left font-medium text-sm font-jakartaSans">
                        <th className="pt-5 pb-10">Name</th>
                        <th className="pt-5 pb-10">Role</th>
                        <th className="pt-5 pb-10">Members</th>
                        <th className="pt-5 pb-10">Date Added</th>
                        <th className="pt-5 pb-10">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="font-sora font-light text-sm border-b border-gray-800">
                        <td className="font-semibold text-base flex items-center py-4">
                          <span className="block bg-[#B3FF53] h-14 w-14 rounded-full mr-3"></span>
                          <span className="flex flex-col">
                            Cribble 1
                            <span className="d-block font-sora font-light text-sm text-[#ADA8C3]">
                              ashlynn.torff@gmail.com
                            </span>
                          </span>
                        </td>
                        <td className="py-4">Founder</td>
                        <td className="py-4">Admin</td>
                        <td className="py-4">November 7, 2024</td>
                        <td className="py-4">
                          <button className="mr-4">
                            <img src={EditIcon} alt="" />
                          </button>
                          <button>
                            <img src={TrashIcon} alt="" />
                          </button>
                        </td>
                      </tr>
                      <tr className="font-sora font-light text-sm border-b border-gray-800">
                        <td className="font-semibold text-base flex items-center py-4">
                          <span className="block bg-[#B3FF53] h-14 w-14 rounded-full mr-3"></span>
                          <span className="flex flex-col">
                            Cribble 1
                            <span className="d-block font-sora font-light text-sm text-[#ADA8C3]">
                              ashlynn.torff@gmail.com
                            </span>
                          </span>
                        </td>
                        <td className="py-4">Founder</td>
                        <td className="py-4">Admin</td>
                        <td className="py-4">November 7, 2024</td>
                        <td className="py-4">
                          <button className="mr-4">
                            <img src={EditIcon} alt="" />
                          </button>
                          <button>
                            <img src={TrashIcon} alt="" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
