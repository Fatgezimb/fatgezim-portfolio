import type { Metadata } from "next";
import { PortfolioPage } from "./components/PortfolioPage";
import { siteMeta } from "./content/site";

export const metadata: Metadata = {
  title: { absolute: siteMeta.title },
  description: siteMeta.description,
};

export default function Home() {
  return <PortfolioPage />;
}
