import React, { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useSelector, useDispatch } from 'react-redux';
import toastr from 'toastr';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Button from '@material-ui/core/Button';

import Clear from '@material-ui/icons/Clear';
import EditOutlined from '@material-ui/icons/EditOutlined';

import { fetchStaff, selectStaff } from '../../features/staffSlice';
import { showModal } from '../../features/modalSlice';

import 'toastr/build/toastr.min.css';
import { StaffData } from '../../constants/employees';
import capitalizeFirstLetter from '../../utils/string';
../../utils/capitalizeFirstLetter
import { FULLTIME_HOURS } from '../../constants/global';
import employeesStyle from './employees.module.scss';
import { useAuth0 } from '../../react-auth0-spa';

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

const getJobTitle = ({ jobTitle }: StaffData) =>
  capitalizeFirstLetter(jobTitle);

const partFullTime = (fullTimeHours: number) => ({
  contractedHours,
}: StaffData) => (contractedHours >= fullTimeHours ? 'Full' : 'Part');

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
  NAME = 'name',
  JOB = 'job',
  PARTFULL = 'partfull',
  EDIT = 'editbtn',
  REMOVE = 'removebutton',
}

const COLUMN_DEFS = [
  { field: ColumnNames.NAME, headerName: 'Name', sortable: true },
  { field: ColumnNames.JOB, headerName: 'Job title', sortable: true },
  {
    field: ColumnNames.PARTFULL,
    headerName: 'Part/Full Time',
  },
  {
    field: ColumnNames.EDIT,
    headerName: '',
    type: 'rightAligned',
    pinned: 'right',
    width: 60,
    cellRenderer: () => ReactDOMServer.renderToStaticMarkup(<EditUserButton />),
  },
  {
    field: ColumnNames.REMOVE,
    headerName: '',
    type: 'rightAligned',
    pinned: 'right',
    width: 60,
    cellRenderer: () =>
      ReactDOMServer.renderToStaticMarkup(<RemoveUserButton />),
  },
];

const generateRow = (staffData: StaffData) => ({
  id: staffData.id,
  rawData: staffData,
  name: getName(staffData),
  job: getJobTitle(staffData),
  partfull: partFullTime(FULLTIME_HOURS)(staffData),
});

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
  const { getTokenSilently } = useAuth0();

  const openDeleteModal = (staff: StaffData) => {
    dispatch(showModal({ modalType: 'DELETE_USER', modalProps: { staff } }));
  };

  const cellClicked = (event: any) => {
    switch (event.colDef.field) {
      case ColumnNames.EDIT:
        editUser(event.data.rawData as StaffData);
        break;
      case ColumnNames.REMOVE:
        openDeleteModal(event.data.rawData as StaffData);
        break;
      default:
    }
  };

  // Fetch data when component loads
  useEffect(() => {
    const getStaff = async () => {
      const accessToken = await getTokenSilently();
      dispatch(fetchStaff(accessToken));
    };
    getStaff();
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
          rowData={staffList.map(generateRow)}
          onCellClicked={cellClicked}
        />
      </div>
    </div>
  );
};

export default Employees;
