import React, { useState } from 'react'
import Masterpass from 'components/elements/masterpass'
import Back from 'back.svg'

export default ({ display, onEnter, goBack, onDataBaseFilePath }) => {
  const [dataBaseFile, setDataBaseFile] = useState(null)
  const [hashedSecret, setHashedSecret] = useState(null)
  const [error, setError] = useState(null)

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
    })
    window.DbFileSelect()
  }

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
