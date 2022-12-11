import { ReactElement } from "react";

function getMessage(status: string) {
  switch (status) {
    case "ready":
      return "Please click the button when vou have arrived. one of our friendly staff will bring your order to you.";
    case "error":
      return "Seems something went wrong, you can call the following number to notify us instead.";
    case "initialised":
      return "We're preparing your order...";
    case 'notified':
      return "Thanks for letting us know, you order will be come to you in a few minutes."
    default:
      return "";
  }
}

type StatusButtonProps = {
  status: string;
  onClick?: () => void;
};

const noop = () => {};

const StatusButton = ({
  status,
  onClick = noop,
}: StatusButtonProps): ReactElement | null => {
  switch (status) {
    case "initialised":
      return <button disabled>I'm here</button>;
    case "ready":
      return <button onClick={onClick}>I'm here</button>;
    case "error":
      return <a href="tel:042333">04-23-33</a>;
    default:
      return null;
  }
};

export function DirectToBoot({
  orderId,
  status,
}: {
  orderId: string;
  status: string;
}) {
  const Button = () => <StatusButton status={status} />;

  return (
    <div>
      <h3>Direct To Boot</h3>
      <p>{getMessage(status)}</p>
      <Button />
    </div>
  );
}
