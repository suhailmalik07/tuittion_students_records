import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, FormControl, InputBase, InputLabel, MenuItem, NativeSelect, Select, Typography, withStyles } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination'
import StudentCard from '../Components/StudentCard';
import AddStudent from '../Components/AddStudent'
import SearchBar from '../Components/SearchBar'
import auth0 from '../Api/auth0';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const HomePage = () => {
  const [addStudentModal, setAddStudentModal] = useState(false)
  const [students, setStudents] = useState({})
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    setLoading(true)
    auth0.get('http://localhost:8000/api/students', { params: { page, limit: 10, query } })
      .then(res => {
        setStudents(res.data)
        setLoading(false)
      }).catch(error => {
        console.log(error.message);
        setLoading(false)
      })
  }, [addStudentModal, page, query])

  return (
    <>
      <AddStudent open={addStudentModal} handleClose={() => setAddStudentModal(false)} />

      <Box display='flex' justifyContent='space-between' alignItems='center' margin='1rem' >
        <Box display='flex' alignItems='center'>
          <SearchBar setValue={value => setQuery(value)} />

          <Typography style={{ marginLeft: '0.5rem' }} variant='h5' > Filter: </Typography>
          <FormControl style={{ padding: '0.2rem' }}>
            <NativeSelect
              id="demo-customized-select-native"
              value={20}
              onChange={() => { }}
              input={<BootstrapInput />}
            >
              <option aria-label="None" value="" />
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </NativeSelect>

          </FormControl>

        </Box>
        <Button color='secondary' onClick={() => setAddStudentModal(true)} variant='contained' >Add Student</Button>
      </Box>
      <Box display='flex' justifyContent="center" >
        {loading && <CircularProgress />}
      </Box>
      {!loading &&
        <>
          {students?.results?.map(student => <StudentCard key={student._id} {...student} />)}
          <Box display='flex' justifyContent='center' >
            <Pagination onChange={(e, value) => setPage(value)} color='primary' page={students?.page} count={students?.totalPages} />
          </Box>
        </>
      }
    </>
  )
}

export default HomePage;