"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "./utils";

function Switch({ className, ...props }) {
  return (
   <SwitchPrimitive.Root
  className={cn(
    "inline-flex h-6 w-12 items-center rounded-full bg-gray-300 data-[state=checked]:bg-green-500 transition-all",
    className
  )}
>
  <SwitchPrimitive.Thumb
    className={cn(
      "block w-5 h-5 bg-white rounded-full transition-transform data-[state=checked]:translate-x-6"
    )}
  />
</SwitchPrimitive.Root>

  );
}

export { Switch };
