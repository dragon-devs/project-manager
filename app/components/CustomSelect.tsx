// components/CustomSelect.tsx
import React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import {Skeleton} from '@/components/ui/skeleton';

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    defaultValue: string;
    options: Option[];
    label?: string;
    unassignedLabel?: string;
    onValueChange: (value: string) => void;
    loading: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
                                                       defaultValue,
                                                       label = "Suggestions",
                                                       options,
                                                       unassignedLabel,
                                                       onValueChange,
                                                       loading
                                                   }) => {
    if (loading) {
        return <Skeleton className="w-[10rem]"/>;
    }

    return (
        <Select defaultValue={defaultValue} onValueChange={onValueChange}>
            <SelectTrigger className="sm:w-[10rem]">
                <SelectValue placeholder="Assign..."/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel className="border-b">{label}</SelectLabel>
                    {unassignedLabel && (
                        <SelectItem value={unassignedLabel!} className="capitalize">{unassignedLabel}</SelectItem>
                    )}
                    {options?.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default CustomSelect;
