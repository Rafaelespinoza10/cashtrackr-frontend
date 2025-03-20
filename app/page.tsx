import { Logo } from "@/components/ui/Logo";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="bg-purple-600 py-6 shadow-lg">
        <div className="max-w-3xl mx-auto px-4 flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Logo />
          </div>

          <nav className="flex gap-6">
            <Link
              href="/auth/register"
              className="text-white hover:text-amber-400 font-semibold text-sm uppercase"
            >
              Registrarme
            </Link>
            <Link
              href="/auth/login"
              className="text-white hover:text-amber-500 font-bold uppercase text-sm"
            >
              Iniciar Sesión
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 text-center mt-16">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
          Controla tus <span className="text-amber-500">finanzas</span>{" "}
          fácilmente
        </h1>
        <p className="text-lg text-gray-300 mb-10">
          Domina tus finanzas con nuestro administrador. Registra, organiza y
          visualiza tus gastos e ingresos en un solo lugar, desde cualquier
          dispositivo.
        </p>

        <section className="grid gap-6">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-amber-400 mb-2">
              Organización sin esfuerzo
            </h3>
            <p className="text-gray-400">
              Clasifica fácilmente tus gastos y obtén informes claros y útiles.
            </p>
          </div>

          <div className="bg-gray-800 shadow-lg p-6 rounded-lg">
            <span className="text-white font-bold">
              Presupuestos Inteligentes
            </span>
            <p className="text-gray-300">
              Define presupuestos personalizados y controla tus límites
              fácilmente.
            </p>
          </div>

          <div className="bg-gray-800 shadow-lg p-6 rounded-lg">
            <span className="text-white font-bold">Disponible Siempre</span>
            <p className="text-gray-300">
              Accede a tu información financiera en cualquier momento y lugar.
            </p>
          </div>

          <div className="bg-gray-800 shadow-lg p-6 rounded-lg">
            <span className="text-white font-bold">Seguridad Garantizada</span>
            <p className="text-gray-300">
              Tus datos están protegidos con los más altos estándares de
              seguridad.
            </p>
          </div>
        </section>

        <div className="mt-12 flex justify-center">
          <Link
            href="/auth/register"
            className="bg-amber-500 text-gray-900 px-6 py-2 rounded font-bold hover:bg-amber-400 transition"
          >
            Comienza Ahora
          </Link>
        </div>
      </main>

      <footer className="max-w-3xl mx-auto px-4 mt-16 text-center text-gray-500 text-sm pb-10">
        © {new Date().getFullYear()} CashTrackr - Todos los derechos reservados
      </footer>
    </>
  );
}
