import { useState } from "react";
import { Shield, AlertTriangle, FileText, Users, Scale, Phone, ChevronRight, CheckCircle2, MessageSquare, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ReportHelp = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const reportingSteps = [
    {
      title: "Document Everything",
      icon: FileText,
      description: "Screenshot and save all evidence of harassment",
      details: [
        "Take screenshots of all harassing messages",
        "Save URLs and timestamps",
        "Don't delete any messages - they're evidence",
        "Use our scanner to analyze and export reports",
      ],
    },
    {
      title: "Report to Platform",
      icon: MessageSquare,
      description: "Use the platform's built-in reporting tools",
      details: [
        "Most platforms have harassment reporting features",
        "Block the harasser to prevent further contact",
        "Report the account for violating community guidelines",
        "Request content removal if applicable",
      ],
    },
    {
      title: "Seek Support",
      icon: Users,
      description: "Reach out to trusted people and organizations",
      details: [
        "Talk to trusted friends or family",
        "Contact support organizations (listed below)",
        "Consider professional counseling",
        "Join support communities for survivors",
      ],
    },
    {
      title: "Legal Action",
      icon: Scale,
      description: "Know your legal options",
      details: [
        "Consult with a lawyer about your options",
        "File a police report if threats are made",
        "Document everything for potential legal proceedings",
        "Many jurisdictions have cyberbullying laws",
      ],
    },
  ];

  const supportResources = [
    {
      name: "National Domestic Violence Hotline",
      phone: "1-800-799-7233",
      description: "24/7 support for domestic violence and abuse",
      type: "Crisis",
    },
    {
      name: "RAINN",
      phone: "1-800-656-4673",
      description: "National Sexual Assault Hotline",
      type: "Crisis",
    },
    {
      name: "Crisis Text Line",
      phone: "Text HOME to 741741",
      description: "Free 24/7 crisis counseling via text",
      type: "Crisis",
    },
    {
      name: "Cyber Civil Rights Initiative",
      phone: "844-878-2274",
      description: "Support for online harassment victims",
      type: "Legal",
    },
  ];

  const kenyanSupportResources = [
    {
      name: "Kenya GBV Hotline",
      phone: "1195 (Toll-Free)",
      description: "National Gender-Based Violence Hotline by the Government of Kenya",
      type: "Government",
    },
    {
      name: "FIDA Kenya",
      phone: "+254 20 271 0608",
      description: "Free legal aid and advocacy for women's rights",
      type: "Legal",
    },
    {
      name: "COVAW Kenya",
      phone: "+254 20 260 4890",
      description: "Psychosocial support, legal aid, and safe shelter for GBV survivors",
      type: "NGO",
    },
    {
      name: "Childline Kenya",
      phone: "116 (Toll-Free)",
      description: "24/7 helpline for children and young people facing abuse",
      type: "Youth",
    },
    {
      name: "Kenya Red Cross GBV",
      phone: "1199 (Toll-Free)",
      description: "Emergency response and support for GBV survivors",
      type: "Emergency",
    },
    {
      name: "Wangu Kanja Foundation",
      phone: "+254 722 178 177",
      description: "Support for survivors of sexual violence",
      type: "NGO",
    },
  ];

  const howWeHelp = [
    {
      title: "AI-Powered Detection",
      description: "Our scanner analyzes messages to identify harassment, threats, and toxic content with detailed severity scoring.",
      icon: Shield,
    },
    {
      title: "Evidence Documentation",
      description: "Export detailed reports of analyzed messages as PDF or CSV for legal or platform reporting purposes.",
      icon: FileText,
    },
    {
      title: "Safer Responses",
      description: "Get AI-generated suggestions for responding safely without escalating the situation.",
      icon: MessageSquare,
    },
    {
      title: "Safety Advice",
      description: "Receive personalized advice based on the type and severity of harassment detected.",
      icon: AlertTriangle,
    },
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

      <main className="container py-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Support & Guidance
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              What Happens After You Report?
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              You're not alone. Here's a step-by-step guide on what to do when you experience online harassment.
            </p>
          </div>

          {/* How We Help Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">How Safe-Space Sisters Helps</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {howWeHelp.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="text-center">
                    <CardHeader className="pb-2">
                      <div className="mx-auto p-3 rounded-full bg-primary/10 w-fit mb-2">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Tabs Section */}
          <Tabs defaultValue="steps" className="mb-16">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="steps">Step-by-Step Guide</TabsTrigger>
              <TabsTrigger value="resources">International Resources</TabsTrigger>
              <TabsTrigger value="kenya">Kenyan Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="steps" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {reportingSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = activeStep === index;
                  return (
                    <Card 
                      key={index}
                      className={`cursor-pointer transition-all ${isActive ? 'ring-2 ring-primary' : 'hover:shadow-lg'}`}
                      onClick={() => setActiveStep(index)}
                    >
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isActive ? 'bg-primary text-primary-foreground' : 'bg-primary/10'}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <Badge variant="outline" className="mb-1">Step {index + 1}</Badge>
                            <CardTitle className="text-lg">{step.title}</CardTitle>
                          </div>
                        </div>
                        <CardDescription>{step.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {step.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="resources" className="mt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {supportResources.map((resource, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{resource.name}</CardTitle>
                        <Badge variant={resource.type === "Crisis" ? "destructive" : "secondary"}>
                          {resource.type}
                        </Badge>
                      </div>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-lg font-semibold">
                        <Phone className="h-5 w-5 text-primary" />
                        {resource.phone}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="kenya" className="mt-6">
              <div className="mb-4">
                <Badge className="mb-2" variant="secondary">Kenya</Badge>
                <p className="text-muted-foreground">
                  Local organizations and government bodies supporting women and girls in Kenya.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {kenyanSupportResources.map((resource, index) => (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{resource.name}</CardTitle>
                        <Badge variant={resource.type === "Government" ? "default" : resource.type === "Emergency" ? "destructive" : "secondary"}>
                          {resource.type}
                        </Badge>
                      </div>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-lg font-semibold">
                        <Phone className="h-5 w-5 text-primary" />
                        {resource.phone}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* CTA Section */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="py-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Take Action?</h3>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Use our AI scanner to analyze suspicious messages, document evidence, and get personalized safety advice.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" onClick={() => navigate("/scanner")}>
                    <Shield className="h-5 w-5 mr-2" />
                    Scan a Message
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate("/resources")}>
                    <Download className="h-5 w-5 mr-2" />
                    Download Safety Guides
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReportHelp;
