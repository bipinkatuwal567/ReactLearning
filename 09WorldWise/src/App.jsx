import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Product from "./pages/Product";
import Pricing from "./pages/Pricing"
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="product" element={<Product />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="app" element={<AppLayout />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
