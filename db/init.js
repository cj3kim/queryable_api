import knex from "./knex"

knex.schema.createTable("provider_summary", function (table) {
    table.index("Provider Id")
    table.string("DRG Definition")
    table.integer("Provider Id")
    table.string("Provider Name")
    table.string("Provider Street Address")
    table.string("Provider City")
    table.string("Provider State")
    table.string("Provider Zip Code")
    table.string("Hospital Referral Region Description")
    table.integer("Total Discharges")
    table.integer("Average Covered Charges")
    table.integer("Average Total Payments")
    table.integer("Average Medicare Payments")
    table.timestamps();
})
.then((result) => {

    console.log("==> Provider summary table has been created.");
})
