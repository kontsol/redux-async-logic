import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { postAdded } from './postsSlice'

export const AddPostForm = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')

    const users = useSelector(state => state.users)
    const dispatch = useDispatch();

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChange = e => setUserId(e.target.value)//καθε κλικ που κανουμε στα options authors αποθηκευεται στο userId

    const onSavePostClicked = () => {
        if (title && content) {
            // nanoid random id 
            // postAdded action creator

            //αν εχει μπει title, content
            dispatch(postAdded(title, content, userId))
        }
        setTitle('')
        setContent('')
        setUserId('')
    }

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)
    //για να ειναι true ολα πρεπει να συμπληρωθουν αλλιως το button θα ειναι disabled
    
    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>

           {user.id} {user.name}
        </option>
    ))

    return (
    <section>
        <h2>Add new post</h2>
        <form>
            <label htmlFor="postTitle">Post title: </label>
            <input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged}/>
            
            <label htmlFor="postAuthor">Author: </label>
            <select id="postAuthor" value={userId} onChange={onAuthorChange}>
                <option value=""></option>
                {usersOptions}
            </select>

            <label htmlFor="postContent">Content: </label>
            <textarea id="postContent" name="postContent" value={content} onChange={onContentChanged} />
            <button type="button" onClick={onSavePostClicked} disabled={!canSave}>Save Post</button>
        </form>
    </section>
)
}

