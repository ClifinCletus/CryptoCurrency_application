import React from 'react'
import {Spin} from 'antd'; // Importing Spin from Ant Design for loading spinner

const Loader = () => {
  return (
    <div className='loader'>

        <Spin tip="Loading..." size="large" className='loader-spinner' /> {/* Displaying a loading spinner with a message */}
        {/* The 'tip' prop is used to display a message while loading, and 'size' prop sets the size of the spinner */}
    </div>
  )
}

export default Loader