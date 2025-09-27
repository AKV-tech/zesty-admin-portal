import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Upload, Video, FileText, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Asset {
  id: string;
  name: string;
  type: 'video' | 'image' | 'model';
  size: string;
  uploadDate: string;
  status: 'processing' | 'ready' | 'error';
}

const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'product-demo.mp4',
    type: 'video',
    size: '24.5 MB',
    uploadDate: '2024-01-15',
    status: 'ready',
  },
  {
    id: '2',
    name: 'ar-model.glb',
    type: 'model',
    size: '8.2 MB',
    uploadDate: '2024-01-14',
    status: 'processing',
  },
  {
    id: '3',
    name: 'poster-image.jpg',
    type: 'image',
    size: '2.1 MB',
    uploadDate: '2024-01-13',
    status: 'ready',
  },
];

const Assets = () => {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFileUpload(files);
  };

  const handleFileUpload = (files: File[]) => {
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Add new assets
          const newAssets = files.map((file, index) => ({
            id: (assets.length + index + 1).toString(),
            name: file.name,
            type: file.type.startsWith('video/') ? 'video' as const : 'image' as const,
            size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
            uploadDate: new Date().toISOString().split('T')[0],
            status: 'processing' as const,
          }));

          setAssets(prev => [...newAssets, ...prev]);
          
          toast({
            title: 'Upload completed',
            description: `${files.length} file(s) uploaded successfully`,
          });

          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };

  const deleteAsset = (id: string) => {
    setAssets(prev => prev.filter(asset => asset.id !== id));
    toast({
      title: 'Asset deleted',
      description: 'Asset has been removed successfully',
    });
  };

  const getStatusBadge = (status: Asset['status']) => {
    const variants = {
      ready: 'default',
      processing: 'secondary',
      error: 'destructive',
    } as const;

    return (
      <Badge variant={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getTypeIcon = (type: Asset['type']) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'image':
        return <FileText className="w-4 h-4" />;
      case 'model':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Assets</CardTitle>
          <CardDescription>
            Drag and drop your video files or click to browse
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-smooth cursor-pointer"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">Drop files here</p>
            <p className="text-muted-foreground mb-4">
              Supports MP4, MOV, WebM videos and JPG, PNG images
            </p>
            <Button variant="outline">
              Browse Files
            </Button>
            <input
              id="file-input"
              type="file"
              multiple
              accept="video/*,image/*,.glb,.gltf"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {isUploading && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Uploading...</span>
                <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Asset Library</CardTitle>
          <CardDescription>
            Manage your uploaded video assets and AR content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="flex items-center gap-2">
                    {getTypeIcon(asset.type)}
                    <span className="font-medium">{asset.name}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{asset.type}</Badge>
                  </TableCell>
                  <TableCell>{asset.size}</TableCell>
                  <TableCell>{asset.uploadDate}</TableCell>
                  <TableCell>{getStatusBadge(asset.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteAsset(asset.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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

export default Assets;