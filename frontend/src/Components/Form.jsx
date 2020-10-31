import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    maxWidth: 600,
    minWidth: 400,
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',

    '& > *': {
      margin: '0.5rem 0 !important'
    }
  }
})

const Form = ({ onSubmit, children, className }) => {
  const classes = useStyles()

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(e)
  }

  return (
    <form className={`${classes.root} ${className}`} style={{ '& > *': { margin: '0.5rem 0' } }} onSubmit={handleSubmit} >
      {children}
    </form>
  )
}

export default Form;