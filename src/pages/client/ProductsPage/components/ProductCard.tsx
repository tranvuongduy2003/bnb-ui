import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

// interface IProductCardProps {}

const ProductCard: React.FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      size="small"
      cover={
        <img
          src="https://picsum.photos/200"
          alt="product image"
          className="object-cover h-48"
        />
      }
      onClick={() => navigate("product/detail")}
    >
      <Typography.Title level={4} style={{ margin: 0 }}>
        Product Title
      </Typography.Title>
      <p className="mt-2 mb-4 text-xs leading-5 text-neutral-500">
        Ullamco tempor duis mollit ullamco incididunt culpa elit commodo.
      </p>
      <div className="flex items-center justify-between">
        <Typography.Title level={3} style={{ margin: 0, fontWeight: 700 }}>
          {`${new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(120000)}`}
        </Typography.Title>
        <Button type="primary" className="bg-primary">
          <PlusOutlined />
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
