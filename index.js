import express from "express"
import QueryFilterFns from "./lib/query_reductions"
import { applyWhereFilters } from "./lib/functional"

import knex from "./db/knex"

const app = express()

const ProviderAttrs = [
    "Provider Name",
    "Provider Street Address",
    "Provider City",
    "Provider State",
    "Provider Zip Code",
    "Hospital Referral Region Description",
    "Total Discharges",
    "Average Covered Charges",
    "Average Total Payments",
    "Average Medicare Payments"
]


app.get('/providers', (req, res) => {
    let { query } =  req
    let queryKeys = Object.keys(query)

    let upperBound = 30
    if (queryKeys.length > upperBound ){
        res.json([])
    } else {
        let validQueryKeys = queryKeys.filter((key) => { return key in QueryFilterFns })
        let queryKeyValues = validQueryKeys.map((key) => {
            let val = query[key]
            return {key, val}
        })

        let filterStrings = queryKeyValues.map((obj) => {
            let {key, val} = obj
            let queryFilterFn = QueryFilterFns[key]
            return queryFilterFn(val)
        })

        let initialQueryObj = knex.select(ProviderAttrs).from("provider_summary")
        let providerSummary = applyWhereFilters(filterStrings,initialQueryObj)

        providerSummary
            .then((results) => {
                res.json(results)
            })
            .catch((err) => {
                console.log('==> err', err);
            })
    }
})

let port = 3000
app.listen(port)
