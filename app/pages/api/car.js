import { graphql } from 'graphql'
import { schema } from './graphql'

const insertCar = `
    mutation($make: String!, $model: String!, $year: String!) {
        insertCar(make: $make, model: $model, year: $year) {
            id
        }
    }
`

export default async function handler(req, res) {
    if (req.method == 'POST') {
        const car = await graphql({ schema, source: insertCar, variableValues: JSON.parse(req.body) })
        return res.status(200).json(car)
    }
}
