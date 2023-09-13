import React, { useState } from "react";
import { store } from "../../store/StoreProvider.jsx";
import { useDispatch } from "react-redux";
import "./GoodsItem.scss";

export const GoodsItem = ({ caption, amount, id }) => {
  const [isEditMode, setEditMode] = useState(false);
  const [captionText, setCaptionText] = useState(caption);
  const [amountValue, setAmountValue] = useState(amount);
  const dispatch = useDispatch();

  const deleteHandler = () => {
    store.dispatch({
      type: "removeGoods",
      payload: {
        id,
      },
    });
  };

  const editHandler = () => {
    setEditMode(!isEditMode);
    dispatch({
      type: "editGoods",
      payload: {
        id,
        caption: captionText,
        amount: amountValue,
      },
    });
  };

  const changeHandler = ({ target: { value, type } }) => {
    type === "text" ? setCaptionText(value) : setAmountValue(value);
  };

  return (
    <li className="goods-item">
      <div className="goods-item__caption">
        {isEditMode ? (
          <input
            type="text"
            onChange={changeHandler}
            value={captionText}
            className="goods-item__input"
          />
        ) : (
          <span>{captionText}</span>
        )}
      </div>
      <div className="goods-item__amount">
        {isEditMode ? (
          <input
            type="number"
            min={1}
            max={100000}
            onChange={changeHandler}
            value={amountValue}
            className="goods-item__input"
          />
        ) : (
          <span>x{amountValue}</span>
        )}
      </div>
      <div className="goods-item__controls">
        <button className="goods-item__button" onClick={editHandler}>
          {isEditMode ? "Save" : "Edit"}
        </button>
        <button className="goods-item__button" onClick={deleteHandler}>
          X
        </button>
      </div>
    </li>
  );
};
