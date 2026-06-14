import { Navigate, Route, Routes } from 'react-router-dom';
import { MarketingLayout } from '../layouts/MarketingLayout';
import { HomePage } from '../pages/marketing/HomePage';
import { FeaturesPage } from '../pages/marketing/FeaturesPage';
import { PricingPage } from '../pages/marketing/PricingPage';
import { StatusPage } from '../pages/marketing/StatusPage';
import { SupportPage } from '../pages/marketing/SupportPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { VerifyRobloxPage } from '../pages/VerifyRobloxPage';
import { VerifyDiscordPage } from '../pages/VerifyDiscordPage';
import { SelectPlanPage } from '../pages/SelectPlanPage';
import { DashboardPage } from '../pages/DashboardPage';
import { AdminPage } from '../pages/AdminPage';

export function App() {
  return (
    <Routes>
      {/* Public marketing website */}
      <Route element={<MarketingLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/support" element={<SupportPage />} />
      </Route>

      {/* Auth & onboarding */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify/roblox" element={<VerifyRobloxPage />} />
      <Route path="/verify/discord" element={<VerifyDiscordPage />} />
      <Route path="/select-plan" element={<SelectPlanPage />} />

      {/* Customer / community owner dashboard */}
      <Route path="/dashboard/*" element={<DashboardPage />} />

      {/* Octergo internal admin dashboard */}
      <Route path="/admin/*" element={<AdminPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
