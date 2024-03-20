// components/AlertDialog.js
import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Spinner from '@/components/Spinner';
import {TrashIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";

interface CustomAlertDialogProps {
    triggerButtonLabel?: string;
    confirmButtonLabel?: string;
    btnSize?: "default" | "sm" | "lg" | "icon" | null | undefined;
    title?: string;
    description?: string;
    isDeleting?: boolean;
    onConfirm: () => void;
}

const CustomAlertDialog: React.FC<CustomAlertDialogProps> = ({
                                                                 triggerButtonLabel,
                                                                 btnSize = 'default',
                                                                 confirmButtonLabel = 'Continue',
                                                                 title = 'Are you absolutely sure?',
                                                                 description = 'This action cannot be undone. This will permanently delete this item.',
                                                                 isDeleting = false,
                                                                 onConfirm,
                                                             }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    size={btnSize}
                    variant="destructive"
                    className="gap-1"
                    disabled={isDeleting}
                >
                    {triggerButtonLabel}
                    {isDeleting ? <Spinner/> : <TrashIcon/>}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive text-white hover:bg-destructive/80"
                                       onClick={onConfirm}>
                        {confirmButtonLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default CustomAlertDialog;
