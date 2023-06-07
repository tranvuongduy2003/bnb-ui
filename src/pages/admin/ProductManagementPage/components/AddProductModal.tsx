import validator from "@/utils/validateImage";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Upload,
  message,
  notification,
} from "antd";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import React, { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "@/firebase";
import { useAppStore } from "@/stores/useAppStore";
import { createNewProduct } from "@/apis/product.api";
import { useNavigate } from "react-router-dom";
import { Status } from "@/constants/status";
import { useCategoriesStore } from "@/stores/useCategoryStore";

interface IAddProductModalProps {
  show: boolean;
  setShow: any;
}

const AddProductModal: React.FunctionComponent<IAddProductModalProps> = ({
  show,
  setShow,
}) => {
  const navigate = useNavigate();
  const isLoading = useAppStore((state) => state.isLoading);
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const categories = useCategoriesStore((state) => state.categories);

  const categoryOptions = categories.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChangeFile: UploadProps["onChange"] = async ({ fileList }) => {
    setFileList(fileList);
  };

  const beforeUploadFile = (file: RcFile) => {
    const msgs = validator(file);
    msgs.map((msg) => message.error(msg));
    return msgs.length == 0 || Upload.LIST_IGNORE;
  };

  const handleAddNewProduct = async (values: any) => {
    const { images, categories_id, ...rest } = values;
    const storage = getStorage(app);
    const imageURLs = await Promise.all(
      images.fileList.map(async (image: any) => {
        const storageRef = ref(storage, `products/${image.name}`);
        await uploadBytes(storageRef, image.originFileObj);
        const imageURL = await getDownloadURL(storageRef);
        return imageURL;
      })
    );

    const payload = {
      ...rest,
      images: [...imageURLs],
      sold: 0,
    };

    setIsLoading(true);
    try {
      await createNewProduct(payload);
      setIsLoading(false);
      notification.success({
        message: "Create new product successfully!",
        duration: 0.5,
        onClose: () => navigate(0),
      });
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      notification.error({
        message: error.message,
      });
    }
  };

  return (
    <Modal
      title="Add new product"
      centered
      open={show}
      footer={[
        <Button onClick={() => setShow(false)}>Cancel</Button>,
        <Button
          type="primary"
          loading={isLoading}
          onClick={() => form.submit()}
        >
          Create
        </Button>,
      ]}
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
            <Form.Item name="brandName" label="Brand name">
              <Input placeholder="Brand name" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={"space-between"} gutter={57}>
          <Col span={16}>
            <Row justify={"space-between"} gutter={57}>
              <Col span={12}>
                <Form.Item name="price" label="Price">
                  <InputNumber min={0} placeholder="Price" className="w-full" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="inventory" label="Inventory">
                  <InputNumber
                    min={0}
                    placeholder="Inventory"
                    className="w-full"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Form.Item name="categoryId" label="Categories">
              <Select options={categoryOptions} placeholder="Category" />
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

export default AddProductModal;
