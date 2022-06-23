import React, { useState } from "react";

import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Select,
  Input,
  Card,
  CardBody,
  Pagination,
} from "@windmill/react-ui";

import useAsync from "../hooks/useAsync";
import useFilter from "../hooks/useFilter";
import NotFound from "../components/table/NotFound";
import OrderServices from "../services/OrderServices";
import Loading from "../components/preloader/Loading";
import OrderTable from "../components/order/OrderTable";
import PageTitle from "../components/Typography/PageTitle";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
const SLAOrders = () => {
  const { data, loading } = useAsync(OrderServices.getAllPendingOrders);
  const [order, setOrder] = useState("ASC");
  const [sortedData, setSortData] = useState([]);
  const [sortStatus, setSortStatus] = useState(false);

  const {
    orderRef,
    setStatus,
    setTime,
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleSubmitOrder,
  } = useFilter(data);
  // const [fData,setFdata] = useState(dataTable)
  const sorting = (col) => {
    setSortStatus(true);
    if (order === "ASC") {
      const sorted = [...dataTable].sort((a, b) =>
        a[col].toString().toLowerCase() > b[col].toString().toLowerCase() ? 1 : -1
      );
      setSortData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...dataTable].sort((a, b) =>
        a[col].toString().toLowerCase() < b[col].toString().toLowerCase() ? 1 : -1
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

  return (
    <>
      <PageTitle>Escalation Orders</PageTitle>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitOrder}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:grid-cols-3 xl:grid-cols-3"
          >
            <div>
              <Input
                ref={orderRef}
                type="search"
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                placeholder="Search by phone"
              />
            </div>
            <div>
              <Select
                onChange={(e) => setStatus(e.target.value)}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              >
                <option value="Status" defaultValue hidden>
                  Status
                </option>
                <option value="Delivered">Delivered</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Cancel">Cancel</option>
              </Select>
            </div>
            <div>
              <Select
                onChange={(e) => setTime(e.target.value)}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              >
                <option value="Order limits" defaultValue hidden>
                  Order limits
                </option>
                <option value="5">Last 5 days orders</option>
                <option value="7">Last 7 days orders</option>
                <option value="15">Last 15 days orders</option>
                <option value="30">Last 30 days orders</option>
              </Select>
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
                <TableCell onClick={() => sorting("zipCode")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Order ID</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sorting("createdAt")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Time</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sorting("address")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Shipping Address</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sorting("contact")}>
                  {" "}
                  <div className="flex justify-start cursor-pointer">
                    <div>Phone</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sorting("paymentMethod")}>
                  {" "}
                  <div className="flex justify-start cursor-pointer">
                    <div>Method</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sortingNumbers("total")}>
                  {" "}
                  <div className="flex justify-start cursor-pointer">
                    <div>Amount</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  onClick={() => sorting("status")}
                  className="text-center"
                >
                  {" "}
                  <div className="flex justify-start cursor-pointer">
                    <div>Status</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">Action</TableCell>
                <TableCell className="text-right">Invoice</TableCell>
              </tr>
            </TableHeader>
            <OrderTable orders={sortStatus ? sortedData : dataTable} />
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
        <NotFound title="Order" />
      )}
    </>
  );
};

export default SLAOrders;
