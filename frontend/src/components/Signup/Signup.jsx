import { Button, Card, Form, Input } from "antd";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import HomeLayout from "../../layout/HomeLayout";
import { toast } from "react-toastify";
import { useState } from "react";
// import axios from "axios";
// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
import http from "../../Utils/axiosBaseUrl"

const { Item } = Form;

export default function Signup() {
  const [signupForm] = Form.useForm();
  const [formData, setFormData] = useState(null);
  const [otp, setOtp] = useState(null);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await http.post("/api/user/sendmail", values);
      setOtp(data.OTP);
      setFormData(values);
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
      setOtp(null);
      setFormData(null);
    } finally {
      setLoading(false);
    }
  };
  const onsignup = async (values) => {
    try {
      if (Number(values.otp) !== Number(otp)) {
        return toast.error("OTP not match");
      }
      setLoading(true);
      await http.post("/api/user/signup", formData);
      toast.success("signup successfully");
      setOtp(null);
      setFormData(null);
      signupForm.resetFields();
    } catch (err) {
      setOtp(null);
      setFormData(null);
      toast.error(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <HomeLayout>
        <div className="flex">
          <div className="w-1/2 hidden md:flex items-center justify-center">
            <img
              src="/exp-img.jpg"
              alt="img"
              className="w-4/5 object-contain"
            />
          </div>
          {""}
          <div className="w-full md:w-1/2 flex items-center justify-center p-2 md:p-6 bg-white">
            <Card className="w-full max-w-sm shadow-xl">
              <h2 className="font-bold text-zinc-600 text-2xl text-center mb-6">
                Track Your Expense
              </h2>

              {otp ? (
                <Form name="otp-form" layout="vertical" onFinish={onsignup}>
                  <Item name="otp" label="OTP" rules={[{ required: true }]}>
                    <Input.OTP
                      prefix={<LockOutlined></LockOutlined>}
                      placeholder="enter password"
                    ></Input.OTP>
                  </Item>
                  <Item>
                    <Button
                      loading={loading}
                      type="text"
                      htmlType="submit"
                      className="text-white! font-bold! bg-blue-500! w-full mt-3"
                    >
                      verify
                    </Button>
                  </Item>
                </Form>
              ) : (
                <Form
                  name="signup-form"
                  layout="vertical"
                  onFinish={onFinish}
                  form={signupForm}
                >
                  <Item
                    name="fullname"
                    label="fullname"
                    rules={[{ required: true }]}
                  >
                    <Input
                      prefix={<UserOutlined></UserOutlined>}
                      placeholder="enter fullname"
                    ></Input>
                  </Item>

                  <Item name="email" label="email" rules={[{ required: true }]}>
                    <Input
                      prefix={<MailOutlined></MailOutlined>}
                      placeholder="enter email"
                    ></Input>
                  </Item>

                  <Item
                    name="mobile"
                    label="mobile"
                    rules={[{ required: true }]}
                  >
                    <Input
                      prefix={<PhoneOutlined></PhoneOutlined>}
                      placeholder="enter mobile number"
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
                      Sign up
                    </Button>
                  </Item>
                </Form>
              )}
              {!otp && (
                <div className="flex items-center justify-between">
                  <div></div>
                  <Link
                    className="text-zinc-500! font-semibold"
                    to={"/"}
                    style={{ textDecoration: "underline" }}
                  >
                    Already have an account
                  </Link>
                </div>
              )}
            </Card>
          </div>
        </div>
      </HomeLayout>
    </>
  );
}
