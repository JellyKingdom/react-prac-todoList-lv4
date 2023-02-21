import Layout from "./components/ui/Layout";
import Router from "./shared/Router";
import Header from "./components/ui/Header";

function App() {
    return (
        <>
            <Layout>
              <Header/>
                <Router />
            </Layout>
        </>
    );
}

export default App;
