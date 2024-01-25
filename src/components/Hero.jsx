import heroVideo from "../assets/video/vid2.mp4";

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
      <div className=" mix-blend-difference text-center top-1/2 w-full relative z-20 text-white  ">
        <h1 className=" text-5xl md:text-6xl lg:text-9xl font-bold mb-3 text-white">
          REXA Studio - Essential
        </h1>
        <p className="text-xl md:text-4xl text-white">
          Explore and discover amazing content.
        </p>
        <button className="border p-2 mt-5 hover:bg-white hover:text-black transition duration-300 ease-out ">
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default Hero;
