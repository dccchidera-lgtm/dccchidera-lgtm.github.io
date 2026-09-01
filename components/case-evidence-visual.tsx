type CaseEvidenceVisualProps = {
  slug: string;
};

export function CaseEvidenceVisual({ slug }: CaseEvidenceVisualProps) {
  if (slug === 'customer-intelligence') {
    return (
      <figure className="case-visual case-visual--mediation" aria-labelledby="mediation-caption">
        <figcaption id="mediation-caption">
          <span>Key relationship</span>
          <strong>Trust carries the stronger signal.</strong>
        </figcaption>
        <div className="mediation-map">
          <div className="visual-node">
            <span>Perceived</span>
            <strong>Personalisation</strong>
          </div>
          <div className="visual-arrow">
            <strong>B = .575</strong>
            <span>to trust</span>
          </div>
          <div className="visual-node visual-node--signal">
            <span>Mediator</span>
            <strong>Trust</strong>
          </div>
          <div className="visual-arrow">
            <strong>B = .526</strong>
            <span>to loyalty</span>
          </div>
          <div className="visual-node">
            <span>Outcome</span>
            <strong>Loyalty</strong>
          </div>
        </div>
        <div className="visual-result-strip">
          <div><span>Indirect effect</span><strong>.303</strong></div>
          <div><span>95% bootstrap interval</span><strong>[.199, .422]</strong></div>
          <div><span>Direct coefficient</span><strong>.048 · p = .552</strong></div>
        </div>
        <p className="visual-caveat">Cross-sectional association; causal inference falls outside the study design.</p>
      </figure>
    );
  }

  if (slug === 'predictive-analytics') {
    return (
      <figure className="case-visual case-visual--models" aria-labelledby="models-caption">
        <figcaption id="models-caption">
          <span>Validation comparison</span>
          <strong>Lower misclassification is better.</strong>
        </figcaption>
        <div className="model-bars">
          <div className="model-bar model-bar--tree">
            <div><span>Decision tree</span><strong>10.52%</strong></div><i />
          </div>
          <div className="model-bar model-bar--logistic">
            <div><span>Logistic regression</span><strong>6.18%</strong></div><i />
          </div>
          <div className="model-bar model-bar--neural">
            <div><span>Neural network</span><strong>4.42%</strong></div><i />
          </div>
        </div>
        <div className="visual-result-strip visual-result-strip--two">
          <div><span>Dataset</span><strong>4,000 records</strong></div>
          <div><span>Partition</span><strong>40 / 30 / 30</strong></div>
        </div>
        <div className="network-explainer">
          <div>
            <span>Conceptual model map</span>
            <strong>How a feed-forward network transforms customer attributes into a churn score</strong>
          </div>
          <p>
            Each hidden unit combines weighted inputs, applies a nonlinear activation and
            passes the resulting representation forward. Training adjusts the connection
            weights to reduce classification error on the training partition, while the
            validation partition tests generalisation during model comparison.
          </p>
        </div>
        <div
          className="neural-network-map"
          role="img"
          aria-label="Conceptual feed-forward neural network with customer attributes entering an input layer, weighted connections feeding a hidden representation, and a churn probability output"
        >
          <div className="network-layer network-layer--input">
            <small>Input layer</small>
            <div className="network-nodes" aria-hidden="true">
              <i /><i /><i /><i />
            </div>
            <strong>Customer attributes</strong>
            <span>Membership length · contract · visits · usage</span>
          </div>
          <div className="network-links network-links--first" aria-hidden="true">
            <i /><i /><i /><i /><i />
            <span>weights</span>
          </div>
          <div className="network-layer network-layer--hidden">
            <small>Hidden representation</small>
            <div className="network-nodes" aria-hidden="true">
              <i /><i /><i /><i /><i />
            </div>
            <strong>Weighted activation</strong>
            <span>Nonlinear combinations of the input features</span>
          </div>
          <div className="network-links network-links--second" aria-hidden="true">
            <i /><i /><i /><i />
            <span>weights</span>
          </div>
          <div className="network-layer network-layer--output">
            <small>Output layer</small>
            <div className="network-nodes" aria-hidden="true"><i /></div>
            <strong>Churn score</strong>
            <span>Probability used for classification</span>
          </div>
        </div>
        <p className="network-caveat">
          Conceptual schematic based on the modelling method. The submitted evidence does
          not expose the exact SAS network topology or learned weights.
        </p>
      </figure>
    );
  }

  if (slug === 'process-redesign') {
    return (
      <figure className="case-visual case-visual--pipeline" aria-labelledby="pipeline-caption">
        <figcaption id="pipeline-caption">
          <span>Delivery path</span>
          <strong>From business process to working SQL.</strong>
        </figcaption>
        <div className="pipeline-map">
          <div><span>01</span><strong>Map movement</strong><small>DFD</small></div>
          <b aria-hidden="true">→</b>
          <div><span>02</span><strong>Model relationships</strong><small>ERD</small></div>
          <b aria-hidden="true">→</b>
          <div><span>03</span><strong>Build & query</strong><small>SQL</small></div>
        </div>
        <p className="visual-caveat">Scope: assessed four-person team prototype; production deployment falls outside the project evidence.</p>
      </figure>
    );
  }

  return (
    <figure className="case-visual case-visual--decision" aria-labelledby="decision-caption">
      <figcaption id="decision-caption">
        <span>Decision system</span>
        <strong>From audit to recommendation.</strong>
      </figcaption>
      <div className="decision-loop">
        <div><span>01</span><strong>Audit</strong><small>Quality & cleaning</small></div>
        <div><span>02</span><strong>Explore</strong><small>Interactive KPIs</small></div>
        <div className="decision-loop__focus"><span>03</span><strong>Stress-test</strong><small>60–70% margins</small></div>
        <div><span>04</span><strong>Optimise</strong><small>Location & format</small></div>
      </div>
      <p className="visual-caveat">Scope: assessed four-person team model; the project produced a recommendation rather than realised commercial impact.</p>
    </figure>
  );
}

