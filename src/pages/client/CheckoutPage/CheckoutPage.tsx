import { Col, Row, Typography } from "antd";
import React from "react";
import PaymentBill from "./components/PaymentBill";
import OrderSummary from "./components/OrderSummary";
import RecipientInformation from "./components/RecipientInformation";

const CheckoutPage: React.FunctionComponent = () => {
  return (
    <div className="px-32 py-9">
      <Typography.Title level={2} style={{ margin: 0 }}>
        Checkout
      </Typography.Title>
      <Row gutter={28} className="mt-6">
        <Col span={16} className="flex flex-col gap-7">
          <OrderSummary />
          <RecipientInformation />
        </Col>
        <Col span={8}>
          <PaymentBill />
        </Col>
      </Row>
    </div>
  );
};

export default CheckoutPage;
