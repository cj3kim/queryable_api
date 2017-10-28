const TotalDischarges   = "Total Discharges"
const AvgCoveredCharges = "Average Covered Charges"
const AvgMedicarePayments = "Average Medicare Payments"
const ProviderState = "Provider State"

const ConversionTypes = {
    "int": parseInt,
    "float": parseFloat,
    "none" : (a) => { return a }
}

function generateFilterFn (key, comparisonFnKey, dataType="none", multiply=false) {
    let multiplier = multiply ? 100 : 1

    return function (filterValue) {
        let parseFn = ConversionTypes[dataType]
        let _filterValue = parseFn(filterValue)

        let finalfilterValue = typeof(_filterValue) === "number" ? _filterValue * multiplier : _filterValue
        let filterStringArgs = [key,comparisonFnKey, finalfilterValue]
        return filterStringArgs
    }
}

const QueryFilterFns = {
    max_discharges: generateFilterFn(TotalDischarges, "<=", "int"),
    min_discharges: generateFilterFn(TotalDischarges, ">=", "int"),
    max_average_covered_charges: generateFilterFn(AvgCoveredCharges, "<=", "float", true),
    min_average_covered_charges: generateFilterFn(AvgCoveredCharges, ">=", "float", true),
    max_average_medicare_payments: generateFilterFn(AvgMedicarePayments, "<=", "float", true),
    min_average_medicare_payments: generateFilterFn(AvgMedicarePayments, ">=", "float", true),
    state: generateFilterFn(ProviderState, "="),
}

export default QueryFilterFns
