import React from 'react';
import { TableBody, TableRow, TableCell, Avatar } from '@windmill/react-ui';

import MainModal from '../modal/MainModal';
import MainDrawer from '../drawer/MainDrawer';
import ShowHideButton from '../table/ShowHideButton';
import CategoryDrawer from '../drawer/CategoryDrawer';
import useToggleDrawer from '../../hooks/useToggleDrawer';
import EditDeleteButton from '../table/EditDeleteButton';

const CategoryTable = ({ categories }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <MainModal id={serviceId} />
      <MainDrawer>
        {serviceId ? <CategoryDrawer id={serviceId} /> : <CategoryDrawer />}
      </MainDrawer>

      <TableBody>
        {categories?.map((parent) => (
          <TableRow key={parent._id}>
            <TableCell className="font-semibold uppercase text-xs">
              {parent._id.substring(20, 24)}
            </TableCell>
            <TableCell>
              <Avatar
                className="hidden mr-3 md:block bg-gray-50 p-1"
                src={parent.icon}
                alt={"categoryicon"}
              />
            </TableCell>
            <TableCell className="font-medium text-sm">
              {parent.categoryName}
            </TableCell>
            <TableCell className="font-medium text-sm" title={parent.parentCategory.length > 0 ? parent.parentCategory.map(item => item.label).join(",") : ""}>
              {parent.parentCategory.length > 0 ? parent.parentCategory.slice(0, 2).map(item => item.label).join(",") : "-"}
            </TableCell>
            <TableCell className="text-sm " title={parent.children.length > 0 ? parent.children.map(item => item.label).join(",") : ""}>{parent.children.length > 0 ? parent.children.slice(0, 2).map(item => item.label).join(",") : "-"}</TableCell>
            {/*<TableCell className="text-sm">{parent.type}</TableCell>*/}
            <TableCell>
              {parent.categoryName !== "Root" && <ShowHideButton id={parent._id} status={parent.status} />}
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={parent._id}
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

export default CategoryTable;
