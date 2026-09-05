// Etapa 2 del wizard de receta: lista de pasos de preparación, agregables y
// eliminables dinámicamente (formulario dinámico pedido por T-3.2).
import { useState } from 'react';
import RecipeStepCard from './RecipeStepCard.jsx';
import ConfirmModal from '../../../core/components/ConfirmModal.jsx';

// Recibe: steps (array de { instruction, estimatedTime }), onStepsChange (recibe
// el array completo ya modificado). Devuelve la sección completa de la etapa 2.
function RecipeStepsStage({ steps, onStepsChange }) {
  // Índice del paso que se está por borrar (null = no hay ningún modal abierto).
  const [stepPendingDelete, setStepPendingDelete] = useState(null);

  const handleChangeStep = (index, patch) => {
    onStepsChange(steps.map((step, i) => (i === index ? { ...step, ...patch } : step)));
  };

  const handleConfirmDeleteStep = () => {
    onStepsChange(steps.filter((_, i) => i !== stepPendingDelete));
    setStepPendingDelete(null);
  };

  const handleAddStep = () => {
    onStepsChange([...steps, { instruction: '', estimatedTime: '' }]);
  };

  return (
    <section className="RecipeStepsStage" id="section-etapa-pasos">
      <div className="RecipeStepsStage-header">
        <div>
          <span className="RecipeStepsStage-eyebrow">Etapa 3</span>
          <h2>Pasos de preparación</h2>
          <p>Escribí instrucciones claras y concisas para cada paso de la receta.</p>
        </div>
        <span className="RecipeStepsStage-counter">
          {steps.length} {steps.length === 1 ? 'paso agregado' : 'pasos agregados'}
        </span>
      </div>

      <div className="RecipeStepsStage-list">
        {steps.map((step, index) => (
          <RecipeStepCard
            key={index}
            step={step}
            index={index}
            canDelete={steps.length > 1}
            onChange={(patch) => handleChangeStep(index, patch)}
            onDelete={() => setStepPendingDelete(index)}
          />
        ))}
      </div>

      <button type="button" className="RecipeStepsStage-addButton" onClick={handleAddStep}>
        <span className="material-symbols-outlined">add_circle</span>
        + Agregar nuevo paso a la preparación
      </button>

      {stepPendingDelete !== null && (
        <ConfirmModal
          title="Eliminar paso"
          message={`¿Eliminar el paso ${stepPendingDelete + 1}? Esta acción no se puede deshacer.`}
          confirmLabel="Eliminar"
          danger
          onConfirm={handleConfirmDeleteStep}
          onCancel={() => setStepPendingDelete(null)}
        />
      )}
    </section>
  );
}

export default RecipeStepsStage;
