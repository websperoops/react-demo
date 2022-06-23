import React from "react";
import { Select } from "@windmill/react-ui";
import CategoryServices from "../../services/CategoryServices";
import useAsync from '../../hooks/useAsync';

const SelectOption = ({ register, name, label, getValues }) => {
  const { data } = useAsync(CategoryServices.getAllCategory);
  return (
    <>
      <Select
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: `${label} is required!`,
        })}
      >
        <option value="" defaultValue hidden>Select type</option>
        {data.length > 0 && data.filter(item => item.categoryName !== undefined
          //&& item.categoryName !== getValues().categoryName
        ).map((item, index) => (
          <option value={item.categoryName} key={index}>{item.categoryName}</option>
        ))}
      </Select>
    </>
  );
};

export default SelectOption;
