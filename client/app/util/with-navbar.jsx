import React from "react";
import Navbar from "components/navbar/container";

const withNavbar = Component => props => (
    <div>
        <Navbar />
        <Component {...props} />
    </div>
);

export default withNavbar;
