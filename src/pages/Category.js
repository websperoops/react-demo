import React, { useContext, useState } from 'react';
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Button,
  Input,
  Card,
  CardBody,
  Pagination,
} from '@windmill/react-ui';
import { FiPlus } from 'react-icons/fi';

import useAsync from '../hooks/useAsync';
import useFilter from '../hooks/useFilter';
import NotFound from '../components/table/NotFound';
import { SidebarContext } from '../context/SidebarContext';
import CategoryServices from '../services/CategoryServices';
import Loading from '../components/preloader/Loading';
import PageTitle from '../components/Typography/PageTitle';
import CategoryTable from '../components/category/CategoryTable';
import SelectCategory from '../components/form/SelectCategory';
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

const Category = () => {
  const { toggleDrawer } = useContext(SidebarContext);
  const { data, loading } = useAsync(CategoryServices.getAllCategory);
  const [order, setOrder] = useState("ASC");
  const [sortedData, setSortData] = useState([]);
  const [sortStatus, setSortStatus] = useState(false);

  const {
    categoryRef,
    setFilter,
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleSubmitCategory,
  } = useFilter(data);

  const sorting = (col) => {
    setSortStatus(true);
    if (order === "ASC") {
      const sorted = [...dataTable].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setSortData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...dataTable].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setSortData(sorted);
      setOrder("ASC");
    }
  };

  const sortingNumbers = (col) => {
    setSortStatus(true);
    if (order === "ASC") {
      const sorted = [...dataTable].sort((a, b) => a[col].length - b[col].length);
      setSortData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...dataTable].sort((a, b) => b[col].length - a[col].length);
      setSortData(sorted);
      setOrder("ASC");
    }
  };

  return (
    <>
      <PageTitle>Category</PageTitle>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitCategory}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={categoryRef}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder="Search by category type"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"
              ></button>
            </div>
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <SelectCategory setFilter={setFilter} />
            </div>
            <div className="w-full md:w-56 lg:w-56 xl:w-56">
              <Button onClick={toggleDrawer} className="w-full rounded-md h-12">
                <span className="mr-3">
                  <FiPlus />
                </span>
                Add Category
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {loading ? (
        <Loading loading={loading} />
      ) : serviceData.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell onClick={() => sorting("_id")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>ID</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>Icon</TableCell>
                <TableCell onClick={() => sorting("categoryname")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Category Name</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sorting("parent")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Parent Category</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sortingNumbers("children")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Child Category</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                {/*<TableCell onClick={() => sorting("type")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Product Type</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>*/}
                <TableCell className="text-center">Visible</TableCell>
                <TableCell className="text-right">Actions</TableCell>
              </tr>
            </TableHeader>
            <CategoryTable categories={sortStatus ? sortedData : dataTable} />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Category" />
      )}
    </>
  );
};

export default Category;
