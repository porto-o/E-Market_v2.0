import { Upload, message } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const props = {
  name: "photoRes",
  multiple: false,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const DragAndDrop = () => {
  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <CloudUploadOutlined />
      </p>
      <p className="ant-upload-text">Haz click o arrastra la foto aquí</p>
      <p className="ant-upload-hint">
        Esta imagen será tu forma de presentación a tus comensales.
      </p>
    </Dragger>
  );
};

export default DragAndDrop;
