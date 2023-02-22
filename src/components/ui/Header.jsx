import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HiHome } from "react-icons/hi";

const Header = () => {
    const navigate = useNavigate();

    return (
        <StContainer>
            <HiHome 
            size={"24px"}
            cursor={"pointer"}
            onClick={() => {
                navigate("/");
            }}>홈</HiHome>
            <div>React</div>
        </StContainer>
    );
};
export default Header;

const StContainer = styled.div`
    border: 1px solid #ddd;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    margin-top: 10px;
    margin-bottom: 24px;
`;
