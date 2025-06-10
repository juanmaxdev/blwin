interface ModalDialogoProps {
  id: string;
  titulo: string;
  texto: string;
}

export default function ModalDialogo({ id, titulo, texto }: ModalDialogoProps) {
  return (
    <div id={id} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6 relative">
        <div className="absolute -top-4 left-8 w-0 h-0 border-t-8 border-t-white border-x-8 border-x-transparent" />

        <h2 className="text-2xl font-bold text-gray-800 mb-3">{titulo}</h2>

        <p className="text-gray-700 whitespace-pre-wrap">{texto}</p>

        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Cerrar diálogo"
          onClick={() => {
            const modal = document.getElementById(id);
            modal?.classList.add('hidden');
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
