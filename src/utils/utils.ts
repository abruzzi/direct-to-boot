import {Status} from "../types";

export function getMessage(status: Status) {
  switch (status) {
    case "ready":
      return "Please click the button when vou have arrived. one of our friendly staff will bring your order to you.";
    case "error":
      return "Seems something went wrong, you can call the following number to notify us instead.";
    case "initialised":
      return "We're preparing your order...";
    case "notified":
      return "Thanks for letting us know, you order will be come to you in a few minutes.";
    default:
      return "";
  }
}

export const noop = () => {};
