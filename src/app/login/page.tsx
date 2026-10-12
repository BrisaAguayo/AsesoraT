export default function Login() {
  return (
    <section className="mx-auto max-w-sm rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="mb-1 text-xl font-bold text-marca">Iniciar sesión</h1>
      <p className="mb-4 text-sm text-slate-500">Usa tu correo institucional.</p>
      <form className="flex flex-col gap-3">
        <label className="text-sm">
          Correo
          <input type="email" placeholder="l00000000@tectijuana.edu.mx"
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="text-sm">
          Contraseña
          <input type="password" className="mt-1 w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <button type="submit" className="rounded bg-marca py-2 font-medium text-white">Entrar</button>
      </form>
      <p className="mt-4 text-xs text-slate-400">La autenticación se implementa en el Sprint 2 (HU-01).</p>
    </section>
  );
}
