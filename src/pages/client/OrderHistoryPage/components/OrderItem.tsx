import React from "react";
import { Col, Row } from "antd";
import ProductOrderItem from "./ProductOrderItem";

// interface IOrderItemProps {}

const OrderItem: React.FunctionComponent = () => {
  return (
    <div className="flex flex-col gap-6">
      <Row justify={"space-between"}>
        <Col>
          <span className="text-sm font-medium">Order #1</span>
        </Col>
        <Col className="flex gap-8">
          <span className="text-sm underline cursor-pointer text-neutral-500">
            Manage order
          </span>
          <span className="text-sm underline cursor-pointer text-neutral-500">
            View invoice
          </span>
        </Col>
      </Row>
      <div className="flex flex-col gap-6">
        <ProductOrderItem />
        <ProductOrderItem />
        <ProductOrderItem />
      </div>
    </div>
  );
};

export default OrderItem;
