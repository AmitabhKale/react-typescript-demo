import React, { useState } from 'react'

function UseStateComponent() {
  const [arr, setArr] = useState<number[]>([]);
  const [name,setName] = useState<string | null>(null);
  return (
    <div className='row'>
      <h3>UseState Examples</h3>
      <div className="col card p-3">
        {arr}
        <button className='btn btn-warning' onClick={() => setArr([...arr, arr.length + 1])}>Add to Array</button>
      </div>
      <div className="col card p-3">
        {name}
        <button className='btn btn-danger' onClick={() => setName("John Doe")}>Set Name</button>
      </div>
    </div>
  )
}

export default UseStateComponent