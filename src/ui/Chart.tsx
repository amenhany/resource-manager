import { useMemo, type CSSProperties } from 'react';
import { BaseChart } from './BaseCharts';

export type ChartProps = {
   data: number[];
   maxDataPoints: number;
   selectedView: View;
};

export const COLOR_MAP: Record<View, Pick<CSSProperties, 'stroke' | 'fill'>> = {
   CPU: {
      stroke: '#5dd4ee',
      fill: '#0a4d5c',
   },
   RAM: {
      stroke: '#e99311',
      fill: '#5f3c07',
   },
   STORAGE: {
      stroke: '#1acf4d',
      fill: '#0b5b22',
   },
};

export default function Chart(props: ChartProps) {
   const color = useMemo(() => COLOR_MAP[props.selectedView], [props.selectedView]);
   const data = [
      ...props.data.map((stat) => ({ value: stat * 100 })),
      ...Array.from({ length: props.maxDataPoints - props.data.length }, () => ({
         value: undefined,
      })),
   ];
   return (
      <BaseChart
         data={data}
         stroke={color.stroke || '#5DD4EE'}
         fill={color.fill || '#0A4D5C'}
      />
   );
}
