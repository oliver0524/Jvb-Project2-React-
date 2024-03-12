import React, { useContext } from "react";

export function PageNotFound() {
  return (
    <>
      <div style={styles.container}>
        <h1 style={styles.header}>404</h1>
        <p style={styles.subheader}>
          Oops! We can't seem to find the page you're looking for.
        </p>
      </div>
    </>
  );
}

const styles = {
  container: {
    textAlign: "center" as const,
    paddingTop: "50px",
    paddingBottom: "50px",
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center" as const,
    flexDirection: "column" as const,
  },
  header: {
    fontSize: "72px",
    fontWeight: "bold" as const,
    color: "#0a3d62",
  },
  subheader: {
    fontSize: "24px",
    color: "#60a3bc",
  },
  link: {
    fontSize: "18px",
    color: "#78e08f",
    textDecoration: "none" as const,
    marginTop: "25px",
    display: "inline-block" as const,
    backgroundColor: "#0a3d62",
    padding: "10px 25px",
    borderRadius: "5px",
    transition: "background-color 0.3s ease" as const,
  },
};
