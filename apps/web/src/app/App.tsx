import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { VerifyRobloxPage } from '../pages/VerifyRobloxPage';
import { VerifyDiscordPage } from '../pages/VerifyDiscordPage';
import { SelectPlanPage } from '../pages/SelectPlanPage';
import { DashboardPage } from '../pages/DashboardPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify/roblox" element={<VerifyRobloxPage />} />
      <Route path="/verify/discord" element={<VerifyDiscordPage />} />
      <Route path="/select-plan" element={<SelectPlanPage />} />
      <Route path="/dashboard/*" element={<DashboardPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
