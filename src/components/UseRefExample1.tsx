import React, { FormEvent, useRef } from "react";

const UseRefExample1 = () => {
  const inpRef = useRef<HTMLInputElement>(null);

  const paraRef = useRef<HTMLParagraphElement>(null);

  function submitHandler(e: FormEvent) {
    e.preventDefault();
    console.log(inpRef.current!.value); //
    inpRef.current!.value = "Hello";
    inpRef.current!.style.backgroundColor = "red";
    paraRef.current!.style.color = "green";
  }
  return (
    <div>
      <h3>UseRef Example</h3>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          ref={inpRef}
          className="form-control mb-3"
          required
        />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>

        <p
          onClick={() => {
            inpRef.current?.focus();
          }}
          ref={paraRef}
        >
          useRef is used to persists value between renders
        </p>
      </form>
    </div>
  );
};

export default UseRefExample1;
