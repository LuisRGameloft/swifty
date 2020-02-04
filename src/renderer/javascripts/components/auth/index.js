import React, { useState } from 'react'
import Masterpass from '../elements/masterpass'
import Controls from '../elements/controls'
import img from 'swifty.png'

export default ({ touchID }) => {
  const [error, setError] = useState(null)

  const authpassRef = React.useRef()

  React.useEffect(() => {
    if(authpassRef && authpassRef.current) {
      authpassRef.current.focus()
    }
  })

  const handleEnter = value => {
    const hashedSecret = window.hashSecret(value)
    window.setupCryptor(hashedSecret)
    window.sendAuthStart(hashedSecret)
    window.onAuthFail(() => {
      setError('Incorrect Master Password')
      authpassRef.current.focus()
    })
  }

  const handleTouchId = () => {
    window.sendAuthTouchId()
  }

  const handleChange = () => {
    setError(null)
  }

  return (
    <>
      <Controls />
      <div className="lock-screen">
        <div className="top-lock">
          <img src={img} alt="" width="72" />
        </div>
        <div className="bottom-lock">
          <Masterpass
            touchID={touchID}
            error={error}
            onChange={handleChange}
            onEnter={handleEnter}
            onTouchID={handleTouchId}
            ref={authpassRef}
          />
        </div>
      </div>
    </>
  )
}
