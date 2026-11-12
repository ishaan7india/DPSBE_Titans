import { createFileRoute } from "@tanstack/react-router";
import { SeasonSite } from "@/components/titans/SeasonSite";
export const Route = createFileRoute("/robot")({
  head: () => ({
    meta: [
      { title: "The Robot — DPSBE Titans #174" },
      {
        name: "description",
        content: "Explore the robot and engineering disciplines behind DPSBE Titans Team #174.",
      },
      { property: "og:title", content: "The Robot — DPSBE Titans #174" },
      {
        property: "og:description",
        content: "Explore the robot and engineering disciplines behind DPSBE Titans Team #174.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <SeasonSite page="robot" />,
});
