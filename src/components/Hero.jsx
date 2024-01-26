import { HashLink } from "react-router-hash-link";
import heroVideo from "../assets/video/hero.mp4";

function Hero() {
  return (
    <div className="w-full h-screen relative">
      <video
        autoPlay
        loop
        muted
        className=" -z-10 object-cover object-center block absolute top-0 left-0 w-full h-full max-w-full"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className=" absolute opacity-50 z-10  top-0 left-0 w-full h-full bg-black "></div>
      <div className=" mix-blend-difference  text-center top-[30%] w-full relative z-20 text-white  ">
        <h1 className=" flex align-middle justify-center text-5xl md:text-6xl lg:text-9xl font-bold mb-3 text-white">
          REXA Studio <br />
          Essential
        </h1>
        <p className="text-xl md:text-4xl text-white">
          Explore and discover amazing content.
        </p>
        <HashLink to="#shop">
          <button className="border  rounded-sm p-2 text-3xl font-bold mt-5 hover:bg-orange-600 hover:text-black transition duration-300 ease-out ">
            Shop Now
          </button>
        </HashLink>
      </div>
    </div>
  );
}

export default Hero;
