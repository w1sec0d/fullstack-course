import { useSelector } from "react-redux";

const Notification = () => {
  const value = useSelector(({ notification }) => notification);
  console.log(value);
  
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return value ? <div style={style}>{value}</div> : <div></div>
};

export default Notification;
