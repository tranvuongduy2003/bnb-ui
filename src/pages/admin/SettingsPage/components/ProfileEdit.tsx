import { app } from "@/firebase";
import { useAuthStore } from "@/stores/useAuthStore";
import validator from "@/utils/validateImage";
import { EditOutlined } from "@ant-design/icons";
import { Avatar, Form, Typography, Upload, message } from "antd";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";

const ProfileEdit: React.FunctionComponent = () => {
  const profile = useAuthStore((state) => state.profile);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  const fullnameWatch = Form.useWatch("fullname", form);
  const emailWatch = Form.useWatch("email", form);
  const genderWatch = Form.useWatch("gender", form);
  const dobWatch = Form.useWatch("dob", form);
  const phoneWatch = Form.useWatch("phone", form);
  const emergencyWatch = Form.useWatch("emergency", form);

  const onChangeFile: UploadProps["onChange"] = async ({ fileList }) => {
    setFileList(fileList);
    console.log(fileList);
  };

  const beforeUploadFile = (file: RcFile) => {
    const msgs = validator(file);
    msgs.map((msg) => message.error(msg));
    return msgs.length == 0 || Upload.LIST_IGNORE;
  };
  return (
    <Form form={form} labelCol={{ span: 24 }} className="w-full">
      <Form.Item className="relative w-[138px] mx-auto">
        <Avatar
          src={
            fileList?.length > 0
              ? URL.createObjectURL(fileList[0].originFileObj as any)
              : "https://picsum.photos/200"
          }
          size={138}
        ></Avatar>
        <Upload
          fileList={fileList}
          multiple={false}
          beforeUpload={beforeUploadFile}
          onChange={onChangeFile}
          showUploadList={false}
          maxCount={1}
          className="absolute bottom-0 right-0"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-neutral-700">
            <EditOutlined className="text-base text-white" />
          </div>
        </Upload>
      </Form.Item>
      <Form.Item
        name="fullname"
        label={<span className="text-sm font-medium">Full name</span>}
        initialValue={profile.fullname}
      >
        <Typography.Text
          editable={{
            icon: (
              <span className="text-sm underline text-neutral-700">Edit</span>
            ),
            onChange: (value) => form.setFieldValue("fullname", value),
          }}
          className="flex justify-between"
        >
          {fullnameWatch || (
            <span className="text-neutral-400">Not provided</span>
          )}
        </Typography.Text>
      </Form.Item>
      <Form.Item
        name="email"
        label={<span className="text-sm font-medium">Email</span>}
        initialValue={profile.email}
      >
        <Typography.Text
          editable={{
            icon: (
              <span className="text-sm underline text-neutral-700">Edit</span>
            ),
            onChange: (value) => form.setFieldValue("email", value),
          }}
          className="flex justify-between"
        >
          {emailWatch || <span className="text-neutral-400">Not provided</span>}
        </Typography.Text>
      </Form.Item>
      {/* <Form.Item
        name="gender"
        label={<span className="text-sm font-medium">Gender</span>}
      >
        <Typography.Text
          editable={{
            icon: (
              <span className="text-sm underline text-neutral-700">Edit</span>
            ),
            onChange: (value) => form.setFieldValue("gender", value),
          }}
          className="flex justify-between"
        >
          {genderWatch || (
            <span className="text-neutral-400">Not provided</span>
          )}
        </Typography.Text>
      </Form.Item> */}
      <Form.Item
        name="dob"
        label={<span className="text-sm font-medium">Date of birth</span>}
        initialValue={profile.dob}
      >
        <Typography.Text
          editable={{
            icon: (
              <span className="text-sm underline text-neutral-700">Edit</span>
            ),
            onChange: (value) => form.setFieldValue("dob", value),
          }}
          className="flex justify-between"
        >
          {dobWatch || <span className="text-neutral-400">Not provided</span>}
        </Typography.Text>
      </Form.Item>
      <Form.Item
        name="phone"
        label={<span className="text-sm font-medium">Phone number</span>}
        initialValue={profile.phone}
      >
        <Typography.Text
          editable={{
            icon: (
              <span className="text-sm underline text-neutral-700">Edit</span>
            ),
            onChange: (value) => form.setFieldValue("phone", value),
          }}
          className="flex justify-between"
        >
          {phoneWatch || <span className="text-neutral-400">Not provided</span>}
        </Typography.Text>
      </Form.Item>
    </Form>
  );
};

export default ProfileEdit;
