import { useEffect, useState } from "react";
import io from "socket.io-client";
// Delete this file if not used at end
const socket = io(`${import.meta.env.VITE_APP_BACKEND_URL}`);  // Keshav ji kripya ye adjust kar lena

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
