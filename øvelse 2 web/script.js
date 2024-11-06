// Album-konstruktørfunktion til at oprette album-objekter
function Album(id, artist, album, year, genre, trackList, artistWebsite) {
  this.id = id;
  this.artist = artist;
  this.album = album;
  this.year = year;
  this.genre = genre;
  this.trackList = trackList;
  this.artistWebsite = artistWebsite;
}

// Funktion til at tilføje et album-element til HTML-siden
function addDivWithAlbum(album, parentId) {
  const parentElement = document.getElementById(parentId);

  // Opret container til albummet
  const albumDiv = document.createElement("div");
  albumDiv.className = "album";

  // HTML structure for album details with new styling and icons
albumDiv.innerHTML = 
'<h3>' + album.album + '</h3>' +
'<p>🎤 Kunstner: <a href="' + album.artistWebsite + '" target="_blank">' + album.artist + '</a></p>' +
'<p>📅 Udgivelsesår: ' + album.year + '</p>' +
'<p>🎶 Genre: ' + album.genre + '</p>' +
'<button class="toggle-button" onclick="toggleTracklist(' + album.id + ')">' +
    '<span class="toggle-icon" id="icon-' + album.id + '">▶️</span>' +
    '<span>Vis Trackliste</span>' +
'</button>' +
'<div id="tracklist-' + album.id + '" class="tracklist">' +
    album.trackList.map(function(track) {
        return '<p>' + track.trackNumber + '. ' + track.trackTitle + ' - ' + track.trackTimeInSeconds + ' sek</p>';
    }).join("") +
'</div>';

parentElement.appendChild(albumDiv);
  }

// Funktion til at vise/skjule tracklisten for et album
function toggleTracklist(albumId) {
  const tracklistDiv = document.getElementById(`tracklist-${albumId}`);
  const icon = document.getElementById(`icon-${albumId}`);
  const button = document.querySelector(`.toggle-button[onclick="toggleTracklist(${albumId})"]`);

// Skifter mellem at vise og skjule tracklisten samt ændrer ikonets rotation og knaptekst
if (tracklistDiv.style.display === "none") {
  tracklistDiv.style.display = "block";
  button.querySelector("span:nth-child(2)").textContent = "Skjul Trackliste";
  icon.classList.add("rotate");
} else {
  tracklistDiv.style.display = "none";
  button.querySelector("span:nth-child(2)").textContent = "Vis Trackliste";
  icon.classList.remove("rotate");
}
}

// Funktion til at hente JSON-data og vise albummer
async function fetchContent(url) {
  const request = await fetch(url);
  const albums = await request.json();
  return albums;
}

// Indlæs og vis albummer på siden
fetchContent('albums.json').then(albums => {
  const albumObjects = albums.map(albumData => new Album(
      albumData.id,
      albumData.artistName,
      albumData.albumName,
      albumData.productionYear,
      albumData.genre,
      albumData.trackList,
      albumData.artistWebsite
  ));
  albumObjects.forEach(album => addDivWithAlbum(album, "content"));
});
