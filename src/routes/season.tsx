import { createFileRoute } from "@tanstack/react-router";
import { SeasonSite } from "@/components/titans/SeasonSite";
export const Route = createFileRoute("/season")({
  head: () => ({
    meta: [
      { title: "2026 Season — DPSBE Titans #174" },
      {
        name: "description",
        content:
          "The 2026 NRL season, game, highlights and achievements for DPSBE Titans Team #174.",
      },
      { property: "og:title", content: "2026 Season — DPSBE Titans #174" },
      {
        property: "og:description",
        content:
          "The 2026 NRL season, game, highlights and achievements for DPSBE Titans Team #174.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <SeasonSite page="season" />,
});
