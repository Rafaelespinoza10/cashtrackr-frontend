import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CashTrackr - Crear cuenta",
  description:  "CashTrack - Crear cuenta",
}

export default function RegisterPage() {
  return (
    <>
      <div className="container mx-auto">
        <h1 className="font-black text-6xl text-purple-700">
          Crear una cuenta
        </h1>
        <p className="text-3xl font-bold text-white">
          y controla tus <span className="text-amber-500">finanzas</span>
        </p>
        <RegisterForm />

        <nav className="m-10 flex flex-col space-y-4">
            <Link 
                href='/auth/login'
                className="text-center mt-10"
            >
                ¿Ya tienes cuenta? Inicia sesion
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
