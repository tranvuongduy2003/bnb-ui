import { Button, Col, Row, Typography } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface DataType {
  key: React.Key;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    render: (value, record, index) => {
      return (
        <Row gutter={20} align={"middle"}>
          <Col>
            <img
              src={record.image}
              alt="item image"
              className="w-24 h-16 rounded-md"
            />
          </Col>
          <Col className="flex flex-col justify-center flex-1">
            <span className="text-sm font-medium leading-6 text-neutral-900">
              {record.name}
            </span>
          </Col>
        </Row>
      );
    },
  },
  {
    title: "Price",
    dataIndex: "price",
    render: (value) => (
      <span>{`${new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value)}`}</span>
    ),
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Total",
    render: (value, record, index) => (
      <span>{`${new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(record.quantity * record.price)}`}</span>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "Product name",
    quantity: 1,
    price: 120000,
    image: "https://picsum.photos/200",
  },
  {
    key: "2",
    name: "Product name",
    quantity: 1,
    price: 120000,
    image: "https://picsum.photos/200",
  },
  {
    key: "3",
    name: "Product name",
    quantity: 1,
    price: 120000,
    image: "https://picsum.photos/200",
  },
];

const OrdersTable: React.FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Table columns={columns} pagination={false} dataSource={data} />
    </div>
  );
};

export default OrdersTable;
