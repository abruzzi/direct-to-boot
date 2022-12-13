import {render, screen, waitFor} from "@testing-library/react";
import { DirectToBootContainer } from "./DirectToBootContainer";

import createMockServer from './mockServer';
import {Server} from "miragejs/server";
import userEvent from "@testing-library/user-event";

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

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    await waitFor(() => expect(screen.getByText('04-23-33')).toBeEnabled(), {
      timeout: 5000,
    });
  })

  it('notify the store', async () => {
    render(<DirectToBootContainer orderId="order-id" />);

    expect(screen.getByText("Direct To Boot")).toBeInTheDocument();

    await screen.findByText("Please click the button when vou have arrived. one of our friendly staff will bring your order to you.")

    await waitFor(() => expect(screen.getByText('I\'m here')).toBeEnabled(), {
      timeout: 5000,
    });

    const button = screen.getByText('I\'m here')
    userEvent.click(button);

    await screen.findByText("Thanks for letting us know, you order will be come to you in a few minutes.");
  })
});