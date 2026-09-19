import Image from 'next/image';
import { publicPath } from '@/lib/paths';

const imageStyle = { width: '100%', height: 'auto', display: 'block' } as const;

/**
 * Figures recovered from Daniel's actual submitted MSc coursework.
 * Kept separate from the site's existing conceptual visuals and reused
 * within its established case-visual presentation.
 */
export function OriginalProjectFigures({ slug }: { slug: string }) {
  if (slug === 'predictive-analytics') {
    return (
      <figure className="case-visual" aria-label="Original figures from the submitted gym churn project">
        <figcaption>
          <span>Original coursework figures · SAS Enterprise Miner</span>
          <strong>Inspect the model outputs.</strong>
        </figcaption>
        <h3>ROC curves: train, validation and test</h3>
        <p>The submitted ROC figure compares all three classifiers across separate partitions. It does not give a standalone numerical test accuracy.</p>
        <a href={publicPath('/evidence/sas-roc-train-validation-test.jpg')} target="_blank" rel="noopener noreferrer" aria-label="Open the original SAS ROC charts at full size">
          <Image src={publicPath('/evidence/sas-roc-train-validation-test.jpg')} alt="Original SAS ROC plot with three side-by-side panels labelled TRAIN, VALIDATE and TEST comparing decision tree, regression and neural network curves against a baseline." width={711} height={362} sizes="(max-width: 760px) 100vw, 900px" loading="lazy" style={imageStyle}/>
        </a>
        <p className="visual-caveat">Source: original SAS ROC screenshot recovered from the submitted gym churn presentation.</p>
        <h3>Cumulative lift on the training partition</h3>
        <p>This recovered lift chart is labelled TRAIN; it should not be presented as a validation or test result.</p>
        <a href={publicPath('/evidence/sas-cumulative-lift.jpg')} target="_blank" rel="noopener noreferrer" aria-label="Open the original SAS cumulative lift chart at full size">
          <Image src={publicPath('/evidence/sas-cumulative-lift.jpg')} alt="Original SAS cumulative lift chart labelled Data Role equals TRAIN, comparing the three churn classifiers by depth." width={710} height={363} sizes="(max-width: 760px) 100vw, 900px" loading="lazy" style={imageStyle}/>
        </a>
        <p className="visual-caveat">Source: original training-partition cumulative lift screenshot from the submitted presentation.</p>
        <h3>Decision tree structure</h3>
        <p>The decision tree visual exposes the model’s split variables, including membership length, contract length, current visits and age. This is the decision tree model, not the neural network topology.</p>
        <a href={publicPath('/evidence/sas-decision-tree.jpg')} target="_blank" rel="noopener noreferrer" aria-label="Open the original SAS decision tree at full size">
          <Image src={publicPath('/evidence/sas-decision-tree.jpg')} alt="Original SAS decision tree from the gym churn assignment with branching variables including membership length, contract length, visits and age and training and validation node statistics." width={1722} height={864} sizes="(max-width: 760px) 100vw, 900px" loading="lazy" style={imageStyle}/>
        </a>
        <p className="visual-caveat">Source: original tree screenshot from the submitted gym membership churn coursework. Open the figure for the small node labels.</p>
      </figure>
    );
  }

  if (slug === 'process-redesign') {
    return (
      <figure className="case-visual" aria-label="Original database design figure from submitted group coursework">
        <figcaption>
          <span>Original coursework figure · team project</span>
          <strong>The proposed relational design.</strong>
        </figcaption>
        <p>The group’s proposed ERD links a central Location record with Delivery, Status, Promotion, Reviews and Scan. It is a coursework design proposal, not an image of a deployed Uber Eats database.</p>
        <a href={publicPath('/evidence/sql-relational-schema.jpg')} target="_blank" rel="noopener noreferrer" aria-label="Open the original proposed relational schema at full size">
          <Image src={publicPath('/evidence/sql-relational-schema.jpg')} alt="Original proposed database ERD showing six linked tables: Location, Delivery, Status, Promotion, Reviews and Scan with primary and foreign keys." width={1012} height={862} sizes="(max-width: 760px) 100vw, 900px" loading="lazy" style={imageStyle}/>
        </a>
        <p className="visual-caveat">Source: recovered ERD from the submitted Data Management team report. SQL scripts available on request.</p>
      </figure>
    );
  }

  if (slug === 'customer-intelligence') {
    return (
      <figure className="case-visual" aria-label="Original mediation diagram from the submitted dissertation">
        <figcaption>
          <span>Original dissertation figure · individual research</span>
          <strong>Trust and the indirect association.</strong>
        </figcaption>
        <p>This figure documents the reported statistical paths, including the indirect association of .303 with its bootstrap confidence interval [.199, .422]. The cross-sectional study does not establish causal mediation.</p>
        <a href={publicPath('/evidence/dissertation-mediation.jpg')} target="_blank" rel="noopener noreferrer" aria-label="Open the original dissertation mediation figure at full size">
          <Image src={publicPath('/evidence/dissertation-mediation.jpg')} alt="Original dissertation mediation diagram linking perceived personalisation, customer trust and customer loyalty, with path coefficients, the non-significant direct association and the bootstrap confidence interval for the indirect association." width={1536} height={663} sizes="(max-width: 760px) 100vw, 900px" loading="lazy" style={imageStyle}/>
        </a>
        <p className="visual-caveat">Source: figure recovered from Daniel’s final MSc dissertation. Participant-level records are not published.</p>
      </figure>
    );
  }

  return null;
}
