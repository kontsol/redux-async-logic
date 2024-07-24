import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { postUpdated } from './postsSlice'
import { selectPostById } from './postsSlice'


// *EDIT POST το ηδη υπαρχων post, γιαυτο θα πρεπει να εμφανιζει τα ηδη υπαρχων title, content
// *και μετα αναλογα το postId και το post.id θα εμφανιζει δεδομενα ενους id
export const EditPostForm = ({match}) => {
    const {postId} = match.params
    //βρισκει το key posts στο store, και μετα οπου το id του initialState === postId απο match.params (:postId)
    //state.posts βρισκει slice name = posts -> state.posts.posts βρισκει μετα τον πινακα
    const post = useSelector(state => selectPostById(state, postId))
    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)

    const dispatch = useDispatch()
    const history = useHistory()

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onSavePostClicked = () => {

        if(title && content){
            dispatch(postUpdated(title, content))
            history.push(`/posts/${postId}`)//History: provides access to browser history, navigates to the /posts/${postId} page
            
        }
    }

    return (
    <section>
        <h2>Edit Post</h2>
        <form>
            <label htmlFor="postTitle">Post Title: </label>
            <input type="text" id="postTitle" name="postTitle" placeholder="What's on your mind?" value={title} onChange={onTitleChanged} />
            <label htmlFor="postContent">Post Content: </label>
            <textarea id="postContent" name="postContent" value={content} onChange={onContentChanged}/>
        </form>
        <button type="button" onClick={onSavePostClicked}>Save Post</button>
    </section>
)
}

