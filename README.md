# More Advance React Hooks

- [useRef](#useref-hook)
  - [Accessing DOM Element](#accessing-dom-element)
  - [Does not cause Re Render](#does-not-cause-re-render)
- [useMemo](#usememo-hook)
  - [Performance without useMemo](#performance-without-using-usememo)
  - [Performance with useMemo](#performance-using-usememo-hook)
- [useCallback](#usecallback)

---

Reference: <a href="https://react-typescript-cheatsheet.netlify.app/">React TypeScript Cheatsheet</a>

## useRef Hook

- It allows you to persist value between renders.
- It can be used to store a mutable value that does not cause a re-render when updated.
- It can be used to access a DOM element directly.

### Accessing DOM Element

- In general, we want to let React handle all DOM manipulation.
- But there are some instances where `useRef` can be used without causing issues.
- In React, we can add a `ref` attribute to an element to access it directly in the DOM.

```tsx
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
```

### Does not cause Re Render

If we tried to count how many times our application renders using the `useState` Hook, we would be caught in an infinite loop since this Hook itself causes a re-render.

To avoid this we can use `useRef ` Hook.

```tsx
import { FormEvent, useEffect, useRef, useState } from "react";

const UseRefExample = () => {
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

export default UseRefExample;
```

`useRef()` only returns one item. It returns an Object called current.

---

## useMemo Hook

- It returns a memomized value
- Think of memomization as caching a value so that it does not need to be recalculated.
- useMemo Hook only runs when one of its dependencies update.
- This can improve performance.

`useMemo` hook can be used to keep expensive, resource intenisve functions from needlessly running.

### Performance without using useMemo

- In Below Example, We have sqrt function as an expensive function by looping 10000 times a number before returning sqrt.
- While changing the input , you will notice the a delay in rendering the square root

```tsx
import React, { useEffect, useRef, useState } from "react";

function useMemoExample() {
  const [number, setNumber] = useState<number>(1);
  const [inc, setInc] = useState(0);
  const renders = useRef(1);

  const sqrt = getSqrt(number);

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
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.valueAsNumber)}
        className="form-control w-25"
      />

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
```

### Performance using useMemo Hook

To fix the performance issue,we can use the `useMemo` hook to memoize the `getSqrt` function.This will cause the function to only run when needed.

- Wrap the expensive function i.e`getSqrt` with `useMemo`.
- `useMemo` accepts the second parameter to declare dependencies.The expensive function only run when its dependiencies have changed.

```tsx
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
```

---

## useCallback

The useCallback hook returns a memoized callback that only changes if one of the dependencies has changed. This helps us to avoid unwanted and unnecessary components re-renders.

### useCallback Syntax

```tsx
import { useCallback } from "react";

const memoizedCallback = useCallback(
  // The first argument is a function to perform:
  () => performOperation(arg1, arg2),

  // The second argument is an array of dependencies
  // needed to detect changes in function arguments:
  [arg1, arg2]
);
```

You don't need any additional typings since TypeScript knows that useCallback accepts a function and an array of dependencies.

<a href="https://www.newline.co/@bespoyasov/how-to-use-usecallback-hook-with-typescript--f2019594">Blog for useCallback Hook in React & TypeScript </a>
