import { Button, Form, Input } from "antd";
import React from "react";

const ChangePassword: React.FunctionComponent = () => {
  const [form] = Form.useForm();

  return (
    <div className="py-6 border border-solid rounded border-neutral-300 px-7">
      <Form form={form} labelCol={{ span: 24 }}>
        <Form.Item
          name="currentPassword"
          label="Current password"
          rules={[{ required: true, message: "Please enter current password" }]}
        >
          <Input.Password placeholder="Enter current password" />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="New password"
          rules={[
            { required: true, message: "Please enter new password" },
            {
              min: 8,
              message: "Password must be longer than or equal to 8 characters",
            },
          ]}
        >
          <Input.Password placeholder="Enter new password" />
        </Form.Item>
        <Form.Item
          name="confirmedNewPassword"
          label="Confirm new password"
          rules={[
            { required: true, message: "Please retype new password" },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm new password" />
        </Form.Item>
        <Form.Item className="p-0 m-0">
          <Button
            type="primary"
            htmlType="submit"
            className="float-right m-0 bg-primary"
          >
            Change password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
