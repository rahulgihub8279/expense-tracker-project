import { useState } from "react";
import { toast } from "react-toastify";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Table,
} from "antd";
const {Item}=Form; 

export default function Transactions() {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [transactionForm] = Form.useForm();

  const columns = [
    {
      title: "Transaction Type",
      dataIndex: "transactionType",
      key: "transactionType",
      className: "capitalize",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      className: "capitalize",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      className: "capitalize",
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      className: "capitalize",
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      className: "capitalize",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, obj) => (
        <div className="flex gap-1">
          <Popconfirm
            title="Are you sure ?"
            description="Once you update, you can also update !"
            onCancel={() => toast.info("changes discarded !")}
          >
            <Button
              type="text"
              className="bg-gray-200! text-green-500!"
              icon={<EditOutlined></EditOutlined>}
            ></Button>
          </Popconfirm>
          <Popconfirm
            title="Are you sure ?"
            description="Once you update, you can also update !"
            onCancel={() => toast.info("Your data is unchanged !")}
          >
            <Button
              type="text"
              className="bg-rose-100! text-red-500!"
              icon={<DeleteOutlined></DeleteOutlined>}
            ></Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
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
              <Button
                type="text"
                className="bg-blue-500! text-white! font-semibold!"
                onClick={() => setModal(true)}
              >
                Add new transaction
              </Button>
            </div>
          }
        >
          <Table
            columns={columns}
            dataSource={[]}
            scroll={{ x: "max-content" }}
          ></Table>
        </Card>
      </div>
      {""}
      <Modal
        open={modal}
        onCancel={() => setModal(false)}
        title="Add new Transaction"
        footer={null}
      >
        <Form layout="vertical" form={transactionForm}>
          <div className="grid md:grid-cols-2 gap-x-3">
            <Item
              label="Transactions"
              name="transactionType"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Transaction Type"
                options={[
                  { label: "CR", value: "cr" },
                  { label: "DR", value: "dr" },
                ]}
              ></Select>
            </Item>
            <Item label="Amount" name="amount" rules={[{ required: true }]}>
              <Input placeholder="Enter Amount" type="number"></Input>
            </Item>
            <Item label="Title" name="title" rules={[{ required: true }]}>
              <Input placeholder="Enter title" type="text"></Input>
            </Item>
            <Item
              label="Payment Method"
              name="paymentMethod"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Payment Method"
                options={[
                  { label: "Cash", value: "cash" },
                  { label: "Online", value: "online" },
                ]}
              ></Select>
            </Item>
          </div>
          <Item label="Notes" name="notes" rules={[{ required: true }]}>
            <Input.TextArea placeholder="ex : groccery, electricity bill, etc"></Input.TextArea>
          </Item>
          <Item>
            <Button
              loading={loading}
              type="text"
              htmlType="submit"
              className="font-semibold! text-white! bg-blue-600! py-4! w-full"
            >
              Submit
            </Button>
          </Item>
        </Form>
      </Modal>
    </div>
  );
}
