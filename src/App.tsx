// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import DashboardPage from "./pages/DashBoardPage";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import EnterCodePage from "./pages/EnterCodePage";
import ConnectSocialPage from "./pages/ConnectSocialPage";
import {
  CHAT_URL,
  CONNECT_SOCIAL_URL,
  PROFILE_PAGE_URL,
  DASHBOARD_URL,
  FORGOT_PASSWORD_URL,
  LOGIN_URL,
  RESET_PASSWORD_URL,
  SIGNUP_URL,
  VERIFY_EMAIL_URL,
  REPORTS_PAGE_URL,
  NOTIFICATIONS_PAGE_URL,
  SETTINGS_PAGE_URL,
  HELP_PAGE_URL,
  CHAT_HISTORY_URL,
  CHECK_EMAIL_URL,
  BOT_PAGE_URL,
  COMMUNITY_LIST_PAGE_URL,
} from "./constants/urls";
import PublicRoute from "./routes/PublicRoutes";
import PrivateRoute from "./routes/PrivateRoutes";
import store from "./config/store";
import Toast from "./components/Toast/Toast";
import ProfilePage from "./pages/ProfilePage";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import CheckEmailPage from "./pages/CheckEmailPage";
import BotAgentPage from "./pages/BotAgentPage";
import CommunityAgentListPage from "./pages/CommunityAgentListPage";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex h-screen bg-[#000] text-white">
          <main className="flex-1 overflow-auto">
            <Routes>
              {/* Public Routes */}
              <Route
                path={LOGIN_URL}
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path={SIGNUP_URL}
                element={
                  <PublicRoute>
                    <SignupPage />
                  </PublicRoute>
                }
              />
              <Route
                path={FORGOT_PASSWORD_URL}
                element={
                  <PublicRoute>
                    <ForgotPassword />
                  </PublicRoute>
                }
              />
              <Route
                path={CHECK_EMAIL_URL}
                element={
                  <PublicRoute>
                    <CheckEmailPage />
                  </PublicRoute>
                }
              />
              <Route
                path={RESET_PASSWORD_URL}
                element={
                  <PublicRoute>
                    <ResetPassword />
                  </PublicRoute>
                }
              />
              <Route
                path={VERIFY_EMAIL_URL}
                element={
                  <PublicRoute>
                    <EnterCodePage />
                  </PublicRoute>
                }
              />

              {/* Private Routes */}
              <Route
                path={DASHBOARD_URL}
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
              <Route
                path={CHAT_URL}
                element={
                  <PrivateRoute>
                    <ChatPage />
                  </PrivateRoute>
                }
              />
              <Route
                path={CHAT_HISTORY_URL}
                element={
                  <PrivateRoute>
                    <ChatPage />
                  </PrivateRoute>
                }
              />
              <Route
                path={CONNECT_SOCIAL_URL}
                element={
                  <PrivateRoute>
                    <ConnectSocialPage />
                  </PrivateRoute>
                }
              />
              <Route
                path={PROFILE_PAGE_URL}
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
              <Route
                path={REPORTS_PAGE_URL}
                element={
                  <PrivateRoute>
                    <Reports />
                  </PrivateRoute>
                }
              />
              <Route
                path={NOTIFICATIONS_PAGE_URL}
                element={
                  <PrivateRoute>
                    <Notifications />
                  </PrivateRoute>
                }
              />
              <Route
                path={SETTINGS_PAGE_URL}
                element={
                  <PrivateRoute>
                    <Settings />
                  </PrivateRoute>
                }
              />
              <Route
                path={HELP_PAGE_URL}
                element={
                  <PrivateRoute>
                    <Help />
                  </PrivateRoute>
                }
              />
              <Route
                path={BOT_PAGE_URL}
                element={
                  <PrivateRoute>
                    <BotAgentPage />
                  </PrivateRoute>
                }
              />
              <Route
                path={COMMUNITY_LIST_PAGE_URL}
                element={
                  <PrivateRoute>
                    <CommunityAgentListPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
      <Toast />
    </Provider>
  );
};

export default App;
