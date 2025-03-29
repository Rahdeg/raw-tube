import { cva } from 'class-variance-authority'
import React from 'react'


const videoRowCardVariants = cva("group flex min-w-0", {
    variants: {
        size: {
            default: "gap-4",
            compact: "gap-2"
        }
    },
    defaultVariants: {
        size: "default"
    }
})

export const VideoRowCard = () => {
    return (
        <div>VideoRowCard</div>
    )
}
