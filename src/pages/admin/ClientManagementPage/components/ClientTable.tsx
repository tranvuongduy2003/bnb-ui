import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, InputRef, Space, Table } from "antd";
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
  phone: string;
  email: string;
  last_visit: Date;
  total_paid: number;
  quantity: number;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: "1",
    name: "Ashley Lopez",
    phone: "(212) 535-8263",
    email: "jacobjackson1988@yahoo.com",
    last_visit: new Date("Feb 06, 2022"),
    total_paid: 880000,
    quantity: 13,
  },
  {
    key: "2",
    name: "Andrea Sanchez",
    phone: "(845) 732-4788",
    email: "jking@hotmail.com",
    last_visit: new Date("Oct 08, 2021"),
    total_paid: 621000,
    quantity: 13,
  },
  {
    key: "3",
    name: "Brian Scott",
    phone: "(719) 810-7869",
    email: "ehall@hotmail.com",
    last_visit: new Date("Sep 27, 2022"),
    total_paid: 117000,
    quantity: 53,
  },
  {
    key: "4",
    name: "Jaime Jimenez",
    phone: "(619) 656-7396",
    email: "bmartinez@yahoo.com",
    last_visit: new Date("Apr 14, 2021"),
    total_paid: 869000,
    quantity: 96,
  },
];

const ClientTable: React.FunctionComponent = () => {
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
      width: "20%",
      ...getColumnSearchProps("name"),
      render: (value, record, index) => (
        <span className="font-medium">{value}</span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "15%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "25%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Last visit",
      dataIndex: "last_visit",
      key: "last_visit",
      width: "15%",
      render: (value, record, index) =>
        value.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    {
      title: "Total paid & orders",
      dataIndex: "total_paid",
      key: "total_paid",
      width: "15%",
      render: (value, record, index) => (
        <span>{`${new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value)}`}</span>
      ),
    },
    {
      title: "",
      dataIndex: "edit",
      key: "edit",
      width: "10%",
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

export default ClientTable;
