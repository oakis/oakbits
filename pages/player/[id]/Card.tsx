import clsx from "clsx";
import Link from "next/link";

interface CardProps {
  title: string;
  value: number | string;
  classes?: string;
  href?: string;
}

const Card = (props: CardProps) => {
  return (
    <div
      className={clsx(
        "flex flex-col gap-1 rounded-2xl border-2 border-slate-200 shadow-slate-700 shadow-sm w-[calc(50%-0.5rem)] lg:w-[calc(25%-1rem)] p-2 text-center",
        props.classes
      )}
    >
      <span className="uppercase text-xs">{props.title}</span>
      {props.href ? (
        <Link href={props.href}>
          <span className="uppercase text-lg font-bold">{props.value}</span>
        </Link>
      ) : (
        <span className="uppercase text-lg font-bold">{props.value}</span>
      )}
    </div>
  );
};

export default Card;
