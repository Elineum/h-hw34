import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./GoodsItem.scss";
import { isValueValid } from "../../utils/isValueValid";

export const GoodsItem = ({ caption, amount, id }) => {
  const [isEditMode, setEditMode] = useState(false);
  const [captionText, setCaptionText] = useState(caption);
  const [amountValue, setAmountValue] = useState(amount);
  const dispatch = useDispatch();

  const deleteHandler = () => {
    dispatch({
      type: "removeGoods",
      payload: {
        id,
      },
    });
  };

  const editHandler = () => {
    setEditMode(!isEditMode);

    isEditMode &&
      dispatch({
        type: "editGoods",
        payload: {
          id,
          caption: captionText,
          amount: amountValue,
        },
      });
  };

  const changeHandler = ({ target: { value, name } }) => {
    if (isValueValid({ value, name })) {
      name === "caption" ? setCaptionText(value) : setAmountValue(value);
    }
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
            name="caption"
          />
        ) : (
          <span>{captionText.trim()}</span>
        )}
      </div>
      <div className="goods-item__amount">
        {isEditMode ? (
          <input
            type="number"
            onChange={changeHandler}
            value={amountValue}
            className="goods-item__input"
            name="amount"
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
