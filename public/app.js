let activeFolder = undefined;

$(() => {
  fetch('/api/v1/folders')
    .then(response => response.json())
    .then(data => appendFolders(data))
})

const appendFolders = (folders) => {
  folders.forEach(folder => {
    createFolderLink(folder)
  })
  activeFolder = undefined;
}

//Helper function to create folder link button
const createFolderLink = (linkInfo) => {
  const { id, folderName } = linkInfo;
  const folderLink = $(`<button id="${id}">${folderName}</button>`);
  $('#folders').append(folderLink)
  activeFolder = id;
  folderLinkFetch(folderLink, id)
}

//Folder link closure
const folderLinkFetch = (link, id) => {
  link.on('click', () => {
    activeFolder = id;
    fetch(`/api/v1/folders/${id}/urls`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data);
      appendURLs(data);
    })
  })
}

const appendURLs = (urlList) => {
  $('#urls').empty();
  urlList.forEach(eachUrl => {
    $('#urls').append(`<a target="_blank" href="http://${eachUrl.url}">${eachUrl.url}</a>`)
  })
}

//Folder input handler
$('.folder-submit').on('click', (e) => {
  e.preventDefault();
  const folderInput = $('.folder-input').val();
  addFolderFetch(folderInput)
})

// Folder input POST call and DOM append
const addFolderFetch = (folderName) => {
  fetch('/api/v1/folders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ folderName })
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    createFolderLink(data);
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
    body: JSON.stringify({ url, activeFolder })
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    $('#urls').append(data.url)
  })
}