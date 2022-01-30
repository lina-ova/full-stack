import React from 'react'

const Header = (props) =>{
  return <h1>{props.course}</h1>


}
const Content = (props) => {
  return (
    <div>
      <Part name={props.content[0].name} ex={props.content[0].exercises} />
      <Part name={props.content[1].name} ex={props.content[1].exercises} />
      <Part name={props.content[2].name} ex={props.content[2].exercises} />
    </div>
  )
}

const Part = (props) => {
  return <p> {props.name} {props.ex}</p>
}

const Total = (props) => {
  let total=0
  props.ex.forEach(part=>{total+=part.exercises})

  return <p>Number of exercises {total}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
      <div>
        <Header course={course.name} />
        <Content content={course.parts} />
        <Total ex={course.parts} />
      </div>
    )
}

export default App