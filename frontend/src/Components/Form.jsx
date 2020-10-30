import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    width: 600,
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',

    '& > *': {
      margin: '0.5rem 0'
    }
  }
})

const Form = ({ onSubmit, children }) => {
  const classes = useStyles()

  return (
    <form className={classes.root} onSubmit={onSubmit} >
      {children}
    </form>
  )
}

export default Form;