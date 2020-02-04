import React, { useState } from 'react'
import Masterpass from 'components/elements/masterpass'

export default ({ display, hashedSecret, dbFile }) => {
  const [confirmation, setConfirmation] = useState(null)
  const [error, setError] = useState(null)

  const confirmpassRef = React.useRef()

  React.useEffect(() => {
    if(confirmpassRef && confirmpassRef.current) {
      confirmpassRef.current.focus()
    }
  })
  
  const onChange = event => {
    setError(null)
    setConfirmation(window.hashSecret(event.currentTarget.value))
  }

  const onSend = () => {
    if (hashedSecret === confirmation) {
      window.setupCryptor(hashedSecret)
      window.sendSetupDone(hashedSecret, dbFile)
    } else {
      setError('Passwords do not match')
      confirmpassRef.current.focus()
    }
  }

  if (!display) return null

  return (
    <div className="bottom-lock">
      <Masterpass
        placeholder="Confirm Master Password"
        error={error}
        onEnter={onSend}
        onChange={onChange}
        ref={confirmpassRef}
      />
      <br />
      <div className="button" onClick={onSend}>
        Finish
      </div>
    </div>
  )
}
