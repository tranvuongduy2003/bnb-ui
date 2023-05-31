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
  {
    render: (value, record, index) => (
      <Button type="text" danger>
        <DeleteOutlined />
      </Button>
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

const CartTable: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        pagination={false}
        dataSource={data}
      />
      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center gap-5">
          <Typography.Title level={3} style={{ margin: 0 }}>
            Total price:
          </Typography.Title>
          <Typography.Title level={3} style={{ margin: 0, fontWeight: 400 }}>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(
              data.reduce((prev, cur) => prev + cur.quantity * cur.price, 0)
            )}
          </Typography.Title>
        </div>
        <Button
          type="primary"
          size="large"
          className="bg-primary"
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartTable;
