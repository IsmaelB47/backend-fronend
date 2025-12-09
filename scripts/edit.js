addEventListener("DOMContentLoaded", async function () {
  const urlParam = new URLSearchParams(window.location.search);
  const songID = urlParam.get("id");

  if (!songID) {
    alert("No song ID provided in URL.");
    return;
  }

  // Load song data
  try {
    const response = await fetch("http://localhost:3000/api/songs/" + songID);
    if (response.ok) {
      const song = await response.json();

      document.querySelector("#songId").value = song._id || "";
      document.querySelector("#title").value = song.title || "";
      document.querySelector("#artist").value = song.artist || "";
      document.querySelector("#released").value =
        song.releaseDate ? song.releaseDate.substring(0, 10) : "";
      document.querySelector("#popularity").value =
        song.popularity != null ? song.popularity : "";
      document.querySelector("#genre").value = song.genre || "";
    } else {
      alert("Failed to load song.");
    }
  } catch (err) {
    console.error("Error loading song:", err);
    alert("Error loading song.");
  }

  // Handle update
  const form = document.querySelector("#editForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      title: document.querySelector("#title").value.trim(),
      artist: document.querySelector("#artist").value.trim(),
      releaseDate: document.querySelector("#released").value
        ? new Date(document.querySelector("#released").value).toISOString()
        : null,
      popularity: document.querySelector("#popularity").value
        ? Number(document.querySelector("#popularity").value)
        : null,
      genre: document.querySelector("#genre").value.trim()
    };

    try {
      const resp = await fetch("http://localhost:3000/api/songs/" + songID, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (resp.ok) {
        alert("Song updated!");
        // optional: redirect back to list
        // window.location.href = "index.html";
      } else {
        const errText = await resp.text();
        alert("Update failed: " + errText);
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Update error. See console.");
    }
  });
});
