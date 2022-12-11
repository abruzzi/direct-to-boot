import "./App.css";
import {DirectToBoot} from "./DirectToBoot";

function App() {
  return <div className="app">
    <DirectToBoot orderId="order-id" status="error" />
  </div>;
}

export default App;
