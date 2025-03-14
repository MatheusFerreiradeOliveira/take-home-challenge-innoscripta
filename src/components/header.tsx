import Image from "next/image";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <div className="p-4 px-10 lg:px-24 border-b-[1px] border-b-slate-200 order-1 flex flex-row bg-background items-center justify-between">
      <Image
        width={200}
        height={200}
        alt="Innoscripta"
        src={"/images/logo.png"}
      />
      <ModeToggle />
    </div>
  );
}
