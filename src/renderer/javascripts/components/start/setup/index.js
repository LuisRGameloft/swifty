import React, { useState } from 'react'
import NewUser from 'new_user.svg'
import Enter from './enter'
import Confirm from './confirm'

export default ({ goBack }) => {
  const [hashedSecret, setHashedSecret] = useState(null)
  const [dbfilePath, setdbfilePath] = useState(null)

  return (
    <div className="lock-screen">
      <div className="top-lock">
        <NewUser width="48" />
        <h2>Account Setup</h2>
        <div className="instructions">
          You need to set a Master Password to use Swifty. <br />
          This is the only password you have to remember. Make sure you never
          forget it.
        </div>
      </div>
      <Enter
        display={hashedSecret === null}
        goBack={goBack}
        onEnter={setHashedSecret}
        onDataBaseFilePath={setdbfilePath}
      />
      <Confirm display={hashedSecret !== null} hashedSecret={hashedSecret} dbFile={dbfilePath} />
    </div>
  )
}
