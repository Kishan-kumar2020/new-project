import { useDispatch, useSelector } from "react-redux";
import { fetchReceivedRequestsAction } from "../apiActions/receivedRequestsAction";
import { useCallback, useEffect } from "react";

export const useReceivedRequests = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const count = useSelector((state) => state.requests.count);

  const fetch = useCallback(() => {
    if (user) {
      dispatch(fetchReceivedRequestsAction());
    }
  }, [user, dispatch]);

  return { fetch, count };
};
