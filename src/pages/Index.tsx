import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Layers3, QrCode, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">
            AR Content Management Platform
          </Badge>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            AR Admin Dashboard
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create, manage, and deploy augmented reality experiences with our powerful admin platform. 
            Upload assets, build scenes, generate QR codes, and track analytics.
          </p>
          <Link to="/admin/login">
            <Button size="lg" className="text-lg px-8">
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="hover:shadow-elegant transition-smooth border-border/50">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                <Play className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">Asset Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Upload and organize your video assets with drag & drop functionality and progress tracking.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-elegant transition-smooth border-border/50">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                <Layers3 className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">AR Scene Builder</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Create immersive AR experiences with marker-based or surface detection tracking.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-elegant transition-smooth border-border/50">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">QR Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Generate QR codes for instant AR scene access. Download in multiple formats.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-elegant transition-smooth border-border/50">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Track opens, starts, dwell time, and user engagement with detailed analytics.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Build AR Experiences?</CardTitle>
              <CardDescription className="text-lg">
                Join the platform and start creating immersive augmented reality content today.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Link to="/admin/login">
                <Button size="lg" className="w-full sm:w-auto">
                  Access Admin Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
