import assert from "assert"


function runTest (fn, input, output) {
    let result = fn.call(null, input)
    let _input = JSON.stringify(input)
    let _output = JSON.stringify(output)

    let templateString = `input: ${_input}\n      output: ${_output}`

    it(templateString, () => { assert.deepEqual(result, output) })
}

export function runTests(fn, inputs, expectedResults) {
    inputs.forEach((e, i) => {
        let input = e
        runTest(fn, input, expectedResults[i]); })
}

