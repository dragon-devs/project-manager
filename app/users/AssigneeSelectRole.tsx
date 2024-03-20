'use client';

import React from 'react';
import CustomSelect from "@/app/components/CustomSelect";
import {Role} from "@prisma/client";
import axios from "axios";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

const AssigneeSelectRole = ({id, role}: { id: string, role: Role }) => {
    const router = useRouter();

    const changeRole = (role: string) => {
        axios
            .patch('/api/users/' + id, {role})
            .then(() => {
                router.refresh();
            })
            .catch(() => {
                toast.error('Changes could not be saved.');
            });
    }
    const roles = [
        {value: "ADMIN", label: "Admin"},
        {value: "MODERATOR", label: "Moderator"},
        {value: "MEMBER", label: "Member"},
        {value: "VIEWER", label: "Viewer"}
    ]

    return (
        <div>
            <CustomSelect
                loading={false}
                label="Roles"
                defaultValue={role}
                options={roles}
                onValueChange={changeRole}
            />
        </div>
    );
};


export default AssigneeSelectRole;