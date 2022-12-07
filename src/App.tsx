import './App.css';
import {DirectToBoot} from "./DirectToBoot";
import {createOrderServer} from "./createOrderServer";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

createOrderServer()
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <DirectToBoot orderId="error-id" />
      </div>
    </QueryClientProvider>
  );
}

export default App;
