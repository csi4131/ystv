'use client'
import React, { useState } from 'react'
import Hls from 'hls.js'
import { AreaChart, Card, Flex, Title, BarChart  } from '@tremor/react'

export function HlsMetric({ t0, hls }) {
  // Fragment on
  const [metrics, setMetrics] = useState([])
  hls?.off(Hls.Events.FRAG_CHANGED)
  hls?.on(Hls.Events.FRAG_CHANGED, (_, data) => {
    const metric = {
      time: Date.now() - t0,
      type: 'frag changed',
      data: data.frag,
    }
    const stats = data.frag.stats
    metric.SN = data.frag.sn
    metric.Level = data.frag.level
    metric.Loaded = stats.loaded
    metric.BWEstimate = stats.bwEstimate
    metric.Buffering = stats.buffering.end - stats.buffering.start
    metric.Loading = stats.loading.end - stats.loading.start
    metric.Parsing = stats.parsing.end - stats.parsing.start
    console.log(metric)
    setMetrics([...metrics, metric])
  })

  return (
    <>
      <Card>
        <div className="md:flex justify-between">
          <div>
            <Flex
              justifyContent="start"
              className="space-x-0.5"
              alignItems="center"
            >
              <Title> Loading History </Title>
            </Flex>
          </div>
        </div>
        <AreaChart
          data={metrics}
          index="time"
          categories={['Loading', 'Buffering', 'Parsing']}
          colors={['indigo', 'cyan', 'red']}
          yAxisWidth={56}
          className="h-96 mt-8"
        />
      </Card>
      <Card>
        <div className="md:flex justify-between">
          <div>
            <Flex
              justifyContent="start"
              className="space-x-0.5"
              alignItems="center"
            >
              <Title> Loaded History </Title>
            </Flex>
          </div>
        </div>
        <AreaChart
          data={metrics}
          index="time"
          categories={['Loaded']}
          colors={['blue']}
          yAxisWidth={56}
          className="h-96 mt-8"
        />
      </Card>
      <Card>
        <div className="md:flex justify-between">
          <div>
            <Flex
              justifyContent="start"
              className="space-x-0.5"
              alignItems="center"
            >
              <Title> BW Estimate History </Title>
            </Flex>
          </div>
        </div>
        <AreaChart
          data={metrics}
          index="time"
          categories={['BWEstimate']}
          colors={['orange']}
          yAxisWidth={56}
          className="h-96 mt-8"
        />
      </Card>
      <Card>
        <div className="md:flex justify-between">
          <div>
            <Flex
              justifyContent="start"
              className="space-x-0.5"
              alignItems="center"
            >
              <Title> SN Level History </Title>
            </Flex>
          </div>
        </div>
        <BarChart
          data={metrics}
          index="time"
          categories={['SN', 'Level']}
          colors={['yellow', 'green']}
          yAxisWidth={56}
          className="h-96 mt-8"
        />
      </Card>
    </>
  )
}

export default HlsMetric
