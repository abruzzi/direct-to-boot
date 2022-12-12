import "./App.css";
import {DirectToBootContainer} from "./DirectToBootContainer";

import createMockServer from "./mockServer";

createMockServer();

function App() {
  return <div className="app">
    <DirectToBootContainer orderId="error-id" />
  </div>;
}

export default App;
