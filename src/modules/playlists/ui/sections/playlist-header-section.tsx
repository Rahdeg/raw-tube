"use client"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { trpc } from "@/trpc/client"
import { TrashIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { toast } from "sonner"

interface PlaylistHeaderSectionProps {
    playlistId: string
};

export const PlaylistHeaderSection = ({ playlistId }: PlaylistHeaderSectionProps) => {
    return (
        <Suspense fallback={<PlaylistHeaderSectionSkeleton />}>
            <ErrorBoundary fallback={<div className="text-center">Error...</div>}>
                <PlaylistHeasderSectionSuspense playlistId={playlistId} />
            </ErrorBoundary>
        </Suspense>
    )
}

const PlaylistHeaderSectionSkeleton = () => {
    return (
        <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-32" />
        </div>
    )
}

const PlaylistHeasderSectionSuspense = ({ playlistId }: PlaylistHeaderSectionProps) => {

    const utils = trpc.useUtils();
    const router = useRouter();

    const [playlist] = trpc.playlists.getOne.useSuspenseQuery({
        id: playlistId,
    });

    const remove = trpc.playlists.remove.useMutation({
        onSuccess: () => {
            toast.success("Playlist removed");
            utils.playlists.getMany.invalidate();
            router.push("/playlists");
        },
        onError: () => {
            toast.error("Something went wrong");
        },
    })

    return (
        <div className="flex  justify-between items-center ">
            <div>
                <h1 className="text-2xl font-bold">{playlist.name}</h1>
                <p className="text-sm text-muted-foreground">{playlist.description}</p>
            </div>
            <Button
                onClick={() => {
                    remove.mutate({ id: playlistId });
                }}
                disabled={remove.isPending}
                variant="outline" size="icon" className=" rounded-full">
                <TrashIcon />
            </Button>

        </div>
    )
}