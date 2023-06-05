import { Typography } from "antd";
import React from "react";
import OrderItem from "./components/OrderItem";

const OrderHistoryPage: React.FunctionComponent = () => {
  return (
    <div className="py-12 px-80">
      <Typography.Title level={2} style={{ margin: 0 }}>
        Order history
      </Typography.Title>
      <div className="flex flex-col mt-7 gap-14">
        <OrderItem />
        <OrderItem />
      </div>
    </div>
  );
};

export default OrderHistoryPage;
