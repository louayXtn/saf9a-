import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "saf9a store",
  description: "This is a  marketplace for buying and selling used products",
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
