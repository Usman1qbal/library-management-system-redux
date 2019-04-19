import { SAVE_DATA, GET_DATA} from "../constant/index.js";

const POST_api = async data => {
  const header = new Headers();
  header.append("Content-Type", "application/json");

  const options = {
    method: "POST",
    header
  };

  const request = new Request(
    `http://localhost:3001/post/${JSON.stringify(data)}`,
    options
  );
  const response = await fetch(request);
  const status = await response.status;
  return status;
};

export const saveData = value => {
  POST_api(value);
  return {
    type: SAVE_DATA,
    data: value
  };
};


export const getData = async () => {
  let totalData = [];
  const link = await fetch("http://localhost:3001/get");
  const list = await link.json();
  totalData = list;

  return {
    type: GET_DATA,
    data: totalData
  };
};
