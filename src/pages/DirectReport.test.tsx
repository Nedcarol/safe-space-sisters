import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DirectReport from './DirectReport';
import { LanguageProvider } from '@/contexts/LanguageContext';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ data: null }),
        })),
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

describe('DirectReport Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the page title', () => {
    const { getByText } = renderWithProviders(<DirectReport />);
    expect(getByText(/Report to Kenyan Authorities/i)).toBeInTheDocument();
  });

  it('displays all three tabs', () => {
    const { getByRole } = renderWithProviders(<DirectReport />);
    expect(getByRole('tab', { name: /Kenyan Authorities/i })).toBeInTheDocument();
    expect(getByRole('tab', { name: /Prepare Report/i })).toBeInTheDocument();
    expect(getByRole('tab', { name: /Reporting Guide/i })).toBeInTheDocument();
  });

  it('shows emergency numbers', () => {
    const { getByText } = renderWithProviders(<DirectReport />);
    expect(getByText(/999 \/ 112/i)).toBeInTheDocument();
    expect(getByText(/GBV Hotline: 1195/i)).toBeInTheDocument();
  });

  it('displays DCI Cybercrime Unit contact', () => {
    const { getByText } = renderWithProviders(<DirectReport />);
    expect(getByText(/DCI Cybercrime Unit/i)).toBeInTheDocument();
    expect(getByText(/cybercrime@cid.go.ke/i)).toBeInTheDocument();
  });

  it('shows all four Kenyan authorities', () => {
    const { getByText } = renderWithProviders(<DirectReport />);
    expect(getByText(/DCI Cybercrime Unit/i)).toBeInTheDocument();
    expect(getByText(/Communications Authority of Kenya/i)).toBeInTheDocument();
    expect(getByText(/Office of the Director of Public Prosecutions/i)).toBeInTheDocument();
    expect(getByText(/Kenya Police Service/i)).toBeInTheDocument();
  });
});