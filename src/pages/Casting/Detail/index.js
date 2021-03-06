import React, { useCallback } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { Left, Right } from 'utils/either';
import { notifySuccess } from 'utils/notifications';
import { t } from 'utils/translate';
import { useCasting, updateCasting } from 'sdk/casting';

import CastingForm from './CastingForm';

import styles from './styles.module.css';

const BackButton = ({ onClick }) => (
  <Button onClick={onClick} startIcon={<ArrowBackIosIcon />}>
    {t('Back', 'Назад')}
  </Button>
);

const CastingDetail = ({ match }) => {
  const id = match.params.id;

  const history = useHistory();
  const casting = useCasting(id);

  const handleSubmit = useCallback(
    (data) =>
      updateCasting(id, data)
        .then(() => Right(notifySuccess('Casting saved!')))
        .catch((error) => Left(_.get(error, 'data', {}))),
    [id]
  );

  return (
    <Paper className={styles.paper}>
      <BackButton onClick={() => history.goBack()} />
      {casting && <CastingForm casting={casting} onSubmit={handleSubmit} />}
    </Paper>
  );
};

export default CastingDetail;
