const Notification = ({ message }) => {
  console.log(message);
  if (message === null) {
    return null;
  } else if (message.type === "error") {
    return <div className="error">{message.message}</div>;
  } else return <div className="success">{message.message}</div>;
};

export default Notification;
