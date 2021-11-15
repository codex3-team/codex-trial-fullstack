import React from 'react'
import { FieldProps, getIn } from 'formik'
import { TextField } from '@material-ui/core'

export const TextFormField = (
    {
        field,
        form,
        ...props
    }: FieldProps) => {

    const errorText = getIn(form.touched, field.name) && getIn(form.errors, field.name)

    return (
        <TextField
            {...field}
            {...props}
            helperText={errorText}
            error={!!errorText}
        />
    )
}