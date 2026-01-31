import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { HomeScreen } from "@/pages/home-screen";
import { NotFound } from "@/pages/not-found";
import { QSCompiling } from "@/pages/qs-compiling";
import { QSScanning } from "@/pages/qs-scanning";
import { QuickScan } from "@/pages/quick-scan";
import { PreProfile } from "@/pages/pre-profile";
import { VanyshrUI } from "@/pages/vanyshr-ui";
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
                        <Route path="/vanyshr-ui" element={<VanyshrUI />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </RouteProvider>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>,
);
