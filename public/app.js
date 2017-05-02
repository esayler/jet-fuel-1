let activeFolder = undefined;

$(() => {
  fetch('/api/v1/folders')
    .then(response => response.json())
    .then(folderData => appendFolders(folderData))
})

//Function to append folders to DOM
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
    .then((folderData) => {
      appendURLs(folderData);
    })
  })
}

//function to append urls to DOM on folder button click
const appendURLs = (urlList) => {
  $('#urls').empty();
  urlList.forEach(eachUrl => {
    createURLsLink(eachUrl)
  })
}

//Helper function to create url link nodes
const createURLsLink = (urlInfo) => {
  const { id, url } = urlInfo;
  const urlATag = $(`<a href="/${id}" target="_blank">/${id}(${url})</a>`)
  $('#urls').append(urlATag)
}

//Folder input handler
$('.folder-submit').on('click', (e) => {
  e.preventDefault();
  const folderInput = $('.folder-input').val();
  addFolderFetch(folderInput)
  $('#urls').empty()
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

//URL input handler
$('.url-submit').on('click', (e) => {
  e.preventDefault();
  const urlInput = $('.url-input').val();
  addURLFetch(urlInput)
})

// URL input POST call and DOM append
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
    createURLsLink(data);
  })
}