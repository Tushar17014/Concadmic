// components imported from packages
import React from 'react'

// CSS imported
import './Components.scss';

const Spinner = () => {
  return (
    <>
    <div className="spinner-border text-primary mt-5 spinner" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
    </>
  )
}

export default Spinner