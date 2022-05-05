import './index.css'

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    if(message.includes('already')){
      return (<div className='error'>
        {message}
      </div>)
    }else{
      return (
        <div className="message">
          {message}
        </div>
      )
    }
    
  }

export default Notification