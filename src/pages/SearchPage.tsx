import { useState } from "react";
import SectionTitle from "../components/SectionTitle/SectionTitle";
import SearchHorse from "../components/SearchHorse/SearchHorse";
import SearchResults from "../components/SearchResults/SearchResults";
import { usePageTitle } from "../hooks/usePageTitle";

const SearchPage = () => {
  const [inquiry, setInquiry] = useState({ name: "", gender: "", breed: "" });
  usePageTitle("Search");

  return (
    <div className="search-page">
      <SectionTitle title="Search Horse" />
      <div className="section-wrapper">
        <SearchHorse setQuery={setInquiry} />
      </div>
      <SectionTitle title="Results" />
      <div className="section-wrapper">
        <SearchResults query={inquiry} />
      </div>
    </div>
  );
};

export default SearchPage;
