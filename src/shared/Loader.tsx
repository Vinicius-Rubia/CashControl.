import { selectLoader } from "@/redux/loaderSlice";
import { Loader2 } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

export const Loader: React.FC = () => {
  const loader = useSelector(selectLoader);

  return (
    loader.isActive && (
      <div className="inline-block leading-none fixed inset-0 m-auto w-full h-full z-[99999999999999]">
        <div className="bg-primary-foreground/90 fixed top-0 left-0 w-full h-full"></div>
        <div className="flex items-center justify-center w-full h-full">
          <div className="grid place-items-center z-50">
            <Loader2 className="animate-spin w-[70px] h-[70px]" />
            {loader.message && (
              <p className="font-semibold flex items-center animate-pulse">
                {loader.message}
                <span className="loading-text">...</span>
              </p>
            )}
          </div>
        </div>
      </div>
    )
  );
};
