import { Shield, Sparkles, Clock, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{
      background: 'radial-gradient(circle at center, #2E2541 0%, #191921 40%, #0E0E11 100%)'
    }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50" style={{
        background: 'rgba(14, 14, 17, 0.95)',
        backdropFilter: 'blur(10px)'
      }}>
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Safe-Space Sisters</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" onClick={() => navigate("/auth")}>
              Login
            </Button>
            <Button onClick={() => navigate("/auth")} className="bg-primary hover:bg-primary/90">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="container max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">AI-Powered Digital Safety</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-foreground">Protect Yourself.</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              Reclaim Your Voice.
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            AI-powered safety tool that detects toxic messages, suggests safer responses, and empowers women and girls to reclaim their voice online.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" onClick={() => navigate("/scanner")} className="text-lg h-14 px-10 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/20 transition-all">
              Start Scanning Messages
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/safety-tips")} className="text-lg h-14 px-8 border-primary/30 hover:bg-primary/10">
              Learn Safety Tips
            </Button>
            <Button size="lg" variant="ghost" onClick={() => navigate('/scanner?sample=1')} className="text-lg h-14 px-8 hover:bg-primary/10">
              Quick Demo
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-card/50 border border-border backdrop-blur-sm">
              <Shield className="h-10 w-10 text-primary mx-auto mb-3" />
              <div className="text-4xl font-bold text-foreground mb-1">10K+</div>
              <div className="text-sm text-muted-foreground">Scans Protected</div>
            </div>
            <div className="p-6 rounded-2xl bg-card/50 border border-border backdrop-blur-sm">
              <Users className="h-10 w-10 text-primary mx-auto mb-3" />
              <div className="text-4xl font-bold text-foreground mb-1">5K+</div>
              <div className="text-sm text-muted-foreground">Women Helped</div>
            </div>
            <div className="p-6 rounded-2xl bg-card/50 border border-border backdrop-blur-sm">
              <Sparkles className="h-10 w-10 text-primary mx-auto mb-3" />
              <div className="text-4xl font-bold text-foreground mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 border-t border-border/50">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">About Safe-Space Sisters</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're on a mission to make the digital world safer for women and girls everywhere. 
              Using cutting-edge AI technology, we help identify and respond to online harassment, 
              providing tools and resources to reclaim your voice and protect your well-being.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-card/80 border-border backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Our Mission</h3>
              <p className="text-muted-foreground">
                To empower women and girls with AI-powered tools that detect, analyze, and help respond to 
                digital harassment, creating safer online spaces for all.
              </p>
            </Card>
            <Card className="p-6 bg-card/80 border-border backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Our Vision</h3>
              <p className="text-muted-foreground">
                A world where every woman and girl can express themselves freely online without fear of 
                harassment, abuse, or intimidation.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How Safe-Space Sisters Protects You</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 shadow-soft hover:shadow-medium transition-smooth">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Toxicity Detection</h3>
              <p className="text-muted-foreground">
                Advanced AI analyzes messages for harassment, hate speech, bullying, and threats with detailed scoring.
              </p>
            </Card>

            <Card className="p-6 shadow-soft hover:shadow-medium transition-smooth">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safer Rewrites</h3>
              <p className="text-muted-foreground">
                Get AI-generated safer alternatives to problematic messages, helping you respond with confidence.
              </p>
            </Card>

            <Card className="p-6 shadow-soft hover:shadow-medium transition-smooth">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">History Tracking</h3>
              <p className="text-muted-foreground">
                Save and review your scans, track patterns, and export reports for documentation purposes.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 16 Days of Activism Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 gradient-card shadow-medium">
            <div className="flex items-start gap-4 mb-6">
              <Users className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h2 className="text-3xl font-bold mb-4">16 Days of Activism Against Gender-Based Violence</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Digital harassment is a form of gender-based violence. This tool stands in solidarity with the global movement to end violence against women and girls, online and offline.
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">Document evidence of digital harassment and abuse</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">Access resources and support networks across Africa</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">Empower yourself with knowledge and tools to stay safe</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* API Integration Section */}
      <section className="py-20 px-4 border-t border-border/50">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Seamless Integration</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with your favorite platforms and get real-time protection across all your digital spaces
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center bg-card/80 border-border backdrop-blur-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Email Protection</h3>
              <p className="text-sm text-muted-foreground">Get instant notifications about toxic content in your inbox</p>
            </Card>
            <Card className="p-6 text-center bg-card/80 border-border backdrop-blur-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">SMS Alerts</h3>
              <p className="text-sm text-muted-foreground">Receive critical safety alerts directly via SMS</p>
            </Card>
            <Card className="p-6 text-center bg-card/80 border-border backdrop-blur-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Social Platforms</h3>
              <p className="text-sm text-muted-foreground">Monitor and protect across social media channels</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/10 border-t border-primary/20">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">Start Protecting Yourself Today</h2>
          <p className="text-xl mb-8 text-muted-foreground">
            Join thousands of women and girls taking control of their digital safety.
          </p>
          <Button size="lg" onClick={() => navigate("/auth")} className="text-lg h-14 px-10 bg-primary hover:bg-primary/90 shadow-lg">
            Create Free Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;