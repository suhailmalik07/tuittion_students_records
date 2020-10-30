import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import StudentCard from '../Components/StudentCard';
import AddStudent from '../Components/AddStudent'
import { Box, Button } from '@material-ui/core';

const HomePage = () => {
  const [addStudentModal, setAddStudentModal] = useState(false)
  const [students, setStudents] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:8000/api/students', {
      headers: { "Content-Type": "application/json" }
    }
    ).then(res => {
      setStudents(res.data.results)
    }).catch(error => console.log(error.message))
  }, [])

  return (
    <>
      <AddStudent open={addStudentModal} handleClose={() => setAddStudentModal(false)} />

      <Box display='flex' justifyContent='flex-end' margin='1rem' >
        <Button color='secondary' onClick={() => setAddStudentModal(true)} variant='contained' >Add Student</Button>
      </Box>
      {students.map(student => <StudentCard key={student._id} {...student} />
      )}
    </>
  )
}

export default HomePage;