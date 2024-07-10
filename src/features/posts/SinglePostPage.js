import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export const SinglePostPage = ({match}) => {
    const {postId} = match.params
    //match.params = :postId απο το Route στο App.js
    //αν το post.id(id=2) ειναι ισο με το postId (posts/2), 
    const post = useSelector(state => state.posts.find(post => post.id === postId))
    console.log("Single post page ", post)
    //το singlePostPage λειτουργει απο το PostsLink, μεσω ενος Link οπου παιρνει το post.id
    if (!post){
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }
    //App.js -> <Route path="/posts/:postId, component={SinglePostPage}"
    //postsSlice.js -> <Link to="/posts/${post.id}"
    //SinglePostPage παιρνει το postId μεσω match.params οπου αν post.id = postId εμφανιζει ενα html
    return (
    <section>
        <article className="post">
            <h2>{post.title}</h2>
            <p className='post-content'>{post.content}</p>

            {/* Πηγαινει στο EditPostPage με βαση το <Route /> */}
            <Link to={`/editPost/${post.id}`} className="button">Edit Post</Link>
        </article>
        
    </section>
    )
}

