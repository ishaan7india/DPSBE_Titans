import { createFileRoute } from "@tanstack/react-router";
import { SeasonSite } from "@/components/titans/SeasonSite";

export const Route = createFileRoute("/logo")({
  head: () => ({
    meta: [
      { title: "The Emblem — DPSBE Titans #174" },
      {
        name: "description",
        content:
          "The story behind the DPSBE Titans emblem: six corners representing six members, converging at the center to create thunder.",
      },
      { property: "og:title", content: "The Emblem — DPSBE Titans #174" },
      {
        property: "og:description",
        content:
          "The story behind the DPSBE Titans emblem: six corners representing six members, converging at the center to create thunder.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <SeasonSite page="logo" />,
});
