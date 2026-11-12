import { createFileRoute } from "@tanstack/react-router";
import { SeasonSite } from "@/components/titans/SeasonSite";
export const Route = createFileRoute("/build")({
  head: () => ({
    meta: [
      { title: "Build Journey — DPSBE Titans #174" },
      {
        name: "description",
        content: "Follow the build journey and engineering journal of DPSBE Titans Team #174.",
      },
      { property: "og:title", content: "Build Journey — DPSBE Titans #174" },
      {
        property: "og:description",
        content: "Follow the build journey and engineering journal of DPSBE Titans Team #174.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <SeasonSite page="build" />,
});
