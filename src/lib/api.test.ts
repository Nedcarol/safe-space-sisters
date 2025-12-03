import { describe, it, expect, vi, beforeEach } from 'vitest';
import { analyzeToxicity, generateSaferVersion, generateAdvice } from './api';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    functions: {
      invoke: vi.fn(),
    },
  },
}));

import { supabase } from '@/integrations/supabase/client';

describe('API functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('analyzeToxicity', () => {
    it('should call analyze-toxicity edge function with correct parameters', async () => {
      const mockResponse = {
        toxicityScore: 75,
        categories: ['harassment'],
        highlightedWords: ['word'],
        severity: 'high',
        explanation: 'Test explanation',
      };

      vi.mocked(supabase.functions.invoke).mockResolvedValue({
        data: mockResponse,
        error: null,
      });

      const result = await analyzeToxicity('test message', 'gemini');

      expect(supabase.functions.invoke).toHaveBeenCalledWith('analyze-toxicity', {
        body: { text: 'test message', model: 'gemini' },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when API call fails', async () => {
      vi.mocked(supabase.functions.invoke).mockResolvedValue({
        data: null,
        error: { message: 'API Error' },
      });

      await expect(analyzeToxicity('test', 'gemini')).rejects.toThrow();
    });
  });

  describe('generateSaferVersion', () => {
    it('should call generate-safer-version edge function', async () => {
      const mockResponse = { saferVersion: 'Safe message' };

      vi.mocked(supabase.functions.invoke).mockResolvedValue({
        data: mockResponse,
        error: null,
      });

      const result = await generateSaferVersion('unsafe message', 'gemini');

      expect(supabase.functions.invoke).toHaveBeenCalledWith('generate-safer-version', {
        body: { text: 'unsafe message', model: 'gemini' },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('generateAdvice', () => {
    it('should call generate-advice edge function with all parameters', async () => {
      const mockResponse = { advice: 'Safety advice here' };

      vi.mocked(supabase.functions.invoke).mockResolvedValue({
        data: mockResponse,
        error: null,
      });

      const result = await generateAdvice('message', ['harassment'], 'high', 'gemini');

      expect(supabase.functions.invoke).toHaveBeenCalledWith('generate-advice', {
        body: {
          text: 'message',
          categories: ['harassment'],
          severity: 'high',
          model: 'gemini',
        },
      });
      expect(result).toEqual(mockResponse);
    });
  });
});
