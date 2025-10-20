import { ChangeEmail } from "./utils/change-email";
import { ChangePassword } from "./utils/change-password";

export default function Settings() {
    return (
      <>
        <h2>Settings</h2>
        <div className="flex justify-between gap-16">
          <ChangeEmail />
          <ChangePassword />
        </div>
      </>
    );
}