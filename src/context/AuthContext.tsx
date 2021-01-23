import React, { useReducer, useEffect, createContext } from "react";
import { useMeQuery } from "../../api";

type Type = "idle" | "pending" | "success" | "error" | "logout";
type Dispatch = (action: { type: Type; payload?: any }) => void;
type State = {
  status: Type;
  user: any;
  error: null | string;
};

export const AuthStateContext = createContext<State | undefined>(undefined);
export const AuthDispatchContext = createContext<Dispatch | undefined>(
  undefined
);

function authReducer(
  state: State,
  action: { type: Type; payload?: any }
): State {
  switch (action.type) {
    case "pending":
      return {
        ...state,
        status: "pending",
      };

    case "success":
      return {
        ...state,
        status: "success",
        user: action.payload,
      };

    case "error":
      return {
        ...state,
        status: "error",
        error: "Algo salió mal",
      };

    case "logout":
      return {
        ...state,
        status: "logout",
      };

    default:
      return state;
  }
}

const initialState: State = {
  error: null,
  status: "idle",
  user: null,
};

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { data, error } = useMeQuery();

  useEffect(() => {
    dispatch({ type: "pending" });
  }, []);

  useEffect(() => {
    if (data?.me.__typename === "MeResultSuccess") {
      dispatch({
        type: "success",
        payload: data.me,
      });
    } else if (data?.me.__typename === "MeResultError") {
      dispatch({ type: "error" });
    }
  }, [data]);

  useEffect(() => {
    dispatch({ type: "error" });
  }, [error]);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
