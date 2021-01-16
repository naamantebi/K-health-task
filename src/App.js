import React, { useState } from 'react';
import { makeStyles, Paper, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import { CustomTableCell } from './component/CustomTableCell';
import { EditTableCell } from './component/EditTableCell';
import { useMutation, useQuery } from '@apollo/client';
import { createCols, createRows } from './utils/formatter';
import { mockData } from './utils/mockData';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650
  }
}));


export default function App() {
  const graphService = Graph();
  const {data, loading, error} = useQuery(graphService.GetInfo);
  const [update, {res}] = useMutation(graphService.updateValue);
  const {headers, values} = data ? data : mockData;
  const [cols, setCols] = useState(createCols(headers));
  const [rows, setRows] = useState(createRows(values));

  const [previous, setPrevious] = useState(null);
  const [toUpdate, setToUpdate] = useState({});
  const classes = useStyles();

  if (loading) return <p>Loading...</p>;
  if (error) console.log(error);

  const onChange = async (e, changedRow) => {
    if (!previous) setPrevious(changedRow);
    const {value, name} = e.target;
    const {id} = changedRow;
    setToUpdate({
      ...toUpdate,
      [id]: {
        ...(toUpdate[id] || {}),
        [name]: value,
        row_id: id
      }
    });
    const newRows = rows.map(row => changedRow.id === row.id ? {...row, [name]: value} : row);
    setRows(newRows);
  };
  const onToggleEditMode = id => {
    const updatedRows = rows.map(row => row.id === id ? {
      ...row,
      isEditMode: !row.isEditMode
    } : row);
    setRows(updatedRows);
  };


  const clearSetToUpdate = (id) => setToUpdate({
    ...toUpdate,
    [id]: null
  });

  const onRevert = id => {
    const updatedRows = rows.map(row => row.id === id ? {...previous, isEditMode: false} : row);
    setRows(updatedRows);
    setPrevious(null);
    clearSetToUpdate(id);
  };

  const updateValues = params => update({variables: {...params}});

  const onDone = id => {
    const rowToUpdate = toUpdate[id];
    const {row_id, ...headers} = rowToUpdate;
    const parsedRowId = parseInt(row_id);
    const valuesToUpdate = Object.entries(headers).map(([headerId, value]) =>
      ({row_id: parsedRowId, header_id: parseInt(headerId), value}));
    Promise.all(valuesToUpdate.map(updateValues));
    const updatedRows = rows.map(row => row.id === id ? {...row, isEditMode: false} : row);
    setRows(updatedRows);
    clearSetToUpdate(id);
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell align="left"/>
            {cols.map(col => (
              <TableCell key={col.id} align="left">{col.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row =>
            <TableRow key={row.id}>
              <EditTableCell {...{onRevert, onToggleEditMode, onDone, row}}/>
              {cols.map(col =>
                <CustomTableCell key={`${col.id}+${row.id}`} row={row} name={col.id}
                                 onChange={onChange}/>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

