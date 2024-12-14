import AdminDashboard from "./ManageCommunity";

function Home() {
    return (
        <div className="home-section">
            <h1 className="heading text-xl font-bold my-4">
                Welcome to InFED Website Admin Panel!
            </h1>
            <AdminDashboard />
        </div>
    );
}

export default Home;