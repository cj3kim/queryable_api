import { applyWhereFilters } from "../../lib/functional"
import { runTests } from "../helpers/runners"
import knex from "../../db/knex"
import QueryFilterFns from "../../lib/query_reductions"

describe("applyWhereFilters", function () {
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


    let fn = (filterStrings) => {
        let provider = knex.select(ProviderAttrs).from("provider_summary")
        let _knex = applyWhereFilters(provider, filterStrings)
        return _knex.toString()
    }

    let inputs = [
        [
             QueryFilterFns["max_discharges"](100),
             QueryFilterFns["min_discharges"](20)
        ],
        [
            QueryFilterFns["max_discharges"](100),
            QueryFilterFns["min_discharges"](10),
            QueryFilterFns["min_average_covered_charges"](30000),
            QueryFilterFns["max_average_covered_charges"](200000),
            QueryFilterFns["min_average_medicare_payments"](10000),
            QueryFilterFns["max_average_medicare_payments"](100000),
            QueryFilterFns["state"]("GA")
        ],
        [
            QueryFilterFns["max_discharges"](100),
            QueryFilterFns["min_average_covered_charges"](30000),
            QueryFilterFns["max_average_covered_charges"](200000),
            QueryFilterFns["state"]("GA")
        ],
        []
    ]

    let outputs = [
        `select "Provider Name", "Provider Street Address", "Provider City", "Provider State", "Provider Zip Code", "Hospital Referral Region Description", "Total Discharges", "Average Covered Charges", "Average Total Payments", "Average Medicare Payments" from "provider_summary" where "Total Discharges" <= 100 and "Total Discharges" >= 20`,
        `select "Provider Name", "Provider Street Address", "Provider City", "Provider State", "Provider Zip Code", "Hospital Referral Region Description", "Total Discharges", "Average Covered Charges", "Average Total Payments", "Average Medicare Payments" from "provider_summary" where "Total Discharges" <= 100 and "Total Discharges" >= 10 and "Average Covered Charges" >= 3000000 and "Average Covered Charges" <= 20000000 and "Average Medicare Payments" >= 1000000 and "Average Medicare Payments" <= 10000000 and "Provider State" = 'GA'`,
        `select "Provider Name", "Provider Street Address", "Provider City", "Provider State", "Provider Zip Code", "Hospital Referral Region Description", "Total Discharges", "Average Covered Charges", "Average Total Payments", "Average Medicare Payments" from "provider_summary" where "Total Discharges" <= 100 and "Average Covered Charges" >= 3000000 and "Average Covered Charges" <= 20000000 and "Provider State" = 'GA'`,
        `select "Provider Name", "Provider Street Address", "Provider City", "Provider State", "Provider Zip Code", "Hospital Referral Region Description", "Total Discharges", "Average Covered Charges", "Average Total Payments", "Average Medicare Payments" from "provider_summary"`,
    ]

    runTests(fn, inputs, outputs)
})

