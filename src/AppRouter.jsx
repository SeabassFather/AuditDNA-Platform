import { BrowserRouter, Routes, Route } from "react-router-dom";
import AgPage from "./AgPage";
import AgExplorer from "./AgExplorer";
import AgMarketplace from "./AgMarketplace";
import AgMarketplaceSearchPage from "./AgMarketplaceSearchPage";
import AgMainPage from "./AgMainPage";
import AgMarketSearchPage from "./AgMarketSearchPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ag" element={<AgPage />} />
        <Route path="/ag/explorer" element={<AgExplorer />} />
        <Route path="/ag/marketplace" element={<AgMarketplace />} />
        <Route path="/ag/marketplace-search" element={<AgMarketplaceSearchPage />} />
        <Route path="/ag/main" element={<AgMainPage />} />
        <Route path="/ag/search" element={<AgMarketSearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}
