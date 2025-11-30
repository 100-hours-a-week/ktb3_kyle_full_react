import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/Commmon/Header.jsx";
import styled from "styled-components";

const PageShell = styled.div`
    padding: 104px 0 0 0;
    box-sizing: border-box;
    min-height: ${props => (props.$noMinHeight ? "auto" : "100vh")};
    //padding: 0;
    //height: 100%;
    background-color: white;
    user-select: none;
`;

export default function RootLayout() {
    const location = useLocation();
    const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

    return (
        <>
            <Header isLoggedIn={!isAuthPage}/>
            <PageShell $noMinHeight={isAuthPage}>
                <Outlet/>
            </PageShell>
        </>
    );
}
