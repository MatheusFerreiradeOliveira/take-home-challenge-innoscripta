"use client";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useFilters } from "@/hooks/useFilters";
import { useCallback, useState } from "react";

export default function KeyworkInput() {
  const [searchValue, setSearchValue] = useState("");
  const { values, updateValues } = useFilters();

  return (
    <div className="w-full max-w-[1000px] flex flex-col gap-4 text-xl">
      <Label>Search Articles</Label>
      <Input
        defaultValue={values.keyword}
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
