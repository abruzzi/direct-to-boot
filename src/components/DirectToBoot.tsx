import { Status } from "../types";
import { getMessage, noop } from "../utils/utils";
import { StatusButton } from "./StatusButton";

export function DirectToBoot({
  status,
  notifyStore = noop,
}: {
  status: Status;
  notifyStore?: () => void;
}) {
  const Button = () => <StatusButton status={status} onClick={notifyStore} />;

  return (
    <div className="container">
      <h3>Direct To Boot</h3>
      <p>{getMessage(status)}</p>
      <div className="buttonContainer">
        <Button />
      </div>
    </div>
  );
}
