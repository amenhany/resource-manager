import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { useStaticData, useStatistics } from './Hooks';
import Chart from './Chart';
import WindowControls from './WindowControls';
import SelectOption from './SelectOption';

function App() {
   const statistics = useStatistics(10);
   const staticData = useStaticData();
   const [activeView, setActiveView] = useState<View>('CPU');
   const cpuUsages = useMemo(() => statistics.map((stat) => stat.cpuUsage), [statistics]);
   const ramUsages = useMemo(() => statistics.map((stat) => stat.ramUsage), [statistics]);
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
         <WindowControls />
         <h1>Resource Manager</h1>
         <main>
            <div className="main-options">
               <SelectOption
                  title="CPU"
                  view="CPU"
                  subtitle={staticData?.cpuModel ?? ''}
                  data={cpuUsages}
                  onClick={() => setActiveView('CPU')}
               />
               <SelectOption
                  title="RAM"
                  view="RAM"
                  subtitle={staticData?.totalMemoryGB + ' GB' || ''}
                  data={ramUsages}
                  onClick={() => setActiveView('RAM')}
               />
               <SelectOption
                  title="STORAGE"
                  view="STORAGE"
                  subtitle={staticData?.totalStorage + ' GB' || ''}
                  data={storageUsages}
                  onClick={() => setActiveView('STORAGE')}
               />
            </div>
            <div className="main-grid">
               <Chart selectedView={activeView} data={activeUsages} maxDataPoints={10} />
            </div>
         </main>
      </>
   );
}

export default App;
