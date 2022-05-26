import { useState, useEffect } from 'react'
import Logged from './components/LoggedIn'
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
        : <Logged blogs={blogs} user={user} setBlogs={setBlogs} setMessage={setErrorMessage} />}
      
    </div>
  )
}

export default App
