"use client"

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useEffect } from "react";
import { Button } from "./ui/button";

interface InfiniteScrollProps {
    isManual?: boolean;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
}

export const InfiniteScroll = ({ isFetchingNextPage, isManual = false, hasNextPage, fetchNextPage }: InfiniteScrollProps) => {

    const { targetRef, isIntercepting } = useIntersectionObserver({
        threshold: 0.5,
        rootMargin: "100px"
    });

    useEffect(() => {
        if (isIntercepting && !isManual && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [isManual, hasNextPage, isFetchingNextPage, fetchNextPage, isIntercepting]);


    return (
        <div className=" flex flex-col items-center gap-4 p-4">
            <div ref={targetRef} className="h-1" />
            {
                hasNextPage ? (
                    <Button variant="secondary" disabled={!hasNextPage || isFetchingNextPage} onClick={() => fetchNextPage()}>
                        {isFetchingNextPage ? "Loading..." : "Load More"}

                    </Button>
                ) : (
                    <p className=" text-xs text-muted-foreground">You have reached the end of the list</p>
                )
            }
        </div>
    )
}
