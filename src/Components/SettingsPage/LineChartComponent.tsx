// /* eslint-disable react/function-component-definition */
// import React from 'react';
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from 'recharts';

// interface LineChartProps {
//   data: { month: string; checkouts: number; failures: number }[];
// }

// const LineChartComponent: React.FC<LineChartProps> = ({ data }) => {
//   return (
//     <div className="chart-container" style={{ width: '100%' }}>
//       {/* Responsive container */}
//       <AreaChart width={770} height={250} data={data}>
//         {/* Default width and height */}
//         <CartesianGrid vertical={false} />
//         <XAxis dataKey="month" />
//         <YAxis />
//         <Tooltip />
//         <Legend />

//         <Area
//           type="linear"
//           dataKey="failures"
//           name="Failures"
//           stroke="#3d1e24"
//           fill="#3d1e24"
//         />
//         <Area
//           type="linear"
//           dataKey="checkouts"
//           name="Checkouts"
//           stroke="#1d4230"
//           fill="#1d4230"
//         />
//       </AreaChart>
//     </div>
//   );
// };

// export default LineChartComponent;
/* eslint-disable react/function-component-definition */
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer, // Import ResponsiveContainer component
} from 'recharts';

interface LineChartProps {
  data: { month: string; checkouts: number; failures: number }[];
}

const LineChartComponent: React.FC<LineChartProps> = ({ data }) => {
  return (
    <div style={{ width: '97%', maxWidth: '770px' }}>
      {/* Responsive container */}
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data}>
          {/* Default width and height */}
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Area
            type="linear"
            dataKey="failures"
            name="Failures"
            stroke="#3d1e24"
            fill="#3d1e24"
          />
          <Area
            type="linear"
            dataKey="checkouts"
            name="Checkouts"
            stroke="#1d4230"
            fill="#1d4230"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
