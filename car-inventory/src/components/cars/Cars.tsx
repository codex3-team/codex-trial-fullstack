import React, { Fragment } from 'react'
import { Box, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core'


const Cars = () => {

    const headerCellsName = ["Id", "Make", "Model", "Year"]

    return (
        <Fragment>
            <Grid container xs={12} direction="row" alignItems="center" justifyContent="space-between">
                <Grid item xs={9}>
                    <Box paddingLeft={1}>
                        <TextField id="outlined-basic" size="small" placeholder="Search" fullWidth />
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
                    <TableContainer>
                        <Table size="small">
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

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default Cars