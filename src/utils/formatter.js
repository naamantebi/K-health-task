export function createCols(headers) {
    return headers.map( item => {
        return {id: item.header_id, name: item.header_name}
        });
}


export function createRows(values) {
    const rows = values.reduce((acc, item) => {
        if (acc[item.row_id]) {
            acc[item.row_id][item.header_id] = item.value
        } else {
            acc[item.row_id] = {isEditMode: false, id: item.row_id, [item.header_id]: item.value}
        }
        return acc
    }, {});
    return Object.values(rows)
}
