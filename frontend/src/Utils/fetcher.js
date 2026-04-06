import http from "./axiosBaseUrl";

const fetcher = async (url) => {
  try {
    const { data } = await http.get(url);
    return data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export default fetcher;
