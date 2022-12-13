import { render, screen } from "@testing-library/react";
import { DirectToBoot } from "./DirectToBoot";

describe("direct to boot", () => {
  it("renders the initial state of DirectToBoot section", () => {
    render(<DirectToBoot status="initialised" />);

    expect(screen.getByText("Direct To Boot")).toBeInTheDocument();
    expect(screen.getByText("We're preparing your order...")).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('enables the button when the order is ready', () => {
    render(<DirectToBoot status="ready" />);

    expect(screen.getByText("Direct To Boot")).toBeInTheDocument();
    expect(screen.getByText("Please click the button when vou have arrived. one of our friendly staff will bring your order to you.")).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  })


  it('shows store number when error occurs', () => {
    render(<DirectToBoot status="error" />);

    expect(screen.getByText("Direct To Boot")).toBeInTheDocument();
    expect(screen.getByText("Seems something went wrong, you can call the following number to notify us instead.")).toBeInTheDocument();

    const button = screen.getByText('04-23-33');
    expect(button).toBeInTheDocument();
  })

  it('shows a message that indicate the store is notified', () => {
    render(<DirectToBoot status="notified" />);

    expect(screen.getByText("Direct To Boot")).toBeInTheDocument();
    expect(screen.getByText("Thanks for letting us know, you order will be come to you in a few minutes.")).toBeInTheDocument();

    expect(screen.queryByText('04-23-33')).not.toBeInTheDocument();
    expect(screen.queryByText("I'm here")).not.toBeInTheDocument();
  })
});
