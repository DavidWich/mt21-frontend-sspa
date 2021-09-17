import { useCss } from "kremling";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { CartIcon } from "./CartIcon";

export default function Cart(props) {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const items = useSelector((state) => state.cart.items);
  const scope = useCss(css);

  const btnClasses = `button ${btnIsHighlighted ? "bump" : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button id="nav_cart" className={btnClasses} onClick={props.onClick} {...scope}>
      <span className="icon">
        <CartIcon />
      </span>
      <span className="badge">{items.length}</span>
    </button>
  );
}

const css = `
& .button {
  cursor: pointer;
  border: none;
  color: white;
  padding: 0.5rem 0.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 25px;
  background-color: transparent;
}

.button:hover,
.button:active {
  background-color: #137e33;
}

.icon {
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 0.5rem;
}

.badge {
  border-radius: 25px;
  font-weight: bold;
  font-size: 18px;
}

.bump {
  animation: bump 300ms ease-out;
}

@keyframes bump {
  0% {
    transform: scale(1);
  }
  10% {
    transform: scale(0.9);
  }
  30% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}
`;
