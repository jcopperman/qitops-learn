import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Basic Test Page" },
    { name: "description", content: "A basic test page" },
  ];
};

export default function BasicTest() {
  return (
    <div style={{ 
      fontFamily: "system-ui, sans-serif", 
      padding: "2rem",
      maxWidth: "800px",
      margin: "0 auto",
      backgroundColor: "white",
      color: "black",
      minHeight: "100vh"
    }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Basic Test Page</h1>
      <p style={{ marginBottom: "1rem" }}>This is a basic test page with inline styles.</p>
      <p style={{ marginBottom: "1rem" }}>If you can see this, the rendering is working correctly.</p>
      <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#f0f0f0", borderRadius: "0.5rem" }}>
        <p>Time now: {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
}
