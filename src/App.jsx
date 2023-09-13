import React, { useEffect, useState } from "react";
import "./App.scss";
import { useSelector } from "react-redux";
import { GoodsItem } from "./components/GoodsItem/GoodsItem.jsx";
import { useDispatch } from "react-redux";

const localStorage = window.localStorage;

export const App = () => {
  const [captionValue, setCaptionValue] = useState("");
  const [amountValue, setAmountValue] = useState("");
  const [isValueCorrect, setIsValueCorrect] = useState(true);
  const goods = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "",
      payload: {
        ...JSON.parse(localStorage.getItem("shopState")),
      },
    });
  }, []);

  const isValueValid = (value) => {
    const regEx = /^[a-zA-Z]+$/g;

    if (regEx.test(value)) {
      setIsValueCorrect(true);
      return true;
    }

    setIsValueCorrect(false);
    return false;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    isValueCorrect &&
      dispatch({
        type: "addGoods",
        payload: {
          id: Date.now(),
          caption: captionValue,
          amount: amountValue,
        },
      });
  };

  const changeHander = ({ target: { id, value } }) => {
    if (id === "caption") {
      isValueValid(value.trim());
      setCaptionValue(value.trim());
    } else {
      setAmountValue(value);
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
            required
            onChange={changeHander}
            className={`${isValueCorrect ? "" : "invalid-input"}`}
          />
        </div>
        <div
          className={`validation-rules ${
            isValueCorrect ? "" : "value-invalid"
          }`}
        >
          <ul className="validation-rules__list">
            <li>Value must be a words.</li>
            <li>Numbers unacceptable</li>
            <li>Symbols too.</li>
          </ul>
        </div>
        <div className="input-holder">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            min={1}
            max={100000}
            value={amountValue}
            onChange={changeHander}
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
