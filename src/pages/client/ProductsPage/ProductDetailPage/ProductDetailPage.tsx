import {
  Button,
  Col,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Skeleton,
  Spin,
  Tag,
  Typography,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  PlusOutlined,
  MinusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useCartStore } from "@/stores/useCartStore";
import { useProductStore } from "@/stores/useProductStore";
import Reviews from "./components/Reviews";
import { useAppStore } from "@/stores/useAppStore";
import { getProductById } from "@/apis/product.api";

const ProductDetailPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const params: any = useParams();
  const productId: string | number = JSON.parse(params.productId);

  const isLoading = useAppStore((state) => state.isLoading);
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const product = useProductStore((state) => state.product);
  const setProduct = useProductStore((state) => state.setProduct);

  const [previewImage, setPreviewImage] = useState<string>();

  const fetchProductData = useRef<any>();

  useEffect(() => {
    fetchProductData.current = async () => {
      setIsLoading(true);
      try {
        const { data: productData } = await getProductById(productId);
        setProduct(productData);
        setPreviewImage(productData.images[0]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchProductData.current();
  }, []);

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
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  // features
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="px-32 py-10">
      <Typography.Title style={{ margin: 0 }}>{product?.name}</Typography.Title>
      {/* PRODUCT INFORMATION */}
      <Row className="mt-6" gutter={40}>
        {/* IMAGES */}
        <Col span={12}>
          <div className="w-full h-[435px]">
            {isLoading ? (
              <Skeleton.Image active={isLoading} className="w-full h-full" />
            ) : (
              <img
                src={previewImage}
                className="object-cover w-full h-full rounded-md"
              />
            )}
          </div>
          <Row gutter={34} justify={"start"} className="mt-8 h-36">
            {product?.images.map((image, index) => (
              <Col span={8} className="h-full">
                <img
                  key={index}
                  src={image}
                  className={`object-cover w-full h-full rounded-md cursor-pointer ${
                    image === previewImage ? "opacity-100" : "opacity-75"
                  }`}
                  onMouseEnter={() => setPreviewImage(image)}
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
            {product?.desc}
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
                    <MinusOutlined />
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
                    <PlusOutlined />
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
            ).format(product?.price || 0)}`}</span>
          </Row>

          {/* PAYMENT BUTTON GROUP */}
          <Row gutter={16}>
            <Col>
              <Button
                size="large"
                icon={<ShoppingCartOutlined />}
                className="text-primary border-primary hover:!text-primary-500 hover:!border-primary-500 w-48"
                onClick={() => product && addToCart({ ...product, quantity })}
              >
                Add to cart
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                className="w-48 bg-primary"
                size="large"
                onClick={() =>
                  navigate("/checkout", {
                    state: { orders: [{ ...product, quantity }] },
                  })
                }
              >
                Checkout
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* REVIEWS */}
      {isLoading ? (
        <div className="flex justify-center w-full">
          <Spin spinning={isLoading} size="large" />
        </div>
      ) : (
        <Reviews productId={productId} />
      )}
    </div>
  );
};

export default ProductDetailPage;
