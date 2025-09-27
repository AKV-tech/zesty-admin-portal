import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Bell, Shield, CreditCard, Key } from 'lucide-react';

const Account = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    company: '',
    website: '',
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true,
    analytics: true,
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: 'Profile updated',
      description: 'Your profile has been saved successfully',
    });
  };

  const handleNotificationChange = (key: keyof typeof notifications, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast({
      title: 'Settings updated',
      description: `${key} notifications ${value ? 'enabled' : 'disabled'}`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Account Settings</h2>
        <p className="text-muted-foreground">Manage your profile and preferences</p>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Information
          </CardTitle>
          <CardDescription>
            Update your personal information and profile details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {user?.name?.charAt(0).toUpperCase() || 'A'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">{user?.name || 'Admin User'}</h3>
              <p className="text-muted-foreground">{user?.email}</p>
              <Badge variant="outline" className="mt-2">Administrator</Badge>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                disabled={!isEditing}
                placeholder="Your company name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                disabled={!isEditing}
                placeholder="https://your-website.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              disabled={!isEditing}
              placeholder="Tell us about yourself..."
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSaveProfile}>Save Changes</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose what notifications you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">
                Receive important updates via email
              </p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => handleNotificationChange('email', checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-muted-foreground">
                Get notified about AR scene activity
              </p>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) => handleNotificationChange('push', checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Marketing Communications</p>
              <p className="text-sm text-muted-foreground">
                Receive tips and product updates
              </p>
            </div>
            <Switch
              checked={notifications.marketing}
              onCheckedChange={(checked) => handleNotificationChange('marketing', checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Analytics Reports</p>
              <p className="text-sm text-muted-foreground">
                Weekly performance summaries
              </p>
            </div>
            <Switch
              checked={notifications.analytics}
              onCheckedChange={(checked) => handleNotificationChange('analytics', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security & Privacy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Password</p>
                <p className="text-sm text-muted-foreground">
                  Last changed 30 days ago
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Key className="w-4 h-4 mr-2" />
                Change
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security
                </p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Billing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Current Plan</p>
                <p className="text-sm text-muted-foreground">
                  Professional Plan
                </p>
              </div>
              <Badge>Active</Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Usage</p>
                <p className="text-sm text-muted-foreground">
                  1,234 / 10,000 views
                </p>
              </div>
              <span className="text-sm font-medium">12.3%</span>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Manage Billing
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Danger Zone */}
      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible actions that will affect your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all data
              </p>
            </div>
            <Button variant="destructive" size="sm">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Account;