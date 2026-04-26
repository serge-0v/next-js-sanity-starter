import Header from "@/components/header";
import Footer from "@/components/footer";
import { SanityDraftMode } from "@/components/sanity-draft-mode";
import { draftMode } from "next/headers";
import { SanityLive } from "@/sanity/lib/live";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftModeEnabled } = await draftMode();

  return (
    <>
      <Header />
      <main>{children}</main>
      {!isDraftModeEnabled && <SanityLive />}
      {isDraftModeEnabled && <SanityDraftMode />}
      <Footer />
    </>
  );
}
