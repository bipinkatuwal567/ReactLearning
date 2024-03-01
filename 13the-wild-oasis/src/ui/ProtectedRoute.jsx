import React, { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey-50);
`;

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 3. If there is no Authenticated user, redirect at login
  useEffect(function(){
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  // 2. While loading, show the spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there is Authenticated user, render the page
  if(isAuthenticated) return children;
}
