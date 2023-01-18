import { Link, useParams } from "react-router-dom";

const STORES = [
  {
    id: "s1",
    title: "store 1",
    id: "s2",
    title: "store 2",
    id: "s3",
    title: "store 3",
  },
];

const StoreDetails = () => {
  const params = useParams();

  return (
    <>
      <h1>Store Page</h1>
      <ul>
        {STORES.map((store) => (
          <li key={store.id}>
            {" "}
            <Link to={`/store-details/${store.id}`}>{store.title}</Link>{" "}
          </li>
        ))}
      </ul>
    </>
  );
};

export default StoreDetails;
