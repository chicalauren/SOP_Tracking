import { useParams } from 'react-router-dom';

// interface RouteParams {
//   id: string;
// }

function QuizPage() {
  const { id } = useParams<{ id: string }>();

  // This would eventually fetch quiz data for SOP id
  return (
    <div className='p-4'>
      <h2 className='text-xl font-semibold'>Quiz for SOP #{id ?? '[unknown]'}</h2>
      <p>[Quiz questions will go here]</p>
    </div>
  );
}

export default QuizPage;
