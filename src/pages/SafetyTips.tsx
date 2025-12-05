import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Shield, Scale, Globe, Phone, AlertTriangle, FileText, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const kenyanSafetyTips = {
  en: [
    {
      category: "Online Safety",
      icon: Shield,
      tips: [
        {
          title: "Protect Your Personal Information",
          content: "Never share your National ID, M-Pesa PIN, or personal photos with strangers online. Kenyans are often targeted through WhatsApp and Facebook with fake job offers or romance scams."
        },
        {
          title: "Secure Your Social Media Accounts",
          content: "Enable two-factor authentication on Facebook, Instagram, and Twitter. Use strong passwords and never use the same password across multiple platforms."
        },
        {
          title: "Be Careful with Online Dating",
          content: "Many Kenyans have fallen victim to romance scams. Never send money to someone you've only met online. Meet in public places and inform friends/family of your whereabouts."
        },
        {
          title: "Recognize Fake Job Offers",
          content: "Legitimate employers don't ask for upfront payments. Be wary of job offers via SMS or WhatsApp that promise high salaries with minimal qualifications."
        }
      ]
    },
    {
      category: "Legal Protection",
      icon: Scale,
      tips: [
        {
          title: "Know the Computer Misuse and Cybercrimes Act",
          content: "Kenya's 2018 law criminalizes cyber harassment, cyberbullying, and sharing intimate images without consent. Offenders can face up to 10 years imprisonment or fines up to KES 20 million."
        },
        {
          title: "Document Everything",
          content: "Take screenshots of harassment, save messages, and note dates and times. This evidence is crucial when filing police reports with the DCI Cybercrime Unit."
        },
        {
          title: "Your Right to Privacy",
          content: "The Data Protection Act 2019 protects your personal information. You can report unauthorized sharing of your data to the Data Protection Commissioner."
        },
        {
          title: "Protection Orders",
          content: "Under Kenyan law, you can seek protection orders against online harassers. Visit your nearest law court or contact FIDA Kenya for legal assistance."
        }
      ]
    },
    {
      category: "Reporting Guide",
      icon: FileText,
      tips: [
        {
          title: "Report to DCI Cybercrime Unit",
          content: "Contact the DCI Cybercrime Unit at +254 722 203 147 or email cybercrime@cid.go.ke. You can also visit their offices at DCI Headquarters, Kiambu Road, Nairobi."
        },
        {
          title: "File an OB Report",
          content: "Visit your nearest police station to file an Occurrence Book (OB) report. Get the OB number and reference it in all follow-up communications."
        },
        {
          title: "Report to Platform",
          content: "Report harassment on the platform where it occurred (Facebook, Twitter, WhatsApp). Most platforms have dedicated reporting features for harassment and abuse."
        },
        {
          title: "Seek Legal Aid",
          content: "FIDA Kenya offers free legal aid for women facing harassment. Contact them at +254 20 387 3444 or visit their offices in Nairobi."
        }
      ]
    },
    {
      category: "Support Resources",
      icon: Users,
      tips: [
        {
          title: "GBV Hotline - 1195",
          content: "Kenya's national Gender-Based Violence hotline operates 24/7. Call 1195 for immediate support, counseling, and referrals to services."
        },
        {
          title: "Childline Kenya - 116",
          content: "For girls under 18 facing online harassment, call the toll-free Childline number 116 for confidential support and guidance."
        },
        {
          title: "Kenya Red Cross - 1199",
          content: "For emergency assistance and psychosocial support, contact Kenya Red Cross at 1199."
        },
        {
          title: "Wangu Kanja Foundation",
          content: "Provides support for survivors of sexual and gender-based violence. Visit wangukanjafoundation.org or contact them through social media."
        }
      ]
    }
  ],
  sw: [
    {
      category: "Usalama Mtandaoni",
      icon: Shield,
      tips: [
        {
          title: "Linda Taarifa Zako za Kibinafsi",
          content: "Usishiriki kamwe Kitambulisho chako cha Taifa, PIN ya M-Pesa, au picha zako za kibinafsi na wageni mtandaoni. Wakenya mara nyingi hulengwa kupitia WhatsApp na Facebook na ofa bandia za kazi au udanganyifu wa mapenzi."
        },
        {
          title: "Linda Akaunti Zako za Mitandao ya Kijamii",
          content: "Washa uthibitisho wa hatua mbili kwenye Facebook, Instagram, na Twitter. Tumia nywila ngumu na usitumie nywila sawa kwenye majukwaa mengi."
        },
        {
          title: "Kuwa Makini na Uchumba Mtandaoni",
          content: "Wakenya wengi wameangukia udanganyifu wa mapenzi. Usitume pesa kamwe kwa mtu uliyemjua mtandaoni tu. Kutana mahali pa umma na wajulishe marafiki/familia ulipo."
        },
        {
          title: "Tambua Ofa Bandia za Kazi",
          content: "Waajiri halali hawaulizi malipo ya awali. Jihadhari na ofa za kazi kupitia SMS au WhatsApp zinazoahidi mishahara mikubwa na sifa ndogo."
        }
      ]
    },
    {
      category: "Ulinzi wa Kisheria",
      icon: Scale,
      tips: [
        {
          title: "Jua Sheria ya Makosa ya Kompyuta na Uhalifu wa Mtandao",
          content: "Sheria ya Kenya ya 2018 inafanya udhalimu wa mtandao, uonevu wa mtandao, na kushiriki picha za siri bila ruhusa kuwa kosa la jinai. Wakosaji wanaweza kukabiliwa na kifungo cha hadi miaka 10 au faini ya hadi KES milioni 20."
        },
        {
          title: "Andika Kila Kitu",
          content: "Chukua picha za skrini za udhalimu, hifadhi ujumbe, na andika tarehe na nyakati. Ushahidi huu ni muhimu wakati wa kuwasilisha ripoti za polisi kwa Kitengo cha DCI Cybercrime."
        },
        {
          title: "Haki Yako ya Faragha",
          content: "Sheria ya Ulinzi wa Data 2019 inalinda taarifa zako za kibinafsi. Unaweza kuripoti kushirikiwa bila ruhusa kwa data yako kwa Kamishna wa Ulinzi wa Data."
        },
        {
          title: "Amri za Ulinzi",
          content: "Chini ya sheria ya Kenya, unaweza kutafuta amri za ulinzi dhidi ya wadhalimu wa mtandao. Tembelea mahakama yako ya karibu au wasiliana na FIDA Kenya kwa msaada wa kisheria."
        }
      ]
    },
    {
      category: "Mwongozo wa Kuripoti",
      icon: FileText,
      tips: [
        {
          title: "Ripoti kwa Kitengo cha DCI Cybercrime",
          content: "Wasiliana na Kitengo cha DCI Cybercrime kwa +254 722 203 147 au barua pepe cybercrime@cid.go.ke. Unaweza pia kutembelea ofisi zao katika Makao Makuu ya DCI, Barabara ya Kiambu, Nairobi."
        },
        {
          title: "Wasilisha Ripoti ya OB",
          content: "Tembelea kituo cha polisi karibu nawe kuwasilisha ripoti ya Kitabu cha Matukio (OB). Pata nambari ya OB na uirejelee katika mawasiliano yote ya ufuatiliaji."
        },
        {
          title: "Ripoti kwa Jukwaa",
          content: "Ripoti udhalimu kwenye jukwaa ambapo ulitokea (Facebook, Twitter, WhatsApp). Majukwaa mengi yana vipengele maalum vya kuripoti udhalimu na unyanyasaji."
        },
        {
          title: "Tafuta Msaada wa Kisheria",
          content: "FIDA Kenya inatoa msaada wa kisheria bure kwa wanawake wanaokabiliwa na udhalimu. Wasiliana nao kwa +254 20 387 3444 au tembelea ofisi zao Nairobi."
        }
      ]
    },
    {
      category: "Rasilimali za Msaada",
      icon: Users,
      tips: [
        {
          title: "Simu ya Dharura ya GBV - 1195",
          content: "Simu ya dharura ya kitaifa ya Unyanyasaji wa Kijinsia ya Kenya inafanya kazi masaa 24/7. Piga 1195 kwa msaada wa haraka, ushauri, na marejeleo ya huduma."
        },
        {
          title: "Childline Kenya - 116",
          content: "Kwa wasichana chini ya miaka 18 wanaokabiliwa na udhalimu wa mtandao, piga nambari ya bure ya Childline 116 kwa msaada na mwongozo wa siri."
        },
        {
          title: "Kenya Red Cross - 1199",
          content: "Kwa msaada wa dharura na msaada wa kisaikolojia, wasiliana na Kenya Red Cross kwa 1199."
        },
        {
          title: "Wangu Kanja Foundation",
          content: "Inatoa msaada kwa waathiriwa wa unyanyasaji wa kingono na kijinsia. Tembelea wangukanjafoundation.org au wasiliana nao kupitia mitandao ya kijamii."
        }
      ]
    }
  ]
};

