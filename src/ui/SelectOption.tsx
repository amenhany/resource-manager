import Chart from './Chart';

export default function SelectOption({
   title,
   subtitle,
   view,
   data,
   onClick,
}: {
   title: string;
   subtitle: string;
   view: View;
   data: number[];
   onClick: () => void;
}) {
   return (
      <button className="select-option" onClick={onClick}>
         <div className="select-option-title">
            <h2>{title}</h2>
            <h3>{subtitle}</h3>
         </div>
         <div className="select-option-chart">
            <Chart data={data} maxDataPoints={10} selectedView={view} />
         </div>
      </button>
   );
}
