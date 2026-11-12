import { createFileRoute } from "@tanstack/react-router";
import { SeasonSite } from "@/components/titans/SeasonSite";
export const Route = createFileRoute("/media")({
  head: () => ({
    meta: [
      { title: "Media & Socials — DPSBE Titans #174" },
      {
        name: "description",
        content:
          "The media archive and official Instagram and YouTube channels of DPSBE Titans Team #174.",
      },
      { property: "og:title", content: "Media & Socials — DPSBE Titans #174" },
      {
        property: "og:description",
        content:
          "The media archive and official Instagram and YouTube channels of DPSBE Titans Team #174.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <SeasonSite page="media" />,
});
