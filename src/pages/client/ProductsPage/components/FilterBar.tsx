import { Checkbox, Col, Collapse, Form, Input, Rate, Row, Slider } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import React, { useState } from "react";
const { Panel } = Collapse;

// interface IFilterBarProps {}

const FilterBar: React.FunctionComponent = () => {
  // Price range
  const [range, setRange] = useState<[number, number]>([0, 600]);
  const onChange = (value: [number, number]) => {
    setRange(value);
  };
  const onAfterChange = (value: [number, number]) => {
    console.log("onAfterChange: ", value);
  };

  // Category
  const categories = [
    { label: "Perfume", value: "perfume" },
    { label: "Cosmetic", value: "cosmetic" },
  ];
  const onCategoryChange = (checkedValues: CheckboxValueType[]) => {
    console.log("checked = ", checkedValues);
  };

  // Brand
  const brands = [
    { label: "Channel", value: "channel" },
    { label: "Louis Vuitton", value: "louis_vuitton" },
    { label: "Gucci", value: "gucci" },
  ];
  const onBrandChange = (checkedValues: CheckboxValueType[]) => {
    console.log("checked = ", checkedValues);
  };

  // Rating
  const rating = [
    { value: 5 },
    { value: 4 },
    { value: 2.5 },
    { value: 2 },
    { value: 1 },
  ];

  return (
    <div className="w-full p-4 rounded-md shadow-md">
      {/* TITLE */}
      <Row
        justify={"space-between"}
        align={"middle"}
        className="border-0 border-b border-solid pb-7 border-neutral-200"
      >
        <Col>
          <span className="text-base">Filters</span>
        </Col>
        <Col>
          <span className="cursor-pointer text-primary-500">Clear all</span>
        </Col>
      </Row>

      {/* PRICE RANGE */}
      <Row className="pb-4 border-0 border-b border-solid pt-7 border-neutral-200">
        <Collapse
          defaultActiveKey={["1"]}
          ghost
          expandIconPosition={"end"}
          className="w-full"
        >
          <Panel
            header="Price range"
            key="1"
            className="p-0 m-0 text-base font-bold"
          >
            <div className="flex items-center justify-between w-full gap-4 font-normal">
              <Input disabled value={range[0]} />
              <span>to</span>
              <Input disabled value={range[1]} />
            </div>
            <Slider
              range
              defaultValue={range}
              onChange={onChange}
              onAfterChange={onAfterChange}
            />
          </Panel>
        </Collapse>
      </Row>

      {/* CATEGORY */}
      <Row className="border-0 border-b border-solid py-7 border-neutral-200">
        <Collapse
          defaultActiveKey={["1"]}
          ghost
          expandIconPosition={"end"}
          className="w-full"
        >
          <Panel
            header="Category"
            key="1"
            className="p-0 m-0 text-base font-bold"
          >
            <Checkbox.Group
              options={categories}
              defaultValue={["perfume"]}
              onChange={onCategoryChange}
              className="flex flex-col gap-2 font-normal"
            />
          </Panel>
        </Collapse>
      </Row>

      {/* BRAND */}
      <Row className="border-0 border-b border-solid py-7 border-neutral-200">
        <Collapse
          defaultActiveKey={["1"]}
          ghost
          expandIconPosition={"end"}
          className="w-full"
        >
          <Panel header="Brand" key="1" className="p-0 m-0 text-base font-bold">
            <Checkbox.Group
              options={brands}
              defaultValue={["channel", "louis_vuitton"]}
              onChange={onBrandChange}
              className="flex flex-col gap-2 font-normal"
            />
          </Panel>
        </Collapse>
      </Row>

      {/* RATING */}
      <Row className="py-7">
        <Collapse
          defaultActiveKey={["1"]}
          ghost
          expandIconPosition={"end"}
          className="w-full"
        >
          <Panel
            header="Rating"
            key="1"
            className="p-0 m-0 text-base font-bold"
          >
            <Checkbox.Group
              defaultValue={[5]}
              onChange={onBrandChange}
              className="flex flex-col gap-2"
            >
              {rating.map((item, index) => (
                <Checkbox
                  key={index}
                  value={item.value}
                  className="flex items-center"
                >
                  <Rate
                    disabled
                    value={item.value}
                    className="h-4 text-base leading-4"
                    allowHalf
                  />
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Panel>
        </Collapse>
      </Row>
    </div>
  );
};

export default FilterBar;
