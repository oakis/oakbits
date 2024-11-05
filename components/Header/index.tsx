import Club from "./Club";
import { HeaderContextProvider } from "./context";
import Season from "./Season";
import Team from "./Team";

export default function Header() {
  return (
    <HeaderContextProvider>
      <div className="h-40 sm:h-16 bg-slate-600 mt-10">
        <div className="container mx-auto flex items-center gap-4 h-full flex-col sm:flex-row justify-center sm:justify-start">
          <Season />
          <Club />
          <Team /> 
        </div>
      </div>
    </HeaderContextProvider>
  );
}
