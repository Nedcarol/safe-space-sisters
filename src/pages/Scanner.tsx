import { useState } from "react";
import { Shield, Sparkles, AlertTriangle, CheckCircle2, Loader2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/components/AppLayout";

interface AnalysisResult {
  toxicityScore: number;
  categories: string[];
  highlightedWords: string[];
  severity: string;
  explanation: string;
  modelUsed?: string;
}

const Scanner = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [text, setText] = useState("");
  const [model, setModel] = useState("gemini");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [saferVersion, setSaferVersion] = useState<string>("");
  const [advice, setAdvice] = useState<string>("");
  const [isGeneratingSafer, setIsGeneratingSafer] = useState(false);
  const [isGeneratingAdvice, setIsGeneratingAdvice] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter some text to analyze",
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysis(null);
    setSaferVersion("");
    setAdvice("");

    try {
      const { data, error } = await supabase.functions.invoke('analyze-toxicity', {
        body: { text, model }
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      setAnalysis(data);
      
      if (data.toxicityScore > 30) {
        toast({
          title: "Analysis Complete",
          description: `Toxicity detected (${data.severity} severity)`,
        });
      } else {
        toast({
          title: "Analysis Complete",
          description: "Message appears safe",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: error.message || "Please try again",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerateSaferVersion = async () => {
    setIsGeneratingSafer(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-safer-version', {
        body: { text, model }
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setSaferVersion(data.saferVersion);
      toast({
        title: "Safer version generated",
        description: "Review the alternative message below",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to generate safer version",
        description: error.message,
      });
    } finally {
      setIsGeneratingSafer(false);
    }
  };

  const handleGenerateAdvice = async () => {
    if (!analysis) return;
    
    setIsGeneratingAdvice(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-advice', {
        body: { 
          text, 
          categories: analysis.categories,
          severity: analysis.severity,
          model 
        }
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setAdvice(data.advice);
      toast({
        title: "Safety advice generated",
        description: "Review recommendations below",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to generate advice",
        description: error.message,
      });
    } finally {
      setIsGeneratingAdvice(false);
    }
  };

  const handleSaveToHistory = async () => {
    if (!analysis) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          variant: "destructive",
          title: "Please log in",
          description: "You need to be logged in to save history",
        });
        navigate("/login");
        return;
      }

      const { error } = await supabase.from('message_analysis').insert({
        user_id: session.user.id,
        original_text: text,
        toxicity_score: analysis.toxicityScore,
        categories: analysis.categories,
        highlighted_words: analysis.highlightedWords,
        safer_version: saferVersion || null,
        advice: advice || null,
        model_used: model
      });

      if (error) throw error;

      toast({
        title: "Saved to history",
        description: "You can view this analysis in your history page",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to save",
        description: error.message,
      });
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-muted';
    }
  };

  return (
    <AppLayout>
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Toxicity Scanner</h1>
          <p className="text-muted-foreground">
            Analyze messages for harmful content using AI-powered detection
          </p>
        </div>

        <Card className="p-6 mb-6 shadow-soft">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Enter message to analyze</label>
              <Textarea
                placeholder="Paste the message you want to analyze here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[150px] text-base"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">AI Model</label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gemini">Google Gemini (Recommended)</SelectItem>
                    <SelectItem value="gpt">OpenAI GPT-5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                size="lg" 
                onClick={handleAnalyze} 
                disabled={isAnalyzing || !text.trim()}
                className="mt-6"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Analyze Message
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>

        {analysis && (
          <div className="space-y-6">
            {/* Results Card */}
            <Card className="p-6 shadow-medium">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Analysis Results</h2>
                  <Badge className={getSeverityColor(analysis.severity)}>
                    {analysis.severity.toUpperCase()} SEVERITY
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">{analysis.toxicityScore}</div>
                  <div className="text-sm text-muted-foreground">Toxicity Score</div>
                </div>
              </div>

              {analysis.explanation && (
                <div className="mb-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm">{analysis.explanation}</p>
                </div>
              )}

              {analysis.categories.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-2">Detected Categories:</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.categories.map((category) => (
                      <Badge key={category} variant="outline">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        {category.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {analysis.highlightedWords.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-2">Problematic Words/Phrases:</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.highlightedWords.map((word, idx) => (
                      <Badge key={idx} variant="destructive">
                        {word}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 mt-6">
                <Button
                  onClick={handleGenerateSaferVersion}
                  disabled={isGeneratingSafer}
                  variant="secondary"
                >
                  {isGeneratingSafer ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Rewrite Safely
                </Button>
                
                <Button
                  onClick={handleGenerateAdvice}
                  disabled={isGeneratingAdvice}
                  variant="secondary"
                >
                  {isGeneratingAdvice ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <BookOpen className="mr-2 h-4 w-4" />
                  )}
                  Get Safety Advice
                </Button>
                
                <Button
                  onClick={handleSaveToHistory}
                  variant="outline"
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Save to History
                </Button>
              </div>
            </Card>

            {saferVersion && (
              <Card className="p-6 shadow-soft border-green-500/20">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Safer Alternative
                </h3>
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <p className="text-foreground">{saferVersion}</p>
                </div>
              </Card>
            )}

            {advice && (
              <Card className="p-6 shadow-soft border-blue-500/20">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Safety Advice
                </h3>
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg prose prose-sm dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap">{advice}</p>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Scanner;