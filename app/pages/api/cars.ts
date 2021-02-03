import { graphql } from 'graphql'
import { schema } from './graphql'

export const queryCars = `
    query($offset: Int, $limit: Int) {
        total
        cars(offset: $offset, limit: $limit) {
            id
            model
            make
            year
        }
    }
`

export default async function handler(req, res) {
    const p = Number(req.query.p || 1)
    const size = Number(process.env.NEXT_PUBLIC_SIZE)
    const vars = {
        limit: size,
        offset: (p - 1) * size
    }

    const cars = await graphql({ schema, source: queryCars, variableValues: vars })
    return res.status(200).json(cars)
}
