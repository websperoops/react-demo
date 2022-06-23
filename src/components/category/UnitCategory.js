import React from 'react';
import CategoryServices from '../../services/CategoryServices';


const UnitCategory = () => {
  const data = CategoryServices.getAllUnits();
  return (
    <>
      {data.map((parent) => (
        <option key={parent._id} value={parent.value}>
          {parent.value}
        </option>
      ))}
    </>
  );
};

export default UnitCategory;
