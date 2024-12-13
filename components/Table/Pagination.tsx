import { useRouter } from "next/router";
import Select from "../Select";
import { useEffect, useState } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import clsx from "clsx";

interface PaginationProps {
  total: number;
}

const sizes = [
  { id: "10", name: "10" },
  { id: "25", name: "25" },
  { id: "50", name: "50" },
  { id: "100", name: "100" },
];

const Pagination = ({ total }: PaginationProps) => {
  const { query, pathname, push } = useRouter();

  const [page, setPage] = useState<number>(
    query.page ? parseInt(query.page as string) : 1
  );
  const [size, setSize] = useState<number>(
    query.size ? parseInt(query.size as string) : 10
  );

  const goToNext = () => {
    setPage(page + 1);
  };

  const goToPrev = () => {
    setPage(page - 1);
  };

  const onSelectPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(parseInt(event.target.value));
  };

  const onSelectSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(1);
    setSize(parseInt(event.target.value));
  };

  useEffect(() => {
    push({ pathname, query: { ...query, page, size } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);

  const items = Array.from({ length: Math.ceil(total / size) }).map(
    (_, num) => ({ id: (num + 1).toString(), name: `Sida ${num + 1}` })
  );

  return (
    <div className="flex flex-row">
      <div className="flex flex-row">
        <button
          onClick={goToPrev}
          disabled={page === 1}
          className={clsx(page === 1 && "text-gray-400")}
        >
          <FaCaretLeft size="24" />
        </button>
        <Select value={page} items={items} onChange={onSelectPage} />
        <button
          onClick={goToNext}
          disabled={page * size > total}
          className={clsx(page * size > total && "text-gray-400")}
        >
          <FaCaretRight size="24" />
        </button>
      </div>
      <div className="flex flex-row">
        <Select value={size} items={sizes} onChange={onSelectSize} />
        <span>per sida</span>
      </div>
    </div>
  );
};

export default Pagination;
