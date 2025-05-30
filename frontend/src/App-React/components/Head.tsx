// Importa el hook useEffect para ejecutar lógica después de que el componente se monte o actualice
import { useEffect } from 'react';

// Define los tipos de propiedades que este componente acepta
interface HeadProps {
  title: string;            // Título de la página que se mostrará en la pestaña del navegador
  description?: string;     // Descripción opcional de la página (útil para SEO)
}

// Componente Head: actualiza el título y la descripción del documento cuando cambia la página
export const Head = ({ title, description }: HeadProps) => {
  useEffect(() => {
    // Cambia el título de la pestaña del navegador
    document.title = title;

    // Si se proporciona una descripción...
    if (description) {
      // Busca si ya existe una etiqueta <meta name="description">
      let meta = document.querySelector("meta[name='description']") as HTMLMetaElement;

      // Si no existe, la crea y la añade al <head>
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }

      // Actualiza el contenido de la descripción
      meta.content = description;
    }
  }, [title, description]); // Se ejecuta cada vez que cambie el título o la descripción

  // Este componente no muestra nada visual, solo modifica el <head> del documento
  return null;
};
