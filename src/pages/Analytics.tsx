
import { BarChart, PieChart, LineChart, Bar, Pie, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock data for analytics
const cardsPerList = [
  { name: 'To Do', cards: 7 },
  { name: 'In Progress', cards: 5 },
  { name: 'Review', cards: 3 },
  { name: 'Done', cards: 12 },
];

const taskStatusData = [
  { name: 'Completed', value: 25 },
  { name: 'Pending', value: 15 },
];

const cardsCreatedData = [
  { date: '2025-01-01', cards: 5 },
  { date: '2025-02-01', cards: 8 },
  { date: '2025-03-01', cards: 10 },
  { date: '2025-04-01', cards: 7 },
  { date: '2025-05-01', cards: 12 },
];

const COLORS = ['#10B981', '#F59E0B', '#3B82F6', '#8B5CF6', '#EC4899'];

const Analytics = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Cards per List */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Cards per List</CardTitle>
            <CardDescription>Distribution of cards across your board lists</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={cardsPerList}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cards" name="Number of Cards" fill="#8B5CF6">
                  {cardsPerList.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Task Status */}
        <Card>
          <CardHeader>
            <CardTitle>Task Status</CardTitle>
            <CardDescription>Completed vs pending tasks</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {taskStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#10B981' : '#F59E0B'} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cards Created Over Time */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Cards Created Over Time</CardTitle>
            <CardDescription>Trend of card creation over months</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={cardsCreatedData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString('en-US', { month: 'short' });
                  }}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="cards"
                  name="Cards Created"
                  stroke="#3B82F6"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Additional analytics can be added here */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Summary</CardTitle>
            <CardDescription>Weekly board activity overview</CardDescription>
          </CardHeader>
          <CardContent className="h-60">
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">Coming soon - Activity tracking and reporting</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>User Engagement</CardTitle>
            <CardDescription>Team member contributions</CardDescription>
          </CardHeader>
          <CardContent className="h-60">
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">Coming soon - User engagement metrics</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
