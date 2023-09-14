import React, { useState } from "react";
import "./App.scss";
import { useSelector } from "react-redux";
import { GoodsItem } from "./components/GoodsItem/GoodsItem.jsx";
import { useDispatch } from "react-redux";
import { isValueValid } from "../src/utils/isValueValid.js";

export const App = () => {
  const [captionValue, setCaptionValue] = useState("");
  const [amountValue, setAmountValue] = useState("");
  const goods = useSelector((state) => state);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "addGoods",
      payload: {
        id: Date.now(),
        caption: captionValue,
        amount: amountValue,
      },
    });
  };

  const changeHander = ({ target: { name, value } }) => {
    if (isValueValid({ value, name })) {
      name === "caption" ? setCaptionValue(value) : setAmountValue(value);
    }
  };

  return (
    <div className="app">
      <form className="form" onSubmit={submitHandler}>
        <div className="input-holder">
          <label htmlFor="caption">Caption</label>
          <input
            type="text"
            id="caption"
            value={captionValue}
            onChange={changeHander}
            name="caption"
            required
          />
        </div>
        <div className="input-holder">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amountValue}
            onChange={changeHander}
            name="amount"
            required
          />
        </div>
        <button className="add-button">Add</button>
      </form>
      <ul className="goods-list">
        {goods.map(({ caption, amount, id }) => (
          <GoodsItem caption={caption} amount={amount} id={id} key={id} />
        ))}
      </ul>
    </div>
  );
};
