import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { useStatistics } from './useStatistics';
import Chart from './Chart';

function App() {
   const statistics = useStatistics(10);
   const [activeView, setActiveView] = useState<View>('CPU');
   const cpuUsages = useMemo(
      () => statistics.map((stat) => stat.cpuUsage),
      [statistics]
   );
   const ramUsages = useMemo(
      () => statistics.map((stat) => stat.ramUsage),
      [statistics]
   );
   const storageUsages = useMemo(
      () => statistics.map((stat) => stat.storageUsage),
      [statistics]
   );

   const activeUsages = useMemo(() => {
      switch (activeView) {
         case 'CPU':
            return cpuUsages;
         case 'RAM':
            return ramUsages;
         case 'STORAGE':
            return storageUsages;
      }
   }, [activeView, cpuUsages, ramUsages, storageUsages]);

   useEffect(() => {
      return window.electron.subscribeChangeView((view) => setActiveView(view));
   }, []);

   return (
      <>
         <div style={{ width: 300, height: 120 }}>
            <Chart data={activeUsages} maxDataPoints={10} />
         </div>
      </>
   );
}

export default App;
