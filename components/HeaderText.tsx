import { PropsWithChildren } from "react";

const HeaderText = ({ children }: PropsWithChildren) => (
  <h2 className="text-3xl pb-2 xl:px-0 px-4">{children}</h2>
);

export default HeaderText;
