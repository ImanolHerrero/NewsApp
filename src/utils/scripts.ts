export const fetchTopHeadlines = async (apiKey: string, category: string = "general") => {
   const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&apikey=${apiKey}`
   );
   const data = await response.json();
   return data.articles || [];
};


export async function fetchSearchNews(
   apiKey: string,
   query: string,
   category: string
) {
   const baseUrl = "https://gnews.io/api/v4/search";

   try {
      const url = `${baseUrl}?q=${encodeURIComponent(query)}&category=${category}&lang=en&country=us&max=10&apikey=${apiKey}`;
      console.log(url)
      const response = await fetch(url);
      if (!response.ok) {
         throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return data.articles;
   } catch (error) {
      console.error("Error fetching the search news:", error);
      return [];
   }
}
