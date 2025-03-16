import { FiltersInterface } from "@/types/filters";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function OrderBy({
  value,
  updateValues,
}: {
  value: string;
  updateValues: (value: Partial<FiltersInterface>) => void;
}) {
  return (
    <div className="absolute right-2 top-2 flex flex-row items-center w-[150px] sm:w-[250px]">
      <Label className="w-full hidden sm:inline">Order news by:</Label>
      <Select
        value={value}
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
  );
}
