const Part = ({ text, ex }) => {
    return (
      <li>{text} {ex}</li>
    )
  }

const Header = ({header}) => {
  return <h1><b>{header}</b></h1>
}

const Content = ({content}) =>{
  return (
    <ul>
      {content.map(part => 
          <Part key={part.id}  text={part.name} ex={part.exercises}/>
      )}
    </ul>
  )
}
  
const Course = ({course}) => {
  const total = course.parts.reduce( (s,p) => s+p.exercises, 0)
  
    return (
      <div>
        <Header header={course.name} />
        <Content content={course.parts} />
        <p>Total of exercises {total}</p>
      </div>
    )
  }

  export default Course