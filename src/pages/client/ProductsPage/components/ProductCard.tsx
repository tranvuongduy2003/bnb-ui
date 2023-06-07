import { IProduct } from "@/interfaces/IProduct";
import { useCartStore } from "@/stores/useCartStore";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Typography } from "antd";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

interface IProductCardProps {
  data: IProduct;
}

const ProductCard: React.FunctionComponent<IProductCardProps> = ({ data }) => {
  const navigate = useNavigate();

  const addToCart = useCartStore((state) => state.addToCart);

  const buttonRef = useRef<any>();

  const handleClickCart: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target !== buttonRef.current) {
      navigate(`product/${data.id}`);
    }
  };

  return (
    <Card
      hoverable
      size="small"
      cover={
        <img
          src={data.images[0]}
          alt="product image"
          className="object-cover h-48"
        />
      }
      onClick={handleClickCart}
    >
      <Typography.Title level={4} style={{ margin: 0 }}>
        {data.name}
      </Typography.Title>
      <p className="mt-2 mb-4 text-xs leading-5 text-neutral-500">
        {data.desc}
      </p>
      <div className="flex items-center justify-between">
        <Typography.Title level={3} style={{ margin: 0, fontWeight: 700 }}>
          {`${new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(data.price)}`}
        </Typography.Title>
        <Button
          ref={buttonRef}
          type="primary"
          className="bg-primary"
          onClick={() => addToCart({ ...data, quantity: 1 })}
        >
          <PlusOutlined />
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
