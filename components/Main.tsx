import { PropsWithChildren } from "react";

const Main = ({ children }: PropsWithChildren) => (
  <main className="container mx-auto flex flex-col justify-center py-8 gap-12 mt-10">
    {children}
  </main>
);

export default Main;
