import React from 'react'
import classnames from 'classnames'
import Error from './error'
import Touchid from 'touchid.svg'

export default React.forwardRef((props, ref) => {

  const cssClasses = () => {
    return classnames('masterpass-input', { error: props.error })
  }

  const placeholderText = () => {
    return props.placeholder || 'Master Password'
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter' && event.currentTarget.value !== '') {
      if (props.onEnter) props.onEnter(event.currentTarget.value)
    }
  }

  return (
    <div className={cssClasses()}>
      <Error error={props.error} />
      <input
        type="password"
        maxLength="24"
        placeholder={placeholderText()}
        onChange={props.onChange}
        onKeyDown={handleKeyDown}
        ref={ref}
      />
      {props.touchID && (
        <Touchid
          width="32"
          height="32"
          className="touchid"
          onClick={props.onTouchID}
        />
      )}
    </div>
  )
})
