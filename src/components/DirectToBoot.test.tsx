import { render, screen, waitFor } from "@testing-library/react";
import { DirectToBoot } from "./DirectToBoot";

import { Server } from "miragejs";
import { createMockServer } from "../mocks/createMockServer";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactElement} from "react";
import userEvent from "@testing-library/user-event";

let server: Server;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: 0,
    }
  }
});

describe("Direct To Boot", () => {
  beforeEach(() => {
    server = createMockServer();
  })

  afterEach(() => {
    server.shutdown()
  })

  const myRender = (ui: ReactElement) => {
    return render(<QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>);
  }
  
  it("renders a section for direct to boot", () => {
    myRender(<DirectToBoot orderId="order-id"/>);

    expect(screen.getByText("Direct to boot")).toBeInTheDocument();
    expect(
      screen.getByText("We are preparing your order...")
    ).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("enables button when the order is ready", async () => {
    myRender(<DirectToBoot orderId="order-id"/>);

    expect(screen.getByText("Direct to boot")).toBeInTheDocument();
    expect(
      screen.getByText("We are preparing your order...")
    ).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    //wait for
    await waitFor(() => expect(button).toBeEnabled(), {timeout: 3000})
    await screen.findByText("Please click the button when vou have arrived. one of our friendly staff will bring your order to you.");
  })

  it("notifies the store", async () => {
    myRender(<DirectToBoot orderId="order-id"/>);

    expect(screen.getByText("Direct to boot")).toBeInTheDocument();
    expect(
      screen.getByText("We are preparing your order...")
    ).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    //wait for
    await waitFor(() => expect(button).toBeEnabled(), {timeout: 3000})
    await screen.findByText("Please click the button when vou have arrived. one of our friendly staff will bring your order to you.")

    userEvent.click(button);
    await screen.findByText("Thanks for letting us know, you order will be come to you in a few minutes.");
    await waitFor(() => expect(button).not.toBeInTheDocument(), {timeout: 3000});
  });


  it("notifies the store is rejected", async () => {
    myRender(<DirectToBoot orderId="unreachable-order-id"/>);

    expect(screen.getByText("Direct to boot")).toBeInTheDocument();
    expect(
      screen.getByText("We are preparing your order...")
    ).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    //wait for
    await waitFor(() => expect(button).toBeEnabled(), {timeout: 3000})
    await screen.findByText("Please click the button when vou have arrived. one of our friendly staff will bring your order to you.")

    userEvent.click(button);

    await waitFor(() =>
      expect(
        screen.getByText("Seems something went wrong, you can call the following number to notify us instead.")
      ).toBeInTheDocument(), { timeout: 3000});

    await waitFor(() => expect(screen.getByText("04 23 33")).toBeInTheDocument(), {timeout: 3000})
  });

  it("shows a fallback call the store button", async () => {
    myRender(<DirectToBoot orderId="error-id"/>);

    //wait for
    await waitFor(() =>
      expect(
        screen.getByText("Seems something went wrong, you can call the following number to notify us instead.")
      ).toBeInTheDocument(), { timeout: 3000});

    const button = screen.getByText("04 23 33");
    await waitFor(() => expect(button).toBeInTheDocument(), {timeout: 3000})
  });
});