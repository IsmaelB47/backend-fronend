addEventListener("DOMContentLoaded", async function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) {
    document.querySelector("#songTitle").textContent = "No song selected";
    document.querySelector("#details").innerHTML = "<p style='color:red'>No ID in URL.</p>";
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/songs/" + id, {
      headers: { Accept: "application/json" }
    });

    if (!res.ok) {
      document.querySelector("#songTitle").textContent = "Song not found";
      document.querySelector("#details").innerHTML = `<p style="color:red">Status ${res.status}</p>`;
      return;
    }

    const song = await res.json();

    document.querySelector("#songTitle").textContent = song.title ?? "Untitled";
    document.querySelector("#artist").textContent = song.artist ?? "(no artist)";
    document.querySelector("#popularity").textContent =
      song.popularity != null ? song.popularity : "(no popularity)";
    document.querySelector("#genre").textContent = song.genre ?? "(no genre)";
    document.querySelector("#releaseDate").textContent =
      song.releaseDate ? new Date(song.releaseDate).toISOString() : "(no release date)";
  } catch (err) {
    console.error("Error loading details:", err);
    document.querySelector("#details").innerHTML = `<p style="color:red">Failed to load details. See console.</p>`;
  }
});
