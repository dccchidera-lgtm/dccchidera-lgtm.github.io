/** Standardised coefficients reported in the team's SPSS regression of the loan-to-income ratio. */
const predictors = [
  { name: 'Loan amount', beta: '.767', width: 100, significant: true },
  { name: 'Income', beta: '−.488', width: 63.6, significant: true },
  { name: 'Mortgage holder', beta: '−.169', width: 22, significant: true },
  { name: 'Interest rate', beta: '−.004', width: 0.5, significant: false },
  { name: 'Credit score', beta: '−.003', width: 0.4, significant: false },
];

export function LoanRiskVisual({ compact = false }: { compact?: boolean }) {
  const captionId = compact ? 'loan-chapter-caption' : 'loan-caption';
  return (
    <figure className={`case-visual case-visual--models${compact ? ' case-visual--compact' : ''}`} aria-labelledby={captionId}>
      <figcaption id={captionId}>
        <span>Standardised coefficients (|β|) · 44,986 records</span>
        <strong>What drove the loan-to-income ratio.</strong>
      </figcaption>
      <div className="model-bars">
        {predictors.map((item) => (
          <div className="model-bar" key={item.name}>
            <div>
              <span>{item.name}{item.significant ? '' : ' · not significant'}</span>
              <strong>{item.beta}</strong>
            </div>
            <i
              style={{
                width: `max(${item.width}%, 4px)`,
                background: item.significant ? 'var(--signal)' : undefined,
                opacity: item.significant ? 1 : 0.26,
              }}
            />
          </div>
        ))}
      </div>
      <div className="visual-result-strip">
        <div><span>Model fit</span><strong>R² .617</strong></div>
        <div><span>Records</span><strong>44,986</strong></div>
        <div><span>Diagnostics</span><strong>Heteroscedasticity flagged</strong></div>
      </div>
    </figure>
  );
}
