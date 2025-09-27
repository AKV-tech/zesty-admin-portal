import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { QrCode, Download, Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Scene {
  id: string;
  name: string;
  shareLink: string;
}

const mockScenes: Scene[] = [
  {
    id: '1',
    name: 'Product Demo AR',
    shareLink: 'https://ar-demo.app/scene/1',
  },
  {
    id: '2',
    name: 'Surface Placement',
    shareLink: 'https://ar-demo.app/scene/2',
  },
  {
    id: '3',
    name: 'Interactive Model',
    shareLink: 'https://ar-demo.app/scene/3',
  },
];

const QR = () => {
  const [selectedScene, setSelectedScene] = useState<string>('');
  const [qrSize, setQrSize] = useState<string>('256');
  const { toast } = useToast();

  const currentScene = mockScenes.find(scene => scene.id === selectedScene);

  const copyShareLink = () => {
    if (currentScene) {
      navigator.clipboard.writeText(currentScene.shareLink);
      toast({
        title: 'Link copied',
        description: 'Share link has been copied to clipboard',
      });
    }
  };

  const downloadQR = (format: 'png' | 'svg') => {
    if (!currentScene) return;
    
    // Create a mock download
    const link = document.createElement('a');
    link.href = '#'; // In a real app, this would be the actual QR code data URL
    link.download = `qr-${currentScene.name.toLowerCase().replace(/\s+/g, '-')}.${format}`;
    
    toast({
      title: 'Download started',
      description: `QR code ${format.toUpperCase()} download initiated`,
    });
  };

  const generateQRDataURL = (url: string, size: number) => {
    // Mock QR code generation - in reality, you'd use a QR library like qrcode
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;
    
    if (ctx) {
      // Create a simple pattern for demo
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, size, size);
      
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < size; i += 8) {
        for (let j = 0; j < size; j += 8) {
          if ((i + j) % 16 === 0) {
            ctx.fillRect(i, j, 6, 6);
          }
        }
      }
    }
    
    return canvas.toDataURL();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">QR Code Generator</h2>
        <p className="text-muted-foreground">Generate QR codes for your AR scenes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>
              Select a scene and customize your QR code
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Scene</label>
              <Select value={selectedScene} onValueChange={setSelectedScene}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a scene" />
                </SelectTrigger>
                <SelectContent>
                  {mockScenes.map((scene) => (
                    <SelectItem key={scene.id} value={scene.id}>
                      {scene.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">QR Code Size</label>
              <Select value={qrSize} onValueChange={setQrSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="128">128x128</SelectItem>
                  <SelectItem value="256">256x256</SelectItem>
                  <SelectItem value="512">512x512</SelectItem>
                  <SelectItem value="1024">1024x1024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {currentScene && (
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Share Link</span>
                  <Badge variant="outline">Live</Badge>
                </div>
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm font-mono break-all">
                    {currentScene.shareLink}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyShareLink}
                  className="w-full"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Share Link
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>
              Your QR code updates in real-time
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentScene ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 bg-white rounded-lg shadow-sm border">
                    <img
                      src={generateQRDataURL(currentScene.shareLink, parseInt(qrSize))}
                      alt="QR Code"
                      className="w-48 h-48 object-contain"
                    />
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="font-medium mb-1">{currentScene.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {qrSize}x{qrSize} pixels
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => downloadQR('png')}
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    PNG
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => downloadQR('svg')}
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    SVG
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: 'QR code refreshed',
                      description: 'Generated new QR code for the scene',
                    });
                  }}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <QrCode className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">No Scene Selected</h3>
                <p className="text-sm text-muted-foreground">
                  Choose a scene to generate its QR code
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {currentScene && (
        <Card>
          <CardHeader>
            <CardTitle>Usage Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-semibold">1</span>
                </div>
                <h4 className="font-medium mb-2">Print or Display</h4>
                <p className="text-sm text-muted-foreground">
                  Download and print the QR code or display it on screen
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-semibold">2</span>
                </div>
                <h4 className="font-medium mb-2">Scan with Camera</h4>
                <p className="text-sm text-muted-foreground">
                  Users scan the code with their phone camera
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-semibold">3</span>
                </div>
                <h4 className="font-medium mb-2">Launch AR Experience</h4>
                <p className="text-sm text-muted-foreground">
                  The AR scene opens directly in their web browser
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QR;