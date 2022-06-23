import React, { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { Textarea, Select } from "@windmill/react-ui";
import ReactTagInput from "@pathofdev/react-tag-input";

import Title from "../form/Title";
import Error from "../form/Error";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import InputValue from "../form/InputValue";
import DrawerButton from "../form/DrawerButton";
import Uploader from "../image-uploader/Uploader";
import UnitCategory from "../category/UnitCategory";
import useProductSubmit from "../../hooks/useProductSubmit";
import ExcelUpload from "../excelupload/ExcelUpload";
import ProductsTemplate from "../../assets/products-template.xlsx";
import { FiDownload } from "react-icons/fi";
import ProductServices from "../../services/ProductServices";
import { notifyError } from "../../utils/toast";
import SelectOptionChild from "../form/SelectOptionChild";
import useAsync from "../../hooks/useAsync";
import CategoryServices from "../../services/CategoryServices";

const ProductDrawer = ({ id }) => {
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
    onSubmitMultiple,
    errors,
    imageUrl,
    setImageUrl,
    tag,
    setTag,
    setValue,
    selectedData,
    setSelectedData,
  } = useProductSubmit(id);
  const [isExempt, setExempt] = useState("");
  const [isFederalTax, setFederalTax] = useState("");
  const setExemptTax = (value) => {
    setValue("isExempt", value);
    setExempt(value);
  };
  //const resetFederalTax = () => {
  //  if (
  //    document.getElementById("yes2") &&
  //    document.getElementById("yes2").checked === true
  //  ) {
  //    document.getElementById("yes2").checked = false;
  //  } else if (
  //    document.getElementById("no2") &&
  //    document.getElementById("no2").checked === true
  //  ) {
  //    document.getElementById("no2").checked = false;
  //  }
  //};

  const setFederalTaxData = (value) => {
    setValue("isFederalTax", value);
    setFederalTax(value);
    if (value === "Yes") {
      setValue("tax", 5);
    } else if (value === "No") {
      setValue("tax", 13);
    } else {
      setValue("tax", 0);
    }
  };

  useEffect(() => {
    if (id) {
      ProductServices.getProductById(id)
        .then((res) => {
          if (res) {
            res.isExempt = res.isExempt ? res.isExempt : "Yes";
            res.tax = res.isExempt ? res.tax : 0;
            if (res.isExempt === "Yes" && document.getElementById("yes")) {
              setExemptTax("Yes");
              document.getElementById("yes").checked = true;
              document.getElementById("yes").value = "Yes";
            } else if (res.isExempt === "No") {
              setExemptTax("No");
              setValue("tax", "0");
              if (
                res.isFederalTax === "Yes" &&
                document.getElementById("yes2")
              ) {
                setValue("isFederalTax", "Yes");
                setFederalTax("Yes");
                document.getElementById("yes2").checked = true;
                document.getElementById("yes2").value = "Yes";
              } else if (
                res.isFederalTax === "No" &&
                document.getElementById("no2")
              ) {
                setValue("isFederalTax", "No");
                setFederalTax("No");
                document.getElementById("no2").checked = true;
                document.getElementById("no2").value = "Yes";
              } else {
                setValue("isFederalTax", "");
                setFederalTax("");
                setValue("tax", "0");
              }
            }
          }
        })
        .catch((err) => {
          notifyError("There is a server error!");
        });
    }
    // eslint-disable-next-line
  }, [id]);

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title="Update Product(s)"
            description="Updated your product(s) and necessary information from here"
          />
        ) : (
          <Title
            title="Add Product(s)"
            description="Add your product(s) and necessary information from here"
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <div className="px-6 pt-8 flex-grow w-fullxl:pb-32">
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label="Upload Excel (.xlsx)" />
            <div className="col-span-8 sm:col-span-4">
              <ExcelUpload onSubmitMultiple={onSubmitMultiple} />
            </div>
          </div>
          <a
            href={ProductsTemplate}
            className="flex justify-start align-center"
            target="_blank"
            rel="noreferrer"
          >
            <FiDownload /> <small>Download Products Template</small>
          </a>
        </div>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)} className="block">
          <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Product Image" />
              <div className="col-span-8 sm:col-span-4">
                <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Product Title/Name" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Product Title/Name"
                  name="title"
                  type="text"
                  placeholder="Product title"
                />
                <Error errorName={errors.title} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="SKU" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="sku"
                  name="sku"
                  type="text"
                  placeholder="SKU Code"
                />
                <Error errorName={errors.sku} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Product Slug" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  required="false"
                  label="Product Slug"
                  name="slug"
                  type="text"
                  placeholder="Product slug"
                />
                <Error errorName={errors.slug} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Product Description" />
              <div className="col-span-8 sm:col-span-4">
                <Textarea
                  className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  {...register("description", {
                    required: "Description is required!",
                    minLength: {
                      value: 5,
                      message: "Minimum 5 character!",
                    },
                  })}
                  name="description"
                  placeholder="Product details"
                  rows="4"
                  spellCheck="false"
                />
                <Error errorName={errors.description} />
              </div>
            </div>

            {/*<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Parent Category" />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="parent"
                  {...register("parent", {
                    required: "Product parent category is required!",
                  })}
                >
                  <option value="" defaultValue hidden>
                    Select parent category
                  </option>
                  <ParentCategory />
                </Select>
                <Error errorName={errors.parent} />
              </div>
            </div>*/}

            {/*<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Child Category" />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="children"
                  {...register("children", {
                    required: "Product children category is required!",
                  })}
                >
                  <option value="" defaultValue hidden>
                    Select child category
                  </option>
                  <ChildrenCategory value={watch("parent")} />
                </Select>
                <Error errorName={errors.children} />
              </div>
            </div>*/}

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Product Categories" />
              <div className="col-span-8 sm:col-span-4">
                <SelectOptionChild
                  register={register}
                  label="Product Categories"
                  name="parent"
                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  options={options}
                />
                <Error errorName={errors.parent} />
              </div>
            </div>

            {/*<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Unit (kg/pc/lb/ml/g...etc)" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Unit"
                  name="unit"
                  type="text"
                  placeholder="Unit"
                />
                <Error errorName={errors.unit} />
              </div>
            </div>*/}

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Unit (kg/pc/lb/ml/g...etc)" />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="unit"
                  {...register(`unit`, {
                    required: `unit is required!`,
                  })}
                >
                  <option value="" defaultValue hidden>
                    Select Unit
                  </option>
                  <UnitCategory />
                </Select>
                <Error errorName={errors.unit} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Product Quantity" />
              <div className="col-span-8 sm:col-span-4">
                <InputValue
                  register={register}
                  maxValue={9999}
                  minValue={0}
                  label="Quantity"
                  name="quantity"
                  type="number"
                  placeholder="Quantity"
                />
                <Error errorName={errors.quantity} />
              </div>
            </div>

            {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Currency" />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="currency"
                  {...register('currency', {
                    required: 'Currency is required!',
                  })}
                >
                  <option value="" defaultValue hidden>
                    Select currency
                  </option>
                  <option value="CAD">CAD</option>
                  <option value="RUPI">RUPI</option>
                </Select>
                <Error errorName={errors.currency} />
              </div>
            </div> */}

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Product Price" />
              <div className="col-span-8 sm:col-span-4">
                <InputValue
                  register={register}
                  maxValue={2000}
                  minValue={0.25}
                  label="Price"
                  name="originalPrice"
                  type="number"
                  step=".01"
                  placeholder="Price"
                />
                <Error errorName={errors.originalPrice} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Sale Price" />
              <div className="col-span-8 sm:col-span-4">
                <InputValue
                  register={register}
                  maxValue={2000}
                  minValue={0.25}
                  defaultValue="0"
                  required="false"
                  label="Sale price"
                  name="salePrice"
                  type="number"
                  step=".01"
                  placeholder="Sale price"
                />
                <Error errorName={errors.salePrice} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Is Tax Exempt?" />
              <div className="col-span-8 sm:col-span-4 flex">
                <div className="mx-2">
                  <input
                    type="radio"
                    className="p-2"
                    id="yes"
                    value={"Yes"}
                    name="isExempt"
                    onChange={(e) => {
                      setExemptTax(e.target.value);
                      setFederalTax("");
                    }}
                  />
                  <label htmlFor="yes" className="p-2">
                    Yes
                  </label>
                </div>
                <div className="mx-4">
                  <input
                    type="radio"
                    className="p-2"
                    id="no"
                    value={"No"}
                    name="isExempt"
                    onChange={(e) => {
                      setExemptTax(e.target.value);
                      setFederalTax("");
                    }}
                  />
                  <label htmlFor="no" className="p-2">
                    No
                  </label>
                </div>
                <Error errorName={errors.isExempt} />
              </div>
            </div>
            {isExempt.length > 0 && isExempt === "No" && (
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Is federal tax only?" />
                <div className="col-span-8 sm:col-span-4 flex">
                  <div className="mx-2">
                    <input
                      type="radio"
                      className="p-2"
                      id="yes2"
                      value={"Yes"}
                      name="isFederalTax"
                      onChange={(e) => setFederalTaxData(e.target.value)}
                    />
                    <label htmlFor="yes2" className="p-2">
                      Yes
                    </label>
                  </div>
                  <div className="mx-4">
                    <input
                      type="radio"
                      className="p-2"
                      id="no2"
                      value={"No"}
                      name="isFederalTax"
                      onChange={(e) => setFederalTaxData(e.target.value)}
                    />
                    <label htmlFor="no2" className="p-2">
                      No
                    </label>
                  </div>
                  <Error errorName={errors.isFederalTax} />
                </div>
              </div>
            )}

            {(isExempt.length > 0 || isFederalTax.length > 0) && (
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Tax" />
                <div className="col-span-8 sm:col-span-4">
                  <InputValue
                    register={register}
                    defaultValue={
                      isExempt === "Yes"
                        ? 0
                        : isFederalTax.length > 0
                          ? isFederalTax === "Yes"
                            ? 5
                            : 13
                          : 0
                    }
                    value={
                      isExempt === "Yes"
                        ? 0
                        : isFederalTax.length > 0
                          ? isFederalTax === "Yes"
                            ? 5
                            : 13
                          : 0
                    }
                    required="false"
                    disabled
                    label="Tax"
                    type="number"
                    step=".01"
                    placeholder="Tax"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Product Tag" />
              <div className="col-span-8 sm:col-span-4">
                <ReactTagInput
                  placeholder="Product Tag (Write then press enter to add new tag )"
                  tags={tag}
                  onChange={(newTags) => setTag(newTags)}
                />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Product" />
        </form>
      </Scrollbars>
    </>
  );
};

export default React.memo(ProductDrawer);
