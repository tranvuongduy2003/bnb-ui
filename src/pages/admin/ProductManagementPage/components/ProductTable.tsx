import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, InputRef, Rate, Space, Table } from "antd";
import {
  ColumnType,
  ColumnsType,
  FilterConfirmProps,
} from "antd/es/table/interface";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";

interface DataType {
  key: string;
  name: string;
  desc: string;
  brand: string;
  category: string[];
  price: number;
  sold: number;
  stock: number;
  rating: number;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: "1",
    name: "Elizabeth Lopez",
    desc: "Laboris ut minim",
    brand: "Elizabeth",
    category: ["perfume", "women"],
    price: 356000,
    sold: 10,
    stock: 58,
    rating: 4,
  },
  {
    key: "2",
    name: "Matthew Martinez",
    desc: "Nostrud incididu",
    brand: "Matthew",
    category: ["perfume"],
    price: 55000,
    sold: 57,
    stock: 47,
    rating: 4,
  },
  {
    key: "3",
    name: "Elizabeth Hall",
    desc: "Culpa irure irure",
    brand: "Elizabeth",
    category: ["perfume"],
    price: 609000,
    sold: 88,
    stock: 18,
    rating: 4,
  },
  {
    key: "4",
    name: "Maria White",
    desc: "Consequat amet",
    brand: "Maria",
    category: ["perfume", "men"],
    price: 571000,
    sold: 49,
    stock: 84,
    rating: 4,
  },
];

const ProductTable: React.FunctionComponent = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "15%",
      ...getColumnSearchProps("name"),
      render: (value, record, index) => (
        <span className="font-medium">{value}</span>
      ),
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      width: "15%",
      ...getColumnSearchProps("desc"),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      width: "10%",
      ...getColumnSearchProps("brand"),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "15%",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "10%",
      sorter: (a: any, b: any) => a - b,
      sortDirections: ["descend", "ascend"],
      render: (value, record, index) => (
        <span>{`${new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value)}`}</span>
      ),
    },
    {
      title: "Sold",
      dataIndex: "sold",
      key: "sold",
      width: "5%",
      sorter: (a: any, b: any) => a - b,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      width: "5%",
      sorter: (a: any, b: any) => a - b,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: "10%",
      sorter: (a: any, b: any) => a - b,
      sortDirections: ["descend", "ascend"],
      render: (value, record, index) => (
        <Rate allowHalf disabled defaultValue={value} />
      ),
    },
    {
      title: "",
      dataIndex: "edit",
      key: "edit",
      width: "5%",
      render: (value, record, index) => (
        <span className="cursor-pointer text-primary">Edit</span>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 6,
        position: ["bottomCenter"],
      }}
      scroll={{ x: true }}
      className="mb-10"
    />
  );
};

export default ProductTable;
