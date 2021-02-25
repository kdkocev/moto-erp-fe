import { replaceKeysWithLabels } from 'utils/common';

export const hiddenFields = ['id'];

const labelMappings = {
  id: 'ID',
  number: 'Number',
  price_total: 'Price Total',
  price_machining: 'Price Machining',
  casting: 'Casting ID'
};

export const preparePartsForTable = (parts) =>
  parts.map((part) => ({
    ...replaceKeysWithLabels(part, labelMappings),
    id: part.id
  }));
