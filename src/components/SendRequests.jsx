import { useSelector } from "react-redux";
import { useSendRequests } from "../utils/apiHooks/useSendRequests";
import { useEffect } from "react";

const SendRequests = () => {
  const { fetch } = useSendRequests();
  const sendRequestsList = useSelector(
    (state) => state.sendRequests.sendRequestsList
  );

  useEffect(() => {
    fetch();
  }, [fetch]);

  console.log(sendRequestsList);

  return <div>1</div>;
};

export default SendRequests;
