import React from 'react';

import useAsync from '../../hooks/useAsync';
import CategoryServices from '../../services/CategoryServices';


const ParentCategory = () => {
  const { data } = useAsync(CategoryServices.getAllCategory);
  return (
    <>
      {data && data.map((parent) => (
        <option key={parent._id} value={parent.categoryName}>
          {parent.categoryName}
        </option>
      ))}
    </>
  );
};

export default ParentCategory;
