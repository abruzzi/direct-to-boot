import {render, screen, waitFor} from "@testing-library/react";
import {DirectToBoot} from "./DirectToBoot";
import {Server} from "miragejs/server";
import {createOrderServer} from "./createOrderServer";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactElement} from "react";

let server: Server;
const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactElement}) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const customRender = (ui: ReactElement) =>
  render(ui, {wrapper})


describe('Direct To Boot', () => {
  beforeEach(() => {
    server = createOrderServer()
  })

  afterEach(() => {
    server.shutdown()
  })

  it('shows the content', () => {
    customRender(<DirectToBoot orderId="id-123"/>)
    expect(screen.getByText('Direct To Boot')).toBeInTheDocument();
    expect(screen.getByText('Please click the button when you have arrived')).toBeInTheDocument();
  })

  it('shows the i am here button', () => {
    customRender(<DirectToBoot orderId="id-123"/>)
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('I am here')).toBeInTheDocument();
  })

  it('shows the button as disabled by default', () => {
    customRender(<DirectToBoot orderId="id-123"/>)
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  })

  it('enable the button when remote is ready', async () => {
    customRender(<DirectToBoot orderId="id-123" />)
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    await waitFor(() => expect(screen.getByRole('button')).toBeEnabled(), {
      timeout: 5000,
    });
  })

})