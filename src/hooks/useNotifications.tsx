import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useNotifications = (userId: string | undefined) => {
  const { toast } = useToast();

  useEffect(() => {
    if (!userId) return;

    // Listen for new message analysis with high toxicity
    const analysisChannel = supabase
      .channel('high-toxicity-alerts')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'message_analysis',
          filter: `user_id=eq.${userId}`,
        },
        (payload: any) => {
          const score = payload.new.toxicity_score;
          if (score >= 70) {
            toast({
              title: "⚠️ High Toxicity Detected",
              description: `Toxicity score: ${score}%. Please review the analysis for safety recommendations.`,
              variant: "destructive",
            });
          }
        }
      )
      .subscribe();

    // Listen for new safety tips
    const safetyTipsChannel = supabase
      .channel('new-safety-tips')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'safety_tips',
        },
        (payload: any) => {
          toast({
            title: "💡 New Safety Tip Available",
            description: payload.new.title,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(analysisChannel);
      supabase.removeChannel(safetyTipsChannel);
    };
  }, [userId, toast]);

  // Weekly report notification (could be triggered by a scheduled function)
  const sendWeeklyReport = () => {
    toast({
      title: "📊 Weekly Safety Report",
      description: "Your weekly safety report is ready. Check your dashboard for insights.",
    });
  };

  // Account security notification
  const sendSecurityAlert = (message: string) => {
    toast({
      title: "🔒 Account Security Alert",
      description: message,
      variant: "destructive",
    });
  };

  return { sendWeeklyReport, sendSecurityAlert };
};
