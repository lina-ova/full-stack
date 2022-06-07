import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Info } from './Blog'



describe('renders title, author but not url and  likes',() => {
  test('renders title and author', () => {
    const blog = {
      title:'test',
      author:'test',
      url:'www.google.com',
      likes: 0,
      user:{ username:'lala' }
    }
    const mockHandler = jest.fn()
    render(<Info
      blog={blog}
      show={{ showMore:false, setShowMore: mockHandler }}
      like={{ likes:blog.likes, handleLike: mockHandler }}
      deleteButton={{ canDelete: true, handleDelete: mockHandler }} />)


    screen.getByText('test test')
  })

  test('doesnt render url', () => {
    const blog = {
      title:'test',
      author:'test',
      url:'www.google.com',
      likes: 0,
      user:{ username:'lala' }
    }
    const mockHandler = jest.fn()
    render(<Info
      blog={blog}
      show={{ showMore:false, setShowMore: mockHandler }}
      like={{ likes:blog.likes, handleLike: mockHandler }}
      deleteButton={{ canDelete: true, handleDelete: mockHandler }}/>)
    const url = screen.queryByText('www.google.com')
    expect(url).toBeNull()
    const likes = screen.queryByText('likes:')
    expect(likes).toBeNull()
  })
})

test('shows url', () => {
  const blog = {
    title:'test',
    author:'test',
    url:'www.google.com',
    likes: 0,
    user:{ username:'lala' }
  }
  const mockHandler = jest.fn()
  render(<Info
    blog={blog}
    show={{ showMore:true, setShowMore: mockHandler }}
    like={{ likes:blog.likes, handleLike: mockHandler }}
    deleteButton={{ canDelete: true, handleDelete: mockHandler }}/>)
  screen.queryByText('www.google.com')

})

test('clicking the button twive calls event handler twice', async () => {
  const blog = {
    title:'test',
    author:'test',
    url:'www.google.com',
    likes: 0
  }



  const mockHandler = jest.fn()

  render(
    <Info
      blog={blog}
      show={{ showMore:true, setShowMore: mockHandler }}
      like={{ likes:blog.likes, handleLike: mockHandler }}
      deleteButton={{ canDelete: true, handleDelete: mockHandler }}/>
  )

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)

})