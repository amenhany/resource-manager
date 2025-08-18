import { BaseChart } from './BaseCharts';

export type ChartProps = {
   data: number[];
   maxDataPoints: number;
};

export default function Chart(props: ChartProps) {
   const data = [
      ...props.data.map((stat) => ({ value: stat * 100 })),
      ...Array.from(
         { length: props.maxDataPoints - props.data.length },
         () => ({
            value: undefined,
         })
      ),
   ];
   return <BaseChart data={data} stroke="#5DD4EE" fill="#0A4D5C" />;
}
