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
import { showModal } from '../../features/modalSlice';

import 'toastr/build/toastr.min.css';
import { StaffData, TableColumn } from '../../constants/employees';
import { FULLTIME_HOURS } from '../../constants/global';
import employeesStyle from './employees.module.scss';

interface CallbackFunction {
  (data: StaffData): () => void;
}
/**
 * Function which is called when edit buttons are pressed.
 */

const editUser = ({ id }: StaffData) => () => toastr.info(`User ${id} edited`);

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

const editUserButton = (editFunction: CallbackFunction) => (
  staff: StaffData
) => (
  <button
    type="button"
    className={employeesStyle.editButton}
    onClick={editFunction(staff)}>
    <EditOutlined />
  </button>
);

const removeUserButton = (removeFunction: CallbackFunction) => (
  staff: StaffData
) => (
  <button
    type="button"
    className={employeesStyle.removeButton}
    onClick={removeFunction(staff)}>
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

const makeTableColumns = (
  editCallback: CallbackFunction,
  deleteCallback: CallbackFunction
) => [
  { id: 'name', name: 'Name', content: getName },
  { id: 'job', name: 'Job title', content: getJobTitle },
  {
    id: 'partfull',
    name: 'Part/Full Time',
    content: partFullTime(FULLTIME_HOURS),
  },
  { id: 'editbtn', name: '', content: editUserButton(editCallback) },
  { id: 'removebtn', name: '', content: removeUserButton(deleteCallback) },
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

const AddButton = () => {
  const dispatch = useDispatch();

  const createAddModal = () => {
    dispatch(showModal({ modalType: 'CREATE_USER' }));
  };
  return (
    <div className={employeesStyle.addButtonContainer}>
      <Button
        className={employeesStyle.addButton}
        color="primary"
        variant="contained"
        size="small"
        onClick={createAddModal}>
        Add
      </Button>
    </div>
  );
};

const Employees = () => {
  const staffList = useSelector(selectStaff);
  const dispatch = useDispatch();

  const openDeleteModal = (staff: StaffData) => () => {
    dispatch(showModal({ modalType: 'DELETE_USER', modalProps: { staff } }));
  };

  const tableColumns = makeTableColumns(editUser, openDeleteModal);

  // Fetch data when component loads
  useEffect(() => {
    dispatch(fetchStaff);
  }, [dispatch]);

  return (
    <div className={employeesStyle.employees}>
      <h1> Employees </h1>
      <AddButton />
      {renderTable(tableColumns)(staffList)}
    </div>
  );
};

export default Employees;
