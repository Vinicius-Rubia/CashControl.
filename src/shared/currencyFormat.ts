export const currencyFormat = (num: number | undefined) => {
  if (num !== undefined) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(num);
  }
};
