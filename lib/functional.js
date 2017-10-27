export function applyFns (fns, ary) {
    let result = ary
    fns.forEach((fn) => {
        result = fn(result)
    })
    return result
}
export function applyWhereFilters (filterStrings, obj) {
    let knex = obj
    filterStrings.forEach((filterString, i) => {
        knex =  i === 0 ? knex.where.apply(knex, filterString) : knex.andWhere.apply(knex, filterString)
    })
    return knex
}


