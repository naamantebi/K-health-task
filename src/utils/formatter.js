export function createCols(headers) {
    let cols = [];
    if (headers) {
        cols = headers.map(item => {
            return {id: item.header_id, name: item.header_name}
        });
    }
    return cols;
}


export function createRows(values) {
    let rows = [];
    if (values) {
        const newRows = values.reduce((acc, item) => {
            if (acc[item.row_id]) {
                acc[item.row_id][item.header_id] = item.value
            } else {
                acc[item.row_id] = {isEditMode: false, id: item.row_id, [item.header_id]: item.value}
            }
            return acc
        }, {});
        rows = Object.values(newRows)
    }
    return rows;
}
