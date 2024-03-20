import React from 'react';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Button} from '@/components/ui/button';
import {CaretSortIcon, CheckIcon} from '@radix-ui/react-icons';
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from '@/components/ui/command';
import Roles from "@/app/components/Roles";

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    defaultValue: string;
    options: Option[];
    unassignedLabel?: string;
    onValueChange: (value: string) => void;
    loading?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
                                                       defaultValue = 'Suggestions',
                                                       options,
                                                       unassignedLabel = "unassigned",
                                                       onValueChange,
                                                       loading
                                                   }) => {
    const [searchValue, setSearchValue] = React.useState('');
    const [value, setValue] = React.useState(defaultValue);
    const [open, setOpen] = React.useState(false);

    const handleSelect = (selectedValue: string) => {
        setValue(selectedValue === value ? '' : selectedValue);
        onValueChange(selectedValue);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                >
                    {value ? <Roles role={value}/> : 'Select framework...'}
                    <CaretSortIcon className="h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-fit">
                <Command>
                    <CommandInput
                        placeholder="Search item..."
                        className="h-9"
                        value={searchValue}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                    />
                    <CommandEmpty>No item found.</CommandEmpty>
                    <CommandGroup>
                        {options
                            .filter((option) => option.label.toLowerCase().includes(searchValue.toLowerCase()))
                            .map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={() => handleSelect(option.value)}
                                >
                                    <Roles role={option.value}/>
                                    {value === option.value && <CheckIcon className="ml-auto h-4 w-4 opacity-100"/>}
                                </CommandItem>
                            ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default CustomSelect;
