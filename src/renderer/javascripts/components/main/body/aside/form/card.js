import React from 'react'
import Field from './field'
import SecureField from './secure'
import TagField from './tag'

const Card = ({ entry, validate, onChange, onTagsChange }) => {
  const cardRefData = React.useRef()
  
  React.useEffect(() => {
    cardRefData.current.focus()
  },[])

  return (
    <>
      <Field
        name="Title"
        validate={validate}
        entry={entry}
        onChange={onChange}
        maxLength="40"
        ref={cardRefData}
      />
      <Field
        name="Number"
        validate={validate}
        entry={entry}
        onChange={onChange}
        maxLength="19"
      />
      <Field
        name="Month"
        validate={validate}
        entry={entry}
        onChange={onChange}
        maxLength="2"
      />
      <Field
        name="Year"
        validate={validate}
        entry={entry}
        onChange={onChange}
        maxLength="4"
      />
      <Field
        name="CVC"
        validate={validate}
        entry={entry}
        onChange={onChange}
        maxLength="4"
      />
      <SecureField
        name="Pin"
        validate={validate}
        entry={entry}
        onChange={onChange}
        maxLength="6"
      />
      <Field name="Name" entry={entry} onChange={onChange} />
      <TagField entry={entry} onChange={onTagsChange} />
    </>
  )
}

export default Card
