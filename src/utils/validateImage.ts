import { RcFile } from "antd/es/upload";

const validator = (file: RcFile) => {
  const isImage = file.type.split("/")[0] === "image";
  const isTypeValid =
    file.type.split("/")[1] === "png" || file.type.split("/")[1] === "JPG";
  const errorMgs = [];
  if (!isImage) {
    errorMgs.push(`'${file.name}' is not an image file`);
  }
  if (!isTypeValid) {
    errorMgs.push(`'${file.name}' is not an png or jpg image`);
  }

  const isLessThan3MB = file.size / 1024 / 1024 < 3;
  if (!isLessThan3MB) {
    errorMgs.push(`Image must smaller than 3MB!`);
  }

  return errorMgs;
};

export default validator;
