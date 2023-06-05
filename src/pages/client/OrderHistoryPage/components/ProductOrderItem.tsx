import { Button, Col, Row } from "antd";
import React from "react";

// interface IProductOrderItemProps {}

const ProductOrderItem: React.FunctionComponent = () => {
  return (
    <Row gutter={20} align={"middle"}>
      <Col>
        <img
          src="https://picsum.photos/300/200"
          alt="product image"
          className="object-cover h-32 w-36"
        />
      </Col>
      <Col flex={1} className="flex flex-col justify-center">
        <span className="text-sm font-semibold text-neutral-900">
          Product name
        </span>
        <span className="mb-2 text-xs leading-5 text-neutral-500">
          Quantity: 1
        </span>
        <span className="text-sm font-medium text-neutral-900">{`${new Intl.NumberFormat(
          "vi-VN",
          {
            style: "currency",
            currency: "VND",
          }
        ).format(120000)}`}</span>
      </Col>
      <Col className="flex flex-col items-stretch gap-3">
        <Button type="primary" className="shadow-none bg-primary-500">
          Buy again
        </Button>
        <Button
          type="primary"
          className="shadow-none bg-neutral-200 text-neutral-600"
        >
          View product
        </Button>
      </Col>
    </Row>
  );
};

export default ProductOrderItem;
