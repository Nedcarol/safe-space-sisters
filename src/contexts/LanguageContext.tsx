import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

type Language = 'en' | 'sw';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.scanner': 'Scanner',
    'nav.dashboard': 'Dashboard',
    'nav.history': 'History',
    'nav.safety': 'Safety Tips',
    'nav.settings': 'Settings',
    'nav.report': 'Report Harassment',
    
    // Landing
    'landing.title': 'AI Digital Shield',
    'landing.subtitle': 'Protecting women and girls from digital harassment',
    'landing.cta': 'Start Scanning',
    'landing.login': 'Login',
    'landing.signup': 'Sign Up',
    'landing.activism': '16 Days of Activism Against Gender-Based Violence',
    
    // Scanner
    'scanner.title': 'Message Scanner',
    'scanner.placeholder': 'Paste the message you want to analyze here...',
    'scanner.analyze': 'Analyze Message',
    'scanner.analyzing': 'Analyzing...',
    'scanner.score': 'Toxicity Score',
    'scanner.categories': 'Detected Categories',
    'scanner.rewrite': 'Get Safer Version',
    'scanner.advice': 'Get Safety Advice',
    'scanner.save': 'Save to History',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.recent': 'Recent Scans',
    'dashboard.chart': 'Toxicity Trend',
    
    // History
    'history.title': 'Scan History',
    'history.export': 'Export PDF',
    'history.delete': 'Delete',
    
    // Safety Tips
    'safety.title': 'Safety Tips Library',
    'safety.search': 'Search tips...',
    'safety.kenyan': 'Kenyan Safety Tips',
    'safety.online': 'Online Safety',
    'safety.legal': 'Legal Protection',
    'safety.reporting': 'Reporting Guide',
    
    // Settings
    'settings.title': 'Settings',
    'settings.darkMode': 'Dark Mode',
    'settings.language': 'Language',
    'settings.dangerZone': 'Danger Zone',
    'settings.deleteAccount': 'Delete Account',
    
    // Direct Report
    'report.title': 'Report to Kenyan Authorities',
    'report.subtitle': 'File reports directly with Kenyan law enforcement and regulatory bodies for cybercrime and online harassment',
    'report.authorities': 'Kenyan Authorities',
    'report.fileReport': 'Prepare Report',
    'report.guide': 'Reporting Guide',
    'report.emergency': 'Emergency? Call Now!',
    'report.emergencyDesc': 'If you are in immediate danger or facing threats to your life, contact emergency services immediately.',
    'report.visitWebsite': 'Visit Website',
    'report.prepareReport': 'Prepare Your Official Report',
    'report.prepareReportDesc': 'Fill out this form to prepare a comprehensive report that you can submit to Kenyan authorities. This helps document your case properly.',
    'report.fullName': 'Full Name (As per ID)',
    'report.idNumber': 'National ID Number',
    'report.email': 'Email Address',
    'report.phone': 'Phone Number',
    'report.incidentType': 'Type of Incident',
    'report.selectIncidentType': 'Select incident type',
    'report.platform': 'Platform/Medium',
    'report.selectPlatform': 'Select platform',
    'report.incidentDate': 'Date of Incident',
    'report.perpetratorInfo': 'Perpetrator Information (if known)',
    'report.perpetratorInfoPlaceholder': 'Username, phone number, or any identifying info',
    'report.description': 'Detailed Description of Incident',
    'report.descriptionPlaceholder': 'Describe what happened, including any messages received, threats made, or actions taken by the perpetrator...',
    'report.evidence': 'Upload Evidence (Screenshots, Documents)',
    'report.evidenceDesc': 'Upload screenshots, chat logs, emails, or any other evidence. Accepted formats: Images, PDF, DOC',
    'report.preparing': 'Preparing Report...',
    'report.prepareReportBtn': 'Prepare Official Report',
    'report.downloadTemplate': 'Download Report Template',
    'report.stepsTitle': 'Step-by-Step Reporting Guide',
    'report.legalFramework': 'Kenyan Legal Framework',
    'report.yourRights': 'Know Your Rights',
  },
  sw: {
    // Navigation
    'nav.scanner': 'Skana',
    'nav.dashboard': 'Dashibodi',
    'nav.history': 'Historia',
    'nav.safety': 'Vidokezo vya Usalama',
    'nav.settings': 'Mipangilio',
    'nav.report': 'Ripoti Udhalimu',
    
    // Landing
    'landing.title': 'Ngao ya Dijitali ya AI',
    'landing.subtitle': 'Kulinda wanawake na wasichana dhidi ya udhalimu wa kidijitali',
    'landing.cta': 'Anza Kuskana',
    'landing.login': 'Ingia',
    'landing.signup': 'Jisajili',
    'landing.activism': 'Siku 16 za Utetezi dhidi ya Unyanyasaji wa Kijinsia',
    
    // Scanner
    'scanner.title': 'Skana ya Ujumbe',
    'scanner.placeholder': 'Bandika ujumbe unaotaka kuchanganua hapa...',
    'scanner.analyze': 'Changanuza Ujumbe',
    'scanner.analyzing': 'Inachanganua...',
    'scanner.score': 'Alama ya Sumu',
    'scanner.categories': 'Aina Zilizogunduliwa',
    'scanner.rewrite': 'Pata Toleo Salama',
    'scanner.advice': 'Pata Ushauri wa Usalama',
    'scanner.save': 'Hifadhi kwenye Historia',
    
    // Dashboard
    'dashboard.title': 'Dashibodi',
    'dashboard.recent': 'Uchunguzi wa Hivi Karibuni',
    'dashboard.chart': 'Mwenendo wa Sumu',
    
    // History
    'history.title': 'Historia ya Uchunguzi',
    'history.export': 'Hamisha PDF',
    'history.delete': 'Futa',
    
    // Safety Tips
    'safety.title': 'Maktaba ya Vidokezo vya Usalama',
    'safety.search': 'Tafuta vidokezo...',
    'safety.kenyan': 'Vidokezo vya Usalama Kenya',
    'safety.online': 'Usalama Mtandaoni',
    'safety.legal': 'Ulinzi wa Kisheria',
    'safety.reporting': 'Mwongozo wa Kuripoti',
    
    // Settings
    'settings.title': 'Mipangilio',
    'settings.darkMode': 'Hali ya Giza',
    'settings.language': 'Lugha',
    'settings.dangerZone': 'Eneo la Hatari',
    'settings.deleteAccount': 'Futa Akaunti',
    
    // Direct Report
    'report.title': 'Ripoti kwa Mamlaka za Kenya',
    'report.subtitle': 'Wasilisha ripoti moja kwa moja kwa polisi na mashirika ya Kenya kwa uhalifu wa mtandao na udhalimu',
    'report.authorities': 'Mamlaka za Kenya',
    'report.fileReport': 'Andaa Ripoti',
    'report.guide': 'Mwongozo wa Kuripoti',
    'report.emergency': 'Dharura? Piga Simu Sasa!',
    'report.emergencyDesc': 'Ikiwa uko hatarini moja kwa moja au unakabiliwa na vitisho kwa maisha yako, wasiliana na huduma za dharura mara moja.',
    'report.visitWebsite': 'Tembelea Tovuti',
    'report.prepareReport': 'Andaa Ripoti Yako Rasmi',
    'report.prepareReportDesc': 'Jaza fomu hii kuandaa ripoti kamili ambayo unaweza kuwasilisha kwa mamlaka za Kenya. Hii inasaidia kuandika kesi yako vizuri.',
    'report.fullName': 'Jina Kamili (Kama kwenye Kitambulisho)',
    'report.idNumber': 'Nambari ya Kitambulisho cha Taifa',
    'report.email': 'Anwani ya Barua Pepe',
    'report.phone': 'Nambari ya Simu',
    'report.incidentType': 'Aina ya Tukio',
    'report.selectIncidentType': 'Chagua aina ya tukio',
    'report.platform': 'Jukwaa/Njia',
    'report.selectPlatform': 'Chagua jukwaa',
    'report.incidentDate': 'Tarehe ya Tukio',
    'report.perpetratorInfo': 'Taarifa za Mkosaji (ikiwa zinajulikana)',
    'report.perpetratorInfoPlaceholder': 'Jina la mtumiaji, nambari ya simu, au taarifa yoyote ya utambuzi',
    'report.description': 'Maelezo Kamili ya Tukio',
    'report.descriptionPlaceholder': 'Eleza kilichotokea, ikiwa ni pamoja na ujumbe uliopokewa, vitisho vilivyotolewa, au hatua zilizochukuliwa na mkosaji...',
    'report.evidence': 'Pakia Ushahidi (Picha za Skrini, Nyaraka)',
    'report.evidenceDesc': 'Pakia picha za skrini, rekodi za mazungumzo, barua pepe, au ushahidi mwingine wowote. Fomati zinazokubaliwa: Picha, PDF, DOC',
    'report.preparing': 'Inaandaa Ripoti...',
    'report.prepareReportBtn': 'Andaa Ripoti Rasmi',
    'report.downloadTemplate': 'Pakua Templeti ya Ripoti',
    'report.stepsTitle': 'Mwongozo wa Kuripoti Hatua kwa Hatua',
    'report.legalFramework': 'Mfumo wa Kisheria wa Kenya',
    'report.yourRights': 'Jua Haki Zako',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data } = await supabase
      .from('user_settings')
      .select('language')
      .eq('user_id', session.user.id)
      .single();

    if (data?.language) {
      setLanguageState(data.language as Language);
    }
  };

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await supabase
        .from('user_settings')
        .update({ language: lang })
        .eq('user_id', session.user.id);
    }
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};