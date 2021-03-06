import { replaceKeys } from 'utils/common';

export const hiddenFields = ['id'];

const labelMappings = {
  id: 'ID',
  number: 'Number'
};

export const prepareCastingsForTable = (castings) =>
  castings.map((casting) => ({
    ...replaceKeys(casting, labelMappings),
    id: casting.id
  }));
