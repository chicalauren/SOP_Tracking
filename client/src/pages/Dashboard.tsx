import { useEffect, useState } from 'react';

function Dashboard() {
  const [sops, setSops] = useState([]);

  useEffect(() => {
    fetch('/api/sops')
      .then(res => res.json())
      .then(data => setSops(data));
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      <section
        className="py-5 mb-5"
        style={{
          background: 'linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)',
          color: 'white',
          borderRadius: '0 0 2rem 2rem',
          boxShadow: '0 4px 24px rgba(30,60,114,0.12)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container text-center position-relative">
          <h1 className="display-3 fw-bold mb-2" style={{ letterSpacing: 2 }}>
            <span style={{ color: '#ffd700' }}>SOP</span> Tracker
          </h1>
          <p className="lead mb-4" style={{ fontSize: '1.3rem' }}>
            Empower your team to <span style={{ color: '#ffd700' }}>learn</span>, <span style={{ color: '#ffd700' }}>track</span>, and <span style={{ color: '#ffd700' }}>master</span> your Standard Operating Procedures.
          </p>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '-60px',
              width: '180px',
              height: '180px',
              background: 'rgba(255,215,0,0.08)',
              borderRadius: '50%',
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-60px',
              right: '-60px',
              width: '180px',
              height: '180px',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '50%',
              zIndex: 0,
            }}
          />
        </div>
      </section>
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