import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "../context/SidebarContext";
import ProductServices from "../services/ProductServices";
import { notifyError, notifySuccess } from "../utils/toast";

const useProductSubmit = (id) => {
  const [imageUrl, setImageUrl] = useState("");
  const [children, setChildren] = useState("");
  const [selectedData, setSelectedData] = useState('');
  const [tag, setTag] = useState([]);
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // if (!imageUrl) {
    //   notifyError('Image is required!');
    //   return;
    // }
    if (data.originalPrice < data.salePrice) {
      notifyError("SalePrice must be less then or equal of product price!");
      return;
    }
    if (data.sku.length < 4 || data.sku.length > 8) {
      notifyError("SKU Should Contain 4-8 Characters Only");
      return;
    }

    const productData = {
      title: data.title,
      slug: data.slug
        ? data.slug
        : data.title.trim().toLowerCase().replace("&", "").split(" ").join("-"),
      description: data.description,
      parent: selectedData.length > 0 ? selectedData.map(item => item.value)[0] : "",
      parentCategory: selectedData.length > 0 ? selectedData.map(item => ({ _id: item.value })) : [],
      children: data.children,
      sku: data.sku,
      type: data.type,
      unit: data.unit,
      quantity: data.quantity,
      originalPrice: data.originalPrice,
      price: data.salePrice ? data.salePrice : data.originalPrice,
      discount:
        data.salePrice > 0 &&
        ((data.originalPrice - data.salePrice) / data.originalPrice) * 100,
      image: imageUrl ? imageUrl : "https://i.ibb.co/y0zXYj5/carp-fish.png",
      tag: tag,
      tax:
        data.isExempt === "Yes"
          ? 0
          : data.isFederalTax && data.isFederalTax.length > 0
            ? data.isFederalTax === "Yes"
              ? 5
              : 13
            : 0,
      isExempt: data.isExempt && data.isExempt.length > 0 ? data.isExempt : "",
      isFederalTax:
        data.isExempt === "Yes"
          ? ""
          : data.isFederalTax
            ? data.isFederalTax
            : "",
    };

    if (id) {
      ProductServices.updateProduct(id, productData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      ProductServices.addProduct(productData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    }
  };

  const onSubmitMultiple = (products) => {
    if (products.length === 0) {
      notifyError("Data is required!");
      return;
    }
    products.forEach((data) => {
      if (data.originalPrice < data.salePrice) {
        notifyError("SalePrice must be less then or equal of product price!");
        return;
      }
    });

    let allProducts = [];
    products.forEach((data) => {
      const productData = {
        title: data.title,
        slug: data.slug
          ? data.slug
          : data.title.trim().toLowerCase().replace("&", "").split(" ").join("-"),
        description: data.description,
        parent: data.parent.length > 0 ? data.parent.split(",")[0] : "",
        parentCategory: data.parent.length > 0 ? data.parent.split(",") : [],
        children: data.children,
        type: data.type,
        unit: data.unit,
        quantity: data.quantity,
        originalPrice: data.originalPrice,
        price: data.salePrice ? data.salePrice : data.originalPrice,
        discount:
          data.salePrice > 0 &&
          ((data.originalPrice - data.salePrice) / data.originalPrice) * 100,
        tag: data.tag,
        tax:
          data.isExempt === "Yes"
            ? 0
            : data.isFederalTax && data.isFederalTax.length > 0
              ? data.isFederalTax === "Yes"
                ? 5
                : 13
              : 0,
        isExempt:
          data.isExempt && data.isExempt.length > 0 ? data.isExempt : "",
        isFederalTax:
          data.isExempt === "Yes"
            ? ""
            : data.isFederalTax
              ? data.isFederalTax
              : "",
        image: data.imageUrl
          ? data.imageUrl
          : "https://i.ibb.co/y0zXYj5/carp-fish.png",
        _id: data._id ? data._id : null,
      };
      allProducts.push(productData);
    });
    ProductServices.addMultipleProducts(allProducts)
      .then((res) => {
        setIsUpdate(true);
        notifySuccess(res.message);
      })
      .catch((err) => notifyError(err.message));
    closeDrawer();
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("title");
      setValue("slug");
      setValue("description");
      setValue("parent");
      setValue("children");
      setValue("sku");
      setValue("type");
      setValue("unit");
      setValue("quantity");
      setValue("originalPrice");
      setValue("salePrice");
      setValue("tax");
      setValue("isExempt");
      setValue("isFederalTax");
      setImageUrl("");
      setChildren("");
      setTag([]);
      setSelectedData([]);
      clearErrors("title");
      clearErrors("slug");
      clearErrors("description");
      clearErrors("parent");
      clearErrors("children");
      clearErrors("sku");
      clearErrors("type");
      clearErrors("unit");
      clearErrors("quantity");
      clearErrors("originalPrice");
      clearErrors("salePrice");
      clearErrors("tax");
      clearErrors("isExempt");
      clearErrors("isFederalTax");
      return;
    }

    if (id) {
      ProductServices.getProductById(id)
        .then((res) => {
          if (res) {
            setValue("title", res.title);
            setValue("slug", res.slug);
            setValue("description", res.description);
            setValue("parent", res.parent);
            setSelectedData(res.parentCategory ? res.parentCategory.map(item => ({ value: item._id, label: item.label })) : [])
            setValue("children", res.children);
            setValue("sku", res.sku);
            setValue("type", res.type);
            setValue("unit", res.unit);
            setValue("quantity", res.quantity);
            setValue("originalPrice", res.originalPrice);
            setValue("salePrice", res.price);
            setValue("tax", res.tax);
            setValue("isExempt", res.isExempt);
            setValue("isFederalTax", res.isFederalTax);
            setTag(res.tag);
            setImageUrl(res.image);
            if (document.getElementById("yes") && res.isExempt === "Yes") {
              document.getElementById("yes").checked = true;
              document.getElementById("yes").value = "Yes";
              setValue("tax", 0);
            } else if (document.getElementById("no") && res.isExempt === "No") {
              document.getElementById("no").checked = true;
              document.getElementById("no").value = "No";
              if (
                document.getElementById("yes2") &&
                res.isFederalTax === "Yes"
              ) {
                document.getElementById("yes2").checked = true;
                document.getElementById("yes2").value = "Yes";
                setValue("tax", 5);
              } else if (
                document.getElementById("no2") &&
                res.isFederalTax === "No"
              ) {
                document.getElementById("no2").checked = true;
                document.getElementById("no2").value = "No";
                setValue("tax", 13);
              } else if (
                document.querySelector('input[name="isFederalTax"]:checked')
              ) {
                document.querySelector(
                  'input[name="isFederalTax"]:checked'
                ).checked = false;
              }
            } else if (
              document.querySelector('input[name="isExempt"]:checked')
            ) {
              document.querySelector(
                'input[name="isExempt"]:checked'
              ).checked = false;
            }
          }
        })
        .catch((err) => {
          notifyError("There is a server error!");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen]);

  useEffect(() => {
    setChildren(watch("children"));
  }, [watch, children]);

  return {
    register,
    watch,
    handleSubmit,
    onSubmit,
    onSubmitMultiple,
    errors,
    imageUrl,
    setImageUrl,
    tag,
    setTag,
    getValues,
    selectedData,
    setSelectedData,
    setValue,
  };
};

export default useProductSubmit;
