import { THUMBNAILS_FALLBACK } from '@/lib/constant';
import { formatDuration } from '@/lib/utils';
import Image from 'next/image'
import React from 'react'

interface VideoThumbnailProps {
    imageUrl?: string | null;
    previewUrl?: string | null;
    title: string;
    duration: number;
}

export const VideoThumbnail = ({ imageUrl, previewUrl, title, duration }: VideoThumbnailProps) => {
    return (
        <div className=' relative group'>
            {/* Thumbnail wrapper */}
            <div className='relative w-full overflow-hidden rounded-xl aspect-video'>
                <Image src={imageUrl || THUMBNAILS_FALLBACK}
                    alt={title}
                    fill
                    className=' size-full object-cover group-hover:opacity-0' />
                <Image
                    unoptimized={!!previewUrl}
                    src={previewUrl || THUMBNAILS_FALLBACK}
                    alt={title}
                    fill
                    className=' size-full object-cover opacity-0 group-hover:opacity-100' />
            </div>
            {/* Duration */}
            <div className=' absolute bottom-2 right-2 px-1 py-0.5 rounded bg-black/80 text-white text-xs font-medium'>
                {formatDuration(duration)}
            </div>
        </div>
    )
}
