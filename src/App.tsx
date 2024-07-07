import AllRoutes from "./components/AllRoutes"
import ErrorBoundary from "./components/ErrorBoundary"

function App() {

  return (
    <>
      <ErrorBoundary fallback={<h1>Something went wrong.</h1>}>
        <AllRoutes />
      </ErrorBoundary>
    </>
  )
}

export default App
