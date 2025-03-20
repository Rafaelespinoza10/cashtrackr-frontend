type AmountProps = {
  label: string;
  amount: number;
};

export default function Amount({ label, amount }: AmountProps) {
    const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

  return (
    <>
      <p className="text-2xl font-bold text-white">
        {label}: {""}
          <span className="text-2xl font-bold text-amber-400">{formattedAmount}</span>
      </p>
    </>
  );
}
