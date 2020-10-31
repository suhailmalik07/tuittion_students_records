import * as React from 'react';
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import { useHistory } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';

const columns = [
  // { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 200 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'gender',
    headerName: 'Gender',
    width: 90,
    valueGetter: params => `${{ 'M': 'Male', 'F': 'Female', 'O': 'Others' }[params.getValue('gender')] || 'Others'}`
  },
  {
    field: 'grade',
    headerName: 'Grade',
    width: 120,
  },
  {
    field: 'tests',
    headerName: 'Total Tests',
    width: 90,
    valueGetter: params => {
      return `${params?.data?.tests?.length}`
    }
  }
];

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

export default function DataTable({ students = [], loading, limit, totalResults, totalPages, page, setPage }) {
  const history = useHistory()
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={students} components={{loadingOverlay: CustomLoadingOverlay}} onRowClick={value => history.push(value.data._id)} loading={loading} columns={columns} paginationMode='server' rowCount={totalResults} onPageChange={e => setPage(e.page)} pageSize={limit} pagination={true} page={page} checkboxSelection={false} />
    </div>
  );
}
