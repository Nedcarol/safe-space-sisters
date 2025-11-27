import { useEffect, useState } from "react";
import { Trash2, FileDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/components/AppLayout";

const History = () => {
  const { toast } = useToast();
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data } = await supabase
      .from('message_analysis')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (data) setHistory(data);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('message_analysis').delete().eq('id', id);
    if (error) {
      toast({ variant: "destructive", title: "Failed to delete" });
    } else {
      toast({ title: "Deleted successfully" });
      loadHistory();
    }
  };

  return (
    <AppLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8">Scan History</h1>
        <div className="space-y-4">
          {history.map((item) => (
            <Card key={item.id} className="p-6">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-2">{new Date(item.created_at).toLocaleString()}</p>
                  <p className="mb-4">{item.original_text}</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full">Score: {item.toxicity_score}</span>
                    {item.categories.map((cat: string) => (
                      <span key={cat} className="text-sm px-3 py-1 bg-secondary rounded-full">{cat}</span>
                    ))}
                  </div>
                </div>
                <Button variant="destructive" size="icon" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default History;