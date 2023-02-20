import React from "react";
import Header from "../components/ui/Header";
import Layout from "../components/ui/Layout";
import List from "../features/todos/components/List";



const Home = () => {
    return(
        <Layout>
            <Header />
            <List />
        </Layout>
    );
};

export default Home;