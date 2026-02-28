import "./styles/Common.css"
import React, { Suspense } from "react";
const Navigation = React.lazy(() => import("./pages/Navigation/Navigation"))

function App() {
  return (
    <>
      <Suspense fallback={<h1>Please wait the page is loading.....</h1>}>
        <Navigation />
      </Suspense>
    </>
  )
}

export default App;