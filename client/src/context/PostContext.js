import { useState, useEffect, createContext } from 'react'
import { createAPIEndpoint, ENDPOINTS } from '../api'
import { toast } from 'react-toastify'

const PostContext = createContext()

export const PostProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])

  const fetchPosts = () => {
    createAPIEndpoint(ENDPOINTS.POSTS)
      .fetch()
      .then((res) => {
        setPosts(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        toast.error(`Something went wrong upon fetching posts: ${err}`)
      })
  }

  const addPost = (newPost) => {
    createAPIEndpoint(ENDPOINTS.ADD_POST)
      .create(newPost)
      .then((res) => {
        console.log('res.data', res.data)
        setIsLoading(true)
        const newPosts = [...posts, res.data]
        setPosts(newPosts)
        setIsLoading(false)
        toast.success(' A new post has been created')
      })
      .catch((err) => {
        setIsLoading(false)
        toast.error(`Something went wrong upon creating post: ${err}`)
      })
  }

  const updatePost = (updPost) => {
    createAPIEndpoint(ENDPOINTS.UPDATE_POST)
      .update(updPost)
      .then((res) => {
        setIsLoading(true)
        const newPosts = posts.map((post) => {
          return post.postId === updPost.postId ? { ...post, ...updPost } : post
        })
        setPosts(newPosts)
        setIsLoading(false)
        toast.success(`Post ${updPost.postId} has been updated`)
      })
      .catch((err) => {
        setIsLoading(false)
        toast.error(`Something went wrong upon updating post: ${err}`)
      })
  }

  const deletePost = (id) => {
    setIsLoading(true)
    createAPIEndpoint(ENDPOINTS.REMOVE_POST)
      .delete(id)
      .then((res) => {
        const newPosts = posts.filter((post) => post.postId !== id)
        setPosts(newPosts)
        setIsLoading(false)
        toast.success(`Post ${id} has been deleted`)
      })
      .catch((err) => {
        setIsLoading(false)
        toast.error(`Something went wrong upon deleting post: ${err}`)
      })
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <PostContext.Provider
      value={{
        isLoading,
        posts,
        deletePost,
        addPost,
        updatePost,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export default PostContext
