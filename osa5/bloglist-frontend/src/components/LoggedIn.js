import Blog from './Blog'
import NewBlogForm from './NewBlogForm'

const logOut = () => {
  window.localStorage.clear()
  window.location.reload();
}

const Logged = ({blogs, user, setBlogs, setMessage}) => {

  return (
    <div>
      <p>
        {user.name} logged in 
        <button onClick={logOut}>logout</button>
      </p>
      <NewBlogForm setBlogs={setBlogs} blogs={blogs} setMessage={setMessage}/>
      
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
    
  )
}

 export default Logged