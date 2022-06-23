import React from 'react';
import * as dayjs from 'dayjs';
import { TableCell, TableBody, TableRow } from '@windmill/react-ui';
import Status from '../table/Status';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import Tooltip from '../tooltip/Tooltip';

const OrderTable = ({ orders, heading = "" }) => {
  return (
    <>
      <TableBody>
        {orders?.map((order) => (
          <TableRow key={order._id}>
            <TableCell>
              <span className="text-sm">
                {dayjs(order.createdAt).format('MMM D, YYYY')}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm ">{order.address.substring(0)}</span>
            </TableCell>
            <TableCell>
              {' '}
              <span className="text-sm">{order.contact}</span>{' '}
            </TableCell>
            <TableCell>
              <span className="text-sm font-semibold">
                {order.paymentMethod}
              </span>
            </TableCell>
            <TableCell>
              {' '}
              <span className="text-sm font-semibold">
                C${Math.round(order.total)}.00
              </span>{' '}
            </TableCell>
            <TableCell>
              <Status status={order.status} />
            </TableCell>
            {heading &&
              <TableCell className="text-right flex justify-end">
                <div className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                  {' '}
                  <Link to={`/order/${order._id}`}>
                    <Tooltip
                      id="view"
                      Icon={FiEye}
                      title="View Invoice"
                      bgColor="#34D399"
                    />
                  </Link>
                </div>
              </TableCell>
            }
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default OrderTable;
