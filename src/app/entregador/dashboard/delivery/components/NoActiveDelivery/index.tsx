const NoActiveDelivery = () => {
  return (
    <div className="h-full bg-background w-full text-foreground flex items-center justify-center p-4">
      <div className="container h-fit p-4 max-w-lg text-center rounded-lg border border-dashed">
        <h1>Nenhum pedido selecionado para a entrega</h1>
      </div>
    </div>
  );
};

export default NoActiveDelivery;
