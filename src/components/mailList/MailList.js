import './mailList.css'

import React from 'react'

const MailList = () => {
  return (
    <div className='mail'>
        <h1 className="mailTitle">Subscribe Here and be the first to know the offers!</h1>
        {/* <span className="mailDesc">Desc</span> */}
        <div className="inputContainer">
            <input type="text" placeholder='Your Mail' />
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default MailList