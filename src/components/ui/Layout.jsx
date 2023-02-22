import React from "react";
import styled from "styled-components";

const Layout = ({ children }) => {
    return <StLayout>{children}</StLayout>;
};

export default Layout;

const StLayout = styled.div`
    max-width:800px;
    min-width: 300px;
    margin: 0 auto;
`;
