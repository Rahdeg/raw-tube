import { ResponsiveModal } from "@/components/responsive-modal";
import { UploadDropzone } from "@/lib/uploadthing";
import { trpc } from "@/trpc/client";

interface BannarUploadModalProps {
    userId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const BannarUploadModal = ({ userId, open, onOpenChange }: BannarUploadModalProps) => {
    const utils = trpc.useUtils();

    const onUploadComplete = () => {
        utils.users.getOne.invalidate({ id: userId });
        onOpenChange(false);
    }

    return (
        <ResponsiveModal title="Upload a banner" open={open} onOpenChange={onOpenChange}>
            <UploadDropzone endpoint="bannarUploader" onClientUploadComplete={onUploadComplete} />
        </ResponsiveModal>
    )
}
