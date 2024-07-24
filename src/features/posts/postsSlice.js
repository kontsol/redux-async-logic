import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import {client} from "../../api/client"
import { sub } from 'date-fns'

// ?initialState χωρις async
// const initialState = [
//   {
//     id: '1',
//     title: 'First Post!',
//     content: 'Hello!',
//     user: '1',
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       hooray: 0,
//       heart: 0,
//       rocket: 0,
//       eyes: 0,
//     },
//   },
//   {
//     id: '2',
//     title: 'Second Post',
//     content: 'More text',
//     user: '2',
//     date: sub(new Date(), { minutes: 5 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       hooray: 0,
//       heart: 0,
//       rocket: 0,
//       eyes: 0,
//     },
//   },
// ]


// ? initialState με async
const initialState = {
  posts: [], // * Καλο θα ηταν να ειχε αλλο ονομα ο πινακας γιατι τωρα ειναι state.posts.posts
  status: "idle",
  error: null,
}


//παιρνει δυο παραμετρους, action type 'posts/fetchPosts' και async function
//posts/fetchPosts unique string ('pending', 'fulfilled', 'rejected')

//createAsyncThunk by default εχει 3 action types : "pending, fulfilled, rejected"
// 'posts/fetchPosts' , Αυτο το string χρησιμοποιει 3 action types
// το ονομα προερχεται συνηθως απο ονομα του slice + action 
// 1.Pending
// 2.fulFilled
// 3.Rejected
// * Καθως ξεκιναει, γινεται το πρωτο render στο redux toolkit bar, εμφανιζει fetchPosts.pending μεχρι να εμφανιστουν τα api που ειναι μεσα στα posts, μετα αφου εμφανιστουν γινεται fetchPosts.fulFilled
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  // ! /fakeApi/posts ειναι το endpoint που κανει fetch data
  //κανει http request σε αυτο το url και αν ειναι επιτυχεις επιστρεφει response
  return response.data
})


export const addNewPost = createAsyncThunk('posts/addNewPost', async initialPost => {
  const response = await client.post('/fakeApi/posts', initialPost)
  return response.data
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const {postId, reaction} = action.payload
      const existingPost = state.posts.find(post => post.id === postId)
      if (existingPost){
        existingPost.reactions[reaction]++
      }
    },
    //postAdded = action.type
    postUpdated(state,action) {
        // state.push(action.payload) //χωρις async
    const {id, title, content } = action.payload
    const existingPost = state.posts.find(post => post.id === id)
    if (existingPost) {
      existingPost.title = title
      existingPost.content = content
      }
    }
    },
    extraReducers(builder){
        builder
        .addCase(fetchPosts.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.posts = state.posts.concat(action.payload)
        })
        .addCase(fetchPosts.rejected, (state,action) => {
          state.status = 'failed'
          state.error = action.error.message
        })
        .addCase(addNewPost.fulfilled, (state, action) => {
          state.posts.push(action.payload)
        })
      },
      //prepare of postAdded = action.payload
      //το postAdded παιρνει σαν παραμετρο title, content, userId αυτα θα πρεπει να εισαχθουν 
      //αλλα με το payload επιστρεφει και αλλες τιμες που δεν τις βαζουμε εμεις
      //στο prepare πρεπει να χρησιμοποιηθει τουλαχιστον μια παραμετρος
      //Το structure του payload βασιζεται στο structure του initialState
      //μεσα στο return πρεπει να μπαινουν ολα τα fields που θελουμε να επιστρεφει
      
      // ? prepare για async το εβγαλε
      // prepare(title, content, userId) {
      //   return {
      //     payload: {
      //       //the data that will be included when the action is dispatched
      //       id: nanoid(),
      //       date: new Date().toISOString(),
      //       title,
      //       content,
      //       user: userId,
      //       reactions: {
      //         thumbsUp: 0,
      //         hooray: 0,
      //         heart: 0,
      //         rocket: 0,
      //         eyes: 0,
      //       },
      //     },
      //   }
      // },
    },
    // εδω δεν εχει prepare γιατι δεν χρειαζεται να προσθετουμε αυτοματα καποια fields
  )

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

// * define selectors για να μην επαναλαμβανεται ο κωδικας (reusable selectors)
// * state.posts = κανει point στο slice με name posts
// * state.posts.posts = κανει point στο slice με name posts, και μετα στον πινακα posts
export const selectAllPosts = state => state.posts.posts
export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId)

