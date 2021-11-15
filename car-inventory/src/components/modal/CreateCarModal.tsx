import React, { useEffect } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@material-ui/core'
import { selectCreateCarModalState, setShowCreateCarModalState } from '../../store/slices/createCarModalSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Field, Form } from "formik"
import * as Yup from 'yup'
import { TextFormField } from '../../fields/TextFormField'
import { addCar, selectAddCarsStatus } from '../../store/slices/carSlice'
import { Status } from '../../types/status.enum'
import { Car } from '../../types/car.interface'

const CreateCarModal = () => {

    const dispatch = useDispatch()
    const modalState = useSelector(selectCreateCarModalState)
    const addCarStatus = useSelector(selectAddCarsStatus)

    const validationSchema = Yup.object({
        make: Yup.string()
            .required('Make is required'),
        model: Yup.string()
            .required('Model is required'),
        year: Yup.string()
            .required('Year is required'),
    })

    const handleClose = () => {
        dispatch(setShowCreateCarModalState(false))
    }

    useEffect(() => {
        if (addCarStatus === Status.SUCCEEDED) {
            dispatch(setShowCreateCarModalState(false))
        }
    }, [dispatch, addCarStatus])

    return (
        <>
            <Dialog
                open={modalState}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <Formik
                    initialValues={{ make: '', model: '', year: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log("values", values)
                        const newCar = {
                            make: values.make,
                            model: values.model,
                            year: values.year
                        } as Car
                        dispatch(addCar(newCar))
                    }}
                >
                    {({ handleSubmit }) => (
                        <Form style={{ width: 500 }}>
                            <DialogTitle id="alert-dialog-title">
                                {"Add new car"}
                            </DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field
                                            name='make'
                                            fullWidth
                                            component={TextFormField}
                                            placeholder={'Make'}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            name='model'
                                            fullWidth
                                            component={TextFormField}
                                            placeholder={'Model'}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            name='year'
                                            fullWidth
                                            component={TextFormField}
                                            placeholder={'Year'}
                                        />
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                                <Button variant="outlined" onClick={() => handleSubmit()} autoFocus> Save</Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </>
    )
}

export default CreateCarModal