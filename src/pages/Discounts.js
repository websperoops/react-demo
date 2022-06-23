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
import DiscountServices from '../services/DiscountServices';
import { SidebarContext } from '../context/SidebarContext';
//import CouponTable from '../components/coupon/CouponTable';
import PageTitle from '../components/Typography/PageTitle';
import DiscountTable from '../components/discount/DiscountTable';
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

const Discounts = () => {
  const { toggleDrawer, socket } = useContext(SidebarContext);
  const { data, loading } = useAsync(DiscountServices.getAllDiscounts);
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

  return (
    <>
      <PageTitle>Messages</PageTitle>
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
                placeholder="Search by message code/name"
              />
            </div>
            <div className="w-full md:w-56 lg:w-56 xl:w-56">
              <Button onClick={toggleDrawer} className="w-full rounded-md h-12">
                <span className="mr-3">
                  <FiPlus />
                </span>
                Add Message
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
                <TableCell onClick={() => sorting("discountText")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Message Text</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => sorting("createdAt")}>
                  <div className="flex justify-start cursor-pointer">
                    <div>Created At</div>
                    <div>
                      <FiChevronUp />
                      <FiChevronDown className="bottomArrow" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">Actions</TableCell>
              </tr>
            </TableHeader>
            <DiscountTable coupons={sortStatus ? sortedData : dataTable} />
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
        <NotFound title="Discount" />
      )}
    </>
  );
};

export default Discounts;
