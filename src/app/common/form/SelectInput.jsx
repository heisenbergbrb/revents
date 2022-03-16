import React from 'react';
import { useField } from 'formik'
import { FormField, Label, Select } from 'semantic-ui-react';

export default function SelectInput({ label, ...props }) {
  const [ field, meta, helpers ] = useField(props)

  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <Select
        { ...props }
        clearable
        value={field.value || null}
        onChange={(e, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
      />
      { meta.touched && meta.error ? (
        <Label basic color='red' style={{ borderStyle: 'none' }} content={meta.error} />
      ) : null }
    </FormField>
  )
}
 