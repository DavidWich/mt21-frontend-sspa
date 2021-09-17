import React from "react";

export default function Dropdown(props) {
  const dropdownChangeHandler = (event) => {
    props.onChangeHandler(event.target.value);
  };

  const selectedItem = props.items.find((el) => el.selected);
  const selectedVal = selectedItem ? selectedItem.value : undefined;

  return (
    <select
      className={props.styling}
      onChange={dropdownChangeHandler}
      value={selectedVal}
    >
      {props.items.map((item) => (
        <option key={item.value} value={item.value}>
          {item.text}
        </option>
      ))}
    </select>
  );
}
