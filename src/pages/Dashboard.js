import React, { useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Pagination,
} from '@windmill/react-ui';
import { FiShoppingCart, FiTruck, FiRefreshCw, FiCheck } from 'react-icons/fi';

import {
  barLegends,
  barOptions,
  doughnutLegends,
  doughnutOptions,
} from '../utils/chartsData';

import useAsync from '../hooks/useAsync';
import useFilter from '../hooks/useFilter';
import OrderServices from '../services/OrderServices';
import Loading from '../components/preloader/Loading';
import ChartCard from '../components/chart/ChartCard';
import CardItem from '../components/dashboard/CardItem';
import ChartLegend from '../components/chart/ChartLegend';
import PageTitle from '../components/Typography/PageTitle';
import OrderTable from '../components/dashboard/OrderTable';
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import ProductsTable from '../components/dashboard/ProductsTable';

const Dashboard = () => {
  const { data, loading } = useAsync(OrderServices.getAllOrders);
  const { data: topSellingProducts } = useAsync(OrderServices.getTopSellingProducts);
  const [order, setOrder] = useState("ASC");
  const [sortedData, setSortData] = useState([]);
  const [sortStatus, setSortStatus] = useState(false);
  const [order2, setOrder2] = useState("ASC");
  const [sortedData2, setSortData2] = useState([]);
  const [sortStatus2, setSortStatus2] = useState(false);
  console.log("topSellingProducts", topSellingProducts)

  const {
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    pending,
    processing,
    delivered,
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

  const sorting2 = (col) => {
    setSortStatus2(true);
    if (order2 === "ASC") {
      const sorted = [...topSellingProducts].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setSortData2(sorted);
      setOrder2("DSC");
    }
    if (order2 === "DSC") {
      const sorted = [...topSellingProducts].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setSortData2(sorted);
      setOrder2("ASC");
    }
  };

  const sortingNumbers2 = (col) => {
    setSortStatus2(true);
    if (order2 === "ASC") {
      const sorted = [...topSellingProducts].sort((a, b) => a[col] - b[col]);
      setSortData2(sorted);
      setOrder2("DSC");
    }
    if (order2 === "DSC") {
      const sorted = [...topSellingProducts].sort((a, b) => b[col] - a[col]);
      setSortData2(sorted);
      setOrder2("ASC");
    }
  };

  return (
    <>
      <PageTitle>Dashboard Overview</PageTitle>
      <div className="grid gap-4 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <CardItem
          title="Total Order"
          Icon={FiShoppingCart}
          quantity={data.length}
          className="text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500"
        />
        <CardItem
          title="Order Pending"
          Icon={FiRefreshCw}
          quantity={pending.length}
          className="text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500"
        />
        <CardItem
          title="Order Processing"
          Icon={FiTruck}
          quantity={processing.length}
          className="text-teal-600 dark:text-teal-100 bg-teal-100 dark:bg-teal-500"
        />
        <CardItem
          title="Order Delivered"
          Icon={FiCheck}
          quantity={delivered.length}
          className="text-green-600 dark:text-green-100 bg-green-100 dark:bg-green-500"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <ChartCard title="Conversions This Year">
          <Bar {...barOptions} />
          <ChartLegend legends={barLegends} />
        </ChartCard>
        <ChartCard title="Top Revenue Product">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>
      </div>

      <PageTitle>Recent Order</PageTitle>
      {loading && <Loading loading={loading} />}
      {dataTable && !loading && (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell onClick={() => sorting("createdAt")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Order Time</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sorting("address")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Delivery Address</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sorting("contact")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Phone</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sorting("paymentMethod")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Payment method</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sortingNumbers("total")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Order amount</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sorting("status")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Status</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">Action</TableCell>
              </tr>
            </TableHeader>
            <OrderTable orders={sortStatus ? sortedData : dataTable} heading="recentOrder" />
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
      )}
      <PageTitle>Top Selling Products</PageTitle>
      {loading && <Loading loading={loading} />}
      {dataTable && !loading && (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell onClick={() => sorting2("unit")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Unit</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sorting2("slug")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Product Name</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sortingNumbers2("originalPrice")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Price</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sortingNumbers2("quantity")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Quantity</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sorting2("type")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Type</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sorting2("parent")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Category</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
              </tr>
            </TableHeader>
            <ProductsTable products={sortStatus2 ? sortedData2 : topSellingProducts} />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={10}
              resultsPerPage={10}
              onChange={() => { }}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      )}
    </>
  );
};

export default Dashboard;
