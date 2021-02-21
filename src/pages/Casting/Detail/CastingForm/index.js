import React, { useState, useCallback } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

import styles from './styles.module.css';

const validationSchema = yup.object({});

const emptyObject = {
  id: '',
  number: ''
};

const getInitialValues = (casting) => {
  if (casting) {
    return casting;
  }
  return emptyObject;
};

const CastingForm = ({ casting, onSubmit }) => {
  const [submitting, setSubmitting] = useState(false);
  const initialValues = getInitialValues(casting);

  const handleSubmit = useCallback(
    async (data) => {
      if (onSubmit) {
        // If onSubmit is a promise
        if (Promise.resolve(onSubmit) === onSubmit) {
          setSubmitting(true);
          onSubmit(data).then(() => {
            setSubmitting(false);
          });
        } else {
          onSubmit(data);
        }
      }
    },
    [onSubmit]
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <>
      <Typography variant="h3" classes={{ root: styles.heading }}>
        {casting ? 'Edit casting' : 'Add casting'}
      </Typography>

      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="id"
          name="id"
          label="ID"
          value={formik.values.id}
          disabled={true}
          onChange={formik.handleChange}
          error={formik.touched.id && Boolean(formik.errors.id)}
          helperText={formik.touched.id && formik.errors.id}
        />
        <TextField
          fullWidth
          id="number"
          name="number"
          label="Casting number"
          value={formik.values.number}
          onChange={formik.handleChange}
          error={formik.touched.number && Boolean(formik.errors.number)}
          helperText={formik.touched.number && formik.errors.number}
        />

        <div className={styles.submitButtonContainer}>
          {submitting && <LinearProgress color="primary" />}
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            disabled={submitting}>
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};
export default CastingForm;
