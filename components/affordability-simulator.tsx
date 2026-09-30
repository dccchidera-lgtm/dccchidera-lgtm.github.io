'use client';

import { useId, useState } from 'react';

/**
 * Unstandardised coefficients (B) from the team's SPSS regression of loan_percent_income
 * (public/evidence/spss-loan-coefficients.jpg). SPSS printed B to three decimals, so
 * interest rate, employment experience and gender (shown as .000) are held at zero here.
 */
const B = {
  constant: 0.13,
  income: -6.725e-7,
  loan: 1.06e-5,
  age: -0.001,
  creditHistory: 0.001,
  creditScore: -5.686e-6,
  medical: 0.004,
  rent: -0.007,
  mortgage: -0.03,
  master: -0.002,
};

type Housing = 'rent' | 'mortgage' | 'own';

const sliders = [
  { key: 'income', label: 'Annual income', min: 10000, max: 200000, step: 1000 },
  { key: 'loan', label: 'Loan amount', min: 500, max: 35000, step: 500 },
  { key: 'creditScore', label: 'Credit score', min: 390, max: 850, step: 5 },
  { key: 'age', label: 'Age', min: 20, max: 70, step: 1 },
  { key: 'creditHistory', label: 'Credit history (years)', min: 2, max: 30, step: 1 },
] as const;

type SliderKey = (typeof sliders)[number]['key'];

/** How far each input can move the estimate across the range offered here, in percentage points. */
const swings = [
  { label: 'Loan amount', value: B.loan * (35000 - 500) },
  { label: 'Income', value: B.income * (200000 - 10000) },
  { label: 'Age', value: B.age * (70 - 20) },
  { label: 'Mortgage holder', value: B.mortgage },
  { label: 'Credit history', value: B.creditHistory * (30 - 2) },
  { label: 'Renter', value: B.rent },
  { label: 'Medical loan', value: B.medical },
  { label: 'Credit score', value: B.creditScore * (850 - 390) },
].sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

const maxSwing = Math.max(...swings.map((item) => Math.abs(item.value)));
const fmt = new Intl.NumberFormat('en-GB');
const pts = (value: number) => `${value >= 0 ? '+' : '−'}${Math.abs(value * 100).toFixed(1)} pts`;

export function AffordabilitySimulator() {
  const id = useId();
  const [values, setValues] = useState<Record<SliderKey, number>>({
    income: 60000,
    loan: 10000,
    creditScore: 650,
    age: 30,
    creditHistory: 6,
  });
  const [housing, setHousing] = useState<Housing>('rent');
  const [medical, setMedical] = useState(false);
  const [master, setMaster] = useState(false);

  const estimate =
    B.constant +
    B.income * values.income +
    B.loan * values.loan +
    B.age * values.age +
    B.creditHistory * values.creditHistory +
    B.creditScore * values.creditScore +
    (housing === 'rent' ? B.rent : housing === 'mortgage' ? B.mortgage : 0) +
    (medical ? B.medical : 0) +
    (master ? B.master : 0);
  const actual = values.loan / values.income;
  const gap = actual - estimate;

  return (
    <aside className="case-visual afford-sim" aria-labelledby={`${id}-title`}>
      <p className="overline">Interactive · built from the reported coefficients</p>
      <h3 id={`${id}-title`}>Try the model: what moves the loan-to-income estimate?</h3>
      <p>
        Change a borrower and watch the regression’s estimate respond. The strongest test of the
        finding is the credit score slider: across its full range it barely moves the result.
      </p>

      <div className="afford-sim__grid">
        <div className="afford-sim__inputs">
          {sliders.map((slider) => (
            <label key={slider.key} className="afford-sim__slider">
              <span>
                {slider.label}
                <strong>{fmt.format(values[slider.key])}</strong>
              </span>
              <input
                type="range"
                min={slider.min}
                max={slider.max}
                step={slider.step}
                value={values[slider.key]}
                onChange={(event) =>
                  setValues((current) => ({ ...current, [slider.key]: Number(event.target.value) }))
                }
              />
            </label>
          ))}

          <div className="afford-sim__choices" role="group" aria-label="Home ownership">
            {(['rent', 'mortgage', 'own'] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={housing === option}
                onClick={() => setHousing(option)}
              >
                {option === 'rent' ? 'Renting' : option === 'mortgage' ? 'Mortgage' : 'Own / other'}
              </button>
            ))}
          </div>
          <div className="afford-sim__choices" role="group" aria-label="Other borrower details">
            <button type="button" aria-pressed={medical} onClick={() => setMedical(!medical)}>
              Medical loan
            </button>
            <button type="button" aria-pressed={master} onClick={() => setMaster(!master)}>
              Master’s degree
            </button>
          </div>
        </div>

        <div className="afford-sim__output" aria-live="polite">
          <div>
            <span>Model estimate</span>
            <strong>{(estimate * 100).toFixed(1)}%</strong>
            <small>of annual income</small>
          </div>
          <div>
            <span>Actual ratio (loan ÷ income)</span>
            <strong>{(actual * 100).toFixed(1)}%</strong>
            <small>
              {Math.abs(gap) < 0.03
                ? 'The linear model is close for this borrower.'
                : gap > 0
                  ? `The model underestimates by ${Math.abs(gap * 100).toFixed(1)} pts, the pattern behind the large residuals.`
                  : `The model overestimates by ${Math.abs(gap * 100).toFixed(1)} pts.`}
            </small>
          </div>
        </div>
      </div>

      <div className="afford-sim__swings">
        <p className="afford-sim__eyebrow">Largest possible effect of each input across the ranges above · blue lowers the ratio</p>
        {swings.map((item) => (
          <div key={item.label} className="afford-sim__swing">
            <span>{item.label}</span>
            <span className="afford-sim__track" aria-hidden="true">
              <span
                className={item.value < 0 ? 'is-negative' : undefined}
                style={{ width: `${Math.max(0.6, (Math.abs(item.value) / maxSwing) * 100)}%` }}
              />
            </span>
            <strong>{pts(item.value)}</strong>
          </div>
        ))}
      </div>

      <p className="afford-sim__note">
        Illustrative only, not a lending tool. It applies the team’s published SPSS coefficients to
        inputs you choose, with amounts in the public dataset’s units. SPSS rounded some
        coefficients to .000, so interest rate, employment experience and gender are held at zero.
        The ratio is loan ÷ income by definition, so a straight-line model misses it at low incomes
        and large loans. That is why the next iteration adds robust standard errors and a
        non-linear comparison model.
      </p>
    </aside>
  );
}
