import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'toastr/build/toastr.min.css';

import Button from '@material-ui/core/Button';
import Clear from '@material-ui/icons/Clear';
import EditOutlined from '@material-ui/icons/EditOutlined';
import { AgGridReact } from 'ag-grid-react';
import React, { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useDispatch, useSelector } from 'react-redux';
import toastr from 'toastr';

import { showModal } from '../../features/modalSlice';
import { fetchStaff, selectStaff } from '../../features/staffSlice';
import { Staff } from '../../model';
import { useAuth0 } from '../../react-auth0-spa';
import { capitalizeFirstLetter } from '../../utils/string';
import employeesStyle from './employees.module.scss';

interface CallbackFunction {
  (data: Staff): () => void;
}

const fullTimeHours = 37.5;

/**
 * Function which is called when edit buttons are pressed.
 */
const editUser = ({ id }: Staff) => () => toastr.info(`User ${id} edited`);

/**
 * Functions which extract the data to be displayed in the table columns
 * from Staff.
 */

const getName = ({ firstName, surname }: Staff) => `${firstName} ${surname}`;

const getJobTitle = ({ jobTitle }: Staff) => capitalizeFirstLetter(jobTitle);

const partFullTime = ({ contractedHours }: Staff) =>
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
  PartFull = 'partfull',
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

const generateRow = (staff: Staff) => ({
  id: staff.id,
  rawData: staff,
  name: getName(staff),
  job: getJobTitle(staff),
  partfull: partFullTime(staff),
});

const AddButton = () => {
  const dispatch = useDispatch();

  const createAddModal = () =>
    dispatch(showModal({ modalType: 'CREATE_USER' }));

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

  const openDeleteModal = (staff: Staff) => {
    dispatch(showModal({ modalType: 'DELETE_USER', modalProps: { staff } }));
  };

  const cellClicked = (event: any) => {
    switch (event.colDef.field) {
      case ColumnNames.Edit:
        editUser(event.data.rawData as Staff);
        break;
      case ColumnNames.Remove:
        openDeleteModal(event.data.rawData as Staff);
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
          immutableData
          getRowNodeId={(data) => data.id}
        />
      </div>
    </div>
  );
};

export default Employees;
