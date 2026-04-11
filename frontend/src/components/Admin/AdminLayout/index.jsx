import {
  AppstoreAddOutlined,
  BarChartOutlined,
  DollarOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Layout, Image, Menu, Button, theme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const { Sider, Header, Content, Footer } = Layout;
import { toast } from "react-toastify";
import http from "../../../Utils/axiosBaseUrl";

export default function AdminLayout() {
  const items = [
    {
      key: "/app/admin/dashboard",
      label: "Dashboard",
      icon: <AppstoreAddOutlined></AppstoreAddOutlined>,
    },
    {
      key: "/app/admin/report",
      label: "Reports",
      icon: <BarChartOutlined></BarChartOutlined>,
    },
    {
      key: "/app/admin/users",
      label: "Users",
      icon: <UserOutlined></UserOutlined>,
    },
  ];
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNavigate = (menu) => {
    navigate(menu.key);
  }; 
  //* logout
  const handleLogout = async () => {
    try {
      setLoading(true);
      await http.get("/api/user/logout");
      navigate("/");
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
            defaultSelectedKeys={pathname}
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
            <Button
              className="bg-red-500! text-white!"
              onClick={handleLogout}
              loading={loading}
            >
              log out
            </Button>
          </Header>
          {""}
          <Content
            style={{
              margin: "4px 8px",
              padding: 4,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
