import React from 'react'
import {parseISO, formatDistanceToNow} from 'date-fns'

//timestamp = post.date
export const TimeAgo = ({timestamp}) => {
    let timeAgo = ""
    if(timestamp) {
        const date = parseISO(timestamp)//parse from string into Date object
        const timePeriod =  formatDistanceToNow(date)//βρισκει πριν ποση ωρα δημιουργηθηκε
        timeAgo = `${timePeriod} ago`
    }
    return (
    <span title={timestamp}>
        &nbsp; <i>{timeAgo}</i>
    </span>
    )
}

