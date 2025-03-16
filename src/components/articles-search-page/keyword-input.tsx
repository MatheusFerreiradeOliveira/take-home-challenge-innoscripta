"use client";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useFilters } from "@/hooks/useFilters";

export default function KeyworkInput() {
  const { updateValues } = useFilters();

  return (
    <div className="w-full max-w-[800px] flex flex-col gap-4 text-xl">
      <Label>Search Articles</Label>
      <Input
        placeholder="Type any keywork"
        className="h-12"
        onChange={useDebounce(
          (e) => updateValues({ keyword: e.target.value || "" }),
          500
        )}
      />
    </div>
  );
}
