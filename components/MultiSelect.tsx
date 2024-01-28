"use client";

import * as React from "react";
import {X} from "lucide-react";

import {Badge} from "@/components/ui/badge";
import {Command, CommandGroup, CommandItem} from "@/components/ui/command";
import {Command as CommandPrimitive} from "cmdk";
import {Frameworks} from "@prisma/client";

type Framework = Record<"value" | "label", string>;

const languageArray = Object.values(Frameworks) as string[];

const FRAMEWORKS: Framework[] = languageArray.map((language) => ({
  value: language,
  label: language.charAt(0).toUpperCase() + language.slice(1),
}));

interface Props {
  onChange?: (values: { value: string; label: string }[]) => void;
}

export const FancyMultiSelect = ({onChange}: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Framework[]>([]);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback((framework: Framework) => {
    setSelected((prev) => prev.filter((s) => s.value !== framework.value));
  }, []);

  const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current;
        if (input) {
          if (e.key === "Delete" || e.key === "Backspace") {
            if (input.value === "") {
              setSelected((prev) => {
                const newSelected = [...prev];
                newSelected.pop();
                return newSelected;
              });
            }
          }
          // This is not a default behaviour of the <input /> field
          if (e.key === "Escape") {
            input.blur();
          }
        }
      },
      []
  );

  const selectables = FRAMEWORKS.filter(
      (framework) => !selected.includes(framework)
  );


  React.useEffect(() => {
    onChange?.(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
      <Command
          onKeyDown={handleKeyDown}
          className="overflow-visible bg-transparent"
      >
        <div
            className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <div className="flex flex-wrap gap-1">
            {selected.map((framework) => {
              return (
                  <Badge key={framework.value} variant="secondary">
                    {framework.label}
                    <button
                        className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleUnselect(framework);
                          }
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onClick={() => handleUnselect(framework)}
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground"/>
                    </button>
                  </Badge>
              );
            })}
            {/* Avoid having the "Search" Icon */}
            <CommandPrimitive.Input
                ref={inputRef}
                value={inputValue}
                onValueChange={setInputValue}
                onBlur={() => setOpen(false)}
                onFocus={() => setOpen(true)}
                placeholder="Select frameworks..."
                className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
        <div className="relative mt-2">
          {open && selectables.length > 0 ? (
              <div
                  className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                <CommandGroup className="h-full overflow-auto">
                  {selectables.map((framework) => {
                    return (
                        <CommandItem
                            key={framework.value}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            onSelect={(value) => {
                              setInputValue("");
                              setSelected((prev) => [...prev, framework]);
                            }}
                            className={"cursor-pointer"}
                        >
                          {framework.label}
                        </CommandItem>
                    );
                  })}
                </CommandGroup>
              </div>
          ) : null}
        </div>
      </Command>
  );
};