import { useEffect, useState } from 'react';
import { Entertainer } from '../types/Entertainer';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
import { fetchEntertainers } from '../api/FinalAPI';
import '../styles/EntertainerList.css';

const EntertainerList: React.FC = () => {
  const [entertainers, setEntertainers] = useState<Entertainer[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetchEntertainers(pageSize, pageNum);
        setEntertainers(res.entertainers);
        setTotalPages(Math.ceil(res.totalCount / pageSize));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [pageSize, pageNum]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <>
      {entertainers.map((e) => (
        <div key={e.entertainerID} className="card entertainer-card mb-3">
          <h3 className="card-title">{e.entStageName}</h3>

          <div className="card-body">
            {/* ─── booking stats ─── */}
            <div className="entertainer-stats mb-2">
              {e.timesBooked ?? 0} bookings
              {e.timesBooked ? ` • last on ${e.lastBooked?.slice(0, 10)}` : ''}
            </div>

            <ul className="list-unstyled mb-3">
              <li>
                <strong>Phone:</strong> {e.entPhoneNumber}
              </li>
              <li>
                <strong>Address:</strong>{' '}
                {`${e.entStreetAddress}, ${e.entCity}, ${e.entState} ${e.entZipCode}`}
              </li>
              <li>
                <strong>Email:</strong> {e.entEMailAddress}
              </li>
            </ul>

            <button
              className="btn btn-success"
              onClick={() => navigate(`/entertainer/${e.entertainerID}`)}
            >
              View Details
            </button>
          </div>
        </div>
      ))}

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(n) => {
          setPageSize(n);
          setPageNum(1);
        }}
      />
    </>
  );
};

export default EntertainerList;
