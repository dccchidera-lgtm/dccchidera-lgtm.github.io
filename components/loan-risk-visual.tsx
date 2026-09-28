/** Reported regression fit and predictor significance from the team's SPSS credit-risk case. */
export function LoanRiskVisual({ compact = false }: { compact?: boolean }) {
  return (
    <figure className={`case-visual case-visual--models${compact ? ' case-visual--compact' : ''}`} aria-labelledby={compact ? 'loan-chapter-caption' : 'loan-caption'}>
      <figcaption id={compact ? 'loan-chapter-caption' : 'loan-caption'}>
        <span>Multiple regression · 44,986 records</span>
        <strong>How much of affordability the model explained.</strong>
      </figcaption>
      <div className="model-bars">
        <div className="model-bar">
          <div><span>Variance explained (R²)</span><strong>61.7%</strong></div>
          <i style={{ width: '61.7%', background: 'var(--signal)' }} />
        </div>
        <div className="model-bar">
          <div><span>Unexplained</span><strong>38.3%</strong></div>
          <i style={{ width: '38.3%', opacity: 0.26 }} />
        </div>
      </div>
      <div className="visual-result-strip">
        <div><span>Credit score</span><strong>Not significant</strong></div>
        <div><span>Interest rate</span><strong>Not significant</strong></div>
        <div><span>Diagnostics</span><strong>Heteroscedasticity flagged</strong></div>
      </div>
    </figure>
  );
}
