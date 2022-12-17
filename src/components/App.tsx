import "./App.css";
import {DirectToBootContainer} from "./DirectToBootContainer";

import createMockServer from "../mock/mockServer";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

createMockServer();

const queryClient = new QueryClient()

function App() {
  return <div className="app">
    <QueryClientProvider client={queryClient}>
      <DirectToBootContainer orderId="order-id" />
    </QueryClientProvider>
  </div>;
}

export default App;
