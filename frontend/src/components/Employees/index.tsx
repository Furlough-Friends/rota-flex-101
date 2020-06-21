import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'toastr/build/toastr.min.css';

import Button from '@material-ui/core/Button';
import Clear from '@material-ui/icons/Clear';
import EditOutlined from '@material-ui/icons/EditOutlined';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React, { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useDispatch, useSelector } from 'react-redux';

import { useAuth0 } from '../../auth0Spa';
import { Employee } from '../../model';
import { fetchEmployee, selectEmployees } from '../../store/employeeSlice';
import { ModalType, showModal } from '../../store/modalSlice';
import { capitalizeFirstLetter } from '../../utils/string';
import employeesStyle from './employees.module.scss';

interface CallbackFunction {
  (data: Employee): () => void;
}

const fullTimeHours = 37.5;

/**
 * Functions which extract the data to be displayed in the table columns
 * from Employee.
 */

const getName = ({ firstName, surname }: Employee) => `${firstName} ${surname}`;

const getJobTitle = ({ jobTitle }: Employee) => capitalizeFirstLetter(jobTitle);

const partFullTime = ({ contractedHours }: Employee) =>
  contractedHours >= fullTimeHours ? 'Full' : 'Part';

const EditUserButton = () => (
  <button type="button" className={employeesStyle.editButton}>
    <EditOutlined />
  </button>
);

const RemoveUserButton = () => (
  <button type="button" className={employeesStyle.removeButton}>
    <Clear />
  </button>
);

enum ColumnNames {
  Name = 'name',
  Job = 'job',
  PartFull = 'partFull',
  Edit = 'editbtn',
  Remove = 'removebutton',
}

const COLUMN_DEFS = [
  { field: ColumnNames.Name, headerName: 'Name', sortable: true },
  { field: ColumnNames.Job, headerName: 'Job title', sortable: true },
  {
    field: ColumnNames.PartFull,
    headerName: 'Part/Full Time',
  },
  {
    field: ColumnNames.Edit,
    headerName: '',
    type: 'rightAligned',
    pinned: 'right',
    width: 60,
    cellRenderer: () => ReactDOMServer.renderToStaticMarkup(<EditUserButton />),
  },
  {
    field: ColumnNames.Remove,
    headerName: '',
    type: 'rightAligned',
    pinned: 'right',
    width: 60,
    cellRenderer: () =>
      ReactDOMServer.renderToStaticMarkup(<RemoveUserButton />),
  },
];

const generateRow = (employee: Employee) => ({
  id: employee.id,
  rawData: employee,
  name: getName(employee),
  job: getJobTitle(employee),
  partFull: partFullTime(employee),
});

const AddButton = () => {
  const dispatch = useDispatch();

  const createAddModal = () =>
    dispatch(showModal({ type: ModalType.CreateUser }));

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
  const employeeList = useSelector(selectEmployees);
  const dispatch = useDispatch();
  const { getTokenSilently } = useAuth0();

  const openDeleteModal = (employee: Employee) => {
    dispatch(showModal({ type: ModalType.DeleteUser, employee }));
  };

  const openEditModal = (employee: Employee) => {
    dispatch(showModal({ type: ModalType.EditUser, employee }));
  };

  const cellClicked = (event: {
    colDef: ColDef;
    data: { rawData: Employee };
  }) => {
    switch (event.colDef.field) {
      case ColumnNames.Edit:
        openEditModal(event.data.rawData as Employee);
        break;
      case ColumnNames.Remove:
        openDeleteModal(event.data.rawData as Employee);
        break;
      default:
    }
  };

  // Fetch data when component loads
  useEffect(() => {
    const getEmployee = async () => {
      const accessToken = await getTokenSilently();
      dispatch(fetchEmployee(accessToken));
    };
    getEmployee();
  }, [dispatch, getTokenSilently]);
  return (
    <div className={employeesStyle.employees}>
      <h1 className={employeesStyle.header}> Employees </h1>
      <AddButton />
      <div
        className={[employeesStyle.tableContainer, 'ag-theme-alpine'].join(
          ' '
        )}>
        <AgGridReact
          columnDefs={COLUMN_DEFS}
          rowData={employeeList.map(generateRow)}
          onCellClicked={cellClicked}
          immutableData
          getRowNodeId={data => data.id}
        />
      </div>
    </div>
  );
};

export default Employees;
