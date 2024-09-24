import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="bg-gray-900 text-white w-64 h-full fixed top-14 left-0 p-4 ">
        <ul>
          <li>
            <Link to="/credit-cards">Credit Cards</Link>
          </li>
          <li>
            <Link to="/online-bankings">Online Bankings</Link>
          </li>
          <li>
            <Link to="/accounts">Accounts</Link>
          </li>
          {/* Add more sidebar links */}
        </ul>
      </aside>
    );
};

export default Sidebar;