import clsx from "clsx";
import { PropsWithChildren } from "react";

interface MainProps extends PropsWithChildren {
  classes?: string;
}

const Main = ({ children, classes }: MainProps) => (
  <main
    className={clsx(
      "container mx-auto flex flex-col justify-center py-8 gap-12 mt-10",
      classes
    )}
  >
    {children}
  </main>
);

export default Main;
