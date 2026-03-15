import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Stat from "../Stat";

type SummaryCardProps = {
  title: string;
  stats: {
    label: string;
    value: React.ReactNode;
  }[];
};

const SummaryCard = ({ title, stats }: SummaryCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Stat key={index} label={stat.label} value={stat.value} />
        ))}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
