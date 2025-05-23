import { THUMBNAILS_FALLBACK } from "@/lib/constant"
import { PlayListGetManyOutput } from "@/modules/playlists/types"
import Link from "next/link"
import { PlaylistThumbnail, PlaylistThumbnailSkeleton } from "./playlist-thumbnail"
import { PlaylistInfo, PlaylistInfoSkeleton } from "./playlist-info"

interface PlaylistGridCardProps {
    data: PlayListGetManyOutput["items"][number]
}

export const PlaylistGridCardSkeleton = () => {
    return (
        <div className=" flex flex-col gap-2 w-full">
            <PlaylistThumbnailSkeleton />
            <PlaylistInfoSkeleton />
        </div>
    )
}

export const PlaylistGridCard = ({ data }: PlaylistGridCardProps) => {
    return (
        <Link prefetch href={`/playlists/${data.id}`}>
            <div className=" flex flex-col gap-2 w-full group">
                <PlaylistThumbnail thumbnailUrl={data.thumbnailUrl || THUMBNAILS_FALLBACK} title={data.name} videoCount={data.videoCount} />
                <PlaylistInfo data={data} />
            </div>

        </Link>
    )
}
