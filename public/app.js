$('.folder-submit').on('click', (e) => {
  e.preventDefault();
  const folderInput = $('.folder-input').val();
  addFolderFetch(folderInput)
})

const addFolderFetch = (folder) => {
  fetch('/api/v1/folders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ folder })
  })
  .then((response) => {
    return response.json();
  }).then((data) => {
    $('#folders').append(data.folder)
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


