import { Skeleton } from "@/components/ui/skeleton"
import { PlayListGetManyOutput } from "@/modules/playlists/types"

interface PlaylistInfoProps {
    data: PlayListGetManyOutput["items"][number]
}

export const PlaylistInfoSkeleton = () => {
    return (
        <div className=" flex gap-3">
            <div className=" min-w-0 flex-1  space-y-1">
                <Skeleton className=" h-5 w-[90%]"> </Skeleton>
                <Skeleton className=" h-5 w-[70%]"> </Skeleton>
                <Skeleton className=" h-5 w-[50%]"> </Skeleton>
            </div>
        </div>
    )
}
export const PlaylistInfo = ({ data }: PlaylistInfoProps) => {
    return (
        <div className=" flex gap-3">
            <div className=" min-w-0 flex-1">
                <h3 className=" font-medium line-clamp-1 lg:line-clamp-2 text-sm break-words">{data.name} </h3>
                <p className=" text-sm text-muted-foreground"> Playlist</p>
                <p className="text-sm text-muted-foreground font-semibold hover:text-primary">View full playlist</p>
            </div>
        </div>
    )
}
