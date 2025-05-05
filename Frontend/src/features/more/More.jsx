import React, { lazy, Suspense } from 'react';
import "../../styles/more/more.css"

const Logout = lazy(() => import('../auth/Logout'));

export default function More() {
  return (
    <div className="more-container">
    <h2 className="more-heading">More Options</h2>
    <ul className="more-list">
      <li className="more-item">🔧 Profile Settings</li>
      <li className="more-item">🔔 Notification Settings</li>
      <li className="more-item">🔒 Privacy</li>
      <li className="more-item">❓ Help & Support</li>
      <li className="more-item logout-item">
        <Suspense fallback={<span>Logging out...</span>}>
          <Logout />
        </Suspense>
      </li>
    </ul>
  </div>
  );
}
