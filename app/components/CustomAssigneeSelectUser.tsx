import React from 'react';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Button} from '@/components/ui/button';
import {CaretSortIcon, CheckIcon} from '@radix-ui/react-icons';
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from '@/components/ui/command';
import Roles from "@/app/components/Roles";
import {Users} from "@/types";
import Image from "next/image";

interface CustomUserSelectProps {
    defaultValue: string;
    onValueChange: (value: string) => void;
    users: Users[];
    SelectedUser: string;
}

const CustomUserSelect: React.FC<CustomUserSelectProps> = ({users, SelectedUser, defaultValue, onValueChange,}) => {
    const [searchValue, setSearchValue] = React.useState('');
    const [value, setValue] = React.useState(defaultValue);
    const [open, setOpen] = React.useState(false);

    const handleUserSelect = (selectedValue: string) => {
        setValue(selectedValue === value ? '' : selectedValue);
        onValueChange(selectedValue);
        setOpen(false);
    };


    const handleSelect = (selectedValue: string) => {
        setValue(selectedValue === value ? '' : selectedValue);
        onValueChange(selectedValue);
        setOpen(false);
    };


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className="w-full" asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                >
                    {SelectedUser}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput
                        placeholder="Search item..."
                        className="h-9"
                        value={searchValue}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                    />
                    <CommandEmpty>No item found.</CommandEmpty>
                    <CommandGroup>
                        <CommandItem value="unassigned" onSelect={() => handleSelect("unassigned")}>
                            Unassigned
                        </CommandItem>
                        {users!
                            .filter((user) => user.name!.toLowerCase().includes(searchValue.toLowerCase()))
                            .map((user) => (
                                <CommandItem
                                    className=""
                                    key={user.id}
                                    value={user.name!}
                                    onSelect={() => handleSelect(user.id)}
                                >
                                    <div className="flex items-center gap-2">
                                        <Image src={user.image!} alt="DP" width={25} height={25}
                                               className="rounded-full"/>
                                        <div>{user.name}</div>
                                        <div className="absolute right-7">{<Roles role={user.role!}/>}</div>
                                    </div>
                                    {value === user.id && <CheckIcon className="ml-auto h-4 w-4 opacity-100"/>}
                                </CommandItem>
                            ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
export default CustomUserSelect;
