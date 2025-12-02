import { Shield, Download, ExternalLink, BookOpen, Users, Scale, AlertCircle } from "lucide-react";
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

          {/* Emergency Support Section */}
          <section>
            <Card className="bg-destructive/10 border-destructive/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                  Emergency Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  If you are in immediate danger, please contact local emergency services.
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 rounded-lg bg-background border">
                    <h3 className="font-semibold mb-1">Emergency Services</h3>
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
