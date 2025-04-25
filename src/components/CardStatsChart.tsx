
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CardStats = {
  name: string;
  count: number;
};

export function CardStatsChart({ data }: { data: CardStats[] }) {
  const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#8B5CF6'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Card Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8B5CF6">
                {data.map((entry, index) => (
                  <Bar
                    key={`cell-${index}`}
                    dataKey="count"
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
