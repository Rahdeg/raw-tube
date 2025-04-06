import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type PlayListGetManyOutput =
  inferRouterOutputs<AppRouter>["playlists"]["getMany"];
