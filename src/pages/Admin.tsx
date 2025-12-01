import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AppLayout from "@/components/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Shield, Users, FileText, BarChart3, Plus, Trash2, Edit } from "lucide-react";

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [safetyTips, setSafetyTips] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalScans: 0, avgToxicity: 0, highRiskScans: 0 });
  
  // Safety tip form state
  const [newTip, setNewTip] = useState({ title: "", content: "", category: "general", language: "en" });

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase.rpc('has_role', {
        _user_id: user.id,
        _role: 'admin'
      });

      if (error || !data) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive",
        });
        navigate('/dashboard');
        return;
      }

      setIsAdmin(true);
      loadData();
    } catch (error) {
      console.error('Error checking admin access:', error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    // Load users
    const { data: usersData } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    setUsers(usersData || []);

    // Load analyses for moderation
    const { data: analysesData } = await supabase
      .from('message_analysis')
      .select('*')
      .gte('toxicity_score', 50)
      .order('created_at', { ascending: false })
      .limit(50);
    setAnalyses(analysesData || []);

    // Load safety tips
    const { data: tipsData } = await supabase
      .from('safety_tips')
      .select('*')
      .order('created_at', { ascending: false });
    setSafetyTips(tipsData || []);

    // Calculate statistics
    const { data: allAnalyses } = await supabase
      .from('message_analysis')
      .select('toxicity_score');
    
    if (allAnalyses) {
      const totalScans = allAnalyses.length;
      const avgToxicity = Math.round(
        allAnalyses.reduce((sum, a) => sum + a.toxicity_score, 0) / totalScans
      );
      const highRiskScans = allAnalyses.filter(a => a.toxicity_score >= 70).length;
      
      setStats({
        totalUsers: usersData?.length || 0,
        totalScans,
        avgToxicity,
        highRiskScans,
      });
    }
  };

  const addSafetyTip = async () => {
    if (!newTip.title || !newTip.content) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('safety_tips')
      .insert([newTip]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add safety tip",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Safety tip added successfully",
    });

    setNewTip({ title: "", content: "", category: "general", language: "en" });
    loadData();
  };

  const deleteSafetyTip = async (id: string) => {
    const { error } = await supabase
      .from('safety_tips')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete safety tip",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Safety tip deleted successfully",
    });
    loadData();
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-screen">
          <p>Loading...</p>
        </div>
      </AppLayout>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <AppLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">System oversight and management</p>
          </div>
        </div>

        <Tabs defaultValue="analytics" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="moderation">
              <Shield className="h-4 w-4 mr-2" />
              Moderation
            </TabsTrigger>
            <TabsTrigger value="safety-tips">
              <FileText className="h-4 w-4 mr-2" />
              Safety Tips
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalScans}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Toxicity</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.avgToxicity}%</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">High Risk Scans</CardTitle>
                  <Shield className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">{stats.highRiskScans}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name || 'N/A'}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="moderation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Moderation</CardTitle>
                <CardDescription>Review flagged content (toxicity score ≥ 50%)</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Text</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analyses.map((analysis) => (
                      <TableRow key={analysis.id}>
                        <TableCell className="max-w-md truncate">{analysis.original_text}</TableCell>
                        <TableCell>
                          <Badge variant={analysis.toxicity_score >= 70 ? "destructive" : "secondary"}>
                            {analysis.toxicity_score}%
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(analysis.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="safety-tips" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add New Safety Tip</CardTitle>
                <CardDescription>Create safety tips for users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newTip.title}
                    onChange={(e) => setNewTip({ ...newTip, title: e.target.value })}
                    placeholder="Enter tip title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={newTip.content}
                    onChange={(e) => setNewTip({ ...newTip, content: e.target.value })}
                    placeholder="Enter tip content"
                    rows={4}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newTip.category}
                      onValueChange={(value) => setNewTip({ ...newTip, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="online-safety">Online Safety</SelectItem>
                        <SelectItem value="privacy">Privacy</SelectItem>
                        <SelectItem value="harassment">Harassment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={newTip.language}
                      onValueChange={(value) => setNewTip({ ...newTip, language: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={addSafetyTip} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Safety Tip
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing Safety Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Language</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {safetyTips.map((tip) => (
                      <TableRow key={tip.id}>
                        <TableCell>{tip.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{tip.category}</Badge>
                        </TableCell>
                        <TableCell>{tip.language}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteSafetyTip(tip.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
