import React, { FormEvent, useEffect, useRef, useState } from "react";

const UseRefExample2 = () => {
  const [inputValue, setInputValue] = useState("");
  const count = useRef<number>(0);

  useEffect(() => {
    count.current += 1;
  });

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.currentTarget.value);
    // console.log(inputValue);
  };

  return (
    <div>
      <h3 className="mb-3">UseRef Example</h3>
      <form>
        <input
          type="text"
          value={inputValue}
          onChange={changeHandler}
          className="form-control"
        />
        <h3>Render Count : {count.current}</h3>
      </form>
    </div>
  );
};

export default UseRefExample2;
