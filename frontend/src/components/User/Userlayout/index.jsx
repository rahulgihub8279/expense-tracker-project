import {
  AppstoreAddOutlined,
  BarChartOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Layout, Image, Menu, Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
const { Sider, Header, Content, Footer } = Layout;

export default function Userlayout() {
  const items = [
    {
      key: "/app/user/dashboard",
      label: "Dashboard",
      icon: <AppstoreAddOutlined></AppstoreAddOutlined>,
    },
    {
      key: "/app/user/report",
      label: "Reports",
      icon: <BarChartOutlined></BarChartOutlined>,
    },
  ];

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = (menu) => {
    navigate(menu.key);
  };

  return (
    <>
      <Layout className="min-h-screen!">
        <Sider collapsed={open}>
          <div className="flex items-center justify-center my-6">
            <Image
              width={60}
              height={60}
              alt="profile"
              className="rounded-full mx-auto! my-3 "
              src="/otp-img.jpg"
            ></Image>
          </div>
          <Menu
            className="mt-9!"
            defaultSelectedKeys={"/app/user/dashboard"}
            theme="dark"
            items={items}
            onClick={handleNavigate}
          ></Menu>
        </Sider>
        <Layout>
          <Header className="flex items-center justify-between px-5! bg-white! shadow!">
            <Button
              icon={<MenuOutlined></MenuOutlined>}
              onClick={() => setOpen(!open)}
            ></Button>
            <Button className="bg-red-500! text-white!">log out</Button>
          </Header>
          <Content>
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
