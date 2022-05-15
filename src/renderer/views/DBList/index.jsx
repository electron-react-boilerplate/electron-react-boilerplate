import {
  Typography,
  List,
  Toast,
} from "@douyinfe/semi-ui";
// import { IconHelpCircle, IconFile, IconGlobe } from "@douyinfe/semi-icons";
import Header from "./DBListHeader.jsx";
import FromModal from "./from.jsx";
import "./index.css";
import { useState, useEffect } from "react";


import { CreactConnect, onConnect } from "./db.js";

function DbList() {
  const [modalVisible, setmodalVisible] = useState(false);
  const [lading, setLading] = useState(false);
  const [title, setTitle] = useState("新增连接");
  const { Text } = Typography;

  // 订阅数据库连接结果
  useEffect(() => {
    onConnect((e, data, preload) => {
      setLading(false);
      if (data) {
        Toast.success("连接成功");
      } else {
        Toast.error(err);
      }
    });
  },[])

  const onAddConnect = () => {
    setmodalVisible(true);
  };

  const handleAfterClose = () => {
    setmodalVisible(false);
  };

  const handleCancel = () => {
    setmodalVisible(false);
  };


  // 保存并连接
  const handleConnect = (values) => {
    console.log(values);
    CreactConnect(values);
    setLading(true);
  }
  // 测试连接
  const handleTestConnect = (values) => {
    console.log(values);
  }



  const vData = Array.from({ length: 1 }, (v, k) => {
    return {
      id: k,
      name: `数据库${k}`,
    };
  });



  return (
    <div className="dblist-container">
      <List
        header={<Header onAddConnect={onAddConnect} />}
        bordered
        dataSource={vData}
        renderItem={(item) => (
          <List.Item>
            {" "}
            <Text> {item.name} </Text>{" "}
          </List.Item>
        )}
      />
      <FromModal 
        visible={modalVisible} 
        onCancel={handleCancel}
        onafterClose={handleAfterClose}
        onConnect={handleConnect}
        onTestConnect={handleTestConnect}
        title={title}
        isSpiking={lading}
        tip="正在连接..."
      />
    </div>
  );
}

export default DbList;
