"use client"

import { DEFAULT_LIMIT } from "@/constant"
import { trpc } from "@/trpc/client"
import { VideoRowCard, VideoRowCardSkeleton } from "../components/video-row-card"
import { VideoGridCard, VideoGridCardSkeleton } from "../components/video-grid-card"
import { InfiniteScroll } from "@/components/infinite-scroll"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

interface SuggestionSectionProps {
    videoId: string
    isManual?: boolean
}

export const SuggestionSection = ({ videoId, isManual }: SuggestionSectionProps) => {
    return (
        <Suspense fallback={<SuggestionSectionSkeleton />}>
            <ErrorBoundary fallback={<div>Error</div>}>
                <SuggestionSectionSuspense videoId={videoId} isManual={isManual} />
            </ErrorBoundary>

        </Suspense>
    )
}

const SuggestionSectionSkeleton = () => {
    return (
        <>
            <div className="hidden md:block space-y-3">
                {
                    Array.from({ length: 8 }).map((_, index) => (
                        <VideoRowCardSkeleton
                            size="compact"
                            key={index}
                        />
                    ))
                }

            </div>
            <div className="block md:hidden space-y-10">
                {
                    Array.from({ length: 8 }).map((_, index) => (
                        <VideoGridCardSkeleton
                            key={index}
                        />
                    ))
                }

            </div>
        </>
    )
}


const SuggestionSectionSuspense = ({ videoId, isManual }: SuggestionSectionProps) => {
    const [suggestions, query] = trpc.suggestions.getMany.useSuspenseInfiniteQuery({
        videoId,
        limit: DEFAULT_LIMIT,
    },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor
        }
    )
    return (
        <>
            <div className="hidden md:block space-y-3">
                {
                    suggestions.pages.flatMap((page) => page.items).map((video) => (
                        <VideoRowCard
                            key={video.id}
                            data={video}
                            size="compact"
                        />
                    ))
                }
            </div>
            <div className="block md:hidden space-y-10">
                {
                    suggestions.pages.flatMap((page) => page.items).map((video) => (
                        <VideoGridCard
                            key={video.id}
                            data={video}

                        />
                    ))
                }
            </div>
            <InfiniteScroll
                hasNextPage={query.hasNextPage}
                isFetchingNextPage={query.isFetchingNextPage}
                fetchNextPage={query.fetchNextPage}
                isManual={isManual}
            />
        </>

    )
}
