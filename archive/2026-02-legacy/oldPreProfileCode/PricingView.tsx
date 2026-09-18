import React, { useState, useEffect } from 'react';
import { Close, Shield, Search, DeleteSweep, TrendingUp, Groups, ChevronRight } from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ScreenWrapper from '../Common/ScreenWrapper';
import Button from '../Common/Button';

type PlanTier = 'free' | 'individual' | 'family';
type BillingPeriod = 'monthly' | 'annual';

interface PlanFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  hasArrow?: boolean;
}

interface PlanConfig {
  id: PlanTier;
  label: string;
  monthlyPrice: number;
  annualPrice: number;
  annualMonthly: number;
  features: PlanFeature[];
}

const plansConfig: Record<PlanTier, PlanConfig> = {
  free: {
    id: 'free',
    label: 'Free',
    monthlyPrice: 0,
    annualPrice: 0,
    annualMonthly: 0,
    features: [
      {
        icon: <Search sx={{ fontSize: 20 }} />,
        title: '1 Full Privacy Scan',
        description: 'Scan 500+ data broker sites to find your exposed personal information.',
      },
      {
        icon: <DeleteSweep sx={{ fontSize: 20 }} />,
        title: '1 Auto Removal',
        description: 'We automatically remove your data from one broker site.',
      },
      {
        icon: <Shield sx={{ fontSize: 20 }} />,
        title: 'DIY Removal Instructions',
        description: 'Step-by-step guides to manually remove your data from broker sites.',
      },
      {
        icon: <TrendingUp sx={{ fontSize: 20 }} />,
        title: 'Manual Progress Tracker',
        description: 'Track your removal progress with our basic dashboard.',
        hasArrow: true,
      },
    ],
  },
  individual: {
    id: 'individual',
    label: 'Individual',
    monthlyPrice: 20,
    annualPrice: 180,
    annualMonthly: 15,
    features: [
      {
        icon: <Search sx={{ fontSize: 20 }} />,
        title: 'Monthly Full Scans',
        description: 'Continuous monitoring of 500+ data brokers every month.',
      },
      {
        icon: <DeleteSweep sx={{ fontSize: 20 }} />,
        title: 'Automated Removal Requests',
        description: 'We handle all removal requests automatically on your behalf.',
      },
      {
        icon: <Shield sx={{ fontSize: 20 }} />,
        title: 'Daily Dark Web Monitoring',
        description: 'Get alerted if your data appears on the dark web.',
      },
      {
        icon: <TrendingUp sx={{ fontSize: 20 }} />,
        title: 'Auto Progress Tracker',
        description: 'Real-time tracking with detailed analytics and removal status.',
        hasArrow: true,
      },
    ],
  },
  family: {
    id: 'family',
    label: 'Family',
    monthlyPrice: 30,
    annualPrice: 270,
    annualMonthly: 22.5,
    features: [
      {
        icon: <Groups sx={{ fontSize: 20 }} />,
        title: 'Protection for 5 Users',
        description: 'All Individual features for up to 5 family members.',
      },
      {
        icon: <TrendingUp sx={{ fontSize: 20 }} />,
        title: 'Family Dashboard',
        description: 'Manage and monitor privacy protection for your entire family.',
      },
      {
        icon: <Shield sx={{ fontSize: 20 }} />,
        title: 'Family Alerts',
        description: 'Get notified when any family member\'s data is exposed.',
        hasArrow: true,
      },
    ],
  },
};

