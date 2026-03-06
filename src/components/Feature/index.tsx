type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const Feature = ({ icon, title, description }: FeatureProps) => {
  return (
    <div className="flex gap-4 items-start">
      <div className="bg-primary/10 p-2 rounded-md text-primary">{icon}</div>

      <div>
        <h4 className="font-medium text-primary">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Feature;
