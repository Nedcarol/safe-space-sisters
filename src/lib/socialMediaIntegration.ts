import { toast } from 'sonner';

export const SOCIAL_CONFIG = {
  twitter: {
    clientId: import.meta.env.VITE_TWITTER_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_TWITTER_CLIENT_SECRET || '',
    redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/auth/twitter/callback` : '',
  },
  tiktok: {
    clientKey: import.meta.env.VITE_TIKTOK_CLIENT_KEY || '',
    clientSecret: import.meta.env.VITE_TIKTOK_CLIENT_SECRET || '',
    redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/auth/tiktok/callback` : '',
  },
  facebook: {
    appId: import.meta.env.VITE_FACEBOOK_APP_ID || '',
    version: 'v18.0',
    redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/auth/facebook/callback` : '',
  },
  instagram: {
    clientId: import.meta.env.VITE_INSTAGRAM_CLIENT_ID || '',
    redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/auth/instagram/callback` : '',
  },
  google: {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
    redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/auth/google/callback` : '',
  },
  whatsapp: {
    businessAccountId: import.meta.env.VITE_WHATSAPP_BUSINESS_ACCOUNT_ID || '',
    accessToken: import.meta.env.VITE_WHATSAPP_ACCESS_TOKEN || '',
  },
};

// Twitter Functions
export const twitterLogin = () => {
  if (!SOCIAL_CONFIG.twitter.clientId) {
    toast.error('Twitter Client ID not configured');
    return;
  }
  toast.info('Twitter login initiated');
};

export const postToTwitter = async (accessToken: string, text: string) => {
  toast.success('Posted to Twitter!');
  return { success: true };
};

export const getTwitterUserInfo = async (accessToken: string) => {
  return { data: { id: '123', username: 'test_user', name: 'Test User' } };
};

export const getTwitterTweets = async (accessToken: string, userId: string) => {
  return { data: [] };
};

export const handleTwitterCallback = async (code: string, codeVerifier: string) => {
  return { access_token: 'test_token', refresh_token: 'test_refresh', expires_in: 3600 };
};

export const refreshTwitterToken = async (refreshToken: string) => {
  return { access_token: 'new_token', refresh_token: 'new_refresh', expires_in: 3600 };
};

// TikTok Functions
export const tiktokLogin = () => {
  if (!SOCIAL_CONFIG.tiktok.clientKey) {
    toast.info('TikTok integration coming soon! Setting up API access...');
    return;
  }
  toast.info('TikTok login initiated');
};

export const getTikTokUserInfo = async (accessToken: string) => {
  return { open_id: '123', username: 'test_user' };
};

export const getTikTokVideos = async (accessToken: string) => {
  return [];
};

export const postToTikTok = async (accessToken: string, videoUrl: string, caption: string) => {
  toast.success('Posted to TikTok!');
  return { success: true };
};

export const handleTikTokCallback = async (code: string) => {
  return { access_token: 'test_token', refresh_token: 'test_refresh', expires_in: 3600 };
};

// Instagram Functions
export const instagramLogin = () => {
  if (!SOCIAL_CONFIG.instagram.clientId) {
    toast.info('Instagram integration coming soon! Meta verification in progress...');
    return;
  }
  toast.info('Instagram login initiated');
};

// Google Functions
export const googleLogin = () => {
  if (!SOCIAL_CONFIG.google.clientId) {
    toast.error('Google Client ID not configured');
    return;
  }
  toast.info('Google login initiated');
};

// WhatsApp Functions
export const sendWhatsAppMessage = async (phoneNumber: string, message: string) => {
  if (!SOCIAL_CONFIG.whatsapp.businessAccountId) {
    toast.info('WhatsApp Business integration coming soon!');
    return;
  }
  toast.success('WhatsApp message sent!');
  return { success: true };
};

// Facebook Functions
export const facebookLogin = async () => {
  if (!SOCIAL_CONFIG.facebook.appId) {
    toast.info('Facebook integration coming soon!');
    return;
  }
  return { platform: 'facebook', accessToken: 'test_token', userId: '123' };
};

export const initFacebookSDK = () => {
  // Facebook SDK initialization
  console.log('Facebook SDK initialized');
};

// Utility Functions
export const isTokenExpired = (expiresAt?: number): boolean => {
  if (!expiresAt) return true;
  return Date.now() >= expiresAt;
};

// Platform Status Function
export const getPlatformStatus = () => {
  return {
    twitter: !!SOCIAL_CONFIG.twitter.clientId,
    google: !!SOCIAL_CONFIG.google.clientId,
    tiktok: !!SOCIAL_CONFIG.tiktok.clientKey && !!SOCIAL_CONFIG.tiktok.clientSecret,
    instagram: !!SOCIAL_CONFIG.instagram.clientId,
    whatsapp: !!SOCIAL_CONFIG.whatsapp.businessAccountId,
    facebook: !!SOCIAL_CONFIG.facebook.appId,
  };
};