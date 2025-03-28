
export const COLORS_WITH_NAMES: { name: string; code: string }[] = [
  { name: "Purple", code: "#8b5cf6" },
  { name: "Green", code: "#4ade80" },
  { name: "Red", code: "#ef4444" },
  { name: "Blue", code: "#3b82f6" }
];

export const SuggestionQuestions = [
  "Can you give me my communities churn rate for last 1 month?",
  "Can you give me my communities engagement analysis from last month",
  "What is the current user activity status?",
  "Show me the top performing posts this week"
];

// API error message
export const API_ERROR_MSG = "An unexpected error occurred."

export const AI_BOT_URL = "aiBot"

export const BOT_CARD_DETAIL_LABELS = [
  { label: "Agent Connection", key: "" },
  { label: "Agent Connection", key: "" },
  { label: "Agent Connection", key: "" },
  { label: "Agent Connection", key: "" },
];

export const COMMUNITY_CARD_DETAIL_LABELS = [
  { label: "Agent Connection", key: "" },
  { label: "Agent Connection", key: "" },
  { label: "Agent Connection", key: "" },
  { label: "Agent Connection", key: "" },
];

export const COMMUNITY_DETAIL_LABELS = {
  title: "Add Community",
  description: "",
  fieldLabel: "Enter telegram community username below",
  placeholder: "Enter @username",
  submitButtonLabel: "Add",
}

export const BOT_DETAIL_LABELS = {
  title: "Enter Telegram Bot Token",
  description: `Data Protection Commitment: At Cribble, we analyze your messages solely for sentiment and KPI assessments, strictly within the scope of your provided permissions. We do not store, share, or retain any of your messages or personal data. Additionally, we never access any communities or groups beyond those you have authorized.`,
  fieldLabel: "Get the token for your bot from BotFather and enter it below.",
  placeholder: "Enter Bot Token",
  submitButtonLabel: "Submit",
};