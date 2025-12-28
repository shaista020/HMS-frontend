import React from "react";
import UserSidebar from "./UserSidebar";
import UserNavbar from "./UserNavbar";

const UserLayout = ({ children }) => {
  return (
    <div className="container-fluid p-0">
      <UserNavbar />

      <div className="d-flex">
        <UserSidebar />

        <div className="flex-grow-1 bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
