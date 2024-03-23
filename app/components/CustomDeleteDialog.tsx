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

interface CustomAlertDialogProps {
    triggerButtonLabel?: string;
    confirmButtonLabel?: string;
    title?: string;
    className?: string;
    description?: string;
    isDeleting?: boolean;
    onConfirm: () => void;
}

const CustomAlertDialog: React.FC<CustomAlertDialogProps> = ({
                                                                 triggerButtonLabel,
                                                                 confirmButtonLabel = 'Continue',
                                                                 className = '',
                                                                 title = 'Are you absolutely sure?',
                                                                 description = 'This action cannot be undone. This will permanently delete this item.',
                                                                 isDeleting = false,
                                                                 onConfirm,
                                                             }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button
                    className={`${className} flex items-center gap-1`}
                    disabled={isDeleting}
                >
                    {triggerButtonLabel}
                    {isDeleting ? <Spinner/> : <TrashIcon/>}
                </button>
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
