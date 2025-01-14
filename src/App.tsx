import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectDemo } from "./components/Select";
import { fetchNews } from "@/utils/scripts";
import { MagnifyingGlassIcon, GitHubLogoIcon, LinkedInLogoIcon, Link2Icon } from "@radix-ui/react-icons";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("business");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleSearch = async () => {
    setLoading(true);
    const news = await fetchNews(searchQuery, selectedCategory);
    setArticles(news);
    setLoading(false);
  };

  useEffect(() => {
    const fetchInitialNews = async () => {
      setLoading(true);
      const news = await fetchNews("", "business");
      setArticles(news);
      setLoading(false);
    };
    fetchInitialNews();
  }, []);

  return (
    <div className="flex flex-col w-full items-center space-y-6 p-4 bg-gray-50">
      <div className="h-64 bg-neutral-900 w-full max-w-5xl flex flex-col gap-6 justify-center items-center rounded-md text-white p-6 text-center">
        <h1 className="text-4xl font-bold">Search the latest news</h1>
        <h4 className="text-base max-w-prose">A small ReactJS project showcasing real-time news search with an intuitive and responsive UI powered by API integration.</h4>
        <div className="flex gap-4">
          <a href="https://github.com/ImanolHerrero/NewsApp" target="_blank" className="flex items-center gap-2"><GitHubLogoIcon />Github</a>
          <a href="https://newsapi.org/" target="_blank" className="flex items-center gap-2"><Link2Icon />API</a>
          <a href="https://www.linkedin.com/in/imanol-herrero-932956247/" target="_blank" className="flex items-center gap-2"><LinkedInLogoIcon />Linkedin</a>
        </div>
      </div>
      <div className="flex w-full md:flex-row flex-col max-w-5xl gap-4 items-center mb-6">
        <Input
          id="search-input"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
          className="md:w-full bg-white"
        />
        <SelectDemo onSelectChange={handleCategoryChange} />
        <Button type="button" onClick={handleSearch} className="w-full md:w-1/3">
          <MagnifyingGlassIcon />
          Search
        </Button>
      </div>

      {loading ? (
        <p className="text-gray-600 text-center">Loading news...</p>
      ) : (
        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-transform hover:scale-105"
              >
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2 text-gray-800">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {article.title}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{article.description}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                    <span>{article.source.name}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 col-span-full text-center">
              Nothing found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
