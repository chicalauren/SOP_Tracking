import { useQuery } from "@apollo/client";
import { GET_SOPS } from "../utils/queries";
import SOP from "./SOP";

export const SOPList = () => {
  const { loading, error, data } = useQuery<{ getAllSOPs: SOP[] }>(GET_SOPS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>All SOPs</h1>
      <ul>
        {data?.getAllSOPs.map((sop) => (
          <li key={sop._id}>
            <SOP sop={sop} />
          </li>
        ))}
      </ul>
    </div>
  );
};
