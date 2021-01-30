import { useContext } from "react";
import { AuthStateContext, AuthDispatchContext } from "../context/AuthContext";

const useAuth = () => {
  const state = useContext(AuthStateContext);
  const dispatch = useContext(AuthDispatchContext);
  const isPending = state.status === "pending";
  const isError = state.status === "error";
  const isSuccess = state.status === "success";
  const isAuthenticated = state.user && isSuccess;

  return {
    ...state,
    dispatch,
    isPending,
    isError,
    isSuccess,
    isAuthenticated,
  };
};

export default useAuth;
