import { Button, Card, Divider } from "antd";
import {
  BarChartOutlined,
  DollarOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import DailyTransactionChart from "../../shared/DailyTransactionChart"; 
import { useEffect, useState } from "react";
import http from "../../../Utils/axiosBaseUrl";
import Loader from "../../shared/Loader"; 

export default function Dashboard() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    http
      .get("api/dashboard/get-report")
      .then((res) => setReport(res.data))
      .catch((err) => console.error(err));
  }, []);
  if (!report) {
    return <Loader></Loader>;
  }
  const { summary, chart } = report;
  const formattedData = chart.map((item) => ({
  ...item,
  total: Number(item.total),
}));
  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-md">
          <div className="flex items-center justify-between h-full px-2 py-2">
            <div className="flex flex-col items-center justify-center gap-2  ">
              <Button
                type="primary"
                size="large"
                className="bg-rose-600!"
                shape="circle"
                icon={<BarChartOutlined />}
              />
              <h1 className="text-lg font-semibold text-red-600">
                Transactions
              </h1>
            </div>

            <Divider orientation="vertical" className="h-16 mx-4" />

            <div className="flex flex-col justify-center items-center gap-2 text-center">
              <h1 className="text-2xl font-bold text-rose-500">
                {summary.totalTransactions}
              </h1>
              <p className="text-sm text-gray-400">
                {summary.totalTransactionEstimate} estimate
              </p>
            </div>
          </div>
        </Card>
        {""}
        <Card className="shadow-md">
          <div className="flex items-center justify-between h-full px-2 py-2">
            <div className="flex flex-col items-center justify-center gap-2  ">
              <Button
                type="primary"
                size="large"
                className="bg-green-600!"
                shape="circle"
                icon={<PlusOutlined />}
              />
              <h1 className="text-lg font-semibold text-green-600">
                Total Credit
              </h1>
            </div>

            <Divider orientation="vertical" className="h-16 mx-4" />

            <div className="flex flex-col justify-center items-center gap-2 text-center">
              <h1 className="text-2xl font-bold text-green-500">
                {summary.totalCredit} ₹
              </h1>
              <p className="text-sm text-gray-400">
                {summary.totalCreditEstimate} estimate
              </p>
            </div>
          </div>
        </Card>
        {""}
        <Card className="shadow-md">
          <div className="flex items-center justify-between h-full px-2 py-2">
            <div className="flex flex-col items-center justify-center gap-2  ">
              <Button
                type="primary"
                size="large"
                className="bg-orange-600!"
                shape="circle"
                icon={<MinusOutlined />}
              />
              <h1 className="text-lg font-semibold text-orange-600">
                Total Debit
              </h1>
            </div>

            <Divider orientation="vertical" className="h-16 mx-4" />

            <div className="flex flex-col justify-center items-center gap-2 text-center">
              <h1 className="text-2xl font-bold text-orange-500">
                {summary.totalDebit} ₹
              </h1>
              <p className="text-sm text-gray-400">
                {summary.totalDebitEstimate} estimate
              </p>
            </div>
          </div>
        </Card>
        {""}
        <Card className="shadow-md">
          <div className="flex items-center justify-between h-full px-2 py-2">
            <div className="flex flex-col items-center justify-center gap-2  ">
              <Button
                type="primary"
                size="large"
                className="bg-blue-600!"
                shape="circle"
                icon={<DollarOutlined />}
              />
              <h1 className="text-lg font-semibold text-blue-600">Balance</h1>
            </div>

            <Divider orientation="vertical" className="h-16 mx-4" />

            <div className="flex flex-col justify-center items-center gap-2 text-center">
              <h1 className="text-2xl font-bold text-blue-500">
                {summary.balance} ₹
              </h1>
              <p className="text-sm text-gray-400">
                {summary.balanceEstimate} estimate
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="hidden md:block mt-5 md:grid-cols-1 ">
        <DailyTransactionChart
          transactions={formattedData}
        ></DailyTransactionChart>
      </div>
    </div>
  );
}
