import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BASEURL } from "@/constant";
import { PlaylistAddModal } from "@/modules/playlists/ui/components/playlist-add-modal";
import { ListPlusIcon, MoreVerticalIcon, ShareIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";


//TODO: implement whats left
interface VideoMenuProps {
    videoId: string;
    variant?: "ghost" | "secondary";
    onRemove?: () => void;
}

export const VideoMenu = ({ videoId, variant = "ghost", onRemove }: VideoMenuProps) => {
    const [openPlaylistAddModal, setOpenPlaylistAddModal] = useState(false);

    const onShare = () => {
        const fullUrl = `${BASEURL}/videos/${videoId}`;
        navigator.clipboard.writeText(fullUrl);
        toast.success("Link copied to the clipboard")
    }

    return (
        <>
            <PlaylistAddModal open={openPlaylistAddModal} onOpenChange={setOpenPlaylistAddModal} videoId={videoId} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={variant} size="icon" className=" rounded-full">
                        <MoreVerticalIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenuItem onClick={onShare}>
                        <ShareIcon className=" mr-2 size-4" />
                        Share
                    </DropdownMenuItem>
                    {
                        !onRemove && (
                            <DropdownMenuItem onClick={() => setOpenPlaylistAddModal(true)}>
                                <ListPlusIcon className=" mr-2 size-4" />
                                Add to playlist
                            </DropdownMenuItem>
                        )
                    }

                    {
                        onRemove && (
                            <DropdownMenuItem onClick={onRemove}>
                                <TrashIcon className=" mr-2 size-4" />
                                Remove
                            </DropdownMenuItem>
                        )
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </>

    )
}
