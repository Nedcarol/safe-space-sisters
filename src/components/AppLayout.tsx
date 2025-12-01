import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Shield, LayoutDashboard, ScanSearch, History, BookOpen, Settings, LogOut, Menu, X, Chrome, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { useNotifications } from "@/hooks/useNotifications";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userId, setUserId] = useState<string>();
  const [isAdmin, setIsAdmin] = useState(false);
  
  useNotifications(userId);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        
        // Check if user is admin
        const { data } = await supabase.rpc('has_role', {
          _user_id: user.id,
          _role: 'admin'
        });
        setIsAdmin(data || false);
      }
    };
    getUser();
  }, []);

  const navigation = [
    { name: t('nav.dashboard'), href: "/dashboard", icon: LayoutDashboard },
    { name: t('nav.scanner'), href: "/scanner", icon: ScanSearch },
    { name: "Social Media", href: "/social-media", icon: Share2 },
    { name: t('nav.history'), href: "/history", icon: History },
    { name: t('nav.safety'), href: "/safety-tips", icon: BookOpen },
    { name: "Extension", href: "/extension", icon: Chrome },
    { name: t('nav.settings'), href: "/settings", icon: Settings },
    ...(isAdmin ? [{ name: "Admin", href: "/admin", icon: Shield }] : []),
  ];

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error logging out",
        description: error.message,
      });
    }
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/dashboard")}>
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Safe-Space Sisters</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              const isSocialMedia = item.name === "Social Media";
              
              return (
                <Button
                  key={item.name}
                  variant={isActive ? "secondary" : "ghost"}
                  onClick={() => navigate(item.href)}
                  className={cn(
                    "justify-start gap-2 relative",
                    isActive && "bg-secondary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                  {isSocialMedia && (
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full px-1 py-0.5">
                      New
                    </span>
                  )}
                </Button>
              );
            })}
            <ThemeToggle />
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="container py-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                const isSocialMedia = item.name === "Social Media";
                
                return (
                  <Button
                    key={item.name}
                    variant={isActive ? "secondary" : "ghost"}
                    onClick={() => navigate(item.href)}
                    className="w-full justify-start gap-2 relative"
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                    {isSocialMedia && (
                      <span className="bg-green-500 text-white text-xs rounded-full px-2 py-0.5 ml-auto">
                        New
                      </span>
                    )}
                  </Button>
                );
              })}
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AppLayout;