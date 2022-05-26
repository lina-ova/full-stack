import { useState, useEffect } from 'react'
import NewBlog from './components/LoggedIn'
import Login from './components/Login'
import blogService from './services/blogs'
import Notification from './components/Notification'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)

      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null
        ? <Login setUser={setUser} setErrorMessage={setErrorMessage}/>
        : <NewBlog blogs={blogs} user={user} />}
      
    </div>
  )
}

export default App
