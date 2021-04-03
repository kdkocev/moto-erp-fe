import React, { useMemo } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import InformationTable from 'components/InformationTable';

import { t } from 'utils/translate';
import { useOrderList } from 'sdk/order';
import { usePartList } from 'sdk/part';

import {
  replacePartIdsWithNumbers,
  prepareOrdersForTable
} from 'pages/Order/List/utils';

import styles from './styles.module.css';

const PriorityOrdersTable = () => {
  const filters = useMemo(() => ({ ordering: '-priority' }), []);
  const parts = usePartList();
  const orderList = useOrderList(filters);
  const orders = replacePartIdsWithNumbers(orderList, parts);
  const items = useMemo(() => prepareOrdersForTable(orders), [orders]);

  return <InformationTable hiddenKeys={['id', 'Completed']} items={items} />;
};

const Home = () => {
  return (
    <div>
      <Paper classes={{ root: styles.paper }}>
        <Typography variant="h6">{t('Orders', 'Поръчки')}</Typography>
        <PriorityOrdersTable />
      </Paper>
    </div>
  );
};

export default Home;
