import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/components/user-avatar";
import { trpc } from "@/trpc/client";
import { useClerk, useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface CommentFormProps {
    videoId: string;
    onSuccess?: () => void;
    variant?: "reply" | "comment";
    onCancel?: () => void;
    parentId?: string;
}

const commentInsertSchema = z.object({
    videoId: z.string(),
    value: z.string(),
    parentId: z.string().optional(),
});

export const CommentForm = ({ videoId, onSuccess, parentId, onCancel, variant = "comment" }: CommentFormProps) => {

    const clerk = useClerk();
    const { user } = useUser();
    const utils = trpc.useUtils();

    const create = trpc.comments.create.useMutation({
        onSuccess: () => {
            utils.comments.getMany.invalidate({ videoId });
            utils.comments.getMany.invalidate({ videoId, parentId });
            form.reset();
            toast.success("Comment added.");
            onSuccess?.();
        },
        onError: (error) => {
            toast.error("Something went wrong.");
            if (error.data?.code === "UNAUTHORIZED") {
                clerk.openSignIn();
            }
        }
    });

    const form = useForm<z.infer<typeof commentInsertSchema>>({
        resolver: zodResolver(commentInsertSchema),
        defaultValues: {
            parentId,
            videoId,
            value: "",
        }
    })

    const handleSubmit = (value: z.infer<typeof commentInsertSchema>) => {
        create.mutate(value);
    }

    const handleCancel = () => {
        form.reset();
        onCancel?.();
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className=" flex gap-4 group">
                <UserAvatar size="lg" imageUrl={user?.imageUrl || "/user-placeholder.svg"} name={user?.username || "User"} />
                <div className=" flex-1">
                    <FormField
                        name="value"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder={variant === "reply" ? "Reply to this comment" : "Add a comment"}
                                        className="resize-none bg-transparent overflow-hidden min-h-0 "
                                        disabled={create.isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className=" justify-end gap-2 mt-2 flex">
                        {
                            onCancel && (
                                <Button type="button" size="sm" disabled={create.isPending} variant="ghost" onClick={handleCancel} >
                                    Cancel
                                </Button>
                            )
                        }
                        <Button type="submit" size="sm" disabled={create.isPending} >
                            {variant === "reply" ? "Reply" : "Comment"}
                        </Button>
                    </div>
                </div>

            </form>
        </Form>

    )
}
