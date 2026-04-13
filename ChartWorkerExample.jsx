// In your React component
const [chartData, setChartData] = useState(null);
const [chartConfig, setChartConfig] = useState({
  dateRange: '30d',
  grouping: 'by_day',
  metric: 'revenue',
  chartType: 'line'   // stays here, never goes to worker
});

useEffect(() => {
  worker.postMessage({
    type: 'CALCULATE_CHART',
    payload: {
      orders: rawOrders,
      config: {
        dateRange: chartConfig.dateRange,
        grouping: chartConfig.grouping,
        metric: chartConfig.metric
        // notice: chartType NOT sent
      },
      requestId: Date.now().toString()
    }
  });

  worker.onmessage = (e) => {
    setChartData(e.data.data);
  };
}, [chartConfig.dateRange, chartConfig.grouping, chartConfig.metric]);

// chartType change doesn't re-trigger worker at all
// it just changes how the same data is rendered
return (
  <ChartComponent
    data={chartData}
    type={chartConfig.chartType}  // purely a render concern
  />
);
