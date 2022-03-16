import React from 'react';
import { useField } from 'formik'
import { FormField, Label } from 'semantic-ui-react';

export default function TextInput({ label, ...props }) {
  const [ field, meta ] = useField(props)

  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <input {...field} {...props} />
      { meta.touched && meta.error ? (
        <Label basic color='red' style={{ borderStyle: 'none' }} content={meta.error} />
      ) : null }
    </FormField>
  )
}
 