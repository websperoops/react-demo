import React from "react";
import Select from 'react-select'

const SelectOptionParent = ({ name, selectedData = [], setSelectedData, options = [], categories = [], childData = [], setChildData }) => {
  //const filteredCategories = (categories, categoryName) => {
  //  let existingChilds = [...childData.map(item => ({ _id: item.value }))];
  //  if (categoryName.length > 0) {
  //    categoryName.forEach((category) => {
  //      if (categories.filter(item => item._id === category.value).length > 0) {
  //        let childs = categories.filter(item => item._id === category.value)[0].children;
  //        if (childs.length > 0) {
  //          childs.forEach(child => {
  //            if (existingChilds.filter(item => item._id === child._id).length === 0) {
  //              existingChilds = [...existingChilds, child]
  //            }
  //          })
  //        }
  //      }
  //    });
  //    console.log(existingChilds)
  //    let nonduplicate = existingChilds.map((item) => ({ value: item._id, label: categories.filter(itemm => item._id === itemm._id)[0].categoryName })).filter((v, i, a) => a.findIndex(v2 => (v2.value === v.value)) === i);
  //    setChildData(nonduplicate)
  //    console.log(nonduplicate)
  //  } else {
  //    setChildData([]);
  //  }
  //}
  return (
    <>
      {options.length > 0 ? <Select
        //className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        options={options}
        isMulti={true}
        value={selectedData}
        onChange={(e) => {
          //filteredCategories(categories, e)
          setSelectedData(e);
        }}
      /> : <Select
        //className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        options={options}
        placeholder="Loading..."
      />}
    </>
  );
};

export default SelectOptionParent;