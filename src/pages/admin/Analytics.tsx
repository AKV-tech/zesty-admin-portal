import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Play, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Mock data for charts
const weeklyData = [
  { day: 'Mon', opens: 45, starts: 32, dwellTime: 2.4 },
  { day: 'Tue', opens: 52, starts: 38, dwellTime: 2.8 },
  { day: 'Wed', opens: 38, starts: 28, dwellTime: 2.1 },
  { day: 'Thu', opens: 65, starts: 48, dwellTime: 3.2 },
  { day: 'Fri', opens: 78, starts: 56, dwellTime: 3.8 },
  { day: 'Sat', opens: 89, starts: 62, dwellTime: 4.1 },
  { day: 'Sun', opens: 71, starts: 51, dwellTime: 3.5 },
];

const scenePerformance = [
  { scene: 'Product Demo', opens: 234, starts: 189, dwellTime: 3.2 },
  { scene: 'Surface AR', opens: 156, starts: 124, dwellTime: 2.8 },
  { scene: 'Interactive Model', opens: 98, starts: 76, dwellTime: 2.1 },
  { scene: 'Tutorial Scene', opens: 67, starts: 45, dwellTime: 1.9 },
];

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Monitor your AR scene performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Opens</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <div className="flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500">+12.5%</span>
              <span className="text-muted-foreground ml-1">from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AR Starts</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <div className="flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500">+8.2%</span>
              <span className="text-muted-foreground ml-1">from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Dwell Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2m</div>
            <div className="flex items-center text-sm">
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-red-500">-2.1%</span>
              <span className="text-muted-foreground ml-1">from last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
            <CardDescription>
              Opens and starts over the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="opens"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Opens"
                />
                <Line
                  type="monotone"
                  dataKey="starts"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  name="Starts"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dwell Time Trend</CardTitle>
            <CardDescription>
              Average time spent in AR experiences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} min`, 'Dwell Time']} />
                <Bar
                  dataKey="dwellTime"
                  fill="hsl(var(--primary))"
                  name="Dwell Time (min)"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Scene Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Scene Performance</CardTitle>
          <CardDescription>
            Detailed metrics for each AR scene
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scenePerformance.map((scene, index) => (
              <div
                key={scene.scene}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-smooth"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">{scene.scene}</h4>
                    <p className="text-sm text-muted-foreground">
                      {scene.opens} opens • {scene.starts} starts
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {scene.dwellTime}m avg
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {Math.round((scene.starts / scene.opens) * 100)}% start rate
                    </div>
                  </div>
                  <Badge
                    variant={scene.opens > 150 ? 'default' : 'secondary'}
                  >
                    {scene.opens > 150 ? 'High' : 'Medium'} Traffic
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Saturday</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full">
                    <div className="w-full h-full bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">89</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Friday</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full">
                    <div className="w-4/5 h-full bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">78</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Sunday</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full">
                    <div className="w-3/5 h-full bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">71</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Completion Rate</span>
                <span className="text-lg font-semibold">72.3%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Return Visitors</span>
                <span className="text-lg font-semibold">24.8%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Share Rate</span>
                <span className="text-lg font-semibold">8.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;