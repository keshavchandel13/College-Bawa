import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");  // Adjust URL as needed

function Notifications({ userId }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on(`notification:${userId}`, (newNotification) => {
      setNotifications((prev) => [newNotification, ...prev]);
    });

    return () => socket.off(`notification:${userId}`);
  }, [userId]);

  return (
    <div>
      <h2>🔔 Notifications</h2>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index}>{notif.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
