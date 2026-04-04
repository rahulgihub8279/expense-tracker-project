import { Layout, theme } from "antd";
const { Header, Footer, Content } = Layout;

export default function HomeLayout({ children }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header className="bg-[#1207D9]! flex items-center justify-center">
        <h1 className="text-white text-lg md:text-3xl font-bold text-center">
          Expense Tracker
        </h1>
      </Header>
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 200,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {children}
      </Content>
      <Footer className="bg-[#1207D9]! flex items-center justify-center">
        <h1 className="text-white text-md md:text-xl font-bold text-center">
          footer content
        </h1>
      </Footer>
    </Layout>
  );
}
