import {Spinner} from "../../components/Spinner"
import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import {selectAllPosts, fetchPosts } from './postsSlice'



const PostExcerpt = ({post}) => {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0,100)}</p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className='button muted-button'>View Post</Link>
    </article>
  )
}

export const PostsList = () => {
  const dispatch = useDispatch()
  const error = useSelector(state => state.posts.error)
  const posts = useSelector(selectAllPosts)
  
  // Ταξινομηση ετσι ωστε να προσθετεται το νεο post στην αρχη και οχι στο τελος
  

  const postStatus = useSelector(state => state.posts.status)//point στο Slice posts

  //το useEffect θα τρεχει καθε φορα που αλλαζει ή το postStatus ή το dispatch
  // το fetchPosts θα γινει dispatched μονο οταν το postStatus = idle 
  // επειδη by default status=idle στο πρωτο render γινεται dispatch το fetchPosts και μετα το status αλλαζει κατα το render, γινεται status='loading' για pending και status='succeeded' για fulfilled και ετσι δεν γινεται dispatch γιατι το postStatus δεν ειναι idle
  useEffect(() => {
    if(postStatus === 'idle'){
      //dispatch is function not variable
      dispatch(fetchPosts())//send actions to redux store
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === 'loading') {
    content = <Spinner text='Loading...'/>
  }
  else if (postStatus === 'succeeded') {
    const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map(post => (
      <PostExcerpt key={post.id} post={post} />
    ))
  }
  else if (postStatus === 'failed'){
    content = <div>Error</div>
  }


  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
