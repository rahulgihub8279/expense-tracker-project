import { Spin } from "antd";

 
export default function Loader() {
  return (
    <div className="flex text-white! h-screen items-center justify-center bg-black">
      <Spin description="please wait" size="large"></Spin>
    </div>
  )
}
