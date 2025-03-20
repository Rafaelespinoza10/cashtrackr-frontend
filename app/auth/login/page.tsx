import LoginForm from "@/components/auth/LoginForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CashTrackr - Iniciar sesion",
  description:  "CashTrack - Iniciar sesion",
}

export default function LoginPage() {
  return (
    <>
      <div className="container mx-auto">
        <h1 className="font-black text-6xl text-purple-700">
          Iniciar Sesion
        </h1>
        <p className="text-3xl font-bold text-white">
          y controla tus <span className="text-amber-500">finanzas</span>
        </p>

        <LoginForm />
        <nav className="m-10 flex flex-col space-y-4">
            <Link 
                href='/auth/register'
                className="text-center mt-10"
            >
                ¿No tienes cuenta? Registrate aqui
            </Link>

            <Link 
                href='/auth/forgot-password'
                className="text-center mt-10"
            >
                ¿Olvidaste tu contraseña? Reestablecela aqui
            </Link>
        </nav>
      </div>
    </>
  );
}
