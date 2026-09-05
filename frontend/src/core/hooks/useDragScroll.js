// Hook compartido: permite scrollear horizontalmente un contenedor arrastrando con el
// mouse (útil para carruseles sin scrollbar visible en desktop, donde no hay touch).
import { useEffect, useRef } from 'react';

// Recibe: opcionalmente, un ref ya creado (para compartirlo con otro hook, ej.
// useInfiniteScroll, que necesita apuntar al mismo contenedor). Si no se pasa ninguno,
// crea uno propio. Devuelve: el ref para colocar en el contenedor con overflow-x: auto.
export const useDragScroll = (externalRef) => {
  const ownRef = useRef(null);
  const containerRef = externalRef ?? ownRef;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let isDragging = false;
    let startX = 0;
    let scrollLeftStart = 0;

    const handleMouseDown = (event) => {
      isDragging = true;
      container.classList.add('is-dragging');
      startX = event.pageX - container.offsetLeft;
      scrollLeftStart = container.scrollLeft;
    };

    const stopDragging = () => {
      isDragging = false;
      container.classList.remove('is-dragging');
    };

    const handleMouseMove = (event) => {
      if (!isDragging) return;
      event.preventDefault();
      const x = event.pageX - container.offsetLeft;
      // x2 para que el arrastre se sienta más rápido que el movimiento real del mouse.
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeftStart - walk;
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseleave', stopDragging);
    container.addEventListener('mouseup', stopDragging);
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseleave', stopDragging);
      container.removeEventListener('mouseup', stopDragging);
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [containerRef]);

  return containerRef;
};
