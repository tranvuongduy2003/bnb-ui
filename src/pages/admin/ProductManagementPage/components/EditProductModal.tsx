import {
  deleteProductById,
  getProductById,
  updateProductById,
} from "@/apis/product.api";
import { app } from "@/firebase";
import { IProduct } from "@/interfaces/IProduct";
import { useBrandStore } from "@/stores/useBrandStore";
import { useCategoriesStore } from "@/stores/useCategoryStore";
import { useProductStore } from "@/stores/useProductStore";
import validator from "@/utils/validateImage";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  InputRef,
  Modal,
  Row,
  Select,
  Skeleton,
  Space,
  Upload,
  message,
  notification,
} from "antd";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import {
  getBlob,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const categories = useCategoriesStore((state) => state.categories);
  const brands = useBrandStore((state) => state.brands);
  const product = useProductStore((state) => state.product);
  const setProduct = useProductStore((state) => state.setProduct);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [items, setItems] = useState<string[]>(brands.map((item) => item.name));
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchProductData = useRef<any>();
  const inputRef = useRef<InputRef>(null);

  const [form] = Form.useForm();

  const categoryOptions = categories.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  useEffect(() => {
    fetchProductData.current = async () => {
      setIsLoading(true);
      try {
        const { data: productData } = await getProductById(data.id);
        const files: any = await Promise.all(
          productData.images.map(async (item: any) => {
            const fileRef = ref(storage, item);
            const blob = await getBlob(fileRef);
            const file = new File([blob], fileRef.name, {
              type: fileRef.name.split(".")[1],
            });
            return file;
          })
        );
        setProduct(productData);
        setFileList(files);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchProductData.current();
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

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setItems([...items, name || `New item`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
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
      {isLoading ? (
        <Skeleton />
      ) : (
        <Form
          form={form}
          labelCol={{ span: 24 }}
          onFinish={(values) => handleEditNewProduct(values)}
        >
          <Form.Item name="name" label="Name" initialValue={product?.name}>
            <Input placeholder="Product name" />
          </Form.Item>
          <Row>
            <Col span={24}>
              <Form.Item
                name="desc"
                label="Description"
                initialValue={product?.desc}
              >
                <Input.TextArea rows={3} placeholder="Description" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={18}>
            <Col span={8}>
              <Form.Item
                name="importPrice"
                label="Import price"
                initialValue={JSON.parse(
                  (product?.importPrice as string) || "0"
                )}
              >
                <InputNumber
                  min={0}
                  placeholder="Import price"
                  className="w-full"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="price"
                label="Price"
                initialValue={JSON.parse(product?.price as string)}
              >
                <InputNumber min={0} placeholder="Price" className="w-full" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="inventory"
                label="Inventory"
                initialValue={product?.inventory}
              >
                <InputNumber
                  min={0}
                  placeholder="Inventory"
                  className="w-full"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={18}>
            <Col span={12}>
              <Form.Item
                name="brandName"
                label="Brand"
                initialValue={
                  brands.find((item) => item.id === product?.brandId)?.name
                }
              >
                <Select
                  placeholder="Brand"
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: "8px 0" }} />
                      <Space style={{ padding: "0 8px 4px" }}>
                        <Input
                          placeholder="Please enter item"
                          ref={inputRef}
                          value={name}
                          onChange={onNameChange}
                        />
                        <Button
                          type="primary"
                          onClick={addItem}
                          className="bg-primary"
                        >
                          Add
                        </Button>
                      </Space>
                    </>
                  )}
                  options={items.map((item) => ({ label: item, value: item }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="categoryId"
                label="Categories"
                initialValue={product?.categoryId}
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
      )}
    </Modal>
  );
};

export default EditProductModal;
