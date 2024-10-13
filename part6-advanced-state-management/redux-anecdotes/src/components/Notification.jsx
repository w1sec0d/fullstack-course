import { useSelector } from "react-redux";

const Notification = () => {
  const value = useSelector(({ notification }) => notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{value}</div>;
};

export default Notification;
