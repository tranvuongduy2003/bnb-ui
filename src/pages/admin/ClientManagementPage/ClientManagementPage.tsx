import React, { useEffect, useRef, useState } from "react";
import { Col, Input, Row, Spin, Typography } from "antd";
import ClientCard from "./components/ClientCard";
import ClientTable from "./components/ClientTable";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import FilterMenu from "./components/FilterMenu";
import { useAppStore } from "@/stores/useAppStore";
import { useClientStore } from "@/stores/useClientStore";
import { getAllUsers } from "@/apis/user.api";
import { Role } from "@/constants/role";

const items = [
  { value: "all", title: "All clients" },
  { value: "active", title: "Active" },
  { value: "inactive", title: "Inactive" },
];

const ClientManagementPage: React.FunctionComponent = () => {
  const [selectedFilter, setSelectedFilter] = useState<any>(items[0]);
  const [showNewClients, setShowNewClients] = useState<boolean>(true);

  const fetchProductData = useRef<any>(null);

  const isLoading = useAppStore((state) => state.isLoading);
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const clients = useClientStore((state) => state.clients);
  const setClients = useClientStore((state) => state.setClients);
  const setFilteredClients = useClientStore(
    (state) => state.setFilteredClients
  );

  useEffect(() => {
    fetchProductData.current = async () => {
      setIsLoading(true);
      try {
        const { data } = await getAllUsers();
        const clientsData = data.data.filter(
          (item: any) => item.role === Role.CUSTOMER
        );
        setClients(clientsData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchProductData.current();
  }, []);

  useEffect(() => {
    if (selectedFilter.value === "all") {
      setFilteredClients([]);
    } else if (selectedFilter.value === "active") {
      const data = clients.filter((client) => client.isActive);
      setFilteredClients(data);
    } else if (selectedFilter.value === "inactive") {
      const data = clients.filter((client) => !client.isActive);
      setFilteredClients(data);
    }
  }, [selectedFilter]);

  return (
    <div className="p-8">
      {/* TITlE */}
      <Row justify={"space-between"} align={"middle"}>
        <Col>
          <Typography.Title level={2} style={{ margin: 0 }}>
            Customer management
          </Typography.Title>
        </Col>
      </Row>

      {/* NEW CLIENTS CARD */}
      {showNewClients && (
        <div className="p-5 mt-5 rounded-lg bg-primary-100">
          <Row justify={"space-between"} className="w-full text-xl">
            <span>New clients this week</span>
            <CloseOutlined
              className="cursor-pointer"
              onClick={() => setShowNewClients(false)}
            />
          </Row>
          <Row justify={"space-between"} className="py-5" gutter={20}>
            <Col span={8}>
              <ClientCard
                avatar="https://picsum.photos/200"
                name="Cody Fisher"
                desc="Fugiat laborum non ani"
                position="Lead"
                order={37295}
                status="New lead"
              />
            </Col>
            <Col span={8}>
              <ClientCard
                avatar="https://picsum.photos/200"
                name="Tlalli Miski"
                desc="Fugiat laborum non ani"
                position="Lead"
                order={37294}
                status="New lead"
              />
            </Col>
            <Col span={8}>
              <ClientCard
                avatar="https://picsum.photos/200"
                name="John Cooper"
                desc="Fugiat laborum non ani"
                position="Lead"
                order={37293}
                status="Proposal"
              />
            </Col>
          </Row>
        </div>
      )}

      {/* FILTER */}
      <FilterMenu
        selectedItem={selectedFilter}
        items={items}
        onSelect={(item: any) => setSelectedFilter(item)}
      />

      {/* TABLE */}
      {!isLoading ? (
        <ClientTable />
      ) : (
        <Spin spinning={isLoading} size="large" />
      )}
    </div>
  );
};

export default ClientManagementPage;
