import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
const useStyles = makeStyles({
  table: {
    minWidth: 660,
  },
});

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }



export default function ClassesList(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Branch</TableCell>
            <TableCell align="left">Created By</TableCell>
            <TableCell align="left">Schedule Date</TableCell>
            <TableCell align="left">Start Date</TableCell>
            <TableCell align="left">End Date</TableCell>
            <TableCell align="left">Created Date</TableCell>
            <TableCell align="left">Advanced Amount</TableCell>
            <TableCell align="left">Total Amount</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.classesList.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="left">{row.branchId}</TableCell>
              <TableCell align="left">{row.createdBy}</TableCell>
              <TableCell align="left">{row.scheduleDate}</TableCell>
              <TableCell align="left">{row.startDateTime}</TableCell>
              <TableCell align="left">{row.endDateTime}</TableCell>
              <TableCell align="left">{row.createdDateTime}</TableCell>
              <TableCell align="left">{row.advanceAmount}</TableCell>
              <TableCell align="left">{row.totalAmount}</TableCell>
              <TableCell align="left">{row.status}</TableCell>
              <TableCell align="left">
                <NavLink style={{ textDecoration: 'none' }} to= "#" >
                  <EditIcon />
                </NavLink>
                {/* <EditIcon  onClick={() => {
              props.editRow(row)
            }}className="edit-delete-cursor" /> &nbsp;  */}
                <DeleteForeverIcon onClick={() => props.deleteUser(row.id)} className="edit-delete-cursor" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
