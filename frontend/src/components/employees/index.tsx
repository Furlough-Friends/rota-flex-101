import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toastr from 'toastr';
import { StaffData, set, selectStaff } from '../../features/staffSlice';
import 'toastr/build/toastr.min.css';
import employeesStyle from './employees.module.scss';

interface tableColumn {
  id: string;
  name: string;
  content: (o: StaffData) => any;
}

const FULLTIME_HOURS = 37.5;
const editUser = (id: number) => () => toastr.info(`User ${id} edited`);
const deleteUser = (id: number) => () => toastr.info(`User ${id} deleted`);

const getName = ({ firstName, surname }: StaffData) =>
  `${firstName} ${surname}`;
const getJobTitle = ({ jobTitle }: StaffData) => jobTitle;
const partFullTime = (fullTimeHours: number) => ({
  contractedHours,
}: StaffData) => (contractedHours >= fullTimeHours ? 'full' : 'part');
const editUserButton = (editFunction: (o: number) => () => any) => ({
  id,
}: StaffData) => (
  <button
    type="button"
    className={employeesStyle.editButton}
    onClick={editFunction(id)}>
    &#x1F589;
  </button>
);
const removeUserButton = (removeFunction: (o: number) => () => any) => ({
  id,
}: StaffData) => (
  <button
    type="button"
    className={employeesStyle.removeButton}
    onClick={removeFunction(id)}>
    X
  </button>
);

// A list of table column names and the function on how to derive the quantity from raw data
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

const FAKE_DATA = [
  {
    id: 1,
    firstName: 'foo',
    surname: 'bar',
    jobTitle: 'baz',
    contractedHours: 999,
  },
  { id: 2, firstName: 'a', surname: 'b', jobTitle: 'c', contractedHours: 9 },
];

const renderTableHeaders = (tableColumns: tableColumn[]) => (
  <thead>
    <tr>
      {tableColumns.map(({ id, name }: tableColumn) => (
        <th key={id} className={employeesStyle[id]}>
          {name}
        </th>
      ))}
    </tr>
  </thead>
);

const renderTableRow = (tableColumns: tableColumn[]) => (row: StaffData) => (
  <tr key={row.id}>
    {tableColumns.map(({ id, content }: tableColumn) => (
      <td key={id} className={employeesStyle[id]}>
        {content(row)}
      </td>
    ))}
  </tr>
);

const renderTable = (tableColumns: tableColumn[]) => (data: StaffData[]) => (
  <table>
    {renderTableHeaders(tableColumns)}
    <tbody>{data.map(renderTableRow(tableColumns))}</tbody>
  </table>
);

const addButton = (
  <button
    type="button"
    className={employeesStyle.addButton}
    onClick={() => toastr.info('Add user')}>
    Add
  </button>
);

const Employees = () => {
  const dispatch = useDispatch();
  const staffList = useSelector(selectStaff);

  // Fetch data when component loads
  useEffect(() => {
    dispatch(set(FAKE_DATA));
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
