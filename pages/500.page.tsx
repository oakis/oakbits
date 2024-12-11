import Main from "@/components/Main";
import Link from "next/link";

export default function Custom500(data: unknown) {
  console.error({ data });
  return (
    <Main classes="px-4 sm:px-0">
      <div>
        <h1 className="text-xl mb-4">500 - Något gick snett</h1>
        <p>
          Vad gjorde du när felet uppstod? Skicka gärna en beskrivning på{" "}
          <Link href="https://m.me/oakis">messenger</Link>.
        </p>
      </div>
    </Main>
  );
}
