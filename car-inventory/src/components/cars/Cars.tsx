import React, { Fragment, useEffect, useState } from 'react'
import { Box, Button, Card, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core'
import { fetchCars, selectFetchCarsStatus, selectCars } from '../../store/slices/carSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Status } from '../../types/status.enum'
import { CarPayload } from '../../types/carPayload.interface'
import { Car } from '../../types/car.interface'


const Cars = () => {

    const headerCellsName = ["Make", "Model", "Year"]
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState<string>('')

    const fetchCarStatus = useSelector(selectFetchCarsStatus)
    const cars = useSelector(selectCars)

    useEffect(() => {

        if (fetchCarStatus === Status.IDLE) {
            const carPayload = {
                page: 1,
                size: 10,
                sort: 'make'
            } as CarPayload
            dispatch(fetchCars(carPayload))
        }

    }, [dispatch, fetchCarStatus])

    const onSearchTermHandler = (event: { target: { value: React.SetStateAction<string> } }) => {
        setSearchTerm(event.target.value)
    }

    const filterCars = (car: Car) => {

        if (car.make.includes(searchTerm)) {
            return true
        }

        if (car.model.includes(searchTerm)) {
            return true
        }

        if (car.year.includes(searchTerm)) {
            return true
        }

        return false
    }

    return (
        <Fragment>
            <Grid container xs={12} direction="row" alignItems="center" justifyContent="space-between">
                <Grid item xs={9}>
                    <Box paddingLeft={1}>
                        <TextField
                            size="small"
                            placeholder="Search"
                            fullWidth
                            onChange={(event: any) => onSearchTermHandler(event)}
                        />
                    </Box>
                </Grid>
                <Grid item>
                    <Box paddingRight={1}>
                        <Button variant="outlined" size="large">Add new car</Button>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={3} paddingTop={2}>
                <Grid item xs={12}>
                    <Card>
                        <TableContainer>
                            <Table size="medium">
                                <TableHead>
                                    <TableRow>
                                        {
                                            headerCellsName.map((name) =>
                                                <TableCell>{name}</TableCell>
                                            )
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        cars.content.filter(car => filterCars(car)).map((car, index) => (
                                            <TableRow key={car.id}>
                                                <TableCell component="th" scope="row" align="left">
                                                    {car.make}
                                                </TableCell>
                                                <TableCell scope="row">
                                                    {car.model}
                                                </TableCell>
                                                <TableCell scope="row">
                                                    {car.year}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default Cars