import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toastr from 'toastr';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Clear from '@material-ui/icons/Clear';
import EditOutlined from '@material-ui/icons/EditOutlined';

import { fetchStaff, selectStaff } from '../../features/staffSlice';
import 'toastr/build/toastr.min.css';
import {
  STAFF_FETCH_URL,
  StaffData,
  TableColumn,
} from '../../constants/employees';
import { FULLTIME_HOURS } from '../../constants/global';
import employeesStyle from './employees.module.scss';

// A placeholder for authentication token
const getAuthenticationToken = (): string => 'xx';

/**
 * Functions which are called when add/edit/delete buttons are pressed.
 * Note that the signature of addUser is different from editUser/deleteUser.
 */

const addUser = () => toastr.info('Add user');

const editUser = (id: number) => () => toastr.info(`User ${id} edited`);

const deleteUser = (id: number) => () => toastr.info(`User ${id} deleted`);

/**
 * Functions which extract the data to be displayed in the table columns
 * from StaffData.
 */

const getName = ({ firstName, surname }: StaffData) =>
  `${firstName} ${surname}`;

const getJobTitle = ({ jobTitle }: StaffData) => jobTitle;

const partFullTime = (fullTimeHours: number) => ({
  contractedHours,
}: StaffData) => (contractedHours >= fullTimeHours ? 'full' : 'part');

const editUserButton = (editFunction: (o: number) => () => void) => ({
  id,
}: StaffData) => (
  <button
    type="button"
    className={employeesStyle.editButton}
    onClick={editFunction(id)}>
    <EditOutlined />
  </button>
);

const removeUserButton = (removeFunction: (o: number) => () => void) => ({
  id,
}: StaffData) => (
  <button
    type="button"
    className={employeesStyle.removeButton}
    onClick={removeFunction(id)}>
    <Clear />
  </button>
);

/**
 * Specifies the list of table columns to be displayed.
 * Each  column has the following properties:
 * id - column's unique id (also its class name for css)
 * name - column name - the top row of the table
 * content - a function taking StaffData as an argument
 *    and returning the value of the corresponding table
 *    cell
 */

const TABLE_COLUMNS = [
  { id: 'name', name: 'Name', content: getName },
  { id: 'job', name: 'Job title', content: getJobTitle },
  {
    id: 'partfull',
    name: 'Part/Full Time',
    content: partFullTime(FULLTIME_HOURS),
  },
  { id: 'editbtn', name: '', content: editUserButton(editUser) },
  { id: 'removebtn', name: '', content: removeUserButton(deleteUser) },
];

const renderTableHeaders = (tableColumns: TableColumn[]) => (
  <TableHead>
    <TableRow>
      {tableColumns.map(({ id, name }: TableColumn) => (
        <TableCell key={id} className={employeesStyle[id]}>
          {name}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

const renderTableRow = (tableColumns: TableColumn[]) => (row: StaffData) => (
  <TableRow key={row.id}>
    {tableColumns.map(({ id, content }: TableColumn) => (
      <TableCell key={id} className={employeesStyle[id]}>
        {content(row)}
      </TableCell>
    ))}
  </TableRow>
);

const renderTable = (tableColumns: TableColumn[]) => (data: StaffData[]) => (
  <Table size="small">
    {renderTableHeaders(tableColumns)}
    <TableBody>{data.map(renderTableRow(tableColumns))}</TableBody>
  </Table>
);

const addButton = (
  <div className={employeesStyle.addButtonContainer}>
    <Button
      className={employeesStyle.addButton}
      color="primary"
      variant="contained"
      size="small"
      onClick={addUser}>
      Add
    </Button>
  </div>
);

const Employees = () => {
  const staffList = useSelector(selectStaff);
  const dispatch = useDispatch();

  // Fetch data when component loads
  useEffect(() => {
    dispatch(fetchStaff(getAuthenticationToken(), STAFF_FETCH_URL));
  }, [dispatch]);

  return (
    <div className={employeesStyle.employees}>
      <h1> Employees </h1>
      {addButton}
      {renderTable(TABLE_COLUMNS)(staffList)}
    </div>
  );
};

export default Employees;
