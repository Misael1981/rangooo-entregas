import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/helpers/format-currency";

type DayCardProps = {
  day: {
    data: string;
    numbersDelivery: number;
    onlineTime: string;
    earnings: number;
    appFee: number;
    isPaid: boolean;
  };
};

const DayCard = ({ day }: DayCardProps) => {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-right text-sm text-muted-foreground font-medium">
          {day.data}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <Item label="📦 Entregas" value={day.numbersDelivery} />
        <Item label="⏱ Tempo Online" value={day.onlineTime} />
        <Item
          label="💰 Ganhos"
          value={formatCurrency(day.earnings)}
          highlight
        />
        <Item label="🏷 Taxa App" value={formatCurrency(day.appFee)} />
      </CardContent>

      <CardFooter className="border-t pt-4">
        <span
          className={`text-sm font-medium ${
            day.isPaid ? "text-green-600" : "text-red-600"
          }`}
        >
          {day.isPaid
            ? "✔ Taxa do aplicativo paga"
            : "⚠ Regularize a taxa para evitar bloqueio"}
        </span>
      </CardFooter>
    </Card>
  );
};

function Item({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-muted-foreground">{label}</span>

      <span
        className={`text-sm font-semibold ${highlight ? "text-primary" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

export default DayCard;
