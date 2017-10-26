import Knex from "knex"
import config from "./config"

let {
    client,
    version,
    connection
} = config

const knex = Knex({
    client,
    version,
    connection
});

export default knex
