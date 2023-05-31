import { Button } from "antd";
import React from "react";

const Deactivate: React.FunctionComponent = () => {
  return (
    <div className="flex items-center justify-between py-6 border border-solid rounded border-neutral-300 px-7">
      <span>You can reactivate whenever you want.</span>
      <Button className="border-none bg-red-50" danger>
        Deactivate account
      </Button>
    </div>
  );
};

export default Deactivate;
