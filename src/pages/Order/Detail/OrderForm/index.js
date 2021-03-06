import React, { useState, useCallback, useMemo } from 'react';
import _ from 'lodash';
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
import { PRIORITY_OPTIONS } from 'pages/Order/List/utils';

import styles from './styles.module.css';

const DATE_FORMAT = 'DD/MM/YYYY';
const validationSchema = yup.object({});

const emptyOrder = {
  id: '',
  number: '',
  part: '',
  amount: '',
  priority: 0,
  date_received: null,
  date_of_expedition: null,
  date_of_delivery: null,
  completed_at: null,
  created_at: moment()
};

const getInitialValues = (order) => {
  if (order) {
    const addition = {};
    if (_.isNull(order.completed_at)) {
      // If completed_at is returned as null from the API, we have to make it ''
      addition.completed_at = '';
    }
    return { ...order, ...addition };
  }
  return emptyOrder;
};

const OrderForm = ({ order, parts = [], onSubmit }) => {
  const [submitting, setSubmitting] = useState(false);
  const initialValues = getInitialValues(order);

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

  const partOptions = useMemo(
    () =>
      parts.map((part) => ({
        key: part.id,
        value: part.id,
        label: part.number
      })),
    [parts]
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <>
      <Typography variant="h3" classes={{ root: styles.heading }}>
        {order
          ? t('Edit order', 'Промени поръчка')
          : t('Add order', 'Нова поръчка')}
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
          label="Order number"
          value={formik.values.number}
          onChange={formik.handleChange}
          error={formik.touched.number && Boolean(formik.errors.number)}
          helperText={formik.touched.number && formik.errors.number}
        />
        <SelectField
          fullWidth
          id="part"
          name="part"
          label="Part"
          value={formik.values.part}
          onChange={formik.handleChange}
          error={formik.touched.part && Boolean(formik.errors.part)}
          helperText={formik.touched.part && formik.errors.part}
          options={partOptions}
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
        <SelectField
          fullWidth
          id="priority"
          name="priority"
          label="Priority"
          value={formik.values.priority}
          onChange={formik.handleChange}
          error={formik.touched.priority && Boolean(formik.errors.priority)}
          helperText={formik.touched.priority && formik.errors.priority}
          options={PRIORITY_OPTIONS}
        />
        <DatePicker
          fullWidth
          format={DATE_FORMAT}
          id="date_received"
          name="date_received"
          label="Date received"
          value={formik.values.date_received}
          onChange={(date) => formik.setFieldValue('date_received', date)}
          error={
            formik.touched.date_received && Boolean(formik.errors.date_received)
          }
          helperText={
            formik.touched.date_received && formik.errors.date_received
          }
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
          id="date_of_delivery"
          name="date_of_delivery"
          label="Date of delivery"
          value={formik.values.date_of_delivery}
          onChange={(date) => formik.setFieldValue('date_of_delivery', date)}
          error={
            formik.touched.date_of_delivery &&
            Boolean(formik.errors.date_of_delivery)
          }
          helperText={
            formik.touched.date_of_delivery && formik.errors.date_of_delivery
          }
        />
        <DatePicker
          fullWidth
          format={DATE_FORMAT}
          id="completed_at"
          name="completed_at"
          label="Completed at"
          value={formik.values.completed_at}
          onChange={(date) => formik.setFieldValue('completed_at', date)}
          error={
            formik.touched.completed_at && Boolean(formik.errors.completed_at)
          }
          helperText={formik.touched.completed_at && formik.errors.completed_at}
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
export default OrderForm;
