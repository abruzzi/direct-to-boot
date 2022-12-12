import {render, screen, waitFor} from "@testing-library/react";
import { DirectToBootContainer } from "./DirectToBootContainer";

import createMockServer from './mockServer';
import {Server} from "miragejs/server";

let server: Server;

describe("direct to boot", () => {

  beforeEach(() => {
    server = createMockServer();
  })

  afterEach(() => {
    server.shutdown()
  })

  it("renders the direct to boot section with button enabled", async () => {
    render(<DirectToBootContainer orderId="order-id" />);

    expect(screen.getByText("Direct To Boot")).toBeInTheDocument();
    expect(
      screen.getByText("We're preparing your order...")
    ).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    await waitFor(() => expect(screen.getByRole('button')).toBeEnabled(), {
      timeout: 5000,
    });
  });

  it('when something went wrong', async () => {
    render(<DirectToBootContainer orderId="error-id" />);

    expect(screen.getByText("Direct To Boot")).toBeInTheDocument();
    expect(
      screen.getByText("We're preparing your order...")
    ).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText('04-23-33')).toBeEnabled(), {
      timeout: 5000,
    });
  })
});