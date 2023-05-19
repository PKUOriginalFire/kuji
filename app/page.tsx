"use client";

import Image from "next/image";
import qYanYuan from "./QYanYuan.png";
import qYanHuo from "./QYanHuo.png";
import { useCallback, useState } from "react";

const COUNT = 10;

export default function Home() {
  const [maxNumber, setMaxNumber] = useState<number>(200);
  const [topCount, setTopCount] = useState<number>(COUNT);
  const [running, setRunning] = useState<NodeJS.Timer | null>(null);
  const [numbers, setNumbers] = useState<number[]>(new Array(COUNT).fill(-1));
  const [fixed, setFixed] = useState<boolean[]>(new Array(COUNT).fill(false));

  const start = useCallback(() => {
    const interval = setInterval(() => {
      setNumbers((numbers) =>
        numbers.map((number, index) => {
          if (index < topCount)
            return fixed[index]
              ? number
              : Math.floor(Math.random() * maxNumber);
          else return -1;
        })
      );
    }, 50);
    setRunning(interval);
  }, [fixed, maxNumber, topCount]);

  const stop = useCallback(() => {
    if (running) {
      clearInterval(running);
      setRunning(null);
    }
  }, [running]);

  return (
    <main className="flex min-h-screen items-center justify-between px-20">
      <div className={`basis-1/6 flex flex-col items-center ${running === null ? "" : "animate-wiggle"}`}>
        <Image src={qYanYuan} alt="燕元"></Image>
        <div className="bg-gray-500/30 rounded-full h-6 w-5/6 relative blur-lg -translate-y-3 -translate-x-3"></div>
      </div>
      <div className="basis-2/3 flex flex-col mx-10 p-8 gap-8 rounded-lg shadow-lg backdrop-blur-sm bg-white/30">
        <div className="flex flex-col gap-4 items-center justify-center text-xl">
          <div className="flex">
            <div className="py-1">总人数：</div>
            <input
              type="number"
              value={maxNumber}
              className="px-3 py-1 rounded shadow-lg outline-stone-400 outline-offset-1"
              onChange={(e) => setMaxNumber(+e.target.value)}
            ></input>
          </div>
          <div className="flex">
            <div className="py-1">抽奖数：</div>
            <input
              type="number"
              value={topCount}
              className="px-3 py-1 rounded shadow-lg outline-stone-400 outline-offset-1"
              onChange={(e) => setTopCount(+e.target.value)}
            ></input>
          </div>
          <div className="flex gap-8 mt-2">
            <button
              className="px-4 py-2 rounded bg-rose-500 text-white shadow-lg shadow-rose-500/50 transition hover:-translate-y-1 hover:scale-110"
              onClick={() => {
                running === null ? start() : stop();
              }}
            >
              {running === null ? "开始" : "停止"}
            </button>
            <button
              className="px-4 py-2 rounded bg-stone-500 text-white shadow-lg shadow-stone-500/50 transition hover:-translate-y-1 hover:scale-110"
              onClick={() => {
                setNumbers(new Array(COUNT).fill(-1));
                setFixed(new Array(COUNT).fill(false));
              }}
            >
              重置
            </button>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-4 text-xl">
          {numbers.map((number, index) => (
            <div
              key={index}
              className={`col-span-1 text-center rounded py-2 shadow-lg transition hover:bg-yellow-50 ${
                fixed[index]
                  ? "shadow-yellow-500/50 bg-yellow-50 text-red-600"
                  : "shadow-gray-400/50 bg-white text-black"
              }`}
              onClick={() =>
                setFixed((fixed) => fixed.map((f, i) => (i === index ? !f : f)))
              }
            >
              {number > -1 ? number : "-"}
            </div>
          ))}
        </div>
      </div>
      <div className={`basis-1/6 flex flex-col items-center ${running === null ? "" : "animate-wiggle"}`}>
        <Image src={qYanHuo} alt="燕火"></Image>
        <div className="bg-gray-600/30 rounded-full h-6 w-5/6 relative blur-lg -translate-y-3 translate-x-6"></div>
      </div>
    </main>
  );
}
