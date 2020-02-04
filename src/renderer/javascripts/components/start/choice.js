import React from 'react'
import NewUser from 'new_user.svg'
import Backup from 'backup.svg'

export default ({ onSelect }) => {
  return (
    <div className="lock-screen">
      <div className="top-lock">
        <NewUser width="48" />
        <h2>Database</h2>
        <div className="button" onClick={() => onSelect('setup')}>
         Create Database
        </div>
      </div>
      <div className="bottom-lock">
        <Backup width="48" />
        <h2>Use Database</h2>
        <div className="button" onClick={() => onSelect('restore')}>
          Open Database
        </div>
      </div>
    </div>
  )
}
