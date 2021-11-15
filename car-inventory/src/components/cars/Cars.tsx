import React, { Fragment, useEffect, useState } from 'react'
import { Box, Button, Card, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@material-ui/core'
import { fetchCars, selectFetchCarsStatus, selectCars, setFetchCarsStatus } from '../../store/slices/carSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Status } from '../../types/status.enum'
import { CarPayload } from '../../types/carPayload.interface'
import { Car } from '../../types/car.interface'
import { setShowCreateCarModalState } from '../../store/slices/createCarModalSlice'
import CreateCarModal from '../../components/modal/CreateCarModal'

interface Pagination {
    currentPage: number,
    pageSize: number,
    totalPages: number,
    totalOfItems: number,
    sort: string,
}

const Cars = () => {

    const headerCellsName = ["Make", "Model", "Year"]
    const dispatch = useDispatch()

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [pagination, setPagination] = useState<Pagination>({
        currentPage: 0,
        pageSize: 10,
        sort: 'make',
        totalPages: 0,
        totalOfItems: 0
    })

    const fetchCarStatus = useSelector(selectFetchCarsStatus)
    const cars = useSelector(selectCars)

    useEffect(() => {

        if (fetchCarStatus === Status.IDLE) {
            const carPayload = {
                page: pagination.currentPage,
                size: pagination.pageSize,
                sort: pagination.sort
            } as CarPayload
            dispatch(fetchCars(carPayload))
        }

        if (fetchCarStatus === Status.SUCCEEDED) {
            setPagination({ ...pagination, totalPages: cars.totalPages })
            dispatch(setFetchCarsStatus(Status.COMPLETE))
        }

    }, [cars.totalPages, dispatch, fetchCarStatus, pagination])

    const onSearchTermHandler = (event: { target: { value: React.SetStateAction<string> } }) => {
        setSearchTerm(event.target.value)
    }

    const handleNextPage = () => {
        setPagination({ ...pagination, currentPage: pagination.currentPage + 1 })
        dispatch(setFetchCarsStatus(Status.IDLE))
    }

    const handlePreviousPage = () => {
        setPagination({ ...pagination, currentPage: pagination.currentPage - 1 })
        dispatch(setFetchCarsStatus(Status.IDLE))
    }


    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {

        setPagination(prevState => {
            return Object.assign({}, prevState, {
                pageSize: parseInt(event.target.value),
                currentPage: 0,
            })
        })

        const carPayload = {
            page: 0,
            size: parseInt(event.target.value),
            sort: pagination.sort
        } as CarPayload

        dispatch(fetchCars(carPayload))
    }

    const handleOpenCreateCarModal = () => {
        dispatch(setShowCreateCarModalState(true))
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
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => { handleOpenCreateCarModal() }}
                        >
                            Add new car
                        </Button>
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
                                                <TableCell key={name}>{name}</TableCell>
                                            )
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        cars.content.filter(car => filterCars(car)).map((car) => (
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
                            <TablePagination
                                component="div"
                                count={pagination.totalPages}
                                page={pagination.currentPage}
                                onPageChange={() => { console.log() }}
                                rowsPerPage={pagination.pageSize}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                rowsPerPageOptions={[5, 10]}
                                backIconButtonProps={{
                                    'aria-label': 'Previous Page',
                                    'onClick': () => { handlePreviousPage() },
                                }}
                                nextIconButtonProps={{
                                    'aria-label': 'Next Page',
                                    'onClick': () => { handleNextPage() },
                                }}
                            />
                        </TableContainer>
                    </Card>
                </Grid>
            </Grid>
            <CreateCarModal />
        </Fragment>
    )
}

export default Cars