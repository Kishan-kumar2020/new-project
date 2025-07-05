import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConnectionsAction } from "../apiActions/connectionsAction";

export const useConnections = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const count = useSelector((state) => state.connections.count);

  const fetch = useCallback(() => {
    if (user) {
      dispatch(fetchConnectionsAction());
    }
  }, [user, dispatch]);

  return { fetch, count };
};
