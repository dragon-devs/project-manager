import WhatsappLink from "@/components/WhatsappLink";
import GithubLink from "@/components/GithubLink";

export default function Home({searchParams}: {searchParams: { page: string}}) {
  return (
      <div className="flex justify-center flex-col gap-3 text-sm items-center">
        Currently in development :)
      </div>
  );
}
