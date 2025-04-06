"use client"
import { InfiniteScroll } from "@/components/infinite-scroll";
import { DEFAULT_LIMIT } from "@/constant";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { PlaylistGridCard, PlaylistGridCardSkeleton } from "../components/playlist-grid-card";



export const PlaylistSection = () => {
    return (
        <Suspense fallback={<PlaylistSectionSkeleton />}>
            <ErrorBoundary fallback={<p>Errorr..</p>}>
                <PlaylistSectionSuspense />
            </ErrorBoundary>
        </Suspense>
    )
}

const PlaylistSectionSkeleton = () => {
    return (

        <div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3  2xl:grid-cols-4 [@media(min-width: 1920px)]:grid-cols-5    
 [@media(min-width: 2200px)]:grid-cols-6">
            {
                Array.from({ length: 10 }).map((_, index) => (
                    <PlaylistGridCardSkeleton key={index} />
                ))
            }
        </div>

    )
}



const PlaylistSectionSuspense = () => {

    const [videos, query] = trpc.playlists.getMany.useSuspenseInfiniteQuery({
        limit: DEFAULT_LIMIT,
    }, {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

    return (
        <>
            <div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3  2xl:grid-cols-4 [@media(min-width: 1920px)]:grid-cols-5    
 [@media(min-width: 2200px)]:grid-cols-6">
                {
                    videos.pages.flatMap((page) => page.items).map((playlist) => (
                        <PlaylistGridCard key={playlist.id} data={playlist} />
                    ))
                }
            </div>

            <InfiniteScroll
                hasNextPage={query.hasNextPage}
                isFetchingNextPage={query.isFetchingNextPage}
                fetchNextPage={query.fetchNextPage}
            />
        </>
    )
}