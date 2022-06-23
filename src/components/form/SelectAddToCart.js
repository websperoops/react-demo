import React from 'react';
import { Select } from '@windmill/react-ui';

const SelectAddToCart = ({ setAddToCart, addToCart, }) => {
  return (
    <>
      <Select
        onChange={(e) => setAddToCart(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name="addToCart"
        value={addToCart}
      >
        <option value="" defaultValue hidden>
          --Select--
        </option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </Select>
    </>
  );
};

export default SelectAddToCart;
