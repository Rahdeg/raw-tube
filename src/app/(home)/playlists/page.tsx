import { DEFAULT_LIMIT } from '@/constant'
import { PlayListView } from '@/modules/playlists/ui/views/playlists-view'
import { HydrateClient, trpc } from '@/trpc/server'
export const dynamic = 'force-dynamic';

const Page = () => {

    void trpc.playlists.getMany.prefetchInfinite({
        limit: DEFAULT_LIMIT,
    })
    return (
        <HydrateClient>
            <PlayListView />
        </HydrateClient>
    )
}

export default Page