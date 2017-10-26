import { Converter } from "csvtojson"
import path from "path"
import fs from "fs"

let converter = new Converter({});
let fileName = "Inpatient_Prospective_Payment_System__IPPS__Provider_Summary_for_the_Top_100_Diagnosis-Related_Groups__DRG__-_FY2011.csv"
let filePath = path.join(__dirname,"..", "raw_data", fileName)

let newFileName = "provider_summary.json"
let newFilePath = path.join(__dirname, newFileName)

converter.fromFile(filePath, (err, result) => {
    if (err) {
        console.log('==> err', err);
    }

    let jsonString = JSON.stringify(result)
    fs.writeFile(newFilePath, jsonString, (err) => {
        if (err) throw err;
        console.log('It\'s saved!');
    });
});
