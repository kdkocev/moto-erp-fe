import React, { useMemo, useState, useCallback } from 'react';
import moment from 'moment';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

import SelectField from 'components/SelectField';
import DatePicker from 'components/DatePicker';
import { curry, toPromise } from 'utils/common';
import { setErrorsIfAny } from 'utils/forms';
import { t } from 'utils/translate';

import styles from './styles.module.css';

const DATE_FORMAT = 'DD/MM/YYYY';
const validationSchema = yup.object({});

const emptyObject = {
  id: '',
  order: '',
  amount: '',
  date_of_expedition: null,
  created_at: moment()
};

const getInitialValues = (expedition) => {
  if (expedition) {
    return expedition;
  }
  return emptyObject;
};

const ExpeditionForm = ({ expedition, orders = [], onSubmit }) => {
  const [submitting, setSubmitting] = useState(false);
  const initialValues = getInitialValues(expedition);

  const handleSubmit = useCallback(
    (data, formikBag) => {
      if (onSubmit) {
        setSubmitting(true);
        toPromise(onSubmit(data))
          .then(curry(setErrorsIfAny)(formikBag.setErrors))
          .then(() => setSubmitting(false));
      }
    },
    [onSubmit]
  );

  const orderOptions = useMemo(
    () =>
      orders.map((order) => ({
        key: order.id,
        value: order.id,
        label: order.number
      })),
    [orders]
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <>
      <Typography variant="h3" classes={{ root: styles.heading }}>
        {expedition
          ? t('Edit expedition', 'Промени експедиция')
          : t('Add expedition', 'Нова експедиция')}
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
        <SelectField
          fullWidth
          id="order"
          name="order"
          label="Order"
          value={formik.values.order}
          onChange={formik.handleChange}
          error={formik.touched.order && Boolean(formik.errors.order)}
          helperText={formik.touched.order && formik.errors.order}
          options={orderOptions}
        />
        <TextField
          fullWidth
          id="amount"
          name="amount"
          label="Amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          error={formik.touched.amount && Boolean(formik.errors.amount)}
          helperText={formik.touched.amount && formik.errors.amount}
        />
        <DatePicker
          fullWidth
          format={DATE_FORMAT}
          id="date_of_expedition"
          name="date_of_expedition"
          label="Date of expedition"
          value={formik.values.date_of_expedition}
          onChange={(date) => formik.setFieldValue('date_of_expedition', date)}
          error={
            formik.touched.date_of_expedition &&
            Boolean(formik.errors.date_of_expedition)
          }
          helperText={
            formik.touched.date_of_expedition &&
            formik.errors.date_of_expedition
          }
        />
        <DatePicker
          fullWidth
          format={DATE_FORMAT}
          id="created_at"
          name="created_at"
          label="Created at"
          value={formik.values.created_at}
          onChange={(date) => formik.setFieldValue('created_at', date)}
          error={formik.touched.created_at && Boolean(formik.errors.created_at)}
          helperText={formik.touched.created_at && formik.errors.created_at}
        />
        <div className={styles.submitButtonContainer}>
          {submitting && <LinearProgress color="primary" />}
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            disabled={submitting}>
            {t('Submit', 'Изпрати')}
          </Button>
        </div>
      </form>
    </>
  );
};

export default ExpeditionForm;
