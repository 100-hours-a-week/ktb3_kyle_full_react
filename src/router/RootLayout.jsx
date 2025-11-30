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
    const isLoggedIn = ["/login", "/signup"].includes(location.pathname);
    const noMinHeight = ["/login", "/signup", "/profile-update", "/password-update"].includes(location.pathname);

    return (
        <>
            <Header isLoggedIn={!isLoggedIn}/>
            <PageShell $noMinHeight={noMinHeight}>
                <Outlet/>
            </PageShell>
        </>
    );
}
