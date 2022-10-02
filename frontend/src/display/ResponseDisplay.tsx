import "../index.css";

const ResponseDisplay = ({ theData }: any) => {
  return (
    <div className="app-container">
      <div className="app-title">Assessment</div>
      <div className="app-panel">
        <h3>The term you searched for: {theData.domain}</h3>
        <h3>
          The assessment for {theData.domain}: {theData.riskLevel}
        </h3>
        <h3>Assessment level description: {theData.riskLevelDesc}</h3>
        <h3>Assessment evaluation criteria:</h3>
        <h3>- Has mature email: {"" + theData.hasMatureEmail}</h3>
        <h3>- Has SPF: {"" + theData.hasSPF}</h3>
        <h3>- Has DKIM: {"" + theData.hasDKIM}</h3>
        <h3>- Has DMARC (assumed): {"" + theData.hasDMARC}</h3>
      </div>
    </div>
  );
};

export default ResponseDisplay;
