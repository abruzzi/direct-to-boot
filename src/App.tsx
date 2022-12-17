import './App.css';
import {DirectToBoot} from "./components/DirectToBoot";
import {createMockServer} from "./mocks/createMockServer";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

createMockServer();

const queryClient = new QueryClient({});

function App() {
  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <DirectToBoot orderId="error-id" />
      </QueryClientProvider>
    </div>
  );
}

export default App;
