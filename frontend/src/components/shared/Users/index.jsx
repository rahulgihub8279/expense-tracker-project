import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";
import http from "../../../Utils/axiosBaseUrl";
import fetcher from "../../../Utils/fetcher";
import formatDate from "../../../Utils/formatDate";

import {
  EyeFilled,
  EyeInvisibleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Card, Form, Input, Table } from "antd";
import { useState } from "react";

export default function Users() {
  const columns = [
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      className: "capitalize font-bold",
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
      className: "capitalize  ",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      className: "capitalize",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      render: (date) => formatDate(date),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, obj) =>
        status ? (
          <Button
            shape="circle"
            icon={<EyeFilled></EyeFilled>}
            className="bg-green-500! text-white!"
            onClick={() => onStatus(obj)}
            loading={loading}
          ></Button>
        ) : (
          <Button
            shape="circle"
            icon={<EyeInvisibleFilled></EyeInvisibleFilled>}
            className="bg-red-500! text-white!"
            onClick={() => onStatus(obj)}
            loading={loading}
          ></Button>
        ),
    },
  ];
  const {
    data: users,
    err,
    isLoading,
  } = useSWR("/api/user/get-all-users", fetcher);

  // const onDelete = async (id) => {
  //   try {
  //     setLoading(true);
  //     await http.delete(`/api/transaction/delete-transaction/${id}`);
  //     mutate("/api/transaction/get-transaction");
  //     toast.success("Transaction deleted successfully");
  //   } catch (err) {
  //     toast.error(err?.response?.data?.message || err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const [loading, setLoading] = useState(false);

  const onStatus = async (obj) => {
    try {
      setLoading(true);
      await http.put(`/api/user/status/${obj._id}`, { status: !obj.status });
      mutate("/api/user/get-all-users");
      toast.success("Status updated successfully");
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="grid">
        <Card
          title="Transaction List"
          style={{
            overflowX: "auto",
          }}
          extra={
            <div className="mt-2 md:mt-0 flex flex-col md:flex-row gap-4">
              <Input
                placeholder="search by all"
                prefix={<SearchOutlined></SearchOutlined>}
              ></Input>
            </div>
          }
        >
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={users?.data || []}
            scroll={{ x: "max-content" }}
          ></Table>
        </Card>
      </div>
    </div>
  );
}
