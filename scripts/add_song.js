document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#addSongForm");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const title = form.title.value;
        const artist = form.artist.value;
        const popularity = form.popularity.value;

        try {
            const response = await fetch("http://localhost:3000/songs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, artist, popularity })
            });

            const result = await response.text();
            alert(result);
            form.reset();
        } catch (err) {
            console.error("Error adding song:", err);
        }
    });
});