const SafetyTips = () => {
  const [tips, setTips] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const { language, t } = useLanguage();

  useEffect(() => {
    loadTips();
  }, [language]);

  const loadTips = async () => {
    const { data } = await supabase.from('safety_tips').select('*').eq('language', language);
    if (data) setTips(data);
  };

  const filtered = tips.filter(tip => 
    tip.title.toLowerCase().includes(search.toLowerCase()) ||
    tip.content.toLowerCase().includes(search.toLowerCase()) ||
    tip.category.toLowerCase().includes(search.toLowerCase())
  );

  const localTips = kenyanSafetyTips[language] || kenyanSafetyTips.en;

  return (
    <AppLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{t('safety.title')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'sw' 
              ? 'Vidokezo muhimu vya usalama kwa wanawake na wasichana wa Kenya wanaokabiliwa na udhalimu wa mtandao'
              : 'Essential safety tips for Kenyan women and girls facing online harassment'}
          </p>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('safety.search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <Card className="p-4 bg-primary/10 border-primary/20 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <span className="font-medium">
                {language === 'sw' 
                  ? 'Unahitaji kuripoti udhalimu?' 
                  : 'Need to report harassment?'}
              </span>
            </div>
            <Button asChild>
              <Link to="/direct-report">
                <FileText className="h-4 w-4 mr-2" />
                {language === 'sw' ? 'Ripoti kwa Mamlaka za Kenya' : 'Report to Kenyan Authorities'}
              </Link>
            </Button>
          </div>
        </Card>

        <Tabs defaultValue="kenyan" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="kenyan">
              {language === 'sw' ? 'Vidokezo vya Kenya' : 'Kenyan Safety Tips'}
            </TabsTrigger>
            <TabsTrigger value="general">
              {language === 'sw' ? 'Vidokezo vya Jumla' : 'General Tips'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kenyan" className="space-y-8">
            {localTips.map((category, index) => (
              <div key={index}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">{category.category}</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {category.tips.map((tip, tipIndex) => (
                    <Card key={tipIndex} className="p-5 hover:shadow-md transition-shadow">
                      <h3 className="font-semibold text-lg mb-2">{tip.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{tip.content}</p>
                    </Card>
                  ))}
                </div>
              </div>
            ))}

            <Card className="p-6 bg-destructive/10 border-destructive/20">
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-3">
                    {language === 'sw' ? 'Nambari za Dharura' : 'Emergency Numbers'}
                  </h3>
                  <div className="grid gap-2 md:grid-cols-2">
                    <Badge variant="destructive" className="justify-start py-2 px-3">
                      <Phone className="h-3 w-3 mr-2" /> Police: 999 / 112
                    </Badge>
                    <Badge variant="secondary" className="justify-start py-2 px-3">
                      <Phone className="h-3 w-3 mr-2" /> GBV Hotline: 1195
                    </Badge>
                    <Badge variant="secondary" className="justify-start py-2 px-3">
                      <Phone className="h-3 w-3 mr-2" /> Childline: 116
                    </Badge>
                    <Badge variant="secondary" className="justify-start py-2 px-3">
                      <Phone className="h-3 w-3 mr-2" /> DCI Cyber: +254 722 203 147
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="general" className="space-y-4">
            {filtered.length > 0 ? (
              filtered.map((tip) => (
                <Card key={tip.id} className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-semibold">{tip.title}</h3>
                    <Badge variant="secondary">{tip.category}</Badge>
                  </div>
                  <p className="text-muted-foreground">{tip.content}</p>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <Globe className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">
                  {language === 'sw' ? 'Hakuna vidokezo vilivyopatikana' : 'No tips found'}
                </h3>
                <p className="text-muted-foreground">
                  {language === 'sw' 
                    ? 'Jaribu kutafuta kitu tofauti au angalia vidokezo vya Kenya hapo juu'
                    : 'Try searching for something else or check the Kenyan tips above'}
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default SafetyTips;