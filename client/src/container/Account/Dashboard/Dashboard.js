import { Chart, BarElement, BarController, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
Chart.register(BarElement, BarController, CategoryScale, LinearScale, Tooltip, Legend);

function Dashboard() {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <>
      <h3>Hello Nvv</h3>
      <hr />
      <div>
        <Bar data={data}/>
      </div>
    </>
  );
}

export default Dashboard;