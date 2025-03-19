import * as React from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker, CustomComponents } from "react-day-picker"
import { cn } from "../../lib/utils"


export type CalendarProps = React.ComponentProps<typeof DayPicker>

// Extend the CustomComponents type
type ExtendedCustomComponents = CustomComponents & {
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
    function buttonVariants(): import("clsx").ClassValue {
        throw new Error("Function not implemented.")
    }

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants(),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-gray-400 rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-gray-800 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants(),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_selected:
          "bg-gray-800 text-gray-50 hover:bg-gray-800 hover:text-gray-50 focus:bg-gray-800 focus:text-gray-50",
        day_today: "bg-gray-800 text-gray-50",
        day_outside: "text-gray-400 opacity-50",
        day_disabled: "text-gray-400 opacity-50",
        day_range_middle:
          "aria-selected:bg-gray-800 aria-selected:text-gray-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ }) => <ChevronRight className="h-4 w-4" />,
      } as ExtendedCustomComponents}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }