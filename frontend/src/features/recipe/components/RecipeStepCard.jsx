// Tarjeta de un paso de preparación dentro del wizard de receta (Etapa 2).
// Cada paso solo tiene instrucción y tiempo estimado (son los únicos campos que
// existen en el modelo `step` del backend); no hay título ni foto por paso todavía.
import '../styles/_recipe-editor-page.scss';

// Recibe: step ({ instruction, estimatedTime }), index (posición 0-based, para el
// número mostrado), canDelete (false si es el único paso restante), onChange
// (recibe los campos modificados), onDelete. Devuelve la tarjeta del paso.
function RecipeStepCard({ step, index, canDelete, onChange, onDelete }) {
  return (
    <div className="RecipeStepCard">
      <div className="RecipeStepCard-header">
        <span className="RecipeStepCard-number">{index + 1}</span>
        <button
          type="button"
          className="RecipeStepCard-deleteButton"
          title={canDelete ? 'Eliminar este paso' : 'La receta debe tener al menos un paso'}
          disabled={!canDelete}
          onClick={onDelete}
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>

      <div className="RecipeStepCard-field">
        <label htmlFor={`step-instruction-${index}`}>Instrucciones detalladas *</label>
        <textarea
          id={`step-instruction-${index}`}
          value={step.instruction}
          onChange={(e) => onChange({ instruction: e.target.value })}
          placeholder="Explicá cómo ejecutar este paso con precisión..."
          rows={3}
          required
        />
      </div>

      <div className="RecipeStepCard-field RecipeStepCard-field--inline">
        <span className="material-symbols-outlined">timer</span>
        <div>
          <label htmlFor={`step-time-${index}`}>Temporizador estimado (min)</label>
          <input
            id={`step-time-${index}`}
            type="number"
            min="1"
            value={step.estimatedTime}
            onChange={(e) => onChange({ estimatedTime: e.target.value })}
            placeholder="ej. 15"
          />
        </div>
      </div>
    </div>
  );
}

export default RecipeStepCard;
