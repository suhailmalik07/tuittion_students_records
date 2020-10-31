import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import TestCard from '../Components/TestCard';
import auth0 from '../Api/auth0';
import AddTest from '../Components/AddTest';
import { Box, Button, CircularProgress } from '@material-ui/core';

const StudentPage = () => {
  const { id } = useParams()
  const [student, setStudent] = useState({})
  const [testModal, setTestModal] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    auth0.get(`/students/${id}`)
      .then(({ data }) => {
        setStudent(data);
        setLoading(false)
      })
      .catch(error => {
        console.log(error.message);
        setLoading(false)
      })
  }, [testModal])

  return (
    <>
      <AddTest open={testModal} {...student} handleClose={() => setTestModal(false)} />

      <Box display='flex' justifyContent='flex-end' margin='1rem' >
        <Button color='secondary' onClick={() => setTestModal(true)} variant='contained' >Add Test</Button>
      </Box>
      <Box display='flex' justifyContent="center" >
        {loading && <CircularProgress />}
      </Box>
      {student?.tests?.reverse()?.map(test => <TestCard key={test._id} {...test} />)}
    </>
  )
}

export default StudentPage;