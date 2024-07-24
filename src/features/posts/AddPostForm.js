import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { postAdded } from './postsSlice'
import { addNewPost } from './postsSlice'

export const AddPostForm = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestState, setAddRequestState] = useState('idle')

    const users = useSelector(state => state.users)
    const dispatch = useDispatch();

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChange = e => setUserId(e.target.value)//καθε κλικ που κανουμε στα options authors αποθηκευεται στο userId


    // [title, content, userId].every(Boolean) αν ολα τα form field εχουν τιμες επιστρεφει true 
    const canSave = [title, content, userId].every(Boolean) && addRequestState === 'idle'

    const onSavePostClicked = async() => {
        if(canSave) {
            try {
                setAddRequestState('pending')
                await dispatch(addNewPost({title, content, user: userId})).unwrap()
                //dispatch sends the data to the server for post method
                //unwrap 
                /*
                Resolves the returned promise with the action payload (the data returned from the server) if the action was fulfilled.
                Rejects the returned promise with the action error if the action was rejected.
                */
                setTitle('')
                setContent('')
                setUserId('')
            }
            catch(err){
                console.log('Failed to save the post: ', err)
            }
            finally {
                setAddRequestState('idle')
            }
        }
    }

    

    //για να ειναι true ολα πρεπει να συμπληρωθουν αλλιως το button θα ειναι disabled
    
    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>

            {user.name}
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

