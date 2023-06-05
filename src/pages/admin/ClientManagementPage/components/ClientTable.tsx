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
  avatar: string;
  position: string;
  isActive: boolean;
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
    avatar: "https://picsum.photos/200",
    position: "Fashion Designer",
    isActive: true,
    phone: "(212) 535-8263",
    email: "jacobjackson1988@yahoo.com",
    last_visit: new Date("Feb 06, 2022"),
    total_paid: 880000,
    quantity: 13,
  },
  {
    key: "2",
    name: "Andrea Sanchez",
    avatar: "https://picsum.photos/200",
    position: "Fashion Designer",
    isActive: true,
    phone: "(845) 732-4788",
    email: "jking@hotmail.com",
    last_visit: new Date("Oct 08, 2021"),
    total_paid: 621000,
    quantity: 13,
  },
  {
    key: "3",
    name: "Brian Scott",
    avatar: "https://picsum.photos/200",
    position: "Fashion Designer",
    isActive: true,
    phone: "(719) 810-7869",
    email: "ehall@hotmail.com",
    last_visit: new Date("Sep 27, 2022"),
    total_paid: 117000,
    quantity: 53,
  },
  {
    key: "4",
    name: "Jaime Jimenez",
    avatar: "https://picsum.photos/200",
    position: "Fashion Designer",
    isActive: false,
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
        <div className="flex items-center gap-7">
          <div>
            <img
              src={record.avatar}
              alt="avatar"
              className="rounded-full w-9 h-9"
            />
          </div>
          <div className="flex flex-col gap-[2px]">
            <span className="text-sm font-medium">{record.name}</span>
            <span className="text-xs text-neutral-600">{record.position}</span>
          </div>
        </div>
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
        <div className="flex flex-col gap-[2px]">
          <span className="text-sm">{`${new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(value)}`}</span>
          <span className="text-xs text-neutral-600">{record.quantity}</span>
        </div>
      ),
    },
    {
      title: "Activate",
      key: "isActive",
      dataIndex: "isActive",
      width: "10%",
      render: (value, record, index) =>
        value ? (
          <Button
            danger
            className="hover:!border-red-500 hover:!text-white hover:!bg-red-500 w-full"
          >
            Deactivate
          </Button>
        ) : (
          <Button className="w-full text-green-600 border-green-600 hover:!border-green-600 hover:!text-white hover:!bg-green-600">
            Activate
          </Button>
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
