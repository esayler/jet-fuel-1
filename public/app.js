$(() => {
  fetch('/api/v1/folders')
    .then(response => response.json())
    .then(data => appendFolders(data))
  fetch('/api/v1/urls')
    .then(response => response.json())
    .then(data => appendURLs(data))
})

const appendFolders = (folders) => {
  folders.forEach(folder => {
    $('#folders').append(folder.folderName)
  })
}
const appendURLs= (urls) => {
  urls.forEach(url => {
    $('#urls').append(url.url)
  })
}

$('.folder-submit').on('click', (e) => {
  e.preventDefault();
  const folderInput = $('.folder-input').val();
  addFolderFetch(folderInput)
})

const addFolderFetch = (folderName) => {
  fetch('/api/v1/folders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ folderName })
  })
  .then((response) => {
    return response.json();
  }).then((data) => {
    $('#folders').append(data.folderName)
  })
}

$('.url-submit').on('click', (e) => {
  e.preventDefault();
  const urlInput = $('.url-input').val();
  addURLFetch(urlInput)
})

const addURLFetch = (url) => {
  fetch('/api/v1/urls', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  })
  .then((response) => {
    return response.json();
  }).then((data) => {
    $('#urls').append(data.url)
  })
}