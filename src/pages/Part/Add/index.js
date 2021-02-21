import React, { useCallback } from 'react';

import Paper from '@material-ui/core/Paper';
import PartForm from 'pages/Part/Detail/PartForm';
import { callUrl, post } from 'utils/sdk';
import { formatDatesInObjectForApi } from 'utils/dates';
import { BASE_URL, PART_LIST_URL } from 'config/urls';

import styles from './styles.module.css';

const AddPart = ({ history }) => {
  const handleSubmit = useCallback(
    (data) => {
      return callUrl(post, `${BASE_URL}/part`, formatDatesInObjectForApi(data))
        .then(() => {
          history.push(PART_LIST_URL);
        })
        .catch(() => {});
    },
    [history]
  );

  return (
    <Paper className={styles.paper}>
      <PartForm onSubmit={handleSubmit} />
    </Paper>
  );
};

export default AddPart;
