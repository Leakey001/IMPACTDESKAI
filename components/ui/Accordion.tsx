"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface AccordionProps {
  items: {
    id: string;
    title: string;
    content: React.ReactNode;
  }[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className={cn("w-full space-y-2", className)}>
      {items.map((item) => {
        const isOpen = openItem === item.id;
        return (
          <div key={item.id} className="border-b border-neutral-300 last:border-0">
            <button
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between py-4 text-left font-medium text-neutral-900 transition-all hover:text-primary-blue focus-ring rounded"
              aria-expanded={isOpen}
            >
              {item.title}
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-neutral-700 transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pb-4 pt-0 text-sm text-neutral-700">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
