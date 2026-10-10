import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

class StartupErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("RAADHA render failure:", error, info?.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <main style={{ minHeight: "100vh", boxSizing: "border-box", padding: 24, display: "grid", placeContent: "center", background: "#08080b", color: "#f4f4f5", fontFamily: "system-ui, sans-serif" }}>
          <section style={{ maxWidth: 560 }}>
            <h1 style={{ fontSize: 22 }}>RAADHA hit a startup error</h1>
            <p style={{ color: "#a1a1aa", lineHeight: 1.6 }}>Your project data has not intentionally been cleared. Refresh once. If the error returns, share the message below so it can be fixed.</p>
            <pre style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere", padding: 14, borderRadius: 10, background: "#151519", color: "#c4b5fd" }}>{String(this.state.error?.message || this.state.error)}</pre>
            <button onClick={() => window.location.reload()} style={{ padding: "10px 14px", borderRadius: 8, border: 0, background: "#8b5cf6", color: "white" }}>Reload RAADHA</button>
          </section>
        </main>
      );
    }
    return this.props.children;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
try {
  root.render(
    <React.StrictMode>
      <StartupErrorBoundary>
        <App />
      </StartupErrorBoundary>
    </React.StrictMode>
  );
  const bootStatus = document.getElementById("boot-status");
  if (bootStatus) bootStatus.hidden = true;
} catch (error) {
  console.error("RAADHA bootstrap failure:", error);
  const bootStatus = document.getElementById("boot-status");
  if (bootStatus) {
    bootStatus.hidden = false;
    bootStatus.innerHTML = "<strong>RAADHA could not start</strong><p>Refresh once. If it repeats, share this message: " +
      String(error?.message || error).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])) +
      "</p>";
  }
}
