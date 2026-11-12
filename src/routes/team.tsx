import { createFileRoute } from "@tanstack/react-router";
import { SeasonSite } from "@/components/titans/SeasonSite";
export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "The Team — DPSBE Titans #174" },
      {
        name: "description",
        content: "Meet the six students and mentor of DPSBE Titans Team #174.",
      },
      { property: "og:title", content: "The Team — DPSBE Titans #174" },
      {
        property: "og:description",
        content: "Meet the six students and mentor of DPSBE Titans Team #174.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <SeasonSite page="team" />,
});
