import validator from "@/utils/validateImage";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography,
  Upload,
  message,
} from "antd";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import React, { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "@/firebase";

interface IProductModalProps {
  show: boolean;
  setShow: any;
}

const ProductModal: React.FunctionComponent<IProductModalProps> = ({
  show,
  setShow,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  const onChangeFile: UploadProps["onChange"] = async ({ fileList }) => {
    setFileList(fileList);
    console.log(fileList);
  };

  const beforeUploadFile = (file: RcFile) => {
    const msgs = validator(file);
    msgs.map((msg) => message.error(msg));
    return msgs.length == 0 || Upload.LIST_IGNORE;
  };

  const handleAddNewProduct = async (values: any) => {
    const { images, ...rest } = values;
    const storage = getStorage(app);
    const imageURLs: any = [];
    await images.fileList.map(async (image: any) => {
      const storageRef = ref(storage, `products/${image.name}`);
      await uploadBytes(storageRef, image.originFileObj);
      const imageURL = await getDownloadURL(storageRef);
      imageURLs.push(imageURL);
    });

    console.log({ ...rest, images: imageURLs });
  };

  return (
    <Modal
      title="Add new product"
      centered
      open={show}
      onOk={() => form.submit()}
      onCancel={() => setShow(false)}
      width={800}
    >
      <Form
        form={form}
        labelCol={{ span: 24 }}
        onFinish={(values) => handleAddNewProduct(values)}
      >
        <Form.Item name="name" label="Name">
          <Input placeholder="Product name" />
        </Form.Item>
        <Row justify={"space-between"} gutter={57}>
          <Col span={16}>
            <Form.Item name="desc" label="Description">
              <Input placeholder="Description" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="brand" label="Brand name">
              <Input placeholder="Brand name" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={"space-between"} gutter={57}>
          <Col span={16}>
            <Row justify={"space-between"} gutter={57}>
              <Col span={12}>
                <Form.Item name="price" label="Price">
                  <Input placeholder="Price" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="quantity" label="Quantity">
                  <Input placeholder="Quantity" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Form.Item name="categories" label="Categories">
              <Select></Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="images" label="Product images">
          <Upload
            listType="picture-card"
            fileList={fileList}
            multiple={true}
            beforeUpload={beforeUploadFile}
            onChange={onChangeFile}
          >
            {fileList.length >= 5 ? null : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
