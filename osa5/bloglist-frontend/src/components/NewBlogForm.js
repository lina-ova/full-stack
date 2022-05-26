import { useState } from "react"
import blogService from '../services/blogs'

const NewBlogForm = ({setBlogs, blogs, setMessage}) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')


  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title,
      url,
    }

    const savedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(savedBlog))
    setMessage(`new blog ${title} by ${author} was added`)
    setTitle('')
    setUrl('')
    setAuthor('')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title 
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)} 
            required/>
        </div>
      <div>
      url 
        <input
          type="url"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)} 
          required/>
      </div>
      <div>
      author 
        <input
          type="text"
          value={author}
          name="url"
          onChange={({ target }) => setAuthor(target.value)} />
      </div>
      
      <button type="submit">save</button>
      </form> 
    </div>
  )
}

export default NewBlogForm