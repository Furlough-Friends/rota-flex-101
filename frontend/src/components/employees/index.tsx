import React from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import employeesStyle from './employees.module.scss';

interface tableColumn {
  id: string;
  name: string;
  content: (o: staffData) => any;
}

interface staffData {
  id: number;
  firstName: string;
  surname: string;
  jobTitle: string;
  contractedHours: number;
}

const FULLTIME_HOURS = 37.5;
const editUser = (id: number) => toastr.info(`User ${id} edited`);
const deleteUser = (id: number) => toastr.info(`User ${id} deleted`);

const getName = ({ firstName, surname }: staffData) =>
  `${firstName} ${surname}`;
const getJobTitle = ({ jobTitle }: staffData) => jobTitle;
const partFullTime = ({ contractedHours }: staffData) =>
  contractedHours >= FULLTIME_HOURS ? 'full' : 'part';
const editUserButton = ({ id }: staffData) => (
  <button
    type="button"
    className={employeesStyle.editButton}
    onClick={() => editUser(id)}>
    &#x1F589;
  </button>
);
const removeUserButton = ({ id }: staffData) => (
  <button
    type="button"
    className={employeesStyle.removeButton}
    onClick={() => deleteUser(id)}>
    X
  </button>
);

// A list of table column names and the function on how to derive the quantity from raw data
const TABLE_COLUMNS = [
  { id: 'name', name: 'Name', content: getName },
  { id: 'job', name: 'Job title', content: getJobTitle },
  { id: 'partfull', name: 'Part/Full Time', content: partFullTime },
  { id: 'editbtn', name: '', content: editUserButton },
  { id: 'removebtn', name: '', content: removeUserButton },
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

const renderTableRow = (tableColumns: tableColumn[]) => (row: staffData) => (
  <tr key={row.id}>
    {tableColumns.map(({ id, content }: tableColumn) => (
      <td key={id} className={employeesStyle[id]}>
        {content(row)}
      </td>
    ))}
  </tr>
);

const renderTable = (tableColumns: tableColumn[]) => (data: staffData[]) => (
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

const Employees = () => (
  <div className={employeesStyle.employees}>
    <h1> Employees </h1>
    {addButton}
    {renderTable(TABLE_COLUMNS)(FAKE_DATA)}
  </div>
);

export default Employees;
