import { FcGoogle } from "react-icons/fc";
import useMediaQuery from "../../hooks/useMediaQuery";

function GoogleAuth() {
  const criticalWidth = useMediaQuery("(max-width: 330px)");

  return (
    <div className="mt-8">
      <div className="DIVIDER flex justify-center items-center gap-4 opacity-30 my-2">
        <div className="h-[1px] w-10 bg-black"></div>
        <p className="uppercase font-basic text-sm">or</p>
        <div className="h-[1px] w-10 bg-black"></div>
      </div>

      <button className="w-full py-2 px-4 border-[1px] border-black border-opacity-20 rounded-md flex justify-center items-center gap-10 hover:bg-gray-200 transition-colors duration-300 ease-in">
        <FcGoogle />
        <span className="font-basic">
          {criticalWidth ? "Google" : "Continue with Google"}
        </span>
      </button>
    </div>
  );
}

export default GoogleAuth;
