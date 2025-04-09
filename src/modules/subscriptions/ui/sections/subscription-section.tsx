"use client"
import { InfiniteScroll } from "@/components/infinite-scroll";
import { DEFAULT_LIMIT } from "@/constant";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { toast } from "sonner";
import { SubscriptionItem, SubscriptionItemSkeleton } from "../components/subscription-item";



export const SubscriptionsSection = () => {
    return (
        <Suspense fallback={<SubscriptionsSectionSkeleton />}>
            <ErrorBoundary fallback={<p>Errorr..</p>}>
                <SubscriptionsSectionSuspense />
            </ErrorBoundary>
        </Suspense>
    )
}

const SubscriptionsSectionSkeleton = () => {
    return (
        <div className="flex flex-col gap-4 ">
            {
                Array.from({ length: 5 }).map((_, i) => (
                    <SubscriptionItemSkeleton key={i} />
                ))
            }

        </div>
    )
}

const SubscriptionsSectionSuspense = () => {

    const [subscriptions, query] = trpc.subscriptions.getMany.useSuspenseInfiniteQuery({
        limit: DEFAULT_LIMIT,
    }, {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

    const utils = trpc.useUtils();

    const unsubscribe = trpc.subscriptions.remove.useMutation({
        onSuccess: (data) => {
            toast.success("UnSubscribed");
            utils.subscriptions.getMany.invalidate();
            utils.videos.getManySubscribed.invalidate();
            utils.users.getOne.invalidate({ id: data.creatorId });
        },
        onError: () => {
            toast.error("Failed to Unsubscribe");
        },
    });


    return (
        <div>
            <div className="flex flex-col gap-4 ">
                {
                    subscriptions.pages.flatMap((page) => page.items).map((subscription) => (
                        <Link prefetch href={`/users/${subscription.user.id}`} key={subscription.creatorId}>
                            <SubscriptionItem
                                name={subscription.user.name}
                                imageUrl={subscription.user.imageUrl}
                                subscriberCount={subscription.user.subscriberCount}
                                onUnsubscribe={() => {
                                    unsubscribe.mutate({
                                        userId: subscription.creatorId,
                                    })
                                }}
                                disabled={unsubscribe.isPending}
                            />
                        </Link>
                    ))
                }
            </div>
            <InfiniteScroll
                hasNextPage={query.hasNextPage}
                isFetchingNextPage={query.isFetchingNextPage}
                fetchNextPage={query.fetchNextPage}
            />
        </div>
    )
}