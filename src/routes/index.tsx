import { createFileRoute } from "@tanstack/react-router";
import { SeasonSite } from "@/components/titans/SeasonSite";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DPSBE Titans #174 — 2026 NRL Season" },
      {
        name: "description",
        content:
          "Official 2026 season website of DPSBE Titans, Team #174 from Delhi Public School Bangalore East.",
      },
      { property: "og:title", content: "DPSBE Titans #174 — 2026 NRL Season" },
      {
        property: "og:description",
        content:
          "Official 2026 season website of DPSBE Titans, Team #174 from Delhi Public School Bangalore East.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <SeasonSite />;
}
