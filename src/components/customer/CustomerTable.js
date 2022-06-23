import React from "react";
import { Link } from "react-router-dom";
import * as dayjs from "dayjs";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";
import { FiEye } from "react-icons/fi";

import Tooltip from "../tooltip/Tooltip";
import MainModal from "../modal/MainModal";
import EditDeleteButton from "../table/EditDeleteButton";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import MainDrawer from "../drawer/MainDrawer";
import CustomerDrawer from "../drawer/CustomerDrawer";

const CustomerTable = ({ customers }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <MainModal id={serviceId} />
      <MainDrawer>
        {serviceId ? <CustomerDrawer id={serviceId} /> : <CustomerDrawer />}
      </MainDrawer>
      <TableBody>
        {customers?.map((user) => (
          <TableRow key={user._id}>
            <TableCell>
              <span className="flex  font-semibold uppercase text-xs">
                {" "}
                {user._id.substring(20, 24)}
              </span>
            </TableCell>
            <TableCell>
              <span className="flex  text-sm">
                {dayjs(user.createdAt).format("MMM D, YYYY")}
              </span>
            </TableCell>
            <TableCell>
              <span className="flex  text-sm">{user.name}</span>
            </TableCell>
            <TableCell>
              <span className="flex  text-sm">{user.email}</span>{" "}
            </TableCell>
            <TableCell>
              <span className="flex  text-sm font-medium">{user.phone}</span>
            </TableCell>
            <TableCell>
              <span className="flex  text-sm font-medium">
                {user.lastOrderedDate === "No Orders"
                  ? "No Orders"
                  : dayjs(user.lastOrderedDate).format("MMM D, YYYY")}
              </span>
            </TableCell>

            <TableCell>
              <div className="flex justify-end text-right">
                <div className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                  {" "}
                  <Link to={`/customer-order/${user._id}`}>
                    <Tooltip
                      id="view"
                      Icon={FiEye}
                      title="View Order"
                      bgColor="#34D399"
                    />
                  </Link>
                </div>
                {/* <div
                  onClick={() => handleModalOpen(user._id)}
                  className="p-2 cursor-pointer text-gray-400 hover:text-red-600"
                >
                  <Tooltip
                    id="delete"
                    Icon={FiTrash2}
                    title="Delete"
                    bgColor="#F87171"
                  />
                </div> */}
                <EditDeleteButton
                  id={user._id}
                  handleUpdate={handleUpdate}
                  handleModalOpen={handleModalOpen}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CustomerTable;
