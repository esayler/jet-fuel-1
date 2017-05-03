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
  $('#folders').children().removeClass('active')
}

//Helper function to create folder link button
const createFolderLink = (linkInfo) => {
  const { id, folderName } = linkInfo;
  const folderLink = $(`<button class="btn folder-btn" id="${id}">${folderName}</button>`);
  $('#folders').append(folderLink)
  activeFolder = id;
  setActiveFolderClass(folderLink)
  folderLinkFetch(folderLink, id)
}

//Folder link closure
const folderLinkFetch = (link, id) => {
  link.on('click', () => {
    activeFolder = id;
    setActiveFolderClass(link)
    fetch(`/api/v1/folders/${id}/urls`)
    .then((response) => {
      return response.json()
    })
    .then((folderData) => {
      appendURLs(folderData);
    })
  })
}

const setActiveFolderClass = (node) => {
  node.addClass('active')
  node.siblings().removeClass('active')
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
  const { id, url, visits } = urlInfo;
  const urlATag = $(`<a href="/${id}" target="_blank">/${id} => (${url})</a> <p> visits: ${visits} </p> </br>`)
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
  .then((folderData) => {
    createFolderLink(folderData);
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
  .then((urlData) => {
    createURLsLink(urlData);
  })
}