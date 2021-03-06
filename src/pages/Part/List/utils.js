import _ from 'lodash';
import { replaceKeys } from 'utils/common';

export const hiddenFields = ['id'];

const labelMappings = {
  id: 'ID',
  number: 'Number',
  price_total: 'Price Total',
  price_machining: 'Price Machining',
  casting: 'Casting Number'
};

export const setPartsLabels = (parts) =>
  parts.map((part) => ({
    ...replaceKeys(part, labelMappings),
    id: part.id
  }));

export const replaceCastingIdsWithNumbers = (partList, castingList) => {
  const castingListIds = castingList.map((casting) => casting.id);
  const castingListNumbers = castingList.map((casting) => casting.number);
  const castingIdToNumberObj = _.zipObject(castingListIds, castingListNumbers);

  return partList.map((part) => ({
    ...part,
    casting: castingIdToNumberObj[part.casting]
  }));
};
