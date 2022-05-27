import Blog from './Blog'
import NewBlogForm from './NewBlogForm'
import Togglable from './Toggleble'
import { useRef } from 'react'


const logOut = () => {
  window.localStorage.clear()
  window.location.reload()
}



const Logged = ({ blogs, user, setBlogs, setMessage }) => {

  const blogFormRef = useRef()
  const BlogForm = () => (
    <Togglable buttonLabel='create' ref={blogFormRef}>
      <NewBlogForm setBlogs={setBlogs} blogs={blogs} setMessage={setMessage} />
    </Togglable>
  )

  return (
    <div>
      <p>
        {user.name} logged in
        <button onClick={logOut}>logout</button>
      </p>


      <BlogForm />


      <h2>blogs</h2>
      {blogs.sort((a,b) => b.likes-a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} user ={user}/>)}

    </div>
  )
}

export default Logged