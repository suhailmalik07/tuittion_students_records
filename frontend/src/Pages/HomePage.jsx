import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, InputBase, NativeSelect, Typography, withStyles } from '@material-ui/core';
import StudentTable from '../Components/StudentTable';
import AddStudent from '../Components/AddStudent'
import SearchBar from '../Components/SearchBar'
import auth0 from '../Api/auth0';
import { useSelector } from 'react-redux';

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
  // const [limit, setLimit] = useState(5)
  const limit = 5
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')

  const { token } = useSelector(state => state.auth)

  useEffect(() => {
    setLoading(true)
    auth0.get('http://localhost:8000/api/students', { params: { page, limit, query }, headers: { authorization: `Bearer ${token}` } })
      .then(res => {
        setStudents(res.data)
        setLoading(false)
      }).catch(error => {
        console.log(error.message);
        setLoading(false)
      })
  }, [addStudentModal, page, query, limit, token])

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
      {
        <Box padding='1rem 2rem'>
          <StudentTable page={page} loading={loading} totalPages={students?.totalPages} totalResults={students?.totalResults} limit={limit} setPage={setPage} students={students?.results?.map((item, i) => ({ ...item, id: i }))} />
        </Box>
      }
    </>
  )
}

export default HomePage;