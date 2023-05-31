import { Avatar, Col, Row } from "antd";
import React from "react";

interface IClientCardProps {
  name: string;
  avatar: string;
  desc: string;
  position: string;
  order: number;
  status: string;
}

const ClientCard: React.FunctionComponent<IClientCardProps> = ({
  name,
  avatar,
  desc,
  position,
  order,
  status,
}) => {
  return (
    <div className="flex flex-col gap-2 px-4 py-6 bg-white rounded-lg">
      <div className="flex gap-x-2">
        <Col>
          <Avatar size={44} src={avatar} />
        </Col>
        <Col>
          <div className="flex flex-col justify-between">
            <span className="text-base font-medium">{name}</span>
            <span className="text-xs text-neutral-500">{desc}</span>
          </div>
          <Row className="mt-6">
            <span className="text-sm font-medium text-neutral-500">
              {position}
            </span>
          </Row>
          <Row gutter={8}>
            <Col>
              <span className="text-[#1091F4FF]">{`#${order}`}</span>
            </Col>
            <Col>
              <span className="text-neutral-500">{status}</span>
            </Col>
          </Row>
        </Col>
      </div>
    </div>
  );
};

export default ClientCard;
