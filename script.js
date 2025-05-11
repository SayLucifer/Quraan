document.addEventListener("DOMContentLoaded", () => {
  // Fetch Surah data from Al-Quran Cloud API
  fetch('https://api.alquran.cloud/v1/surah')
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
      const surahListContainer = document.getElementById("surah-list");
      
      // Loop through the surahs and create HTML elements
      data.data.forEach(surah => {
        const surahItem = document.createElement("div");
        surahItem.classList.add("surah-item");
        
        const surahName = document.createElement("h3");
        surahName.textContent = `${surah.number}. ${surah.name}`;
        surahItem.appendChild(surahName);

        // Create a button to navigate to the surah's page
        const surahLink = document.createElement("a");
        surahLink.href = `/surah${surah.number}.html`;
        surahLink.classList.add("text-blue-600", "hover:text-blue-800", "visited:text-purple-600", "underline");
        surahLink.textContent = "عرض السورة"; // "View Surah"
        surahItem.appendChild(surahLink);

        // Append the surah item to the container
        surahListContainer.appendChild(surahItem);
      });
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
});

