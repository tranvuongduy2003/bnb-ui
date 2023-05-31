import React from "react";
import { Col, Row, Typography } from "antd";
import ProfileEdit from "./components/ProfileEdit";
import ChangePassword from "./components/ChangePassword";
import Deactivate from "./components/Deactivate";

const SettingsPage: React.FunctionComponent = (props) => {
  //   const handleAddNewProduct = async (values: any) => {
  //     const { images, ...rest } = values;
  //     const storage = getStorage(app);
  //     const imageURLs: any = [];
  //     await images.fileList.map(async (image: any) => {
  //       const storageRef = ref(storage, `products/${image.name}`);
  //       await uploadBytes(storageRef, image.originFileObj);
  //       const imageURL = await getDownloadURL(storageRef);
  //       imageURLs.push(imageURL);
  //     });

  //     console.log({ ...rest, images: imageURLs });
  //   };

  return (
    <div className="py-6 px-36">
      <Row>
        <Typography.Title level={2} style={{ margin: 0 }}>
          Settings
        </Typography.Title>
      </Row>
      <Row justify={"center"}>
        <ProfileEdit />
      </Row>
      <Row className="my-10">
        <Col span={8}>
          <Typography.Title level={3} style={{ margin: 0 }}>
            Change Password
          </Typography.Title>
        </Col>
        <Col span={16}>
          <ChangePassword />
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Typography.Title level={3} style={{ margin: 0 }}>
            Deactivate
          </Typography.Title>
        </Col>
        <Col span={16}>
          <Deactivate />
        </Col>
      </Row>
    </div>
  );
};

export default SettingsPage;
