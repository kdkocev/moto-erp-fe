import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { BASE_URL } from 'config/urls';
import { callUrl, get, patch } from 'utils/sdk';
import PartForm from './PartForm';

import styles from './styles.module.css';

const BackButton = ({ onClick }) => (
  <Button onClick={onClick} startIcon={<ArrowBackIosIcon />}>
    Back
  </Button>
);

const PartDetail = ({ match }) => {
  const id = match.params.id;

  const [part, setPart] = useState();
  const [castings, setCastings] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const history = useHistory();

  useEffect(() => {
    callUrl(get, `${BASE_URL}/part/${id}`).then(setPart);
  }, [id]);

  useEffect(() => {
    callUrl(get, `${BASE_URL}/casting`).then(setCastings);
  }, []);

  const handleSubmit = useCallback(
    (data) =>
      callUrl(patch, `${BASE_URL}/part/${id}`, data).then(() =>
        setIsSuccess(true)
      ),
    [id]
  );

  return (
    <Paper className={styles.paper}>
      <BackButton onClick={() => history.goBack()} />
      {isSuccess && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isSuccess}
          onClose={() => {
            setIsSuccess(false);
          }}>
          <Alert
            onClose={() => {
              setIsSuccess(false);
            }}
            elevation={6}
            variant="filled"
            severity="success">
            Part saved!
          </Alert>
        </Snackbar>
      )}
      {part && (
        <PartForm part={part} castings={castings} onSubmit={handleSubmit} />
      )}
    </Paper>
  );
};

export default PartDetail;
