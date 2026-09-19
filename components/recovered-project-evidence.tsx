/**
 * Source-checked project evidence from Daniel's September 2026 MSc archive.
 * No participant-level data, university identifiers, fabricated SQL, or speculative outcomes.
 * This deliberately reuses the site's case-study visual classes.
 */
export function RecoveredProjectEvidence({ slug }: { slug: string }) {
  if (slug === 'process-redesign') {
    return (
      <aside className="case-visual" aria-label="Evidence from the submitted Data Management report">
        <figcaption>
          <span>From the submitted group report</span>
          <strong>Data quality before database design.</strong>
        </figcaption>
        <p>
          Our four-person team analysed a 1,000-record Alabama merchant dataset.
          Delivery-fee values were missing in 997 records (99.7%), while
          promotions were absent in 890 records (89.0%). These are findings about
          the coursework dataset, not claims about Uber Eats’ production systems.
        </p>
        <div className="visual-result-strip visual-result-strip--two">
          <div><span>Delivery-fee values missing</span><strong>99.7%</strong></div>
          <div><span>Promotion values missing</span><strong>89.0%</strong></div>
        </div>
        <h3>What the proposed schema addressed</h3>
        <p>
          The team proposed separating merchant identity from changing operational
          information in six related tables. The submitted assignment includes a
          proposed entity-relationship diagram and describes a SQL prototype.
          No production deployment or achieved commercial improvement is claimed.
        </p>
        <details className="case-model-disclosure">
          <summary>Seven analytical questions described in the report</summary>
          <ol className="implication-list">
            <li>Rank merchant ratings within each city.</li>
            <li>Compare delivery fees and their data coverage across cities.</li>
            <li>List promotions alongside review performance.</li>
            <li>Identify high-rated merchants with active promotions.</li>
            <li>Summarise performance by price category.</li>
            <li>Assess delivery-time and fee coverage by city.</li>
            <li>Profile open merchants using available operational fields.</li>
          </ol>
          <p className="visual-caveat">
            These are the report’s descriptions of query purposes, not recovered
            SQL statements or independently rerun results. The original .sql
            files still need to be checked before publishing code.
          </p>
        </details>
        <p className="visual-caveat">
          Source: Data Management – Group Assignment, submitted MSc coursework.
          Group work is attributed to the team, not solely to Daniel.
        </p>
      </aside>
    );
  }

  if (slug === 'predictive-analytics') {
    return (
      <aside className="case-visual" aria-label="Verified evidence from the submitted gym churn presentation">
        <figcaption>
          <span>From the original SAS presentation</span>
          <strong>Validation results, not a deployed churn system.</strong>
        </figcaption>
        <p>
          I trained and compared decision tree, logistic regression and neural
          network classifiers on 4,000 gym membership records using a
          40% training, 30% validation and 30% test split. The submitted
          presentation reports the following validation misclassification rates:
        </p>
        <div className="visual-result-strip">
          <div><span>Decision tree</span><strong>10.52%</strong></div>
          <div><span>Logistic regression</span><strong>6.18%</strong></div>
          <div><span>Neural network</span><strong>4.42%</strong></div>
        </div>
        <p>
          The neural network’s 4.42% validation error corresponds to approximately
          95.6% validation accuracy. The recovered slides also contain separate
          train, validate and test ROC plots and a lift chart; these do not establish
          a separately reported numerical test accuracy.
        </p>
        <p className="visual-caveat">
          Source: Predicting Gym Membership Churn, individual MSc presentation,
          slides 6–10. The proposed retention and cost reductions in later slides
          were forecasts, not achieved outcomes.
        </p>
      </aside>
    );
  }

  if (slug === 'customer-intelligence') {
    return (
      <aside className="case-visual" aria-label="Verified dissertation statistics and interpretation">
        <figcaption>
          <span>From the submitted dissertation</span>
          <strong>Statistical mediation is not proof of causation.</strong>
        </figcaption>
        <p>
          I analysed 139 eligible UK ecommerce survey responses in SPSS,
          using Python for supporting analysis and figures. The final
          dissertation reports the following estimates:
        </p>
        <div className="visual-result-strip">
          <div><span>Indirect association via trust</span><strong>.303</strong></div>
          <div><span>95% bootstrap interval</span><strong>[.199, .422]</strong></div>
          <div><span>Direct coefficient · p</span><strong>.048 · .552</strong></div>
        </div>
        <p>
          The estimated indirect association through trust was statistically
          supported, while the direct personalisation coefficient in the joint
          loyalty model was not statistically significant. The research was
          cross-sectional and cannot establish causal effects or realised
          commercial improvements.
        </p>
        <p className="visual-caveat">
          Source: final individual MSc dissertation, Chapter 4. Raw Qualtrics
          responses and participant-level information are not published.
        </p>
      </aside>
    );
  }

  return null;
}
