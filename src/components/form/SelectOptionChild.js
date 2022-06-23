import React from "react";
import Select from 'react-select'

const SelectOptionChild = ({ name, selectedData = [], setSelectedData, options = [] }) => {
  return (
    <>
      {options.length > 0 ? <Select
        //className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent "
        name={name}
        options={options}
        isMulti={true}
        value={selectedData}
        onChange={(e) => {
          setSelectedData(e);
        }}
      /> : <Select
        //className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent "
        name={name}
        options={options}
        placeholder="Loading..."
      />}
    </>
  );
};

export default SelectOptionChild;