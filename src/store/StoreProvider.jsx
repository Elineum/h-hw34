import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";

const localStorage = window.localStorage;

const reducer = (state = [], action) => {
  switch (action.type) {
    case "addGoods": {
      return [...state, action.payload];
    }
    case "removeGoods": {
      return state.filter((goods) => goods.id !== action.payload.id);
    }
    case "editGoods": {
      return state.map((goods) =>
        goods.id === action.payload.id
          ? {
              id: goods.id,
              caption: action.payload.caption,
              amount: action.payload.amount,
            }
          : goods
      );
    }
    default: {
      return state;
    }
  }
};

const localeData = JSON.parse(localStorage.getItem("shopState"));
const isLocalDataExist = localeData !== null;

export const store = createStore(reducer, isLocalDataExist ? localeData : []);

store.subscribe(() => {
  const stringifyedState = JSON.stringify(store.getState());
  localStorage.setItem("shopState", stringifyedState);
});

export const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
