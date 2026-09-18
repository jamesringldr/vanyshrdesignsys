import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { HomeScreen } from "@/pages/home-screen";
import { NotFound } from "@/pages/not-found";
import { QSCompiling } from "@/pages/qs-compiling";
import { QSScanning } from "@/pages/qs-scanning";
import { QuickScan } from "@/pages/quick-scan";
import { PreProfile } from "@/pages/pre-profile";
import { Pricing } from "@/pages/pricing";
import { VanyshrUI } from "@/pages/vanyshr-ui";
import { Welcome } from "@/pages/welcome";
import { AuthMagicLink } from "@/pages/auth-magic-link";
import { CheckEmail } from "@/pages/check-email";
import { VerifyPrimaryInfo } from "@/pages/verify-primary-info";
import { OnboardingPhoneNumbers } from "@/pages/onboarding-phone-numbers";
import { OnboardingAliases } from "@/pages/onboarding-aliases";
import { OnboardingAddresses } from "@/pages/onboarding-addresses";
import { OnboardingEmails } from "@/pages/onboarding-emails";
import { FinancialDashboard } from "@/pages/financial-dashboard";
import { Transactions } from "@/pages/transactions";
import { RouteProvider } from "@/providers/router-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/styles/globals.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                <RouteProvider>
                    <Routes>
                        <Route path="/" element={<HomeScreen />} />
                        <Route path="/quick-scan" element={<QuickScan />} />
                        <Route path="/quick-scan/scanning" element={<QSScanning />} />
                        <Route path="/quick-scan/compiling" element={<QSCompiling />} />
                        <Route path="/quick-scan/pre-profile/:scanId?" element={<PreProfile />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/welcome" element={<Welcome />} />
                        <Route path="/magic-link" element={<AuthMagicLink />} />
                        <Route path="/check-email" element={<CheckEmail />} />
                        <Route path="/onboarding/primary-info" element={<VerifyPrimaryInfo />} />
                        <Route path="/onboarding/phone-numbers" element={<OnboardingPhoneNumbers />} />
                        <Route path="/onboarding/aliases" element={<OnboardingAliases />} />
                        <Route path="/onboarding/addresses" element={<OnboardingAddresses />} />
                        <Route path="/onboarding/emails" element={<OnboardingEmails />} />
                        <Route path="/vanyshr-ui" element={<VanyshrUI />} />
                        <Route path="/dashboard" element={<FinancialDashboard />} />
                        <Route path="/activity" element={<Transactions />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </RouteProvider>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>,
);
