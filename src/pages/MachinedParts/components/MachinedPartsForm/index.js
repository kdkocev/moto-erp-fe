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
  part: '',
  amount: '',
  created_at: moment()
};

const getInitialValues = (machinedParts) => {
  if (machinedParts) {
    return machinedParts;
  }
  return emptyObject;
};

const MachinedPartsForm = ({ machinedParts, parts = [], onSubmit }) => {
  const [submitting, setSubmitting] = useState(false);
  const initialValues = getInitialValues(machinedParts);

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
        {machinedParts
          ? t('Edit Machined Parts', 'Промени готова продукция')
          : t('Add Machined Parts', 'Добави готова продукция')}
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

export default MachinedPartsForm;
