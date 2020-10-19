import React, { useContext, useMemo, useReducer, createContext } from "react";

const initialState = {
  user: null,
  isLoading: true,
};

export const UserContext = createContext({});

const myReducer = (prevState, action) => {
  switch (action.type) {
    case "SET_USER": {
      return { user: action.payload.user, isLoading: false };
    }
    case "REMOVE_USER": {
      return initialState;
    }
    default:
      throw new Error();
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(myReducer, initialState);

  const value = useMemo(
    () => ({
      setUser: (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isLoading", "false");

        dispatch({ type: "SET_USER", payload: user });
      },
      removeUser: () => {
        localStorage.removeItem("user");
        localStorage.setItem("isLoading", "true");

        dispatch({ type: "REMOVE_USER", payload: null });
      },
      user: state.user,
      isLoading: state.isLoading,
    }),
    [state.isLoading, state.user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const { setUser, removeUser } = useContext(UserContext);

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoading = localStorage.getItem("isLoading") === "true";

  return { setUser, user, removeUser, isLoading };
};
