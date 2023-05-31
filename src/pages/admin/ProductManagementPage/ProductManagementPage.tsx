import React, { useState } from "react";
import { Button, Col, Row, Typography } from "antd";
import SummaryCard from "./components/SummaryCard";
import ProductTable from "./components/ProductTable";
import ProductModal from "./components/ProductModal";

const ProductManagementPage: React.FunctionComponent = () => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="p-8">
      {/* TITlE */}
      <Row justify={"space-between"} align={"middle"}>
        <Col>
          <Typography.Title level={2} style={{ margin: 0 }}>
            Product management
          </Typography.Title>
        </Col>
        <Col>
          <Button
            type="primary"
            className="bg-primary"
            size="large"
            onClick={() => setShow(true)}
          >
            Add new product
          </Button>
        </Col>
      </Row>

      {/* SUMMARY CARD */}
      <div className="p-5 mt-5 mb-12 rounded-lg bg-primary-100">
        <span className="text-xl">Summary</span>
        <Row justify={"space-between"} className="px-10 py-5">
          <Col span={6}>
            <SummaryCard title="Total products" value="856" percentage={5.39} />
          </Col>
          <Col span={6}>
            <SummaryCard title="Total Sum" value="$197 K" percentage={22} />
          </Col>
          <Col span={6}>
            <SummaryCard
              title="Number of categories"
              value="12"
              percentage={67}
            />
          </Col>
        </Row>
      </div>

      {/* TABLE */}
      <ProductTable />

      <ProductModal show={show} setShow={setShow} />
    </div>
  );
};

export default ProductManagementPage;
