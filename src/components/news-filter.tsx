"use client";
import { useFiltersData } from "@/hooks/useFiltersData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { ALL_CATEGORIES } from "@/utils/functions";
import { Input } from "./ui/input";
import useDebounce from "@/hooks/useDebounce";
import { DatePicker } from "./ui/date-picker";

export default function NewsFilter() {
  const {
    category,
    setCategory,
    keyword,
    setKeyword,
    orderBy,
    setOrderBy,
    initialDate,
    setInitialDate,
    finalDate,
    setFinalDate,
  } = useFiltersData();

  return (
    <div className="flex flex-col gap-10 py-20 border-r border-separator pr-20 my-2">
      <div>
        <Input
          placeholder="Search by keyword"
          value={keyword}
          onChange={useDebounce((e) => setKeyword(e.target.value), 500)}
        />
      </div>
      <div className="flex flex-row gap-2">
        <Select
          value={category}
          onValueChange={(e) => setCategory({ category: e === "all" ? "" : e })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {category && (
              <SelectItem
                className="text-muted-foreground"
                key="all"
                value={"all"}
              >
                Clear
              </SelectItem>
            )}
            {ALL_CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <DatePicker placeholder="Initial date" />
      </div>
      <div>
        <DatePicker placeholder="Final date" />
      </div>
    </div>
  );
}
