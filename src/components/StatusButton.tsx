import { noop } from "../utils/utils";
import { ReactElement } from "react";

type StatusButtonProps = {
  status: string;
  onClick?: () => void;
};

export const StatusButton = ({
  status,
  onClick = noop,
}: StatusButtonProps): ReactElement | null => {
  switch (status) {
    case "initialised":
      return (
        <button className="primaryButton" disabled>
          I'm here
        </button>
      );
    case "ready":
      return (
        <button className="primaryButton" onClick={onClick}>
          I'm here
        </button>
      );
    case "error":
      return (
        <a href="tel:042333" className="primaryButton">
          04-23-33
        </a>
      );
    default:
      return null;
  }
};
