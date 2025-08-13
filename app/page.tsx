export default function Maintenance() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#0f172a",
      color: "white",
      fontFamily: "sans-serif"
    }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🚧 Under Maintenance 🚧</h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "500px", textAlign: "center" }}>
        I’m working hard to bring you my new portfolio website.  
        Please check back soon!
      </p>
    </div>
  );
}
