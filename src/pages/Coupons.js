import React, { useContext, useEffect, useState } from 'react';
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
} from '@windmill/react-ui';
import { FiPlus } from 'react-icons/fi';

import useAsync from '../hooks/useAsync';
import useFilter from '../hooks/useFilter';
import NotFound from '../components/table/NotFound';
import Loading from '../components/preloader/Loading';
import CouponServices from '../services/CouponServices';
import { SidebarContext } from '../context/SidebarContext';
import CouponTable from '../components/coupon/CouponTable';
import PageTitle from '../components/Typography/PageTitle';
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

const Coupons = () => {
  const { toggleDrawer, socket } = useContext(SidebarContext);
  const { data, loading } = useAsync(CouponServices.getAllCoupons);
  const [order, setOrder] = useState("ASC");
  const [sortedData, setSortData] = useState([]);
  const [sortStatus, setSortStatus] = useState(false);

  const {
    handleSubmitCoupon,
    couponRef,
    dataTable,
    serviceData,
    totalResults,
    resultsPerPage,
    handleChangePage,
  } = useFilter(data);

  useEffect(() => {
    socket?.on('add', (coupons) => {
      data.unshift(coupons);
    });
  }, [data, socket]);


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
      <PageTitle>Coupons</PageTitle>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitCoupon}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={couponRef}
                type="search"
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                placeholder="Search by coupon code/name"
              />
            </div>
            <div className="w-full md:w-56 lg:w-56 xl:w-56">
              <Button onClick={toggleDrawer} className="w-full rounded-md h-12">
                <span className="mr-3">
                  <FiPlus />
                </span>
                Add Coupon
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
                <TableCell onClick={() => sorting("createdAt")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Start Date</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sorting("endTime")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>End Date</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sorting("title")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Campaigns Name</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sorting("couponCode")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Code</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sortingNumbers("discountPercentage")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Percentage</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sorting("productType")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Product Type</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sorting("endTime")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Status</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">Actions</TableCell>
              </tr>
            </TableHeader>
            <CouponTable coupons={sortStatus ? sortedData : dataTable} />
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
        <NotFound title="Coupon" />
      )}
    </>
  );
};

export default Coupons;
