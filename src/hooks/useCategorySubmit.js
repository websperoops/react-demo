import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SidebarContext } from '../context/SidebarContext';
import CategoryServices from '../services/CategoryServices';
import { notifyError, notifySuccess } from '../utils/toast';

const useCategorySubmit = (id) => {
  const [imageUrl, setImageUrl] = useState('');
  const [children, setChildren] = useState([]);
  const [selectedParentData, setSelectedParentData] = useState([]);
  const [selectedCrossSellData, setSelectedCrossSellData] = useState([]);
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = ({ status, priority, categoryName }) => {
    //if (!imageUrl) {
    //  notifyError('Icon is required!');
    //  return;
    //}
    const categoryData = {
      parentCategory: selectedParentData.length > 0 ? selectedParentData.map(item => ({ _id: item.value })) : [],
      status,
      priority,
      categoryName,
      // slug: slug,
      //type: type,
      icon: imageUrl ? imageUrl : "https://res.cloudinary.com/dbqm9svvp/image/upload/v1652949217/bxkkxi9yenmf21oacrk3.png",
      children: children.length > 0 ? children.map(item => ({ _id: item.value })) : [],
      crossSellCategories: selectedCrossSellData.length > 0 ? selectedCrossSellData.map(item => ({ _id: item.value })) : [],
    };

    if (id) {
      CategoryServices.updateCategory(id, categoryData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      CategoryServices.addCategory(categoryData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue('parent');
      setValue('categoryName');
      // setValue("slug");
      setValue('children');
      setValue('isVisibleInNavigation');
      //setValue('type');
      setValue('status');
      setValue('priority');
      setImageUrl('');
      setChildren([]);
      setSelectedCrossSellData([]);
      setSelectedParentData([]);
      clearErrors('categoryName');
      clearErrors('parent');
      // setValue("slug");
      clearErrors('children');
      clearErrors('crossSellCategories');
      //clearErrors('type');
      //clearErrors('status');
      return;
    }
    if (id) {
      CategoryServices.getCategoryById(id)
        .then((res) => {
          if (res) {
            setValue('categoryName', res.categoryName ? res.categoryName : "");
            // setValue("slug", res.slug);
            setSelectedParentData(res.parentCategory ? res.parentCategory.map(item => ({ value: item._id, label: item.label })) : [])
            setChildren(res.children ? res.children.map(item => ({ value: item._id, label: item.label })) : []);
            setSelectedCrossSellData(res.crossSellCategories ? res.crossSellCategories.map(item => ({ value: item._id, label: item.label })) : []);
            //setValue('type', res.type);
            setValue('icon', res.icon);
            setValue('status', res.status ? res.status : "Show");
            setValue('priority', res.priority ? res.priority : 1);
            setImageUrl(res.icon);
          }
        })
        .catch((err) => {
          notifyError('There is a server error!');
        });
    } else {
      setValue('status', "Show");
      setValue('priority', 1);
      setImageUrl("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen]);
  return {
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
    selectedCrossSellData,
    setSelectedCrossSellData,
    getValues
  };
};

export default useCategorySubmit;
