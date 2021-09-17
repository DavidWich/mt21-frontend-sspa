export default function Card(props) {
  return (
    <div
      className={props.styles}
      style={{
        backgroundColor: "white",
        borderRadius: "6px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
        padding: "1rem",
        overflow: "auto",
      }}
    >
      {props.children}
    </div>
  );
}
