import clsx from "clsx";

interface CardProps {
  title: string;
  value: number | string;
  classes?: string;
}

const Card = (props: CardProps) => {
  return (
    <div
      className={clsx(
        "flex flex-col gap-1 rounded-2xl border-2 border-slate-200 shadow-slate-700 shadow-sm w-[calc(50%-0.5rem)] p-2 text-center",
        props.classes
      )}
    >
      <span className="uppercase text-xs">{props.title}</span>
      <span className="uppercase text-lg font-bold">{props.value}</span>
    </div>
  );
};

export default Card;
