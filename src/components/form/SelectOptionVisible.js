import React from "react";
import { Select } from "@windmill/react-ui";

const SelectOptionVisible = ({ register, name, label }) => {
  return (
    <>
      <Select
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: `${label} is required!`,
        })}
      >
        <option value="Show" defaultValue selected>Yes</option>
        <option value="Hide">No</option>
      </Select>
    </>
  );
};

export default SelectOptionVisible;