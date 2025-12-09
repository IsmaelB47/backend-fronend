document.addEventListener("DOMContentLoaded", async () => {
  const listEl = document.querySelector("#list_of_songs");
  const url = "http://localhost:3000/songs"; // matches backend route

  try {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const songs = await res.json();

    if (!Array.isArray(songs) || songs.length === 0) {
      listEl.innerHTML = "<li>No songs found.</li>";
      return;
    }

    listEl.innerHTML = songs
      .map(s => {
        const id = s._id || "";
        const title = s.title ?? "(no title)";
        const artist = s.artist ?? "(no artist)";
        return `<li>. ${title} - ${artist} - <a href="details.html?id=${id}">Details</a> - <a href="edit.html?id=${id}">Edit Song</a></li>`;
      })
      .join("");
  } catch (err) {
    console.error("Error fetching songs:", err);
    listEl.innerHTML = `<li style="color:red">Failed to load songs. Check console.</li>`;
  }
});
