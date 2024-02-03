import {Badge} from "@/components/ui/badge";
import PaginationPage from "@/app/projects/_components/Pagination";
import {version} from '@/package.json';
export default function Home({searchParams}: {searchParams: { page: string}}) {
  return (
      <div className="flex justify-center flex-col gap-3 items-center">
        Currently in development :)
        <Badge variant="secondary">v{version}</Badge>
      </div>
  );
}
