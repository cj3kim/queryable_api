import express from "express"
import QueryFilterFns from "./lib/query_reductions"
import { applyWhereFilters } from "./lib/functional"
import { ProviderAttrs } from "./lib/provider_attrs"
import Config from "./config.json"
import knex from "./db/knex"

const app = express()

const SqlResultCache = {}

app.get('/providers', (req, res) => {
    let { query } =  req
    let queryKeys = Object.keys(query)
    let { upperBound } = Config.http.request.query

    // if someone tries to add thousands of query values, respond with an empty result.
    if (queryKeys.length > upperBound ){
       return res.json([])
    }

    // 1. Filter out invalid query keys from query Url values
    let validQueryKeys = queryKeys.filter((key) => { return key in QueryFilterFns })
    let queryKeyValues = validQueryKeys.map((key) => {
        let val = query[key]
        return {key, val}
    })

    // 2. If users want to get the full data, check the cache first.
    if (validQueryKeys.length === 0) {
        let fullDataSet = SqlResultCache["fullDataSet"]
        if (fullDataSet) {
            return res.json(fullDataSet)
        }

        let finalQueryObj = knex.select(ProviderAttrs).from("provider_summary")
        return finalQueryObj.then((results) => {
            SqlResultCache["fullDataSet"] = results
            res.json(results)
        })
    }

    // 3. Generate SQL filters (WHERE statements) from valid query values
    let filterStringArgs = queryKeyValues.map((obj) => {
        let {key, val} = obj
        let queryFilterFn = QueryFilterFns[key]
        let filterStringArg = queryFilterFn(val)
        return filterStringArg
    })

    // 4. Build Query String
    let initialQueryObj = knex.select(ProviderAttrs).from("provider_summary")
    let providerSummary = applyWhereFilters(initialQueryObj, filterStringArgs)

    // 5. Send Query to the database and generate a response
    providerSummary
        .then((results) => { res.json(results) })
        .catch((err) => {
            console.log('==> err', err);
        })
})

let port = 3000
app.listen(port)
