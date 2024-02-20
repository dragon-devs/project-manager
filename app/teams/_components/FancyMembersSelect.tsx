import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Users, Teams } from "@/types";

interface Props {
  team?: Teams;
  users: Users[];
  onChange?: (values: Users[]) => void;
}

export const FancyMemberSelect = ({ team, users, onChange }: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Users[]>(team?.members || []);
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    if (team && team.members) {
      setSelected(team.members);
    }
  }, [team]);

  const handleUnselect = (user: Users) => {
    const updatedSelected = selected.filter(s => s.id !== user.id);
    setSelected(updatedSelected);
    handleChange(updatedSelected);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if ((e.key === "Delete" || e.key === "Backspace") && input.value === "" && selected.length > 0) {
        const updatedSelected = selected.slice(0, -1);
        setSelected(updatedSelected);
        handleChange(updatedSelected);
      }
      if (e.key === "Escape") {
        input.blur();
      }
    }
  };

  const selectables = users.filter(user => !selected.some(s => s.id === user.id));

  const handleSelect = (user: Users) => {
    const updatedSelected = [...selected, user];
    setSelected(updatedSelected);
    handleChange(updatedSelected);
  };

  const handleChange = (selectedUsers: Users[]) => {
    setSelected(selectedUsers);
    onChange?.(selectedUsers);
  };

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map(user => (
            <Badge key={user.id} variant="secondary">
              {user.name}
              <button
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={() => handleUnselect(user)}
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
              {selectables.map(user => (
                <CommandItem
                  key={user.id}
                  onMouseDown={e => {
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
