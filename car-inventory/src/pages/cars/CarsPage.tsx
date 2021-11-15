import { Typography } from '@material-ui/core'
import { Box } from '@material-ui/system'
import React, { Fragment } from 'react'
import { Cars } from '../../components/cars'

const CarsPage = () => {
    return (
        <Fragment>
            <Box paddingTop={6}>
                <Typography variant="h3" component="div" gutterBottom>
                    Car Inventory
                </Typography>
            </Box>
            <Cars />
        </Fragment>
    )
}

export default CarsPage


