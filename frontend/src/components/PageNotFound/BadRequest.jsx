import { Result } from "antd";
import { Link } from "react-router-dom";

const BadRequest = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
    <Link  to="/" className="font-bold text-xl">Back Home</Link>
  }
  />
);
export default BadRequest;
