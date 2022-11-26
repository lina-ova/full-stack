import { connect } from "react-redux"
import {filter} from '../reducers/filterReducer'

const Filter = (props) => {

    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={(event) => props.filter(event.target.value)} />
      </div>
    )
  }

  const mapDispatchToProps = {
    filter,
  }
  const ConnectedFilter = connect(
    null,
    mapDispatchToProps)(Filter)
  export default ConnectedFilter