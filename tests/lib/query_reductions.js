
import { runTests } from "../helpers/runners"
import QueryFilterFns from "../../lib/query_reductions"

const TotalDischarges   = "Total Discharges"
const AvgCoveredCharges = "Average Covered Charges"
const AvgMedicarePayments = "Average Medicare Payments"
const ProviderState = "Provider State"

describe("QueryFilterFns", function () {
    const queryKeys = [
        "max_discharges",
        "min_discharges",
        "max_average_covered_charges",
        "min_average_covered_charges",
        "max_average_medicare_payments",
        "min_average_medicare_payments",
        "state"
    ]
    const queryVals = [100, 10, 400, 1000, 900, 4000, "CA"]

    let inputs = queryKeys.map((key, i) => {
        return [key, queryVals[i]]
    })

    let outputs = [
        [TotalDischarges,"<=",100],
        [TotalDischarges,">=",10],
        [AvgCoveredCharges,"<=",40000],
        [AvgCoveredCharges,">=",100000],
        [AvgMedicarePayments,"<=",90000],
        [AvgMedicarePayments,">=",400000],
        [ProviderState,"=","CA"],
    ]

    let fn = (args) => {
        let [key, val] = args
        let queryFilterStringArgs = QueryFilterFns[key](val)
        return queryFilterStringArgs
    }
    runTests(fn, inputs, outputs)
})
