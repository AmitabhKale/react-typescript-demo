import React, { ReactElement, ReactNode, useState } from 'react';

// Conventional Props
function Heading({title}: {title: String}){
  return <h2>{title}</h2>
}

function HeadingWithContent({children}: {children: ReactNode}): ReactElement{
  return <h2>{children}</h2>
}

// default Props
const defaultContainerProps = {
  heading: <strong>Default Prop Heading</strong>
}

function Container ({heading, children}: {heading: ReactNode, children: ReactNode}) : ReactElement {
  return <div>
    <h2>{heading}</h2>
    {children}
    </div>
}

Container.defaultProps = defaultContainerProps

// Functional Props
function TextWithNumber({children}: {children: (num:number) => ReactNode}){
  const [state, stateSet] = useState<number>(1)

  return (
    <div >
      <div>
        {children(state)}
      </div>
      <div>
      <button className='btn btn-danger' onClick={() => stateSet(state + 1)}>Add</button>
      </div>
    </div>
  )
}

function App() {
  return (
    <div>
      <div className="container">
        <Heading title="React TypeScript Demo App"></Heading>
        <HeadingWithContent>New Update</HeadingWithContent>

        {/*  */}
        <Container>Props and Childrens</Container>
        <TextWithNumber>{(num:number) => <div>Todays Number: {num}</div>}</TextWithNumber>
      </div>

    </div>
  );
}

export default App;
