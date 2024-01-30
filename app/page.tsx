import {CardDemo} from "@/components/NotificationsCard";
import {PythonPlain} from "devicons-react";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import FrameworkList from "@/app/projects/_components/FrameworkList";
import {SignalHighIcon, SignalIcon, SignalLowIcon, SignalMedium, SignalMediumIcon} from "lucide-react";


export default function Home() {
  return (
      <div className="flex flex-row-reverse justify-center items-center">
        <SignalIcon className="text-red-600 dark:text-red-500" size={50} strokeWidth={3} />
        <SignalHighIcon className="text-amber-600 dark:text-amber-500" size={50} strokeWidth={3}/>
        <SignalMediumIcon className="text-green-600 dark:text-green-500" size={50} strokeWidth={3}/>
        <SignalLowIcon className="text-blue-600 dark:text-blue-500" size={50} strokeWidth={3}/>
        {/*<CardDemo />*/}
      </div>
  );
}
