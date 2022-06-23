import React from "react";
import { Select } from "@windmill/react-ui";

const SelectOptionPriority = ({ register, name, label }) => {
  return (
    <>
      <Select
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: `${label} is required!`,
        })}
      >
        <option value="1" defaultValue selected>1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </Select>
    </>
  );
};

export default SelectOptionPriority;