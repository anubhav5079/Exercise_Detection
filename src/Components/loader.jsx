// TODO: add new image and add below first div
// <img src={loader} alt="loading..." width={"25%"} />
export default function Loader({ color = "white" }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        padding: 60,
        fontSize: "20px",
        fontWeight: "bold",
        color: "#333",
        boxSizing: "border-box",
      }}
    >
      <span
        style={{
          fontSize: "36px",
          fontWeight: "bold",
          marginBottom: "24px",
        }}
      >
        Loading...
      </span>
    </div>
  );
}
