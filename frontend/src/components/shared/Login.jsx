import { Button, Card, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import http from "../../Utils/axiosBaseUrl";
import { useState } from "react";
import { toast } from "react-toastify";
const { Item } = Form;
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const data = await http.post("/api/user/login", values);
      const { role } = data.data;
      if (role === "admin") {
        toast("Admin profile");
        navigate("/app/admin/dashboard");
      }
      else if (role === "user") { 
        const fullname=data?.data?.username.split(" "); 
        toast(`Welcome ${fullname[0] || "user"}`);
        navigate("/app/user/dashboard");
      }
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex">
        <div className="w-1/2 hidden md:flex items-center justify-center">
          <img src="/exp-img.jpg" alt="img" className="w-4/5 object-contain" />
        </div>
        {""}
        <div className="w-full md:w-1/2 flex items-center justify-center p-2 md:p-6 bg-white">
          <Card className="w-full max-w-sm shadow-xl">
            <h2 className="font-bold text-zinc-600 text-2xl text-center mb-6">
              Track Your Expense
            </h2>
            <Form name="login-form" layout="vertical" onFinish={onFinish}>
              <Item name="email" label="E mail" rules={[{ required: true }]}>
                <Input
                  prefix={<UserOutlined></UserOutlined>}
                  placeholder="enter email"
                ></Input>
              </Item>
              <Item
                name="password"
                label="Password"
                rules={[{ required: true }]}
              >
                <Input.Password
                  prefix={<LockOutlined></LockOutlined>}
                  placeholder="enter password"
                ></Input.Password>
              </Item>
              <Item>
                <Button
                  loading={loading}
                  type="text"
                  htmlType="submit"
                  className="text-white! font-bold! bg-blue-500! w-full mt-3"
                >
                  Login
                </Button>
              </Item>
            </Form>
            <div className="flex items-center justify-between">
              <div></div>
              <Link
                className="text-zinc-500! font-semibold"
                to={"/signup"}
                style={{ textDecoration: "underline" }}
              >
                Don't have an account
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
