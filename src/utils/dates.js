import _ from 'lodash';

export const formatDatesInObjectForApi = (obj) => {
  const response = _.cloneDeep(obj);
  // Format the dates in the object
  Object.keys(response).forEach((key) => {
    if (response[key].format) {
      response[key] = response[key].format('YYYY-MM-DD');
    }
  });
  return response;
};
