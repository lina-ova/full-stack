import { useState, useEffect } from 'react'
import Logged from './components/LoggedInPage/LoggedIn'
import Login from './components/LoginPage/Login'
import blogService from './services/blogs'
import Notification from './components/Notification'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

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
      <Notification.Error message={errorMessage} />
      <Notification.Success message={successMessage} />
      {user === null
        ? <Login setUser={setUser} setErrorMessage={setErrorMessage}/>
        : <Logged blogs={blogs} user={user} setBlogs={setBlogs} setMessage={setSuccessMessage} />}
    </div>
  )
}

export default App