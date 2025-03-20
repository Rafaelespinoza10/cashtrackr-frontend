import { ConfirmAccountForm } from "@/components/auth/ConfirmAccountForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CashTrackr - Olvide mi password",
  description: "CashTrack - Olvide mi password",
};

export default function ConfirmAccountPage() {
  return (
    <>
      <div className="container mx-auto">
        <h1 className="font-black text-6xl text-purple-700">
          Confirma tu cuenta
        </h1>
        <p className="text-3xl font-bold text-white">
          Ingresa codigo que recibiste<span className="text-amber-500"> en tu email</span>
        </p>

        <ConfirmAccountForm />
      </div>
    </>
  );
}
