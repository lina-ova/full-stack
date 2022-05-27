import { useState } from 'react'
import blogService from '../../services/blogs'


const Blog = ({ blog, setBlogs, blogs, user }) => {
  const [showAll, setShowAll] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showDetails = () => {
    setShowAll(!showAll)
  }

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
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={showDetails}> view </button>
      {showAll &&
      <>
        <p>{blog.url}</p>
        <p>likes: {likes}<button onClick={handleLike}>like</button></p>
        <p>By: {blog.author}</p>
        {blog.user.username === user.username && <button onClick={handleDelete}>remove</button>}
      </>
      }
    </div>
  )
}

export default Blog