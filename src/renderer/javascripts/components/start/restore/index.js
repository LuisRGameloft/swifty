import React, { useState } from 'react'
import Backup from 'backup.svg'
import Import from './import'
import Confirm from './confirm'

export default ({ goBack }) => {
  const [step, setStep] = useState(null)
  const onImport = () => {
    setStep('confirmation')
  }

  return (
    <div className="lock-screen">
      <div className="top-lock">
        <Backup width="48" />
        <h2>Open Database</h2>
        <div className="instructions">
          If you've been using Swifty before you can open your data from
          databse file. Your Master Password will be required for this.
        </div>
      </div>
      <div className="bottom-lock">
        <Import
          display={step !== 'confirmation'}
          goBack={goBack}
          onImport={onImport}
        />
        <Confirm display={step === 'confirmation'} />
      </div>
    </div>
  )
}
