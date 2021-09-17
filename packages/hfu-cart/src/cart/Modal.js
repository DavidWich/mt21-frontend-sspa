import { useCss } from "kremling";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  const scope = useCss(css);
  return <div className="backdrop" onClick={props.onClose} {...scope} />;
};

const ModalOverlay = (props) => {
  const scope = useCss(css);
  return (
    <div className="modal" {...scope}>
      <div className="content">{props.children}</div>
    </div>
  );
};

export default function Modal(props) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) {
    return null;
  }

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("modal")
      )}
    </>
  );
}

const css = `
& .backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);
}

& .modal {
  position: fixed;
  top: 15vh;
  left: 5%;
  width: 90%;
  background-color: white;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;
  animation: slide-down 300ms ease-out forwards;
}

@media (min-width: 768px) {
  .modal {
    width: 40rem;
    left: calc(50% - 20rem);
  }
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-3rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;
