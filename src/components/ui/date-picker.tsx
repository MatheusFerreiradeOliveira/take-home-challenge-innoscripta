"use client";

import * as React from "react";
import { parse, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
  placeholder,
  value,
  setValue,
  initialValue,
}: {
  placeholder?: string;
  value: Date | null;
  setValue: (date?: Date) => void;
  initialValue?: Date;
}) {
  // const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <div className="relative">
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? (
              format(value, "PPP")
            ) : (
              <span>{placeholder || "Pick a date"}</span>
            )}
          </Button>
        </PopoverTrigger>
        {value && (
          <a
            onClick={() => setValue(undefined)}
            className="text-red-500 absolute right-4 top-1"
          >
            x
          </a>
        )}
      </div>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value || undefined}
          onSelect={setValue}
          initialFocus
          fromDate={initialValue}
        />
      </PopoverContent>
    </Popover>
  );
}
