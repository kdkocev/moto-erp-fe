import React from 'react';
import _ from 'lodash';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import MomentUtils from '@date-io/moment';

import styles from './styles.module.css';

const validationSchema = yup.object({});

const OrderForm = ({ order }) => {
  const addition = {};
  if (_.isNull(order.completed_at)) {
    addition.completed_at = '';
  }
  const formik = useFormik({
    initialValues: { ...order, ...addition },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Typography variant="h3">Order details</Typography>

      <form onSubmit={formik.handleSubmit}>
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
          id="order_number"
          name="order_number"
          label="Order number"
          value={formik.values.order_number}
          onChange={formik.handleChange}
          error={
            formik.touched.order_number && Boolean(formik.errors.order_number)
          }
          helperText={formik.touched.order_number && formik.errors.order_number}
        />
        <TextField
          fullWidth
          id="part"
          name="part"
          label="Part"
          value={formik.values.part}
          onChange={formik.handleChange}
          error={formik.touched.part && Boolean(formik.errors.part)}
          helperText={formik.touched.part && formik.errors.part}
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
        <KeyboardDatePicker
          fullWidth
          format="YYYY-MM-DD"
          id="date_received"
          name="date_received"
          label="Date received"
          value={formik.values.date_received}
          onChange={formik.handleChange}
          error={
            formik.touched.date_received && Boolean(formik.errors.date_received)
          }
          helperText={
            formik.touched.date_received && formik.errors.date_received
          }
        />
        <KeyboardDatePicker
          fullWidth
          format="YYYY-MM-DD"
          id="date_of_expedition"
          name="date_of_expedition"
          label="Date of expedition"
          value={formik.values.date_of_expedition}
          onChange={formik.handleChange}
          error={
            formik.touched.date_of_expedition &&
            Boolean(formik.errors.date_of_expedition)
          }
          helperText={
            formik.touched.date_of_expedition &&
            formik.errors.date_of_expedition
          }
        />
        <KeyboardDatePicker
          fullWidth
          format="YYYY-MM-DD"
          id="date_of_delivery"
          name="date_of_delivery"
          label="Date of delivery"
          value={formik.values.date_of_delivery}
          onChange={formik.handleChange}
          error={
            formik.touched.date_of_delivery &&
            Boolean(formik.errors.date_of_delivery)
          }
          helperText={
            formik.touched.date_of_delivery && formik.errors.date_of_delivery
          }
        />
        <KeyboardDatePicker
          fullWidth
          format="YYYY-MM-DD"
          id="completed_at"
          name="completed_at"
          label="Completed at"
          value={formik.values.completed_at}
          onChange={formik.handleChange}
          error={
            formik.touched.completed_at && Boolean(formik.errors.completed_at)
          }
          helperText={formik.touched.completed_at && formik.errors.completed_at}
        />
        <KeyboardDatePicker
          fullWidth
          format="YYYY-MM-DD"
          id="created_at"
          name="created_at"
          label="Created at"
          value={formik.values.created_at}
          onChange={formik.handleChange}
          error={formik.touched.created_at && Boolean(formik.errors.created_at)}
          helperText={formik.touched.created_at && formik.errors.created_at}
        />

        <div className={styles.submitButtonContainer}>
          <LinearProgress color="secondary" />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Edit
          </Button>
        </div>
      </form>
    </MuiPickersUtilsProvider>
  );
};
export default OrderForm;
