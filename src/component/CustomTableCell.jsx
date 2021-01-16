import {makeStyles, TableCell} from "@material-ui/core";
import Input from "@material-ui/core/Input/Input";
import React from "react";

const useStyles = makeStyles(theme => ({
    tableCell: {
        width: 130,
        height: 40
    },
    input: {
        width: 130,
        height: 40
    }
}));

export const CustomTableCell = ({ row, name, onChange }) => {
    const classes = useStyles();
    const { isEditMode } = row;
    return (
        <TableCell align="left" className={classes.tableCell}>
            {isEditMode ? (
                <Input
                    value={row[name] || ''}
                    name={`${name}`}
                    onChange={e => onChange(e, row)}
                    className={classes.input}
                />
            ) : (
                row[name] || ''
            )}
        </TableCell>
    );
};
