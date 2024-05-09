import type { NextPage } from "next";
import Link from "next/link";
import Cards from "../cards";


const Dashboard: NextPage = () => {
    return (
        <div className="h-screen w-screen">
         <div className="h-18 w-full p-2 px-10 bg-black flex justify-between items-center">
            <h1 className="text-white text-xl font-bold">Dashboard</h1>
            <Link href="/" className="text-white bg-teal-500 px-2 rounded-sm">Home</Link>
         </div>
         <div className="p-4">
         <h1 className="text-white text-xl font-bold">Your Works</h1>
         </div>
        <div className="p-4">
        <Cards />
        </div>
        </div>
    );
};

export default Dashboard