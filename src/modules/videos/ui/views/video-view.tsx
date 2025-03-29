import { CommentSection } from "../sections/comment-section";
import { SuggestionSection } from "../sections/suggestions-section";
import { VideosSection } from "../sections/video-section";

interface VideoViewProps {
    videoId: string;
}

export const VideoView = ({ videoId }: VideoViewProps) => {
    return (
        <div className=" flex flex-col max-w-[1700px] mx-auto pt-2.5 px-4 mb-10">
            <div className=" flex flex-col xl:flex-row gap-6">
                <div className="flex-1 min-w-0">
                    <VideosSection videoId={videoId} />
                    <div className="xl:hidden block mt-4">
                        <SuggestionSection videoId={videoId} />
                    </div>
                    <CommentSection videoId={videoId} />
                </div>
                <div className="hidden xl:block w-full xl:w-[380px] 2xl:w-[460px] shrink-1">
                    <SuggestionSection videoId={videoId} />
                </div>
            </div>
        </div>
    )
}
