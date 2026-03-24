import Header from "@/components/header";
import Footer from "@/components/footer";
import Custom404 from "@/components/404";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <Custom404 />
      <Footer />
    </>
  );
}
