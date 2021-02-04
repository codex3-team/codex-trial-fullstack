module.exports = {
    client: 'pg',
    connection: `${process.env.PG_PREP}${process.env.DB_NAME}`,
    migrations: {
        directory: './knex/migrations'
    },
    seeds: {
        directory: './knex/seeds'
    },
    useNullAsDefault: true
}
