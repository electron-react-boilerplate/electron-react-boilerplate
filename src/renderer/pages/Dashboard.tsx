import { PieChart, Pie, Tooltip } from "recharts";
import 'animate.css';

const Dashboard = () => {
      // Here, the data for the sample dashboard gets loaded in
      const data = [
        { name: "Geeksforgeeks", students: 400 },
        { name: "Technical scripter", students: 700 },
        { name: "Geek-i-knack", students: 200 },
        { name: "Geek-o-mania", students: 1000 },
    ];
  return (
    <div>
      {/* Here's the title part of the Dashboards page */}
      <div className='m-3 animate__animated animate__fadeInDown' id="header">
        <h1><strong>Dashboards</strong></h1>
      </div>

      {/* Here's the chart on the Dashboards page */}
      <div className="container"> 
            <PieChart width={1000} height={600}>
                <Tooltip />
                <Pie
                    data={data}
                    dataKey="students"
                    outerRadius={200}
                    innerRadius={150}
                    fill="green"
                    label={({ name, students }) =>
                        `${name}: ${students}`
                    }
                />
            </PieChart>
        </div>
    </div>
  )
}

export default Dashboard
