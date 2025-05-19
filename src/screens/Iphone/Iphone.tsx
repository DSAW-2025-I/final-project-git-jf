import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const Iphone = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row justify-center items-center w-full p-4">
      <div className="w-full max-w-[393px] md:w-[393px]">
        <div className="relative h-[852px] bg-[url(/image-2.png)] bg-cover bg-center rounded-lg shadow-xl">
          <header className="absolute w-full top-[68px] text-center px-4">
            <h1 className="font-sans font-normal text-[#f6eaea] text-4xl md:text-5xl tracking-[0] leading-normal">
              FastFood Sabana
            </h1>
          </header>

          <div className="absolute w-full px-8 bottom-32">
            <Card className="bg-[#d61414] rounded-[39px] border-none shadow-lg transform hover:scale-105 transition-transform">
              <CardContent className="p-0">
                <Button
                  variant="ghost"
                  className="w-full h-16 font-sans font-normal text-[#fff3f3] text-xl md:text-2xl text-center tracking-[0] leading-normal hover:bg-transparent"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </CardContent>
            </Card>
          </div>

          <footer className="absolute w-full bottom-16 text-center px-4">
            <p className="font-sans font-normal text-base tracking-[0] leading-normal">
              <span className="text-[#f8f8f8]">
                Don&apos;t have an account?
              </span>
              <span className="text-[#fff3f3]">&nbsp;</span>
              <Button
                variant="link"
                className="p-0 h-auto font-sans text-[#e01417] underline text-base"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};