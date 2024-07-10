import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    user: '1',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    user: '2',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    //postAdded = action.type
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      //prepare of postAdded = action.payload
      //το postAdded παιρνει σαν παραμετρο title, content, userId αυτα θα πρεπει να εισαχθουν 
      //αλλα με το payload επιστρεφει και αλλες τιμες που δεν τις βαζουμε εμεις
      //στο prepare πρεπει να χρησιμοποιηθει τουλαχιστον μια παραμετρος
      //Το structure του payload βασιζεται στο structure του initialState
      //μεσα στο return πρεπει να μπαινουν ολα τα fields που θελουμε να επιστρεφει
      prepare(title, content, userId) {
        return {
          payload: {
            //the data that will be included when the action is dispatched
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        }
      },
    },
    // εδω δεν εχει prepare γιατι δεν χρειαζεται να προσθετουμε αυτοματα καποια fields
    reactionAdded(state, action) {
      // δεχεται τουλαχιστον μια παραμετρο
      const { postId, reaction } = action.payload
      const existingPost = state.find((post) => post.id === postId)
      console.log('existing post ',existingPost )
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
    postUpdated(state, action) {
      //παρολο που δεν το κανουμε update το id πρεπει παλι να γινει destruct
      const { id, title, content } = action.payload
      
      //post.id ειναι απο το initialState, id ειναι απο το action.payload
      const existingPost = state.find((post) => post.id === id)//post μεσα στο find ειναι τυχαιο ονομα


      if (existingPost) {
        //replace current title with the new title inside the action.payload
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
