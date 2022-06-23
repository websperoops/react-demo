import React from 'react';
import { TableCell, TableBody, TableRow } from '@windmill/react-ui';

const ProductsTable = ({ products, heading = "" }) => {
  return (
    <>
      <TableBody>
        {products?.map((product) => (
          <TableRow key={product._id}>
            <TableCell>
              <span className="text-sm">
                {product.unit}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm ">{product.title}</span>
            </TableCell>
            <TableCell>
              {' '}
              <span className="text-sm">C${product.originalPrice}</span>{' '}
            </TableCell>
            <TableCell>
              {' '}
              <span className="text-sm">{product.quantity}</span>{' '}
            </TableCell>
            <TableCell>
              {' '}
              <span className="text-sm font-semibold">
                {product.type}
              </span>{' '}
            </TableCell>
            <TableCell>
              <span className="text-sm font-semibold">
                {product.parent}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default ProductsTable;
