import { useDispatch, useSelector } from "react-redux";
import { fetchSendRequestsAction } from "../apiActions/sendRequestsAction";
import { useCallback, useEffect } from "react";

export const useSendRequests = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const count = useSelector((state) => state.sendRequests.count);

  const fetch = useCallback(() => {
    if (user) {
      dispatch(fetchSendRequestsAction());
    }
  }, [user, dispatch]);

  return { fetch, count };
};
