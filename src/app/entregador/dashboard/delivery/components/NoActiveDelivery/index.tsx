const NoActiveDelivery = () => {
  return (
    <div className="min-h-screen bg-background w-full text-foreground flex justify-center">
      <div className="container p-4 max-w-lg flex flex-col gap-6">
        <h1>Nenhum pedido selecionado para a entrega</h1>
      </div>
    </div>
  );
};

export default NoActiveDelivery;
