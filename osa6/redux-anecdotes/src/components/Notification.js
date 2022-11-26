import {connect } from 'react-redux'


const Notification = (props) => {
  const notification = props.notifications
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,

  }
}

const ConnectedNotifications = connect(mapStateToProps)(Notification)
export default ConnectedNotifications