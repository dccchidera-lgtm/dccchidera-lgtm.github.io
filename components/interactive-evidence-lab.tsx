'use client';

import type { CSSProperties } from 'react';
import { useState } from 'react';
import { NativeLink } from '@/components/native-link';

type View = 'models' | 'network' | 'mediation';
type Metric = 'error' | 'accuracy';
type NetworkLayer = 'input' | 'hidden' | 'output';
type MediationStep = 'association' | 'indirect' | 'limits';

const models = [
  { name: 'Decision tree', error: 10.52, accuracy: 89.48 },
  { name: 'Logistic regression', error: 6.18, accuracy: 93.82 },
  { name: 'Neural network', error: 4.42, accuracy: 95.58 },
];

const networkNotes: Record<NetworkLayer, { label: string; title: string; body: string }> = {
  input: {
    label: 'Input layer',
    title: 'Customer attributes enter the model.',
    body: 'Membership length, contract type, visit frequency and usage measures form the evidence available to the classifier.',
  },
  hidden: {
    label: 'Hidden representation',
    title: 'Weighted combinations capture nonlinear patterns.',
    body: 'Training adjusts connections to reduce classification error. The coursework confirms the method, but the saved evidence does not retain the exact node count or learned weights.',
  },
  output: {
    label: 'Output layer',
    title: 'The network produces a churn score.',
    body: 'The score supports classification of members who may need retention attention. Reported performance refers to the validation partition, not a live deployment.',
  },
};

const mediationNotes: Record<MediationStep, { label: string; value: string; title: string; body: string }> = {
  association: {
    label: 'Association',
    value: 'r = .591',
    title: 'Personalisation and trust move together.',
    body: 'The dissertation found a positive association between perceived AI-driven personalisation and customer trust across 139 complete eligible responses.',
  },
  indirect: {
    label: 'Indirect path',
    value: '.303',
    title: 'Trust carries the stronger statistical signal.',
    body: 'The estimated indirect effect was .303. Its 95% bootstrap confidence interval [.199, .422] excluded zero across 10,000 bootstrap samples.',
  },
  limits: {
    label: 'Interpretation',
    value: 'Non-causal',
    title: 'The study supports association, not causation.',
    body: 'The cross-sectional design measures relationships at one point in time. It cannot prove that personalisation caused later changes in trust or loyalty.',
  },
};

