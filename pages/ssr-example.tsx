import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps<{
  formattedDate: string;
}> = async () => {
  const renderDate = Date.now();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "long",
  }).format(renderDate);
  console.log(
    `SSR ran on ${formattedDate}. This will be logged in CloudWatch.`
  );
  return { props: { formattedDate } };
};

export default function SSR({
  formattedDate,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className={`h-screen ${inter.className}`}>
      <div className="z-10 w-full items-center justify-between font-mono text-sm">
        <p className="flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:rounded-xl lg:border lg:bg-gray-200  lg:dark:bg-zinc-800/30">
          This page is server-side rendered. It was rendered on {formattedDate}.
        </p>
      </div>
      <div className="text-center mt-5">
        <Link href="/" className="underline">
          View an incrementally, statically regenerated page.
        </Link>
      </div>
    </main>
  );
}
