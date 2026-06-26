import { Redirect, useParams } from "react-router-dom";

const ChildCategory = () => {
  const { id } = useParams();

  return <Redirect to={`/sub-categories?parent=${id}`} />;
};

export default ChildCategory;
