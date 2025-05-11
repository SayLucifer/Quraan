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

        // Create a bookmark button for each surah
        const bookmarkButton = document.createElement("button");
        bookmarkButton.textContent = "📌";
        bookmarkButton.classList.add("text-yellow-500", "text-xl");

        // Check if this Surah is already bookmarked
        if (localStorage.getItem(`bookmark_surah_${surah.number}`)) {
          bookmarkButton.textContent = "✅ Bookmarked";
          bookmarkButton.classList.add("text-green-500");
        }

        // Bookmark button click handler
        bookmarkButton.addEventListener("click", () => {
          if (localStorage.getItem(`bookmark_surah_${surah.number}`)) {
            localStorage.removeItem(`bookmark_surah_${surah.number}`);
            bookmarkButton.textContent = "📌"; // Remove bookmark icon
            bookmarkButton.classList.remove("text-green-500");
          } else {
            localStorage.setItem(`bookmark_surah_${surah.number}`, surah.name);
            bookmarkButton.textContent = "✅ Bookmarked"; // Update with bookmarked icon
            bookmarkButton.classList.add("text-green-500");
          }
        });

        surahItem.appendChild(bookmarkButton);

        // Create a button to navigate to the Surah's page
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
