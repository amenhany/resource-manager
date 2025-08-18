import { useMemo } from 'react';
import './App.css';
import { useStatistics } from './useStatistics';
import Chart from './Chart';

function App() {
   const statistics = useStatistics(10);
   const cpuUsages = useMemo(
      () => statistics.map((stat) => stat.cpuUsage),
      [statistics]
   );

   return (
      <>
         <div style={{ width: 300, height: 120 }}>
            <Chart data={cpuUsages} maxDataPoints={10} />
         </div>
      </>
   );
}

export default App;
