import Navbar from "./components/NavBar";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <AppRouter />
      </div>
    </>
  );
}

export default App;
