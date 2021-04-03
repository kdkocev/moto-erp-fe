import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { t } from 'utils/translate';

const BackButton = () => {
  const history = useHistory();
  return (
    <Button onClick={() => history.goBack()} startIcon={<ArrowBackIosIcon />}>
      {t('Back', 'Назад')}
    </Button>
  );
};

export default BackButton;
