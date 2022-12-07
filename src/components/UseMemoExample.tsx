import React, { useEffect, useMemo, useRef, useState } from "react";

function useMemoExample() {
  const [number, setNumber] = useState<number>(1);
  const [inc, setInc] = useState(0);
  const renders = useRef(1);

  const sqrt = useMemo(() => getSqrt(number), [number]);

  useEffect(() => {
    renders.current = renders.current + 1;
  });

  function onClick() {
    setInc((prevState: number) => {
      console.log(prevState + 1);
      return prevState + 1;
    });
  }

  return (
    <div>
      <h3>UseMemo Example</h3>
      <div className="">
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.valueAsNumber)}
          className="form-control w-25"
        />
      </div>

      <h3>
        The Square root of {number} is {sqrt}
      </h3>

      <button type="button" onClick={onClick} className="btn btn-primary">
        Re Render
      </button>
      <h4>Renders: {renders.current}</h4>
    </div>
  );
}

function getSqrt(num: number) {
  for (let i = 0; i < 10000; i++) {
    console.log(i);
  }
  console.log("Expensive Function Called");
  return Math.sqrt(num);
}

export default useMemoExample;
