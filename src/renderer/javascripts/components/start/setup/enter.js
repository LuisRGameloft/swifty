import React, { useState } from 'react'
import Masterpass from 'components/elements/masterpass'
import Back from 'back.svg'

export default ({ display, onEnter, goBack, onDataBaseFilePath }) => {
  const [dataBaseFile, setDataBaseFile] = useState(null)
  const [hashedSecret, setHashedSecret] = useState(null)
  const [error, setError] = useState(null)

  const masterpassRef = React.useRef()

  React.useEffect(() => {
    if(masterpassRef && masterpassRef.current) {
      masterpassRef.current.focus()
    }
  })

  const onChange = event => {
    setError(null)
    setHashedSecret(window.hashSecret(event.currentTarget.value))
  }

  const onSend = () => {
    if (!dataBaseFile) {
      setError('Please create a new database file')
      return
    }
    
    if (hashedSecret) {
      onEnter(hashedSecret)
      onDataBaseFilePath(dataBaseFile)
    } else {
      setError('Fill in the password')
    }
  }

  const onOpenDataBase = () => {
    window.onDBSelectFilePath((event, path) => {
      setDataBaseFile(path)
      masterpassRef.current.focus()
    })
    window.DbFileSelect()
  }

  window.onDBCancelSelectFilePath((event) => {
    masterpassRef.current.focus()
  })
  
  if (!display) return null

  return (
    <div className="bottom-lock">
      <div className="button" onClick={onOpenDataBase}>
        Database File
      </div>
      <br />
      <Masterpass
        placeholder="Set Master Password"
        error={error}
        onEnter={onSend}
        onChange={onChange}
        ref={masterpassRef}
      />
      <br />
      <div className="button" onClick={onSend}>
        Continue
      </div>
      <span className="navigate-back" onClick={() => goBack()}>
        <Back width="15" /> Go Back
      </span>
    </div>
  )
}
