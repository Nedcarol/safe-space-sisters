import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Upload,
  Building2,
  Scale,
  Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DirectReport = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    idNumber: "",
    incidentType: "",
    platform: "",
    perpetratorInfo: "",
    incidentDate: "",
    description: "",
    evidence: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const kenyanAuthorities = [
    {
      name: "DCI Cybercrime Unit",
      nameSwahili: "Kitengo cha Makosa ya Mtandao cha DCI",
      description: "Kenya's lead agency for cybercrime investigations",
      descriptionSwahili: "Wakala mkuu wa Kenya wa uchunguzi wa makosa ya mtandao",
      phone: "+254 722 203 147",
      email: "cybercrime@cid.go.ke",
      website: "https://www.cid.go.ke",
      address: "DCI Headquarters, Kiambu Road, Nairobi",
      icon: Shield,
      category: "law-enforcement"
    },
    {
      name: "Communications Authority of Kenya (CA)",
      nameSwahili: "Mamlaka ya Mawasiliano ya Kenya (CA)",
      description: "Regulates communications sector and handles cyber complaints",
      descriptionSwahili: "Inasimamia sekta ya mawasiliano na kushughulikia malalamiko ya mtandao",
      phone: "+254 20 4242000",
      email: "info@ca.go.ke",
      website: "https://www.ca.go.ke",
      address: "CA Centre, Waiyaki Way, Nairobi",
      icon: Globe,
      category: "regulatory"
    },
    {
      name: "Office of the Director of Public Prosecutions",
      nameSwahili: "Ofisi ya Mkurugenzi wa Mashitaka ya Umma",
      description: "Handles prosecution of cybercrime cases",
      descriptionSwahili: "Inashughulikia mashtaka ya kesi za uhalifu wa mtandao",
      phone: "+254 20 2732061",
      email: "info@odpp.go.ke",
      website: "https://www.odpp.go.ke",
      address: "NSSF Building, Bishop Road, Nairobi",
      icon: Scale,
      category: "prosecution"
    },
    {
      name: "Kenya Police Service",
      nameSwahili: "Huduma ya Polisi Kenya",
      description: "File OB report at nearest police station",
      descriptionSwahili: "Wasilisha ripoti ya OB katika kituo cha polisi karibu nawe",
      phone: "999 / 112",
      email: "ig@nationalpolice.go.ke",
      website: "https://www.nationalpolice.go.ke",
      address: "Nearest Police Station",
      icon: Building2,
      category: "law-enforcement"
    }
  ];

  const incidentTypes = [
    { value: "cyberbullying", label: "Cyberbullying / Uonevu wa Mtandao" },
    { value: "harassment", label: "Online Harassment / Udhalimu Mtandaoni" },
    { value: "threats", label: "Death Threats / Vitisho vya Kifo" },
    { value: "doxxing", label: "Doxxing (Personal Info Leak) / Kuvuja Taarifa za Kibinafsi" },
    { value: "revenge-porn", label: "Revenge Porn / Picha/Video za Ngono bila Ruhusa" },
    { value: "impersonation", label: "Identity Theft / Impersonation / Ujambazi wa Utambulisho" },
    { value: "stalking", label: "Cyberstalking / Kufuatilia Mtandaoni" },
    { value: "defamation", label: "Online Defamation / Kashfa Mtandaoni" },
    { value: "hate-speech", label: "Hate Speech / Hotuba ya Chuki" },
    { value: "sextortion", label: "Sextortion / Ulafi wa Ngono" },
    { value: "other", label: "Other / Nyingine" }
  ];

  const platforms = [
    "WhatsApp",
    "Facebook",
    "Twitter/X",
    "Instagram",
    "TikTok",
    "Telegram",
    "SMS",
    "Email",
    "Dating Apps",
    "Other"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate report submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Report Prepared Successfully",
      description: "Your report has been prepared. Please follow the instructions to submit to the relevant authority.",
    });

    setIsSubmitting(false);
  };

  const reportingSteps = [
    {
      title: "Gather Evidence",
      titleSwahili: "Kusanya Ushahidi",
      description: "Take screenshots of harassment, save URLs, and document dates/times",
      descriptionSwahili: "Chukua picha za skrini za udhalimu, hifadhi URL, na andika tarehe/nyakati"
    },
    {
      title: "File Police Report",
      titleSwahili: "Wasilisha Ripoti ya Polisi",
      description: "Visit nearest police station to file an OB (Occurrence Book) report",
      descriptionSwahili: "Tembelea kituo cha polisi karibu nawe kuwasilisha ripoti ya OB"
    },
    {
      title: "Report to DCI Cybercrime",
      titleSwahili: "Ripoti kwa DCI Cybercrime",
      description: "Contact DCI Cybercrime Unit with your OB number and evidence",
      descriptionSwahili: "Wasiliana na Kitengo cha DCI Cybercrime na nambari yako ya OB na ushahidi"
    },
    {
      title: "Follow Up",
      titleSwahili: "Fuatilia",
      description: "Keep your case reference numbers and follow up regularly",
      descriptionSwahili: "Hifadhi nambari za marejeleo ya kesi yako na fuatilia mara kwa mara"
    }
  ];

  return (
    <AppLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{t('report.title')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('report.subtitle')}
          </p>
        </div>

        <Tabs defaultValue="authorities" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="authorities">{t('report.authorities')}</TabsTrigger>
            <TabsTrigger value="file-report">{t('report.fileReport')}</TabsTrigger>
            <TabsTrigger value="guide">{t('report.guide')}</TabsTrigger>
          </TabsList>

          <TabsContent value="authorities" className="space-y-6">
            <Card className="p-6 bg-destructive/10 border-destructive/20">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t('report.emergency')}</h3>
                  <p className="text-muted-foreground mb-4">
                    {t('report.emergencyDesc')}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Badge variant="destructive" className="text-lg px-4 py-2">
                      <Phone className="h-4 w-4 mr-2" /> 999 / 112
                    </Badge>
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      <Phone className="h-4 w-4 mr-2" /> GBV Hotline: 1195
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              {kenyanAuthorities.map((authority, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <authority.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{authority.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{authority.description}</p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <a href={`tel:${authority.phone}`} className="text-primary hover:underline">
                            {authority.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <a href={`mailto:${authority.email}`} className="text-primary hover:underline">
                            {authority.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{authority.address}</span>
                        </div>
                      </div>

                      <Button variant="outline" size="sm" className="mt-4" asChild>
                        <a href={authority.website} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {t('report.visitWebsite')}
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="file-report" className="space-y-6">
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t('report.prepareReport')}</h3>
                  <p className="text-muted-foreground">
                    {t('report.prepareReportDesc')}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t('report.fullName')} *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      required
                      placeholder="Jane Wanjiku Mwangi"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idNumber">{t('report.idNumber')}</Label>
                    <Input
                      id="idNumber"
                      value={formData.idNumber}
                      onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                      placeholder="12345678"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('report.email')} *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t('report.phone')} *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                      placeholder="+254 7XX XXX XXX"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="incidentType">{t('report.incidentType')} *</Label>
                    <Select 
                      value={formData.incidentType} 
                      onValueChange={(value) => setFormData({...formData, incidentType: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('report.selectIncidentType')} />
                      </SelectTrigger>
                      <SelectContent>
                        {incidentTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="platform">{t('report.platform')} *</Label>
                    <Select 
                      value={formData.platform} 
                      onValueChange={(value) => setFormData({...formData, platform: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('report.selectPlatform')} />
                      </SelectTrigger>
                      <SelectContent>
                        {platforms.map((platform) => (
                          <SelectItem key={platform} value={platform}>
                            {platform}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="incidentDate">{t('report.incidentDate')} *</Label>
                  <Input
                    id="incidentDate"
                    type="date"
                    value={formData.incidentDate}
                    onChange={(e) => setFormData({...formData, incidentDate: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="perpetratorInfo">{t('report.perpetratorInfo')}</Label>
                  <Input
                    id="perpetratorInfo"
                    value={formData.perpetratorInfo}
                    onChange={(e) => setFormData({...formData, perpetratorInfo: e.target.value})}
                    placeholder={t('report.perpetratorInfoPlaceholder')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">{t('report.description')} *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    rows={5}
                    placeholder={t('report.descriptionPlaceholder')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="evidence">{t('report.evidence')}</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {t('report.evidenceDesc')}
                    </p>
                    <Input
                      id="evidence"
                      type="file"
                      multiple
                      className="mt-4"
                      accept="image/*,.pdf,.doc,.docx"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? t('report.preparing') : t('report.prepareReportBtn')}
                  </Button>
                  <Button type="button" variant="outline" size="lg">
                    <FileText className="h-4 w-4 mr-2" />
                    {t('report.downloadTemplate')}
                  </Button>
                </div>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="guide" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">{t('report.stepsTitle')}</h2>
              <div className="space-y-6">
                {reportingSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground font-semibold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">{t('report.legalFramework')}</h2>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">Computer Misuse and Cybercrimes Act, 2018</h3>
                  <p className="text-sm text-muted-foreground">
                    Kenya's primary law addressing cyber harassment, cyberbullying, and digital offenses. 
                    Offenders can face up to 10 years imprisonment or fines up to KES 20 million.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">Sexual Offences Act, 2006</h3>
                  <p className="text-sm text-muted-foreground">
                    Covers offenses including revenge porn, sexual harassment, and sextortion. 
                    Provides protection for victims and strict penalties for offenders.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">Data Protection Act, 2019</h3>
                  <p className="text-sm text-muted-foreground">
                    Protects personal data and privacy. Applicable when perpetrators share personal 
                    information without consent (doxxing).
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-green-500/10 border-green-500/20">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t('report.yourRights')}</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• You have the right to file a police report without being dismissed</li>
                    <li>• You can request a female officer to take your statement</li>
                    <li>• Your identity can be protected during proceedings</li>
                    <li>• You're entitled to legal aid if you cannot afford a lawyer</li>
                    <li>• You can seek protection orders against the perpetrator</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default DirectReport;