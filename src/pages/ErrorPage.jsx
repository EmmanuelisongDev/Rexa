import { Link } from "react-router-dom";
export default function ErrorPage() {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center  text-black gap-5 ">
        <h1 className="text-2xl">Oops Something Went Wrong</h1>
        <Link to="/">
          <button className="bg-black text-white font-bold py-2 px-4 text-xs md:text-base rounded-sm hover:bg-white hover:text-black border border-black w-full">
            Go Back to Home Page
          </button>
        </Link>
      </div>
    </>
  );
}
