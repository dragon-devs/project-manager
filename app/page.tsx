import {Badge} from "@/components/ui/badge";

export default function Home() {
  return (
      <div className="flex justify-center flex-col gap-3 items-center">
        Currently in development :)
        <Badge variant="secondary">v0.2.0</Badge>
      </div>
  );
}
