import IconButton from "@material-ui/core/IconButton";
import React from "react";
import {makeStyles, TableCell} from "@material-ui/core";
import EditIcon from "@material-ui/icons/EditOutlined";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";

const useStyles = makeStyles(theme => ({
    selectTableCell: {
        width: 60
    }
}));


export const EditTableCell = ({onRevert, onToggleEditMode, row, onDone}) => {
    const classes = useStyles();

    return (<TableCell className={classes.selectTableCell}>
        {row.isEditMode ? (
            <>
                <IconButton
                    aria-label="done"
                    onClick={() => onDone(row.id)}
                >
                    <DoneIcon />
                </IconButton>
                <IconButton
                    aria-label="revert"
                    onClick={() => onRevert(row.id)}
                >
                    <RevertIcon />
                </IconButton>
            </>
        ) : (
            <IconButton
                aria-label="delete"
                onClick={() => onToggleEditMode(row.id)}
            >
                <EditIcon />
            </IconButton>
        )}
    </TableCell>)
};
