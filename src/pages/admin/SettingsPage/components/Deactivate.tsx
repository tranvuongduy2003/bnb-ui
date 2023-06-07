import { changeUserStatus } from "@/apis/user.api";
import { AuthContext } from "@/context/AuthProvider";
import { useAuthStore } from "@/stores/useAuthStore";
import { Button, notification } from "antd";
import React, { useContext, useState } from "react";

const Deactivate: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const profile = useAuthStore((state) => state.profile);
  const setProfile = useAuthStore((state) => state.setProfile);

  const { logOut } = useContext(AuthContext) as any;

  const handleDeactiveUser = async () => {
    setIsLoading(true);
    try {
      const { data } = await changeUserStatus(profile.id, true);
      setProfile(data);
      setIsLoading(false);
      notification.success({
        message: "Deactive account successfully!",
        duration: 0.25,
        onClose: () => logOut(),
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
    <div className="flex items-center justify-between py-6 border border-solid rounded border-neutral-300 px-7">
      <span>You can reactivate whenever you want.</span>
      <Button
        onClick={handleDeactiveUser}
        loading={isLoading}
        className="border-none bg-red-50"
        danger
      >
        Deactivate account
      </Button>
    </div>
  );
};

export default Deactivate;
