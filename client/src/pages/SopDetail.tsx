import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function SopDetail() {
  const { id } = useParams<{ id: string }>();
  const [sop, setSop] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/sops/${id}`)
      .then(res => res.json())
      .then(setSop);
  }, [id]);

  if (!sop) return <p>Loading...</p>;

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold'>{sop.title}</h2>
      <p>Version: {sop.version}</p>
      <p>Category: {sop.category}</p>
      <a href={sop.fileUrl} target='_blank' rel='noreferrer'>View SOP Document</a>
    </div>
  );
}

export default SopDetail;
