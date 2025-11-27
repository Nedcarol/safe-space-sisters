import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AppLayout from "@/components/AppLayout";

const SafetyTips = () => {
  const [tips, setTips] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadTips();
  }, []);

  const loadTips = async () => {
    const { data } = await supabase.from('safety_tips').select('*').eq('language', 'en');
    if (data) setTips(data);
  };

  const filtered = tips.filter(tip => 
    tip.title.toLowerCase().includes(search.toLowerCase()) ||
    tip.content.toLowerCase().includes(search.toLowerCase()) ||
    tip.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8">Safety Tips Library</h1>
        
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tips..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="space-y-4">
          {filtered.map((tip) => (
            <Card key={tip.id} className="p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-xl font-semibold">{tip.title}</h3>
                <Badge variant="secondary">{tip.category}</Badge>
              </div>
              <p className="text-muted-foreground">{tip.content}</p>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default SafetyTips;