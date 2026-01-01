import React from "react";
import UserLayout from "./UserLayout";

const UserDashboard = () => {
  return (
    <UserLayout>
      <div className="p-4">
        <h4 className="mb-4">User Dashboard</h4>

        <div className="row g-4 mb-4">
          {[
            { title: "My Bookings", value: 3 },
            { title: "Active Booking", value: 1 },
            { title: "Completed Stays", value: 2 },
            { title: "Total Paid ($)", value: 450 },
          ].map((item, i) => (
            <div className="col-md-3" key={i}>
              <div
                className="p-3 rounded text-white"
                style={{ backgroundColor: "#4f5b4a" }}
              >
                <small>{item.title}</small>
                <h4 className="mt-2">{item.value}</h4>
              </div>
            </div>
          ))}
        </div>

      </div>
    </UserLayout>
  );
};

export default UserDashboard;
