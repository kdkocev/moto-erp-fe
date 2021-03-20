import { useState, useMemo } from 'react';

export const useSorting = () => {
  const [sortBy, setSortBy] = useState('');
  const filters = useMemo(
    () => ({
      ordering: sortBy
    }),
    [sortBy]
  );

  return [filters, sortBy, setSortBy];
};
