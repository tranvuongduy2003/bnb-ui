import {
  Button,
  Col,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Tag,
  Typography,
} from "antd";
import React, { useState } from "react";
import {
  PlusOutlined,
  MinusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const ProductDetailPage: React.FunctionComponent = () => {
  // images
  const images = [
    "https://loremflickr.com/1000/1000/paris,girl",
    "https://loremflickr.com/1000/1000/brazil,rio",
    "https://loremflickr.com/1000/1000",
  ];
  const [previewImage, setPreviewImage] = useState<string>(images[0]);

  // colors
  const colors = ["#FDE5FFFF", "#1599ae"];
  const [color, setColor] = useState<string>();

  // type
  const types = ["men", "women"];
  const [type, setType] = useState<string>();
  const handleTypeChange = (e: RadioChangeEvent) => {
    setType(e.target.value);
  };

  // promotion
  const promotions = ["25%", "35%"];

  // quantity
  const [quantity, setQuantity] = useState<number>(1);
  const decrease = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };
  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="px-32 py-10">
      <Typography.Title style={{ margin: 0 }}>Product title</Typography.Title>
      <Row className="mt-6" gutter={40}>
        {/* IMAGES */}
        <Col span={12}>
          <div className="w-full h-[435px]">
            <img
              src={previewImage}
              className="object-cover w-full h-full rounded-md"
            />
          </div>
          <Row gutter={34} justify={"start"} className="mt-8 h-36">
            {images.map((image, index) => (
              <Col span={8} className="h-full">
                <img
                  key={index}
                  src={image}
                  className={`object-cover w-full h-full rounded-md cursor-pointer ${
                    image === previewImage ? "opacity-100" : "opacity-75"
                  }`}
                  onClick={() => setPreviewImage(image)}
                />
              </Col>
            ))}
          </Row>
        </Col>

        {/* INFO */}
        <Col span={12}>
          {/* PRODUCT DESCRIPTION */}
          <Typography.Title level={3} style={{ margin: 0 }}>
            Product description
          </Typography.Title>
          <p className="text-sm leading-6 text-neutral-700 mb-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem lorem
            aliquam sed lacinia quis. Nibh dictumst vulputate odio pellentesque
            sit quis ac, sit ipsum. Sit rhoncus velit in sed massa arcu sit eu.
            Vitae et vitae eget lorem non dui. Sollicitudin ut mi adipiscing
            duis.
          </p>

          <Row gutter={48}>
            {/* COLOR */}
            <Col className="flex flex-col">
              <span className="mb-2 text-sm font-semibold text-neutral-700">
                Color
              </span>
              <div className="flex gap-2">
                {colors.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setColor(item)}
                    style={{ backgroundColor: item }}
                    className={`w-9 h-9 rounded-full border-2 border-solid ${
                      color === item ? "border-primary" : "border-transparent"
                    } cursor-pointer transition-all`}
                  ></div>
                ))}
              </div>
            </Col>

            {/* TYPE */}
            <Col className="flex flex-col mb-7">
              <span className="mb-2 text-sm font-semibold text-neutral-700">
                Type
              </span>
              <div className="flex gap-2">
                <Radio.Group
                  value={type}
                  onChange={handleTypeChange}
                  buttonStyle="solid"
                  className="border-primary-500"
                  size="large"
                >
                  <Radio.Button
                    value="men"
                    className="text-primary-500 !border-primary-500 hover:text-primary-500"
                  >
                    Men
                  </Radio.Button>
                  <Radio.Button
                    value="women"
                    className="text-primary-500 border-primary-500 hover:text-primary-500"
                  >
                    Women
                  </Radio.Button>
                </Radio.Group>
              </div>
            </Col>
          </Row>

          {/* PROMOTION */}
          <Row className="mb-7">
            <Col className="flex flex-col">
              <span className="mb-2 text-sm font-semibold text-neutral-700">
                Promotion
              </span>
              <div className="flex gap-2">
                {promotions.map((item, index) => (
                  <div className="px-4 py-2 text-base rounded-md bg-primary-100 text-primary-500">
                    {item}
                  </div>
                ))}
              </div>
            </Col>
          </Row>

          {/* QUANTITY */}
          <Row className="mb-7">
            <Col className="flex flex-col">
              <span className="mb-2 text-sm font-semibold text-neutral-700">
                Quantity
              </span>
              <div className="flex gap-2">
                <Button.Group>
                  <Button onClick={decrease}>
                    <PlusOutlined />
                  </Button>
                  <Input
                    value={quantity}
                    className="w-12 text-center rounded-none"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const value = JSON.parse(event.target.value);
                      if (value > 0) {
                        setQuantity(value);
                      }
                    }}
                  />
                  <Button onClick={increase}>
                    <MinusOutlined />
                  </Button>
                </Button.Group>
              </div>
            </Col>
          </Row>

          {/* PRICE */}
          <Row className="mb-11">
            <span className="text-5xl font-semibold text-neutral-900 leading-[68px]">{`${new Intl.NumberFormat(
              "vi-VN",
              {
                style: "currency",
                currency: "VND",
              }
            ).format(120000)}`}</span>
          </Row>

          {/* PAYMENT BUTTON GROUP */}
          <Row gutter={16}>
            <Col>
              <Button
                size="large"
                icon={<ShoppingCartOutlined />}
                className="text-primary border-primary hover:!text-primary-500 hover:!border-primary-500 w-48"
              >
                Add to cart
              </Button>
            </Col>
            <Col>
              <Button type="primary" className="w-48 bg-primary" size="large">
                Checkout
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetailPage;
