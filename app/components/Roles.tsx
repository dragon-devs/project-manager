import React from 'react';
import {EyeIcon, UserRoundCogIcon, UserRoundSearchIcon, UsersRoundIcon} from "lucide-react";

export interface RolesOption {
    value: string;
    label: string;
    description: string;
    icon?: React.ReactNode;
    className?: string
}

export const roles: RolesOption[] = [
    {
        value: "ADMIN",
        label: "Admin",
        description: "Full access to all features and settings",
        icon: <UserRoundCogIcon className="w-4 h-4"/>,
        className: "text-red-500 "
    },
    {
        value: "MODERATOR",
        label: "Mod",
        description: "Access to Moderate features and settings",
        icon: <UserRoundSearchIcon className="w-4 h-4"/>,
        className: "text-amber-500"
    },
    {
        value: "MEMBER",
        label: "Member",
        description: "Access to basic features and settings",
        icon: <UsersRoundIcon className="w-4 h-4"/>,
        className: "text-green-500"
    },
    {
        value: "VIEWER",
        label: "Viewer",
        description: "Access to read-only features",
        icon: <EyeIcon className="w-4 h-4"/>,
        className: "text-blue-500"
    }
]

interface RolesProps {
    role: string;
    className?: string;
}

const Roles: React.FC<RolesProps> = ({role, className = "bg-muted"}) => {
    const selectedRole = roles.find(option => option.value === role);

    if (!selectedRole) {
        return null;
    }

    return (
        <div>
            <div key={selectedRole.value}
                 className={`${selectedRole.className} ${className} text-xs flex items-center justify-center w-20  p-1 rounded-full`}
            >
                <div className="flex items-center gap-1">
                    {selectedRole.icon}
                    <div className="capitalize">
                        {selectedRole.label}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Roles;
