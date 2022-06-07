import { useState } from 'react'
import blogService from '../../../services/blogs'



const Info = ({ blog, show, like, deleteButton }) => {
  const { title, author, url } = blog
  const { showMore, setShowMore } = show
  const { likes, handleLike } = like
  const { canDelete, handleDelete } = deleteButton

  return (
    <div className='blog'>
      {title} {author}
      <button onClick={setShowMore}> view </button>
      {showMore &&
        <>
          <p>{url}</p>
          <p>
            likes: {likes}
            <button onClick={handleLike}> like </button>
          </p>
          <p>By: {author}</p>
        </>
      }
      {showMore && canDelete &&
        <button onClick={handleDelete}>delete</button>
      }
    </div>
  )
}


const Blog = ({ blog, setBlogs, blogs, user }) => {
  const [likes, setLikes] = useState(blog.likes)
  const [showMore, setShowMore] = useState(false)
  const canDelete= (blog.user.username === user.username)

  const handleLike = async () => {
    const { title, url, author, likes, } = blog
    const changedBlog = {
      title,
      url,
      author,
      user: blog.user.id,
      likes: likes +1
    }
    setLikes(blog.likes+1)
    const savedBlog = await blogService.update(blog.id,changedBlog)
    setBlogs(blogs.map(BlogIn => BlogIn.id !==savedBlog.id ? BlogIn : savedBlog))
  }

  const handleDelete = async() => {
    const confirm = window.confirm(`Removing blog ${blog.title} by ${blog.author}`)
    if (confirm){
      await blogService.remove(blog.id)
      setBlogs(blogs.filter((Blog) => Blog.id !== blog.id))
    }
  }

  return (
    <Info
      blog={blog}
      show = {{ showMore, setShowMore: () => setShowMore(!showMore) }}
      like= {{ likes, handleLike }}
      deleteButton={{ canDelete, handleDelete }}
    />
  )
}

export { Blog, Info }