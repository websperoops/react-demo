import React, { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
//import ReactTagInput from '@pathofdev/react-tag-input';

import Error from '../form/Error';
import Title from '../form/Title';
import InputArea from '../form/InputArea';
import LabelArea from '../form/LabelArea';
import DrawerButton from '../form/DrawerButton';
import Uploader from '../image-uploader/Uploader';
import useCategorySubmit from '../../hooks/useCategorySubmit';
import SelectOptionVisible from '../form/SelectOptionVisible';
import SelectOptionChild from '../form/SelectOptionChild';
import useAsync from '../../hooks/useAsync';
import CategoryServices from '../../services/CategoryServices';
import SelectOptionParent from '../form/SelectOptionParent';
import SelectOptionPriority from '../form/SelectOptionPriority';

const CategoryDrawer = ({ id }) => {
  const { data, } = useAsync(CategoryServices.getAllCategory);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    if (data.length > 0) {
      let optionsData = data.filter(item => item.categoryName !== undefined).map(item => ({ value: item._id, label: item.categoryName }))
      setOptions(optionsData)
    }
  }, [data])
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    children,
    setChildren,
    selectedParentData,
    setSelectedParentData,
    getValues,
  } = useCategorySubmit(id);

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title="Update Category"
            description="Updated your Product category and necessary information from here"
          />
        ) : (
          <Title
            title="Add Category"
            description=" Add your Product category and necessary information from here"
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Category Icon" />
              <div className="col-span-8 sm:col-span-4">
                <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
              </div>
            </div>
            {/*<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Product Type" />
              <div className="col-span-8 sm:col-span-4">
                <SelectOption
                  register={register}
                  label="Product type"
                  name="type"
                />
                <Error errorName={errors.type} />
              </div>
            </div>*/}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Category Name" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Category Name"
                  name="categoryName"
                  type="text"
                  placeholder="Category Name"
                />
                <Error errorName={errors.categoryName} />
              </div>
            </div>

            {/*<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Parent Category" />
                <div className="col-span-8 sm:col-span-4">
                  <SelectOption
                    register={register}
                    label="Parent Category"
                    getValues={() => getValues()}
                  />
                  <Error errorName={errors.parent} />
                </div>
              </div>*/}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Parent Category" />
              <div className="col-span-8 sm:col-span-4">
                <SelectOptionParent
                  register={register}
                  label="Parent Category"
                  selectedData={selectedParentData}
                  setSelectedData={setSelectedParentData}
                  options={options}
                  categories={data}
                  childData={children}
                  setChildData={setChildren}
                />
              </div>
            </div>

            {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Category Slug" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Category slug"
                  name="slug"
                  type="text"
                  placeholder="Category slug"
                />
                <Error errorName={errors.slug} />
              </div>
            </div> */}

            {/*<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Child Category" />
              <div className="col-span-8 sm:col-span-4">
                <ReactTagInput
                  placeholder="Child category  (Write then press enter to add new child category )"
                  tags={children}
                  onChange={(child) => setChildren(child)}
                />
              </div>
            </div>*/}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Child Categories" />
              <div className="col-span-8 sm:col-span-4">
                <SelectOptionChild
                  register={register}
                  label="Child Categories"
                  name="children"
                  selectedData={children}
                  setSelectedData={setChildren}
                  options={options}
                />
              </div>
            </div>
            {/*<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Cross Sell Categories" />
              <div className="col-span-8 sm:col-span-4">
                <SelectOptionChild
                  register={register}
                  label="Cross Sell Categories"
                  name="crossSellCategories"
                  selectedData={selectedCrossSellData}
                  setSelectedData={setSelectedCrossSellData}
                  options={options}
                />
              </div>
            </div>*/}
            {/*<LabelArea label="Cross Sell Categories" />
              <div className="col-span-8 sm:col-span-4">
                <ReactTagInput
                  placeholder="Cross Sell Categories (Write then press enter to add new Cross Sell Category)"
                  tags={crossSellCategories}
                  onChange={(child) => setCrossSellCategories(child)}
                />
              </div>*/}

            {getValues("categoryName") !== "Root" && <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Visible In Navigation?" />
              <div className="col-span-8 sm:col-span-4">
                <SelectOptionVisible
                  register={register}
                  label="Is Visible In Navigation?"
                  name="status"
                  value="Show"
                />
                <Error errorName={errors.status} />
              </div>
            </div>}
            {getValues("categoryName") !== "Root" && <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Priority" />
              <div className="col-span-8 sm:col-span-4">
                <SelectOptionPriority
                  register={register}
                  label="Priority"
                  name="priority"
                  value="1"
                />
                <Error errorName={errors.priority} />
              </div>
            </div>}
          </div>

          <DrawerButton id={id} title="Category" />
        </form>
      </Scrollbars>
    </>
  );
};

export default CategoryDrawer;
