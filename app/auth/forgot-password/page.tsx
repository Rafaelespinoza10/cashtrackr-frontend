import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CashTrackr - Olvide mi password",
  description:  "CashTrack - Olvide mi password",
}

export default function ForgotPasswordPage() {


  return (
    <>
      <div className="container mx-auto">
        <h1 className="font-black text-6xl text-purple-700">
          ¿Olvidaste tu contraseña?
        </h1>
        <p className="text-3xl font-bold text-white">
          Aqui puedes  <span className="text-amber-500">reestablecerla</span>
        </p>
        <ForgotPasswordForm />


        <nav className="m-10 flex flex-col space-y-4">
            <Link
                href='/auth/register'
                className="text-center mt-10"
            >
                ¿No tienes cuenta? Registrate aqui
            </Link>

            <Link 
                href='/auth/login'
                className="text-center mt-10"
            >
                ¿Ya tienes cuenta? Inicia sesion
            </Link>

        </nav>

      </div>
    </>
  );
}
