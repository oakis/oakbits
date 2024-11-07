import Main from "@/components/Main";
import Link from "next/link";

export default function Custom404() {
  return (
    <Main classes="px-4 sm:px-0">
      <div>
        <h1 className="text-xl mb-4">404 - Kunde inte hitta sidan</h1>
        <p>
          Klickade du på en länk på webbsidan? Meddela i så fall gärna vilken
          länk till mig på <Link href="https://m.me/oakis">messenger</Link>.
        </p>
        <p>
          Kontrollera att du har skrivit rätt address eller gå tillbaka till{" "}
          <Link href="/">startsidan</Link>.
        </p>
      </div>
    </Main>
  );
}
