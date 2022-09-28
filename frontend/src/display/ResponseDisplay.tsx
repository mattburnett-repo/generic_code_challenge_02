
import './App.css';

const ResponseDisplay = ({ theData }: any) => {

  return (
    <div className='app-container'>
      <div className='app-title'>Risk Assessment</div>
      <div className='app-panel'>
        <h3>The domain you searched for: {theData.domain}</h3>
        <h3>The risk level for {theData.domain}: {theData.riskLevel}</h3>
        <h3>Risk level description: {theData.riskLevelDesc}</h3>
        <h3>Risk evaluation criteria:</h3>
        <h3>- Has mature email: {"" + theData.hasMatureEmail}</h3>
        <h3>- Has SPF: {"" + theData.hasSPF}</h3>
        <h3>- Has DKIM: {"" + theData.hasDKIM}</h3>
        <h3>- Has DMARC (assumed): {"" + theData.hasDMARC}</h3>
      </div>
    </div>
  );
} 

export default ResponseDisplay