import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SafetyTips from './SafetyTips';
import { LanguageProvider } from '@/contexts/LanguageContext';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn().mockResolvedValue({ data: [] }),
      })),
    })),
  },
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <LanguageProvider>
        {component}
      </LanguageProvider>
    </BrowserRouter>
  );
};

describe('SafetyTips Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the page title', () => {
    const { getByText } = renderWithProviders(<SafetyTips />);
    expect(getByText(/Safety Tips Library/i)).toBeInTheDocument();
  });

  it('displays search input', () => {
    const { getByPlaceholderText } = renderWithProviders(<SafetyTips />);
    expect(getByPlaceholderText(/Search tips/i)).toBeInTheDocument();
  });

  it('shows Kenyan Safety Tips tab', () => {
    const { getByRole } = renderWithProviders(<SafetyTips />);
    expect(getByRole('tab', { name: /Kenyan Safety Tips/i })).toBeInTheDocument();
  });

  it('displays Online Safety category', () => {
    const { getByText } = renderWithProviders(<SafetyTips />);
    expect(getByText(/Online Safety/i)).toBeInTheDocument();
  });

  it('shows Legal Protection tips', () => {
    const { getByText } = renderWithProviders(<SafetyTips />);
    expect(getByText(/Legal Protection/i)).toBeInTheDocument();
  });

  it('displays emergency numbers section', () => {
    const { getByText } = renderWithProviders(<SafetyTips />);
    expect(getByText(/Emergency Numbers/i)).toBeInTheDocument();
    expect(getByText(/Police: 999 \/ 112/i)).toBeInTheDocument();
    expect(getByText(/GBV Hotline: 1195/i)).toBeInTheDocument();
  });

  it('shows Kenyan-specific safety tips content', () => {
    const { getByText } = renderWithProviders(<SafetyTips />);
    expect(getByText(/Protect Your Personal Information/i)).toBeInTheDocument();
  });

  it('displays Computer Misuse and Cybercrimes Act information', () => {
    const { getByText } = renderWithProviders(<SafetyTips />);
    expect(getByText(/Computer Misuse and Cybercrimes Act/i)).toBeInTheDocument();
  });

  it('has link to report harassment', () => {
    const { getByText, getByRole } = renderWithProviders(<SafetyTips />);
    expect(getByText(/Need to report harassment/i)).toBeInTheDocument();
    expect(getByRole('link', { name: /Report to Kenyan Authorities/i })).toBeInTheDocument();
  });

  it('shows support resources category', () => {
    const { getByText } = renderWithProviders(<SafetyTips />);
    expect(getByText(/Support Resources/i)).toBeInTheDocument();
  });
});