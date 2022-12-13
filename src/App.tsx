import "./App.css";
import {DirectToBootContainer} from "./DirectToBootContainer";

import createMockServer from "./mockServer";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

createMockServer();

const queryClient = new QueryClient()

function App() {
  return <div className="app">
    <QueryClientProvider client={queryClient}>
      <DirectToBootContainer orderId="error-id" />
    </QueryClientProvider>
  </div>;
}

export default App;
