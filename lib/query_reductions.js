const TotalDischarges   = "Total Discharges"
const AvgCoveredCharges = "Average Covered Charges"
const AvgMedicarePayments = "Average Medicare Payments"
const ProviderState = "Provider State"

const ComparisonFns = {
    "<=" : (a, b) => { return a <= b},
    ">=" : (a, b) => { return a >= b},
    "===": (a, b) => { return a === b}

}


function generateFilterFn (key, comparisonFnKey) {
    let comparisonFn = ComparisonFns[comparisonFnKey]
    let fn = (ary, filterVal) => {
        return ary.filter((obj) => {
            let val = obj[key]
            return comparisonFn(val, filterVal)
        })
    }
    return fn
}

const QueryReductionFns = {
    max_discharges: generateFilterFn(TotalDischarges, "<="),
    min_discharges: generateFilterFn(TotalDischarges, ">="),
    max_average_covered_charges: generateFilterFn(AvgCoveredCharges, "<="),
    min_average_covered_charges: generateFilterFn(AvgCoveredCharges, ">="),
    min_average_medicare_payments: generateFilterFn(AvgMedicarePayments, "<="),
    max_average_medicare_payments: generateFilterFn(AvgMedicarePayments, ">="),
    state: generateFilterFn(ProviderState, "==="),
}

export default QueryReductionFns
