import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Users } from "@/types";

interface Props {
  users: Users[]; // Users provided via props
  onChange?: (values: Users[]) => void;
}

export const FancyMemberSelect = ({ users, onChange }: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Users[]>([]);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback(
    (user: Users, e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setSelected((prev) => prev.filter((s) => s.id !== user.id));
    },
    []
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if ((e.key === "Delete" || e.key === "Backspace") && input.value === "" && selected.length > 0) {
          setSelected((prev) => prev.slice(0, -1)); // Use slice instead of pop
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [selected]
  );

  const selectables = users.filter((user) => !selected.includes(user));

  const handleSelect = (user: Users) => {
    setSelected((prev) => [...prev, user]);
    onChange?.([...selected, user]);
  };

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((user) => (
            <Badge key={user.id} variant="secondary">
              {user.name}
              <button
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
                  if (e.key === "Enter") {
                    // @ts-ignore
                    handleUnselect(user, e);
                  }
                }}
                onMouseDown={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleUnselect(user, e)}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select users..."
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {selectables.map((user) => (
                <CommandItem
                  key={user.id}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={() => {
                    setInputValue("");
                    handleSelect(user);
                  }}
                  className={"cursor-pointer"}
                >
                  {user.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
};
