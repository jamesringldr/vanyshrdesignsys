import { useState } from "react";
import { Button } from "@/components/base/buttons/button";
import {
    QSNoResultsModal,
    QSResultMultipleModal,
    QSResultSingleModal,
    type QSProfileSummary,
} from "@/components/application/qs-result-modals";
import PrimaryLogo from "@/assets/PrimaryLogo.png";
import PrimaryLogoDark from "@/assets/PrimaryLogo-DarkMode.png";
import { Link } from "react-router";

/** Sample single-user profile (matches "This you Modal" screenshot). */
const SAMPLE_SINGLE_PROFILE: QSProfileSummary = {
    id: "single-1",
    fullName: "James A Oehring",
    age: 37,
    aliases: ["James Allen Oehring Jr."],
    phones: ["(816) 632-2218"],
    currentAddress: ["413 Lovers Ln", "Cameron, MO"],
};

/** Sample multiple profiles (matches "Multi result" screenshot). */
const SAMPLE_MULTIPLE_PROFILES: QSProfileSummary[] = [
    {
        id: "multi-1",
        fullName: "Lucas Clark",
        age: 30,
        aliases: ["Lucas E Clark", "Clark E Lucas"],
        phones: ["(573) 944-0919"],
        relatives: ["Tim Clark"],
        currentAddress: ["30912 State Highway O", "Marquand, MO"],
    },
    {
        id: "multi-2",
        fullName: "Lucas J Clark",
        age: 50,
        aliases: ["Lucas Angela Clark"],
        phones: ["(573) 485-6338", "(404) 294-8988"],
        relatives: ["Beth Ireland", "Angela Clark", "David Clark"],
        currentAddress: ["128 S Main St", "Eolia, MO"],
    },
    {
        id: "multi-3",
        fullName: "Lucas J Clark",
        age: 45,
        aliases: ["Lucas Clark Jr."],
        phones: ["(816) 555-1234"],
        relatives: ["Jane Clark"],
        currentAddress: ["456 Oak Ave", "Kansas City, MO"],
    },
];

export function VanyshrUI() {
    const [singleOpen, setSingleOpen] = useState(false);
    const [multipleOpen, setMultipleOpen] = useState(false);
    const [noResultsOpen, setNoResultsOpen] = useState(false);

    return (
        <div className="min-h-screen w-full bg-[#F0F4F8] dark:bg-[#022136] font-sans transition-colors duration-200">
            <div className="mx-auto max-w-3xl px-4 py-8">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <Link
                        to="/"
                        className="text-sm font-medium text-[var(--text-secondary)] dark:text-[#A8BFD4] hover:text-[var(--text-primary)] dark:hover:text-white transition-colors"
                    >
                        ← Home
                    </Link>
                    <div className="flex h-10 items-center">
                        <img
                            src={PrimaryLogo}
                            alt="Vanyshr"
                            className="h-8 w-auto block dark:hidden"
                        />
                        <img
                            src={PrimaryLogoDark}
                            alt="Vanyshr"
                            className="h-8 w-auto hidden dark:block"
                        />
                    </div>
                    <div className="w-14" aria-hidden />
                </div>

                <h1 className="text-2xl font-bold text-[var(--text-primary)] dark:text-white">
                    Vanyshr UI
                </h1>
                <p className="mt-1 text-sm text-[var(--text-secondary)] dark:text-[#A8BFD4]">
                    Design system showcase — use this page to verify components and make edits.
                </p>

                {/* QS Result Modals section */}
                <section className="mt-10 rounded-xl border border-[var(--border-subtle)] dark:border-[#2A4A68] bg-[var(--bg-surface)] dark:bg-[#0F2D45] p-6">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white">
                        QS Result Modals
                    </h2>
                    <p className="mt-1 text-sm text-[var(--text-secondary)] dark:text-[#A8BFD4]">
                        Single-user-found, multiple-users-found, and no-results modals for Quick Scan.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                        <Button
                            type="button"
                            size="lg"
                            color="primary"
                            className="h-[52px] rounded-xl bg-[#14ABFE] px-4 font-semibold text-white hover:bg-[#0E9AE8] dark:bg-[#14ABFE] dark:hover:bg-[#0E9AE8]"
                            onClick={() => setSingleOpen(true)}
                        >
                            Open Single-User Modal
                        </Button>
                        <Button
                            type="button"
                            size="lg"
                            color="primary"
                            className="h-[52px] rounded-xl bg-[#14ABFE] px-4 font-semibold text-white hover:bg-[#0E9AE8] dark:bg-[#14ABFE] dark:hover:bg-[#0E9AE8]"
                            onClick={() => setMultipleOpen(true)}
                        >
                            Open Multiple-Users Modal
                        </Button>
                        <Button
                            type="button"
                            size="lg"
                            color="primary"
                            className="h-[52px] rounded-xl bg-[#14ABFE] px-4 font-semibold text-white hover:bg-[#0E9AE8] dark:bg-[#14ABFE] dark:hover:bg-[#0E9AE8]"
                            onClick={() => setNoResultsOpen(true)}
                        >
                            Open No Results Modal
                        </Button>
                    </div>
                </section>

                {/* PreProfile page */}
                <section className="mt-10 rounded-xl border border-[var(--border-subtle)] dark:border-[#2A4A68] bg-[var(--bg-surface)] dark:bg-[#0F2D45] p-6">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white">
                        PreProfile (Quick Scan hook)
                    </h2>
                    <p className="mt-1 text-sm text-[var(--text-secondary)] dark:text-[#A8BFD4]">
                        Last page before signup — exposure summary and data-type cards.
                    </p>
                    <div className="mt-4">
                        <Link
                            to="/quick-scan/pre-profile"
                            className="inline-flex h-[52px] items-center rounded-xl bg-[#14ABFE] px-4 font-semibold text-white transition hover:bg-[#0E9AE8] dark:bg-[#14ABFE] dark:hover:bg-[#0E9AE8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14ABFE] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#022136]"
                        >
                            Open PreProfile page
                        </Link>
                    </div>
                </section>
            </div>

            {/* Modals */}
            <QSResultSingleModal
                isOpen={singleOpen}
                onOpenChange={setSingleOpen}
                profile={SAMPLE_SINGLE_PROFILE}
                region="MO"
                onThisIsMe={(profile) => {
                    console.log("This is me:", profile);
                }}
                onThisIsNotMe={() => {
                    setSingleOpen(false);
                    setNoResultsOpen(true);
                }}
            />

            <QSResultMultipleModal
                isOpen={multipleOpen}
                onOpenChange={setMultipleOpen}
                searchName="lucas Clark"
                region="MO"
                profiles={SAMPLE_MULTIPLE_PROFILES}
                onProfileSelect={(profile) => {
                    console.log("Selected profile:", profile);
                }}
                onNoneOfThese={() => {
                    setMultipleOpen(false);
                    setNoResultsOpen(true);
                }}
            />

            <QSNoResultsModal
                isOpen={noResultsOpen}
                onOpenChange={setNoResultsOpen}
                searchName="James Oehring"
                onScanAgain={(type, value) => console.log("Scan again:", type, value)}
                onScanNow={(phone) => console.log("Scan now:", phone)}
                onRunFullScan={() => console.log("Run full scan")}
            />
        </div>
    );
}
