import Layout from "./components/ui/Layout";
import Router from "./shared/Router";
import Header from "./components/ui/Header";
import { QueryClientProvider } from "react-query";
import { QueryClient } from "react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Layout>
                    <Header />
                    <Router />
                </Layout>
            </QueryClientProvider>
        </>
    );
}

export default App;
