import { replaceKeysWithLabels } from 'utils/common';

export const hiddenFields = ['id'];

const labelMappings = {
  id: 'ID',
  number: 'Number'
};

export const prepareCastingsForTable = (castings) =>
  castings.map((casting) => ({
    ...replaceKeysWithLabels(casting, labelMappings),
    id: casting.id
  }));