export function InteractiveEvidenceLab() {
  const [view, setView] = useState<View>('models');
  const [metric, setMetric] = useState<Metric>('error');
  const [networkLayer, setNetworkLayer] = useState<NetworkLayer>('hidden');
  const [mediationStep, setMediationStep] = useState<MediationStep>('indirect');
  const networkNote = networkNotes[networkLayer];
  const mediationNote = mediationNotes[mediationStep];

  return (
    <div className="evidence-lab" data-reveal>
      <div className="evidence-lab-tabs" role="tablist" aria-label="Choose an analytical visual">
        <button type="button" role="tab" aria-selected={view === 'models'} onClick={() => setView('models')}>
          <span>01</span> Model comparison
        </button>
        <button type="button" role="tab" aria-selected={view === 'network'} onClick={() => setView('network')}>
          <span>02</span> Neural network
        </button>
        <button type="button" role="tab" aria-selected={view === 'mediation'} onClick={() => setView('mediation')}>
          <span>03</span> Mediation model
        </button>
      </div>

      {view === 'models' && (
        <section className="evidence-lab-panel" role="tabpanel" aria-labelledby="model-visual-title">
          <div className="evidence-lab-copy">
            <p className="lab-kicker">Predictive analytics · 4,000 records</p>
            <h3 id="model-visual-title">Validation model comparison</h3>
            <p>
              Compare the same three churn classifiers by error or accuracy. The 40 / 30 / 30 split separated training,
              validation and test data; the displayed figures are validation results.
            </p>
            <div className="metric-switch" aria-label="Choose performance metric">
              <button type="button" aria-pressed={metric === 'error'} onClick={() => setMetric('error')}>Misclassification</button>
              <button type="button" aria-pressed={metric === 'accuracy'} onClick={() => setMetric('accuracy')}>Accuracy</button>
            </div>
            <p className="lab-reading">
              <strong>{metric === 'error' ? 'Lower is better.' : 'Higher is better.'}</strong>{' '}
              Accuracy is calculated as 100% minus the reported misclassification rate.
            </p>
            <NativeLink className="method-link" href="/work/predictive-analytics#evidence">Open the predictive case</NativeLink>
          </div>

          <div className="lab-chart" role="img" aria-label={`Validation ${metric === 'error' ? 'misclassification' : 'accuracy'} comparison for three churn models`}>
            <div className="lab-chart-heading">
              <span>{metric === 'error' ? 'Validation misclassification' : 'Derived validation accuracy'}</span>
              <small>Percent</small>
            </div>
            <div className="lab-bars">
              {models.map((model) => {
                const value = model[metric];
                const max = metric === 'error' ? 12 : 100;
                return (
                  <div className={`lab-bar ${model.name === 'Neural network' ? 'lab-bar--best' : ''}`} key={model.name}>
                    <div><span>{model.name}</span><strong>{value.toFixed(2)}%</strong></div>
                    <i style={{ '--bar-width': `${(value / max) * 100}%` } as CSSProperties}><b /></i>
                  </div>
                );
              })}
            </div>
            <div className="lab-axis" aria-hidden="true">
              <span>0%</span><span>{metric === 'error' ? '6%' : '50%'}</span><span>{metric === 'error' ? '12%' : '100%'}</span>
            </div>
            <div className="lab-verdict"><span>Selected model</span><strong>Neural network</strong><small>4.42% validation misclassification</small></div>
          </div>
        </section>
      )}

      {view === 'network' && (
        <section className="evidence-lab-panel" role="tabpanel" aria-labelledby="network-visual-title">
          <div className="evidence-lab-copy">
            <p className="lab-kicker">Model walkthrough · conceptual architecture</p>
            <h3 id="network-visual-title">How the classifier processes customer data</h3>
            <p>
              Select a layer to inspect its role. The diagram explains the method without inventing the network topology or learned weights.
            </p>
            <div className="layer-controls" aria-label="Inspect neural network layers">
              {(Object.keys(networkNotes) as NetworkLayer[]).map((layer) => (
                <button type="button" key={layer} aria-pressed={networkLayer === layer} onClick={() => setNetworkLayer(layer)}>
                  {networkNotes[layer].label}
                </button>
              ))}
            </div>
            <div className="lab-insight" aria-live="polite">
              <span>{networkNote.label}</span><strong>{networkNote.title}</strong><p>{networkNote.body}</p>
            </div>
            <NativeLink className="method-link" href="/work/predictive-analytics#evidence">Inspect the modelling evidence</NativeLink>
          </div>

          <div className="lab-network" role="img" aria-label="Conceptual feed-forward neural network from customer attributes through a hidden representation to a churn score">
            <button type="button" className={`lab-network-layer ${networkLayer === 'input' ? 'is-active' : ''}`} onClick={() => setNetworkLayer('input')} aria-label="Inspect input layer">
              <small>Input</small><span /><span /><span /><span /><strong>Customer attributes</strong>
            </button>
            <div className="lab-network-connections" aria-hidden="true"><i /><i /><i /><i /><i /></div>
            <button type="button" className={`lab-network-layer lab-network-layer--hidden ${networkLayer === 'hidden' ? 'is-active' : ''}`} onClick={() => setNetworkLayer('hidden')} aria-label="Inspect hidden representation">
              <small>Hidden</small><span /><span /><span /><strong>Pattern processing</strong>
            </button>
            <div className="lab-network-connections lab-network-connections--short" aria-hidden="true"><i /><i /><i /></div>
            <button type="button" className={`lab-network-layer lab-network-layer--output ${networkLayer === 'output' ? 'is-active' : ''}`} onClick={() => setNetworkLayer('output')} aria-label="Inspect output layer">
              <small>Output</small><span /><strong>Churn score</strong>
            </button>
            <p>Conceptual topology · trained weights and exact node count unavailable</p>
          </div>
        </section>
      )}

      {view === 'mediation' && (
        <section className="evidence-lab-panel" role="tabpanel" aria-labelledby="mediation-visual-title">
          <div className="evidence-lab-copy">
            <p className="lab-kicker">Customer intelligence · n = 139</p>
            <h3 id="mediation-visual-title">Trust in the personalisation–loyalty relationship</h3>
            <p>
              Explore the association, the estimated indirect path and the boundary on interpretation from the individual MSc dissertation.
            </p>
            <div className="layer-controls" aria-label="Inspect mediation evidence">
              {(Object.keys(mediationNotes) as MediationStep[]).map((step) => (
                <button type="button" key={step} aria-pressed={mediationStep === step} onClick={() => setMediationStep(step)}>
                  {mediationNotes[step].label}
                </button>
              ))}
            </div>
            <div className="lab-insight" aria-live="polite">
              <span>{mediationNote.label} · {mediationNote.value}</span><strong>{mediationNote.title}</strong><p>{mediationNote.body}</p>
            </div>
            <NativeLink className="method-link" href="/work/customer-intelligence#evidence">Open the dissertation evidence</NativeLink>
          </div>

          <div className="lab-mediation" role="img" aria-label="Mediation diagram linking AI-driven personalisation to trust and customer loyalty">
            <button type="button" className={mediationStep === 'association' ? 'is-active' : ''} onClick={() => setMediationStep('association')}>
              <small>Predictor</small><strong>AI-driven personalisation</strong>
            </button>
            <div className={`lab-mediation-path ${mediationStep === 'association' ? 'is-active' : ''}`}><span>r = .591</span><i aria-hidden="true" /></div>
            <button type="button" className={mediationStep === 'indirect' ? 'is-active' : ''} onClick={() => setMediationStep('indirect')}>
              <small>Mediator</small><strong>Customer trust</strong>
            </button>
            <div className={`lab-mediation-path ${mediationStep === 'indirect' ? 'is-active' : ''}`}><span>indirect effect .303</span><i aria-hidden="true" /></div>
            <button type="button" className={mediationStep === 'limits' ? 'is-active' : ''} onClick={() => setMediationStep('limits')}>
              <small>Outcome</small><strong>Customer loyalty</strong>
            </button>
            <dl>
              <div><dt>95% interval</dt><dd>[.199, .422]</dd></div>
              <div><dt>Bootstrap samples</dt><dd>10,000</dd></div>
              <div><dt>Study design</dt><dd>Cross-sectional</dd></div>
            </dl>
          </div>
        </section>
      )}
    </div>
  );
}
