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