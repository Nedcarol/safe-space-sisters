import { Shield, Download, ExternalLink, BookOpen, Users, Scale, AlertCircle, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Resources = () => {
  const navigate = useNavigate();

  const downloadableGuides = [
    {
      title: "Digital Safety Handbook",
      description: "Comprehensive guide to staying safe online, covering privacy settings, secure communication, and threat recognition.",
      category: "Safety Guide",
      type: "PDF"
    },
    {
      title: "Responding to Online Harassment",
      description: "Step-by-step guide on how to document, report, and respond to different forms of online harassment.",
      category: "Action Guide",
      type: "PDF"
    },
    {
      title: "Privacy Protection Checklist",
      description: "A practical checklist to audit and improve your digital privacy across social media and online platforms.",
      category: "Checklist",
      type: "PDF"
    }
  ];

  const externalResources = [
    {
      title: "National Sexual Assault Hotline",
      description: "24/7 support for survivors of sexual assault",
      url: "https://www.rainn.org",
      icon: AlertCircle,
      type: "Crisis Support"
    },
    {
      title: "Cyber Civil Rights Initiative",
      description: "Resources for victims of non-consensual pornography and online abuse",
      url: "https://www.cybercivilrights.org",
      icon: Scale,
      type: "Legal Support"
    },
    {
      title: "Women's Safety Network",
      description: "Community support and resources for women's digital safety",
      url: "#",
      icon: Users,
      type: "Community"
    },
    {
      title: "Digital Rights Foundation",
      description: "Advocacy and resources for digital rights and online safety",
      url: "https://digitalrightsfoundation.pk",
      icon: BookOpen,
      type: "Education"
    }
  ];

  const kenyanResources = [
    {
      title: "FIDA Kenya",
      description: "Federation of Women Lawyers providing free legal aid and advocacy for women's rights",
      url: "https://fidakenya.org",
      icon: Scale,
      type: "Legal Aid",
      contact: "+254 20 271 0608"
    },
    {
      title: "Kenya Women's Helpline",
      description: "National Gender-Based Violence Hotline operated by the government",
      url: "#",
      icon: Phone,
      type: "Government",
      contact: "1195 (Toll-Free)"
    },
    {
      title: "Coalition on Violence Against Women (COVAW)",
      description: "NGO providing psychosocial support, legal aid, and safe shelter for GBV survivors",
      url: "https://covaw.or.ke",
      icon: Users,
      type: "NGO Support",
      contact: "+254 20 260 4890"
    },
    {
      title: "Childline Kenya",
      description: "Free 24/7 helpline for children and young people facing abuse or harassment",
      url: "https://childlinekenya.co.ke",
      icon: Phone,
      type: "Youth Support",
      contact: "116 (Toll-Free)"
    },
    {
      title: "CREAW Kenya",
      description: "Centre for Rights Education and Awareness promoting women's rights and access to justice",
      url: "https://creawkenya.org",
      icon: BookOpen,
      type: "Education & Rights",
      contact: "+254 20 387 3451"
    },
    {
      title: "National Commission on Gender & Development",
      description: "Government body coordinating gender mainstreaming and women's empowerment programs",
      url: "https://www.ngeckenya.org",
      icon: Scale,
      type: "Government",
      contact: "+254 20 272 5231"
    },
    {
      title: "Wangu Kanja Foundation",
      description: "Supporting survivors of sexual violence with counseling, legal aid, and advocacy",
      url: "https://wangukanjafoundation.org",
      icon: Users,
      type: "NGO Support",
      contact: "+254 722 178 177"
    },
    {
      title: "Kenya Red Cross - GBV Program",
      description: "Emergency response and psychosocial support for gender-based violence survivors",
      url: "https://www.redcross.or.ke",
      icon: AlertCircle,
      type: "Emergency",
      contact: "1199 (Toll-Free)"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Safe-Space Sisters</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => navigate("/scanner")}>
              Scanner
            </Button>
            <Button onClick={() => navigate("/auth")}>
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Resources & Support
            </h1>
            <p className="text-xl text-muted-foreground">
              Guides, tools, and external resources to help you stay safe online
            </p>
          </div>

          {/* Downloadable Guides Section */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Download className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold">Downloadable Guides</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {downloadableGuides.map((guide, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{guide.type}</Badge>
                      <Badge>{guide.category}</Badge>
                    </div>
                    <CardTitle className="text-xl">{guide.title}</CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Guide
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* External Resources Section */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <ExternalLink className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold">External Resources</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {externalResources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline">{resource.type}</Badge>
                          </div>
                          <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                          <CardDescription>{resource.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => window.open(resource.url, "_blank")}
                      >
                        Visit Resource
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Kenyan Support Resources Section */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold">Kenyan Support Resources</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Organizations and government bodies in Kenya dedicated to supporting women and girls facing harassment and violence.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {kenyanResources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary">{resource.type}</Badge>
                          </div>
                          <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                          <CardDescription>{resource.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-lg font-semibold">
                        <Phone className="h-5 w-5 text-primary" />
                        {resource.contact}
                      </div>
                      {resource.url !== "#" && (
                        <Button 
                          className="w-full" 
                          variant="outline"
                          onClick={() => window.open(resource.url, "_blank")}
                        >
                          Visit Website
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Emergency Support Section */}
          <section>
            <Card className="bg-destructive/10 border-destructive/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                  Emergency Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  If you are in immediate danger, please contact local emergency services.
                </p>
                
                {/* International Emergency */}
                <div>
                  <h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">International</h4>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 rounded-lg bg-background border">
                      <h3 className="font-semibold mb-1">Emergency Services (US)</h3>
                      <p className="text-2xl font-bold">911</p>
                    </div>
                    <div className="p-4 rounded-lg bg-background border">
                      <h3 className="font-semibold mb-1">National Domestic Violence Hotline</h3>
                      <p className="text-2xl font-bold">1-800-799-7233</p>
                    </div>
                    <div className="p-4 rounded-lg bg-background border">
                      <h3 className="font-semibold mb-1">Crisis Text Line</h3>
                      <p className="text-2xl font-bold">Text HOME to 741741</p>
                    </div>
                  </div>
                </div>

                {/* Kenya Emergency */}
                <div>
                  <h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">Kenya</h4>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 rounded-lg bg-background border border-primary/20">
                      <h3 className="font-semibold mb-1">Kenya Police</h3>
                      <p className="text-2xl font-bold">999 / 112</p>
                    </div>
                    <div className="p-4 rounded-lg bg-background border border-primary/20">
                      <h3 className="font-semibold mb-1">GBV Hotline</h3>
                      <p className="text-2xl font-bold">1195</p>
                      <p className="text-xs text-muted-foreground">Toll-Free</p>
                    </div>
                    <div className="p-4 rounded-lg bg-background border border-primary/20">
                      <h3 className="font-semibold mb-1">Childline Kenya</h3>
                      <p className="text-2xl font-bold">116</p>
                      <p className="text-xs text-muted-foreground">Toll-Free, 24/7</p>
                    </div>
                    <div className="p-4 rounded-lg bg-background border border-primary/20">
                      <h3 className="font-semibold mb-1">Kenya Red Cross</h3>
                      <p className="text-2xl font-bold">1199</p>
                      <p className="text-xs text-muted-foreground">Emergency Response</p>
                    </div>
                    <div className="p-4 rounded-lg bg-background border border-primary/20">
                      <h3 className="font-semibold mb-1">FIDA Kenya</h3>
                      <p className="text-2xl font-bold">+254 20 271 0608</p>
                      <p className="text-xs text-muted-foreground">Legal Aid</p>
                    </div>
                    <div className="p-4 rounded-lg bg-background border border-primary/20">
                      <h3 className="font-semibold mb-1">Nairobi Women's Hospital</h3>
                      <p className="text-2xl font-bold">+254 20 271 9294</p>
                      <p className="text-xs text-muted-foreground">GBV Recovery Centre</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
