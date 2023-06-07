import React, { useEffect, useRef } from "react";
import Banner from "./components/Banner";
import { Button, Card, Col, Input, List, Row, Select, Spin } from "antd";
import FilterBar from "./components/FilterBar";
import { SearchOutlined } from "@ant-design/icons";
import ProductCard from "./components/ProductCard";
import { useProductStore } from "@/stores/useProductStore";
import { useAppStore } from "@/stores/useAppStore";
import { useCategoriesStore } from "@/stores/useCategoryStore";
import { getAllProducts } from "@/apis/product.api";
import { getAllCategories } from "@/apis/category.api";

const ProductsPage: React.FunctionComponent = () => {
  const isLoading = useAppStore((state) => state.isLoading);
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const products = useProductStore((state) => state.products);
  const setProducts = useProductStore((state) => state.setProducts);
  const categories = useCategoriesStore((state) => state.categories);
  const setCategories = useCategoriesStore((state) => state.setCategories);

  const fetchProductData = useRef<any>();

  useEffect(() => {
    fetchProductData.current = async () => {
      setIsLoading(true);
      try {
        const { data: productData } = await getAllProducts();
        const { data: categoryData } = await getAllCategories();

        setProducts(productData);
        setCategories(categoryData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchProductData.current();
  }, []);

  return (
    <div>
      <Banner />
      <Row className="my-10 px-28" gutter={56}>
        <Col span={6}>
          <FilterBar />
        </Col>
        <Col span={18}>
          <Row gutter={16}>
            <Col flex={1}>
              <Input
                size="large"
                prefix={<SearchOutlined />}
                placeholder="Search..."
              />
            </Col>
            <Col className="w-40">
              <Button type="primary" className="w-full bg-primary" size="large">
                Search
              </Button>
            </Col>
          </Row>
          <div className="flex items-center justify-between mt-10 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl text-neutral-900">Product Results</span>
              <span className="text-xs text-neutral-500">1001 products</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base text-neutral-500">Sort by</span>
              <Select
                defaultValue="low"
                className="w-40 p-0 m-0 sorted-by-select"
                bordered={false}
                options={[
                  { value: "low", label: "Price-low to high" },
                  { value: "high", label: "Price-high to low" },
                  { value: "last", label: "Last posted" },
                  { value: "newest", label: "Newest posted" },
                ]}
              />
            </div>
          </div>

          {!isLoading ? (
            <List
              grid={{ gutter: 24, column: 3 }}
              pagination={{
                position: "bottom",
                align: "center",
                defaultPageSize: 9,
              }}
              dataSource={products}
              renderItem={(item) => (
                <List.Item>
                  <ProductCard data={item} />
                </List.Item>
              )}
            />
          ) : (
            <div className="flex justify-center w-full">
              <Spin spinning={isLoading} size="large" />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProductsPage;
