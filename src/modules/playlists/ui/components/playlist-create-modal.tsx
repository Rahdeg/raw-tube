import { ResponsiveModal } from "@/components/responsive-modal";
import { trpc } from "@/trpc/client";
import { useForm } from "react-hook-form";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface PlaylistCreateModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
    name: z.string().min(2),
})

export const PlaylistCreateModal = ({ open, onOpenChange }: PlaylistCreateModalProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ''
        }
    })


    const utils = trpc.useUtils();

    const create = trpc.playlists.create.useMutation({

        onSuccess: () => {
            utils.playlists.getMany.invalidate();
            onOpenChange(false);
            form.reset();
            toast.success("Playlist created");


        },
        onError: () => {
            toast.error("Something went wrong");
        }
    });



    const onSubmit = (values: z.infer<typeof formSchema>) => {
        create.mutate(values);
    }

    return (
        <ResponsiveModal title="Create a playlist" open={open} onOpenChange={onOpenChange}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Prompt</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="My favorite videos" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}

                    />
                    <div className="flex justify-end mt-6">
                        <Button type="submit" disabled={create.isPending}>
                            Create
                        </Button>
                    </div>
                </form>
            </Form>
        </ResponsiveModal>
    )
}
