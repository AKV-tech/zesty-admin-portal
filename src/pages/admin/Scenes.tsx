import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Copy, Eye, Trash2, Layers3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Scene {
  id: string;
  name: string;
  type: 'marker' | 'surface';
  asset: string;
  poster?: string;
  autoplay: boolean;
  loop: boolean;
  created: string;
  shareLink: string;
}

const mockScenes: Scene[] = [
  {
    id: '1',
    name: 'Product Demo AR',
    type: 'marker',
    asset: 'product-demo.mp4',
    poster: 'poster-image.jpg',
    autoplay: true,
    loop: false,
    created: '2024-01-15',
    shareLink: 'https://ar-demo.app/scene/1',
  },
  {
    id: '2',
    name: 'Surface Placement',
    type: 'surface',
    asset: 'ar-model.glb',
    autoplay: false,
    loop: true,
    created: '2024-01-14',
    shareLink: 'https://ar-demo.app/scene/2',
  },
];

const mockAssets = [
  'product-demo.mp4',
  'ar-model.glb',
  'poster-image.jpg',
  'tutorial-video.mp4',
];

const Scenes = () => {
  const [scenes, setScenes] = useState<Scene[]>(mockScenes);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'marker' as 'marker' | 'surface',
    asset: '',
    poster: '',
    autoplay: false,
    loop: false,
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newScene: Scene = {
      id: (scenes.length + 1).toString(),
      name: formData.name,
      type: formData.type,
      asset: formData.asset,
      poster: formData.poster || undefined,
      autoplay: formData.autoplay,
      loop: formData.loop,
      created: new Date().toISOString().split('T')[0],
      shareLink: `https://ar-demo.app/scene/${scenes.length + 1}`,
    };

    setScenes(prev => [newScene, ...prev]);
    setShowCreateForm(false);
    setFormData({
      name: '',
      description: '',
      type: 'marker',
      asset: '',
      poster: '',
      autoplay: false,
      loop: false,
    });

    toast({
      title: 'Scene created',
      description: 'AR scene has been created successfully',
    });
  };

  const copyShareLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: 'Link copied',
      description: 'Share link has been copied to clipboard',
    });
  };

  const deleteScene = (id: string) => {
    setScenes(prev => prev.filter(scene => scene.id !== id));
    toast({
      title: 'Scene deleted',
      description: 'AR scene has been removed successfully',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AR Scenes</h2>
          <p className="text-muted-foreground">Create and manage your AR experiences</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Scene
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New AR Scene</CardTitle>
            <CardDescription>
              Configure your AR experience settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Scene Name</Label>
                  <Input
                    id="name"
                    placeholder="My AR Scene"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tracking Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: 'marker' | 'surface') => 
                      setFormData(prev => ({ ...prev, type: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marker">Marker-based</SelectItem>
                      <SelectItem value="surface">Surface Detection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your AR scene..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="asset">Asset</Label>
                  <Select
                    value={formData.asset}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, asset: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose asset" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockAssets.map((asset) => (
                        <SelectItem key={asset} value={asset}>
                          {asset}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="poster">Poster Image (Optional)</Label>
                  <Select
                    value={formData.poster}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, poster: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose poster" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockAssets.filter(asset => asset.endsWith('.jpg') || asset.endsWith('.png')).map((asset) => (
                        <SelectItem key={asset} value={asset}>
                          {asset}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="autoplay"
                    checked={formData.autoplay}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, autoplay: checked }))}
                  />
                  <Label htmlFor="autoplay">Autoplay</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="loop"
                    checked={formData.loop}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, loop: checked }))}
                  />
                  <Label htmlFor="loop">Loop</Label>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit">Create Scene</Button>
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Scene Library</CardTitle>
          <CardDescription>
            Manage your AR scenes and share links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Scene</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Settings</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scenes.map((scene) => (
                <TableRow key={scene.id}>
                  <TableCell className="flex items-center gap-2">
                    <Layers3 className="w-4 h-4 text-primary" />
                    <span className="font-medium">{scene.name}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {scene.type === 'marker' ? 'Marker' : 'Surface'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {scene.asset}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {scene.autoplay && <Badge variant="secondary" className="text-xs">Auto</Badge>}
                      {scene.loop && <Badge variant="secondary" className="text-xs">Loop</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>{scene.created}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyShareLink(scene.shareLink)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteScene(scene.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Scenes;