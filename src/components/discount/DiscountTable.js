import React from 'react';
import * as dayjs from 'dayjs';
import { TableCell, TableBody, TableRow } from '@windmill/react-ui';

import MainModal from '../modal/MainModal';
import MainDrawer from '../drawer/MainDrawer';
import useToggleDrawer from '../../hooks/useToggleDrawer';
import EditDeleteButton from '../table/EditDeleteButton';
import DiscountDrawer from '../drawer/DiscountDrawer';

const DiscountTable = ({ coupons }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <MainModal id={serviceId} />
      <MainDrawer>
        {serviceId ? <DiscountDrawer id={serviceId} /> : <DiscountDrawer />}
      </MainDrawer>

      <TableBody>
        {coupons.map((coupon, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">
                {coupon._id.substring(20, 24)}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {' '}
                {coupon.discountText}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {' '}
                {dayjs(coupon.createdAt).format('MMM D, YYYY')}
              </span>
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={coupon._id}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default DiscountTable;
