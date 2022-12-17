export function getMessage(status: string) {
  switch (status) {
    case "initialised":
      return "We are preparing your order...";
    case "ready":
      return "Please click the button when vou have arrived. one of our friendly staff will bring your order to you.";
    case "notified":
      return "Thanks for letting us know, you order will be come to you in a few minutes.";
    case "error":
      return "Seems something went wrong, you can call the following number to notify us instead.";
  }
}