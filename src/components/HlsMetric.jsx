import React, { useState } from 'react';
import Hls from 'hls.js';
import { AreaChart, Card, Flex, Title, BarChart } from '@tremor/react';
import './HlsMetric.css';

export function HlsMetric({ t0, hls }) {
  const [metrics, setMetrics] = useState([]);
  const [isAnalysisVisible, setIsAnalysisVisible] = useState(false);

  const handleToggleAnalysis = () => {
    setIsAnalysisVisible(!isAnalysisVisible);
  };

  hls?.off(Hls.Events.FRAG_CHANGED);
  hls?.on(Hls.Events.FRAG_CHANGED, (_, data) => {
    const metric = {
      time: Date.now() - t0,
      type: 'frag changed',
      data: data.frag,
    };
    const stats = data.frag.stats;
    metric.SN = data.frag.sn;
    metric.Level = data.frag.level;
    metric.Loaded = stats.loaded;
    metric.BWEstimate = stats.bwEstimate;
    metric.Buffering = stats.buffering.end - stats.buffering.start;
    metric.Loading = stats.loading.end - stats.loading.start;
    metric.Parsing = stats.parsing.end - stats.parsing.start;
    console.log(metric);
    setMetrics([...metrics, metric]);
  });

  return (
    <div>
      <div className="button-container">
        <button
          className={`analysis-button ${isAnalysisVisible ? 'hide' : ''}`}
          onClick={handleToggleAnalysis}
        >
          {isAnalysisVisible ? 'Hide Analysis' : 'Analyze'}
        </button>
      </div>

      {isAnalysisVisible && (
        <div className="card-container">
          <Card className="card">
            <Title className="title">Loading History</Title>
            <AreaChart
              data={metrics}
              index="time"
              categories={['Loading', 'Buffering', 'Parsing']}
              colors={['indigo', 'cyan', 'red']}
              yAxisWidth={56}
              className="chart"
            />
          </Card>

          <Card className="card">
            <Title className="title">Loaded History</Title>
            <AreaChart
              data={metrics}
              index="time"
              categories={['Loaded']}
              colors={['blue']}
              yAxisWidth={56}
              className="chart"
            />
          </Card>

          <Card className="card">
            <Title className="title">BW Estimate History</Title>
            <AreaChart
              data={metrics}
              index="time"
              categories={['BWEstimate']}
              colors={['orange']}
              yAxisWidth={56}
              className="chart"
            />
          </Card>

          <Card className="card">
            <Title className="title">SN Level History</Title>
            <BarChart
              data={metrics}
              index="time"
              categories={['SN', 'Level']}
              colors={['yellow', 'green']}
              yAxisWidth={56}
              className="chart"
            />
          </Card>
        </div>
      )}
    </div>
  );
}

export default HlsMetric;
