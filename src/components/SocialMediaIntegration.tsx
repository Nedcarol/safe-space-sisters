import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Share2, Shield, AlertTriangle, CheckCircle, MessageCircle, Music2, Instagram, Facebook, Twitter } from 'lucide-react';
import { toast } from 'sonner';
import AppLayout from '@/components/AppLayout';

export const SocialMediaIntegration: React.FC = () => {
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([]);

  const handleConnectAccount = (platform: string) => {
    if (!connectedAccounts.includes(platform)) {
      setConnectedAccounts([...connectedAccounts, platform]);
      toast.success(`${platform} connected successfully!`);
    } else {
      toast.info(`${platform} is already connected`);
    }
  };

  const handleDisconnectAccount = (platform: string) => {
    setConnectedAccounts(connectedAccounts.filter(acc => acc !== platform));
    toast.success(`${platform} disconnected`);
  };

  return (
    <AppLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Social Media Safety</h1>
          <p className="text-muted-foreground">Manage and secure your social media accounts</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Connected Accounts</p>
                <p className="text-3xl font-bold">{connectedAccounts.length}</p>
              </div>
              <Share2 className="h-8 w-8 text-primary" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Safety Score</p>
                <p className="text-3xl font-bold">--</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Risk Level</p>
                <p className="text-3xl font-bold">--</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </Card>
        </div>

        {/* Social Media Platforms */}
        <Card className="p-6 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Connect Your Accounts
            </CardTitle>
            <CardDescription>
              Secure your social media presence with our safety tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                onClick={() => handleConnectAccount('twitter')}
                disabled={connectedAccounts.includes('twitter')}
                className="flex items-center gap-2 bg-black hover:bg-gray-800 h-12"
              >
                <Twitter size={20} />
                {connectedAccounts.includes('twitter') ? 'Connected' : 'Connect Twitter'}
              </Button>
              
              <Button 
                onClick={() => handleConnectAccount('tiktok')}
                disabled={true}
                className="flex items-center gap-2 bg-gray-900 hover:bg-black h-12 opacity-75"
              >
                <Music2 size={20} />
                TikTok <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded-full ml-2">Coming Soon</span>
              </Button>
              
              <Button 
                onClick={() => handleConnectAccount('instagram')}
                disabled={true}
                className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 h-12 opacity-75"
              >
                <Instagram size={20} />
                Instagram <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded-full ml-2">Coming Soon</span>
              </Button>
              
              <Button 
                onClick={() => handleConnectAccount('whatsapp')}
                disabled={true}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 h-12 opacity-75"
              >
                <MessageCircle size={20} />
                WhatsApp <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded-full ml-2">Coming Soon</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Connected Accounts */}
        {connectedAccounts.length > 0 && (
          <Card className="p-6 mb-8">
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>Your secured social media platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {connectedAccounts.map(account => (
                  <div key={account} className="border rounded-lg p-4 flex items-center justify-between bg-green-50">
                    <div className="flex items-center gap-3">
                      {account === 'twitter' && <Twitter className="text-black" size={24} />}
                      {account === 'tiktok' && <Music2 className="text-gray-900" size={24} />}
                      {account === 'instagram' && <Instagram className="text-pink-600" size={24} />}
                      {account === 'whatsapp' && <MessageCircle className="text-green-600" size={24} />}
                      <div>
                        <p className="font-semibold capitalize">{account}</p>
                        <p className="text-sm text-gray-600">Secured connection</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Connected
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDisconnectAccount(account)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Disconnect
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Safety Tips */}
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Social Media Safety Tips</CardTitle>
            <CardDescription>Best practices for staying safe online</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium">Think Before You Post</p>
                <p className="text-sm text-gray-600">Consider how your content might be perceived by others</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium">Protect Personal Information</p>
                <p className="text-sm text-gray-600">Avoid sharing addresses, phone numbers, or sensitive details</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium">Use Strong Privacy Settings</p>
                <p className="text-sm text-gray-600">Regularly review and update your account privacy options</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium">Be Wary of Links</p>
                <p className="text-sm text-gray-600">Don't click on suspicious links from unknown sources</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};