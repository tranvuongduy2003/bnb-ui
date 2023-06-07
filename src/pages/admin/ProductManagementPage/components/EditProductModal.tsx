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
import React, { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  getBlob,
} from "firebase/storage";
import { app } from "@/firebase";
import { useAppStore } from "@/stores/useAppStore";
import { deleteProductById, updateProductById } from "@/apis/product.api";
import { useNavigate } from "react-router-dom";
import { Status } from "@/constants/status";
import { IProduct } from "@/interfaces/IProduct";
import { useCategoriesStore } from "@/stores/useCategoryStore";

interface IEditProductModalProps {
  show: boolean;
  setShow: any;
  data: IProduct;
}

const EditProductModal: React.FunctionComponent<IEditProductModalProps> = ({
  show,
  setShow,
  data,
}) => {
  const storage = getStorage(app);
  const navigate = useNavigate();
  const isLoading = useAppStore((state) => state.isLoading);
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const categories = useCategoriesStore((state) => state.categories);

  const categoryOptions = categories.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [form] = Form.useForm();

  useEffect(() => {
    const convertImgUrlToFile = async () => {
      try {
        const files: any = await Promise.all(
          data.images.map(async (item) => {
            const fileRef = ref(storage, item);
            const blob = await getBlob(fileRef);
            const file = new File([blob], fileRef.name, {
              type: fileRef.name.split(".")[1],
            });
            return file;
          })
        );
        setFileList(files);
      } catch (error) {
        console.log(error);
      }
    };
    convertImgUrlToFile();
  }, []);

  const onChangeFile: UploadProps["onChange"] = async ({ fileList }) => {
    setFileList(fileList);
  };

  const beforeUploadFile = (file: RcFile) => {
    const msgs = validator(file);
    msgs.map((msg) => message.error(msg));
    return msgs.length == 0 || Upload.LIST_IGNORE;
  };

  const handleEditNewProduct = async (values: any) => {
    const { images, ...rest } = values;
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
      await updateProductById(data.id, payload);
      setIsLoading(false);
      notification.success({
        message: "Update product successfully!",
        duration: 0.25,
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

  const handleDeleteProduct = async () => {
    setIsLoading(true);
    try {
      await deleteProductById(data.id);
      setIsLoading(false);
      notification.success({
        message: "Delete product successfully!",
        duration: 0.25,
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
      title="Edit new product"
      centered
      open={show}
      footer={[
        <></>,
        <div className="flex justify-between">
          <Button onClick={() => handleDeleteProduct()} danger type="primary">
            Delete
          </Button>
          <div className="flex gap-2">
            <Button onClick={() => setShow(false)}>Cancel</Button>
            <Button
              type="primary"
              loading={isLoading}
              onClick={() => form.submit()}
            >
              Save
            </Button>
          </div>
        </div>,
      ]}
      onCancel={() => setShow(false)}
      width={800}
    >
      <Form
        form={form}
        labelCol={{ span: 24 }}
        onFinish={(values) => handleEditNewProduct(values)}
      >
        <Form.Item name="name" label="Name" initialValue={data?.name}>
          <Input placeholder="Product name" />
        </Form.Item>
        <Row justify={"space-between"} gutter={57}>
          <Col span={16}>
            <Form.Item
              name="desc"
              label="Description"
              initialValue={data?.desc}
            >
              <Input placeholder="Description" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="brandName"
              label="Brand name"
              initialValue={data?.brandName}
            >
              <Input placeholder="Brand name" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={"space-between"} gutter={57}>
          <Col span={16}>
            <Row justify={"space-between"} gutter={57}>
              <Col span={12}>
                <Form.Item
                  name="price"
                  label="Price"
                  initialValue={JSON.parse(data?.price as string)}
                >
                  <InputNumber min={0} placeholder="Price" className="w-full" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="inventory"
                  label="Inventory"
                  initialValue={data?.inventory}
                >
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
            <Form.Item
              name="categoryId"
              label="Categories"
              initialValue={data?.categoryId}
            >
              <Select options={categoryOptions} placeholder="Category" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="images" label="Product images">
          <Upload
            listType="text"
            fileList={fileList}
            multiple={true}
            beforeUpload={beforeUploadFile}
            onChange={onChangeFile}
          >
            {fileList.length >= 3 ? null : (
              <Button type="primary">
                <UploadOutlined />
                <span>Upload</span>
              </Button>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProductModal;
