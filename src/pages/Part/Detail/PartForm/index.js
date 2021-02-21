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
  number: '',
  price_total: '',
  price_machining: '',
  casting: ''
};

const getInitialValues = (part) => {
  if (part) {
    return part;
  }
  return emptyObject;
};

const PartForm = ({ part, onSubmit }) => {
  const [submitting, setSubmitting] = useState(false);
  const initialValues = getInitialValues(part);

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
        {part ? 'Edit part' : 'Add part'}
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
          label="Part number"
          value={formik.values.number}
          onChange={formik.handleChange}
          error={formik.touched.number && Boolean(formik.errors.number)}
          helperText={formik.touched.number && formik.errors.number}
        />
        <TextField
          fullWidth
          id="price_total"
          name="price_total"
          label="Price total"
          value={formik.values.price_total}
          onChange={formik.handleChange}
          error={
            formik.touched.price_total && Boolean(formik.errors.price_total)
          }
          helperText={formik.touched.price_total && formik.errors.price_total}
        />
        <TextField
          fullWidth
          id="price_machining"
          name="price_machining"
          label="Price Machining"
          value={formik.values.price_machining}
          onChange={formik.handleChange}
          error={
            formik.touched.price_machining &&
            Boolean(formik.errors.price_machining)
          }
          helperText={
            formik.touched.price_machining && formik.errors.price_machining
          }
        />
        <TextField
          fullWidth
          id="casting"
          name="casting"
          label="Casting"
          value={formik.values.casting}
          onChange={formik.handleChange}
          error={formik.touched.casting && Boolean(formik.errors.casting)}
          helperText={formik.touched.casting && formik.errors.casting}
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
export default PartForm;
