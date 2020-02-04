import React from 'react'
import classnames from 'classnames'

export default React.forwardRef((props, ref) => {
  const isEmpty = () => {
    return props.entry[props.name.toLowerCase()].trim() === ''
  }

  const classNames = () => {
    return classnames('field', { error: props.validate && isEmpty() })
  }

  const renderInput = () => {
    if (props.rows && props.rows !== '1') {
      return (
        <textarea
          name={props.name.toLowerCase()}
          cols="10"
          rows={props.rows}
          onChange={props.onChange}
          maxLength={props.maxLength ? props.maxLength : ''}
          value={props.entry[props.name.toLowerCase()]}
        />
      )
    }
    return (
      <input
        name={props.name.toLowerCase()}
        type="text"
        maxLength={props.maxLength ? props.maxLength : ''}
        onChange={props.onChange}
        value={props.entry[props.name.toLowerCase()]}
        ref={ref}
      />
    )
  }

  return (
    <div className={classNames()}>
      <label htmlFor="">{props.name}</label>
      {renderInput()}
    </div>
  )
})
