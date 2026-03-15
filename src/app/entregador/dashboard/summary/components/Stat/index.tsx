const Stat = ({ label, value }: { label: string; value: React.ReactNode }) => {
  return (
    <div className="rounded-xl border p-4">
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
};

export default Stat;
