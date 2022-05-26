import Blog from './Blog'

const logOut = () => {
  window.localStorage.clear()
  window.location.reload();
  
}
const NewBlog = ({blogs, user}) => {

  return (
    <div>
      <p>{user.name} logged in </p>
      <button onClick={logOut}> Log Out</button>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
    
  )
}

 export default NewBlog