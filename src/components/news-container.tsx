"use client";
import { useFiltersData } from "@/hooks/useFiltersData";
import { useQuery } from "@tanstack/react-query";
import Publication from "./publication";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function NewsContainer() {
  const { category, keyword, orderBy, setOrderBy, initialDate, finalDate } =
    useFiltersData();

  const { data: theGuardianData, isPending: isPendingGuardianData } = useQuery({
    queryKey: [
      "the-guardian-api",
      category,
      keyword,
      orderBy,
      initialDate,
      finalDate,
    ],
    queryFn: () => {
      let searchParams = "";
      if (category) searchParams += `&section=${category}`;
      if (keyword) searchParams += `&q=${keyword}`;
      if (orderBy) searchParams += `&order-by=${orderBy}`;
      if (initialDate) searchParams += `&from-date=${initialDate}`;
      return fetch(
        `https://content.guardianapis.com/search?api-key=${process.env.NEXT_PUBLIC_THE_GUARDIAN_API_KEY}&${searchParams}`
      );
    },
    refetchOnWindowFocus: false,
  });

  console.log("worked?", theGuardianData);

  return (
    <div className="relative w-full flex flex-col justify-center items-center py-10 overflow-y-scroll">
      <div className="absolute right-2 top-2 flex flex-row items-center w-[250px]">
        <Label className="w-full">Order news by:</Label>
        <Select
          value={orderBy}
          onValueChange={(e: "newest" | "oldest") => setOrderBy({ orderBy: e })}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Ordem" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key={"1"} value={"newest"}>
              Newest
            </SelectItem>
            <SelectItem key={"2"} value={"oldest"}>
              Oldest
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Publication />
    </div>
  );
}
