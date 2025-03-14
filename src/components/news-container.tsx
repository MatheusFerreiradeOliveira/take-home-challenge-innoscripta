"use client";
import { useFiltersData } from "@/hooks/useFiltersData";
import Publication from "./publication";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useInfiniteArticles } from "@/hooks/useInfiniteArticles";

export default function NewsContainer() {
  const { values: filterValues, updateValues } = useFiltersData();

  const { data } = useInfiniteArticles();
  console.log("worked?", data);

  return (
    <div className="relative w-full flex flex-col justify-center items-center py-10 overflow-y-scroll">
      <div className="absolute right-2 top-2 flex flex-row items-center w-[250px]">
        <Label className="w-full">Order news by:</Label>
        <Select
          value={filterValues.orderBy}
          onValueChange={(e: "newest" | "relevance") =>
            updateValues({ orderBy: e })
          }
        >
          <SelectTrigger className="">
            <SelectValue placeholder="order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key={"1"} value={"newest"}>
              Newest
            </SelectItem>
            <SelectItem key={"2"} value={"relevance"}>
              Relevance
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Publication />
    </div>
  );
}
