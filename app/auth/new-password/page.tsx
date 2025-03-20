import PasswordResetHandle from "@/components/auth/PasswordResetHandle";
import type { Metadata } from "next";

export const dataMeta: Metadata = {
  title: "CashTrackr - Olvide mi password",
  description: "CashTrack - Olvide mi password",
};

export default function NewPasswordPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">
        Reestablecer Password
      </h1>
      <p className="text-3xl font-bold">
        Ingresa el código que recibiste
        <span className="text-amber-500"> por email</span>
      </p>

      <PasswordResetHandle />
    </>
  );
}
