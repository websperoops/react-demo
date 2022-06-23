import React, { useContext, useState } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Input,
  Button,
  Card,
  CardBody,
  Pagination,
} from "@windmill/react-ui";
import XLSX from "xlsx";
import { FiPlus } from "react-icons/fi";
import useAsync from "../hooks/useAsync";
import useFilter from "../hooks/useFilter";
import NotFound from "../components/table/NotFound";
import Loading from "../components/preloader/Loading";
import ProductServices from "../services/ProductServices";
import PageTitle from "../components/Typography/PageTitle";
import { SidebarContext } from "../context/SidebarContext";
import ProductTable from "../components/product/ProductTable";
import SelectCategory from "../components/form/SelectCategory";
import {
  FiChevronUp,
  FiChevronDown,
  FiDownloadCloud,
  FiTrash,
} from "react-icons/fi";
import { notifyError, notifySuccess } from "../utils/toast";

const Products = () => {
  const { toggleDrawer } = useContext(SidebarContext);
  const { data, loading } = useAsync(ProductServices.getAllProducts);
  const [order, setOrder] = useState("ASC");
  const [sortedData, setSortData] = useState([]);
  const [sortStatus, setSortStatus] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const {
    searchRef,
    setFilter,
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleSubmitForAll,
  } = useFilter(data);

  const selectItem = (id) => {
    let updatedItems = [...selectedItems];
    if (updatedItems.includes(id)) {
      let index = updatedItems.findIndex((item) => item === id);
      updatedItems.splice(index, 1);
    } else {
      updatedItems.push(id);
    }
    setSelectedItems(updatedItems);
  };

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
      const sorted = [...dataTable].sort((a, b) => a[col] - b[col]);
      setSortData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...dataTable].sort((a, b) => b[col] - a[col]);
      setSortData(sorted);
      setOrder("ASC");
    }
  };

  const downloadExcel = () => {
    let finalData = serviceData.map((item) => {
      let obj = { ...item };
      delete obj.__v;
      delete obj.status;
      delete obj.updatedAt;
      delete obj.createdAt;
      return obj;
    });
    const worksheet = XLSX.utils.json_to_sheet(finalData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "Products.xlsx");
  };
  const deleteBulkProducts = () => {
    console.log("selected products", selectedItems);
    ProductServices.deleteProductMultiple({ ids: selectedItems })
      .then((res) => {
        notifySuccess(res.message);
        window.location.reload();
      })
      .catch((err) => notifyError(err.message));
  };

  return (
    <>
      <div className="grid grid-rows-1 grid-flow-col gap-10 mt-2">
        <div className="flex justify-between align-items-center">
          <div>
            <PageTitle>Products</PageTitle>
          </div>
          <div className="flex justify-between align-items-center">
            <Button
              onClick={deleteBulkProducts}
              disabled={selectedItems.length === 0}
              className="w-full rounded-md h-12 m-2"
            >
              <span className="mr-3">
                <FiTrash />
              </span>
              Delete
            </Button>
            <Button
              onClick={downloadExcel}
              className="w-full rounded-md h-12 m-2"
            >
              <span className="mr-3">
                <FiDownloadCloud />
              </span>
              Export
            </Button>

            <Button
              onClick={toggleDrawer}
              className="rounded-md h-12 m-2 w-full md:w-56 lg:w-56 xl:w-56"
            >
              <span className="mr-3">
                <FiPlus />
              </span>
              Add Product(s)
            </Button>
          </div>
        </div>
      </div>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitForAll}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={searchRef}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder="Search by product name"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"
              ></button>
            </div>
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <SelectCategory setFilter={setFilter} />
            </div>
            {/* <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Select
                onChange={(e) => setSortedField(e.target.value)}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              >
                <option value="All" defaultValue hidden>
                  Price
                </option>
                <option value="Low">Low to High</option>
                <option value="High">High to Low</option>
              </Select>
            </div> */}
            {/* <div className="w-full md:w-56 lg:w-56 xl:w-56">
              <Button onClick={toggleDrawer} className="w-full rounded-md h-12">
                <span className="mr-3">
                  <FiPlus />
                </span>
                Add Product(s)
              </Button>
            </div> */}
          </form>
        </CardBody>
      </Card>
      {loading ? (
        <Loading loading={loading} />
      ) : serviceData.length !== 0 ? (
        <TableContainer className="mb-8 rounded-b-lg">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>
                  <div className="flex justify-start cursor-pointer"></div>
                </TableCell>
                <TableCell onClick={() => sorting("_id")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>SKU</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sorting("title")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Product name</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sorting("parent")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Category</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sortingNumbers("price")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Price</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sortingNumbers("quantity")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Stock</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sortingNumbers("discount")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Status</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sortingNumbers("discount")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Discount</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sortingNumbers("tax")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>TAX</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>Details</TableCell>
                <TableCell className="text-center">Published</TableCell>
                <TableCell className="text-right">Actions</TableCell>
              </tr>
            </TableHeader>
            <ProductTable
              products={sortStatus ? sortedData : dataTable}
              selectItem={selectItem}
              selectedItems={selectedItems}
            />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Product Page Navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Product" />
      )}
    </>
  );
};

export default Products;
