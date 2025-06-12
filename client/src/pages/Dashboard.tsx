import {useQuery, gql} from '@apollo/client';
import Navbar from '../components/Navbar';

const GET_SOPS = gql`
  query GetSops {
    sops {
      id
      title
      version
    }
  }
`;

function Dashboard() {
  const role = (localStorage.getItem('role') as 'User' | 'Reporter' | 'Auditor' | 'Administrator') || 'User';

 const { data } = useQuery(GET_SOPS);

  const sops = data?.sops || [];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      <Navbar role={role} />
      <div className="container">
        <h2 className="mb-4 text-primary fw-bold" style={{ letterSpacing: 1 }}>
          <span role="img" aria-label="book">📚</span> Available SOPs
        </h2>
        <div className="row g-4">
          {sops.length === 0 ? (
            <div className="col-12 text-center text-muted">No SOPs found.</div>
          ) : (
            sops.map((sop: any) => (
              <div className="col-md-6 col-lg-4" key={sop.id}>
                <div
                  className="card h-100 border-0 shadow"
                  style={{
                    background: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
                    borderRadius: '1.2rem',
                  }}
                >
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-2" style={{ color: '#1e3c72' }}>
                      <span role="img" aria-label="document">📄</span> {sop.title}
                    </h5>
                    <p className="card-text mb-1">
                      <span className="badge bg-info text-dark me-2">Version: {sop.version || 'N/A'}</span>
                    </p>
                    <div className="mt-auto">
                      <a
                        href={`/sop/${sop.id}`}
                        className="btn btn-primary btn-sm w-100"
                        style={{ borderRadius: '0.8rem', fontWeight: 600 }}
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;