import Image from "next/image";
import { Analytics } from "@vercel/analytics/react";
import Landing from "../src/components/landing";

export default function Home() {
  return (
    <main>
      <Landing />
      <Analytics />
    </main>
  );
}
