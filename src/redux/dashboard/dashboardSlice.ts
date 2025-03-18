/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import {
  getActivenessAPI,
  getChannels,
  getDashboardTableData,
  getDBChannels,
  getSelectedChannelsAPI,
} from "./dashboardAPI";
import { revertAll } from "../user/userSlice";
import { ChannelsList, DashboardState } from "../../types/dashboardTypes";
import handleAppEvents from "../../utility/toast";
import {
  calculateTotalMembers,
  capitalizeFirstLetter,
  getColorByName,
} from "../../lib/utils";
import { handleFavoriteChannel } from "../user/userAPI";

const parseActivenessData = (data: { [key: string]: string }) => {
  const chart = Object.entries(data).map(([key, value]) => ({
    name: capitalizeFirstLetter(key),
    value: value,
    color: getColorByName(capitalizeFirstLetter(key)), // Fetch color based on name
  }));

  return chart;
};

const initialState: DashboardState = {
  sentimentsData: null,
  loadingSentimentsData: false,
  channelsList: {
    channel: [],
    community: [],
  },
  allChannels: [],
  channelLoading: false,
  channelLoadingTable: false,
  savedChannels: [],
  activenessData: [],
  loadingActiveness: false,
  dashboardDateRange: [],
  selectedCommunities: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDateRange: (state, action) => {
      state.dashboardDateRange = action.payload;
    },
    setSelectedCommunities: (state, action) => {
      state.selectedCommunities = action.payload;
    },
    setChannelLoadingTable: (state, action) => {
      state.channelLoadingTable = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(revertAll, () => initialState);

    builder.addCase(getDashboardTableData.fulfilled, (state, action) => {
      state.loadingSentimentsData = false;
      if (action.payload) {
        state.sentimentsData = action.payload;
      }
    });
    builder.addCase(getDashboardTableData.pending, (state) => {
      state.loadingSentimentsData = true;
    });
    builder.addCase(getDashboardTableData.rejected, (state) => {
      state.sentimentsData = null;
      state.loadingSentimentsData = false;
    });
    builder.addCase(getChannels.pending, (state) => {
      state.channelLoading = true;
      state.channelsList = {
        channel: [],
        community: [],
      };
    });
    builder.addCase(getChannels.fulfilled, (state, action) => {
      state.channelLoading = false;
      if (action.payload?.data) {
        const response = action?.payload?.data;
        state.allChannels = response.map((channel: ChannelsList) => {
          return {
            ...channel,
            status: channel?.isActive ? "Activated" : "Deactivated",
            role: [],
            size: 0,
          };
        });
        state.channelsList = {
          channel: response?.filter(
            (data: ChannelsList) => data.type === "channel"
          ),
          community: response?.filter(
            (data: ChannelsList) => data.type === "community"
          ),
        };
      }
    });
    builder.addCase(getChannels.rejected, (state, action) => {
      state.channelLoading = false;
      const message = action.payload?.message || "Unknown error";
      handleAppEvents(message, "error");
    });
    builder.addCase(getDBChannels.pending, (state) => {
      state.channelLoadingTable = true;
    });
    builder.addCase(getDBChannels.rejected, (state) => {
      state.channelLoadingTable = false;
    });
    builder.addCase(getDBChannels.fulfilled, (state, action) => {
      state.channelLoadingTable = false;
      if (action.payload?.data) {
        const response = action?.payload?.data;

        state.allChannels = response
          .map((channel: ChannelsList) => {
            return {
              ...channel,
              size: 0,
              status: channel?.isActive ? "Activated" : "Deactivated",
              role: [],
            };
          })
          .sort((prev, next) => {
            if (next.isActive && !prev.isActive) return 1;
            if (prev.isActive && !next.isActive) return -1;

            if (next.favorite && !prev.favorite) return 1;
            if (prev.favorite && !next.favorite) return -1;

            return 0;
          });

        state.channelsList = {
          channel: response?.filter(
            (data: ChannelsList) => data.type === "channel"
          ),
          community: response?.filter(
            (data: ChannelsList) => data.type === "community"
          ),
        };
      }
    });
    builder.addCase(getSelectedChannelsAPI.fulfilled, (state, action) => {
      if (action.payload?.data) {
        const response = action?.payload?.data;
        state.savedChannels = response.map(
          (channel: ChannelsList & { _id: string }) => {
            return {
              ...channel,
              id: channel._id,
              role: [],
              size: "",
              status: "Activate",
            };
          }
        );
      }
    });
    builder.addCase(getActivenessAPI.fulfilled, (state, action) => {
      state.loadingActiveness = false;
      const { percentages, userCounts } = action.payload || {};

      if (!percentages || !userCounts) return;

      const updatedData = parseActivenessData(percentages);
      const members = calculateTotalMembers(userCounts);
      state.activenessData = [{ chart: updatedData, states: { members } }];
    });
    builder.addCase(getActivenessAPI.pending, (state) => {
      state.loadingActiveness = true;
    });
    builder.addCase(getActivenessAPI.rejected, (state) => {
      state.activenessData = [];
      state.loadingActiveness = false;
    });
    builder.addCase(handleFavoriteChannel.fulfilled, (state, action) => {
      if (action?.payload?.success) {
        state.allChannels = state.allChannels.map((channel) => {
          return {
            ...channel,
            favorite: action?.payload?.data?.favoriteChannels.includes(
              channel.id
            ),
          };
        });
      }
    });
  },
});

export const { setDateRange, setSelectedCommunities, setChannelLoadingTable } =
  dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
