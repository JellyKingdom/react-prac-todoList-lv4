import Layout from "./components/ui/Layout";
import Router from "./shared/Router";
import Header from "./components/ui/Header";
import { QueryClientProvider } from "react-query";
import { QueryClient } from "react-query";
import GlobalStyle from "./shared/GlobalStyle";

const queryClient = new QueryClient();

function App() {
    return (
        <>
        
            <QueryClientProvider client={queryClient}>
                <GlobalStyle/>
               
                    <Router />
                
             
                
            </QueryClientProvider>
        </>
    );
}

export default App;
