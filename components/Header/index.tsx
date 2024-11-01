import Club from "./Club";
import { HeaderContextProvider } from "./context";
import Division from "./Division";
import Season from "./Season";
import Team from "./Team";

export default function Header() {
  return (
    <HeaderContextProvider>
      <div className="h-16 bg-slate-600">
        <div className="container mx-auto flex items-center gap-4 h-full">
          <Season />
          <Club />
          <Team />
          <Division />
        </div>
      </div>
    </HeaderContextProvider>
  );
}
