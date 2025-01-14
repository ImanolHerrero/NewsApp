export async function fetchNews(searchQuery: string, category: string) {
   const apiKey = import.meta.env.VITE_NEWS_API_KEY;
   const baseUrl = "https://newsapi.org/v2/top-headlines";

   try {
      const url = new URL(baseUrl);
      url.searchParams.append("country", "us");
      url.searchParams.append("category", category);
      url.searchParams.append("q", searchQuery);
      url.searchParams.append("apiKey", apiKey);

      const response = await fetch(url);
      if (!response.ok) {
         throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return data.articles;
   } catch (error) {
      console.error("Error al obtener las noticias:", error);
      return [];
   }
}
