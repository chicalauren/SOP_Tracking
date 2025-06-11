import { useEffect, useState } from 'react';

function Dashboard() {
  const [sops, setSops] = useState([]);

  useEffect(() => {
    fetch('/api/sops')
      .then(res => res.json())
      .then(data => setSops(data));
  }, []);

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold'>SOP Dashboard</h1>
      <ul>
        {sops.map((sop: any) => (
          <li key={sop.id}>{sop.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
