// Campo de formulario con etiqueta y mensaje de error
export function Campo({
  etiqueta,
  error,
  children,
}: {
  etiqueta: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-medium text-slate-700">{etiqueta}</span>
      {children}
      {error && <span className="text-xs text-red-700">{error}</span>}
    </label>
  );
}

export const estiloInput = "w-full rounded border border-slate-300 bg-white px-3 py-2";
