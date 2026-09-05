// Hook compartido: agrega una clase CSS a un elemento la primera vez que entra en
// el viewport, para animar secciones al hacer scroll (usado por la landing).
import { useEffect, useRef } from 'react';

// Recibe: nada. Devuelve: un ref para colocar en el elemento que se quiere animar.
// El elemento debe tener la clase base "scroll-animate" en su className; este hook
// le agrega "is-visible" cuando aparece en pantalla (una sola vez).
export const useScrollReveal = () => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return elementRef;
};