const PricingView: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedTier, setSelectedTier] = useState<PlanTier>('individual');
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const scanId = searchParams.get('scanId');

  const currentPlan = plansConfig[selectedTier];
  const savingsPercent = 25;

  const handleClose = () => {
    navigate(-1);
  };

  const handleSubscribe = () => {
    console.log('Subscribe to:', selectedTier, billingPeriod);
    // Navigate to signup, preserving scanId if present
    const signupUrl = scanId ? `/signup?scanId=${scanId}` : '/signup';
    navigate(signupUrl);
  };

  return (
    <ScreenWrapper className="!bg-[var(--bg-page)]">
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 left-4 p-2 text-white hover:bg-surface rounded-lg transition-colors focus:outline focus:outline-2 focus:outline-[var(--brand-primary)]"
        aria-label="Close"
      >
        <Close sx={{ fontSize: 24 }} />
      </button>

      {/* Main Content */}
      <div className="max-w-md mx-auto pt-8 pb-4">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/assets/logos/Icon-White.svg"
            alt="Vanyshr"
            className="h-16 w-16"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-white text-center mb-4">
          Subscribe to {currentPlan.label}
        </h1>

        {/* Tier Selector */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex bg-surface rounded-full p-1">
            {Object.values(plansConfig).map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedTier(plan.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors focus:outline focus:outline-2 focus:outline-[var(--brand-primary)] ${
                  selectedTier === plan.id
                    ? 'bg-[var(--bg-surface-secondary)] text-white'
                    : 'text-muted hover:text-white'
                }`}
              >
                {plan.label}
              </button>
            ))}
          </div>
        </div>

        {/* Features Card */}
        <div className="bg-surface border border-subtle rounded-lg p-4 mb-4">
          {currentPlan.features.map((feature, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 py-3 ${
                index !== currentPlan.features.length - 1
                  ? 'border-b border-subtle'
                  : ''
              }`}
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-10 h-10 bg-[var(--bg-surface-secondary)] rounded-lg flex items-center justify-center text-muted">
                {feature.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Arrow */}
              {feature.hasArrow && (
                <div className="flex-shrink-0 text-secondary">
                  <ChevronRight sx={{ fontSize: 20 }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Billing Toggle */}
        {currentPlan.monthlyPrice > 0 && (
          <div className="flex gap-3 mb-4">
            {/* Monthly Option */}
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`flex-1 p-4 rounded-lg text-left transition-colors focus:outline focus:outline-2 focus:outline-[var(--brand-primary)] ${
                billingPeriod === 'monthly'
                  ? 'bg-surface border-2 border-[var(--brand-primary)]'
                  : 'bg-surface border border-subtle'
              }`}
            >
              <div className="text-sm font-semibold text-white mb-1">Monthly</div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white">
                  ${currentPlan.monthlyPrice}
                </span>
                <span className="text-xs text-muted">/ month</span>
              </div>
            </button>

            {/* Annual Option */}
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`flex-1 p-4 rounded-lg text-left transition-colors focus:outline focus:outline-2 focus:outline-[var(--brand-primary)] ${
                billingPeriod === 'annual'
                  ? 'bg-surface border-2 border-[var(--brand-primary)]'
                  : 'bg-surface border border-subtle'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-muted">Annual</span>
                <span className="text-xs font-medium text-success bg-[var(--success)]/10 px-2 py-0.5 rounded-full">
                  SAVE {savingsPercent}%
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white">
                  ${currentPlan.annualPrice}
                </span>
                <span className="text-xs text-muted">/ year</span>
              </div>
              <div className="text-xs text-muted">
                ${currentPlan.annualMonthly.toFixed(2)} / month
              </div>
            </button>
          </div>
        )}

        {/* Subscribe Button */}
        <Button
          onClick={handleSubscribe}
          className="w-full"
        >
          {currentPlan.monthlyPrice === 0 ? 'Get Started Free' : 'Subscribe & pay'}
        </Button>

        {/* Legal Text */}
        <div className="mt-4 px-2 border-l-2 border-subtle">
          <p className="text-xs text-muted leading-relaxed">
            By subscribing, you agree to our{' '}
            <button
              onClick={() => navigate('/terms')}
              className="underline text-[var(--brand-primary)] hover:text-white focus:outline focus:outline-1 focus:outline-[var(--brand-primary)]"
            >
              Terms of Service
            </button>
            , and that subscriptions auto-renew until you cancel.{' '}
            <button
              onClick={() => navigate('/terms')}
              className="underline text-[var(--brand-primary)] hover:text-white focus:outline focus:outline-1 focus:outline-[var(--brand-primary)]"
            >
              Cancel anytime
            </button>
            , at least 24 hours prior to renewal to avoid additional charges.
          </p>
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-4">
          <p className="text-xs text-muted">
            30-day money back guarantee
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => navigate('/privacy')}
            className="text-xs text-[var(--brand-primary)] hover:underline focus:outline focus:outline-1 focus:outline-[var(--brand-primary)]"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => navigate('/terms')}
            className="text-xs text-[var(--brand-primary)] hover:underline focus:outline focus:outline-1 focus:outline-[var(--brand-primary)]"
          >
            Terms of Service
          </button>
        </div>
      </div>
    </ScreenWrapper>
  );
};

export default PricingView;
