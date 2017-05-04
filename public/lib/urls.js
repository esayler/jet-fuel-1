//Folder link closure
const folderUrlFetch = (link, id) => {
  link.on('click', () => {
    activeFolder = id;
    setActiveFolderClass(link)
    fetch(`/api/v1/folders/${id}/urls`)
    .then(response => {
      return response.json()
    })
    .then(folderURLsList => {
      loopUrlData(folderURLsList);
    })
  })
}

//function to append urls to DOM on folder button click
const loopUrlData = (urlList) => {
  $('#urls').empty();
  urlList.forEach(eachUrl =>
    appendUrlATags(eachUrl)
  )
}

//Helper function to create url link nodes
const appendUrlATags = (urlInfo) => {
  const { id, long_url, visits } = urlInfo;
  const urlATag = $(`
    <a href="/${id}" target="_blank">/${id} => (${long_url})</a>
    <p> visits: ${visits} </p> </br>
  `)
  $('#urls').append(urlATag)
}

//URL input handler
$('.url-submit').on('click', (e) => {
  e.preventDefault();
  const urlInput = $('.url-input').val();
  addUrlFetch(urlInput)
  clearInputs();
})

// URL input POST call and DOM append
const addUrlFetch = (url) => {
  fetch('/api/v1/urls', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, activeFolder })
  })
  .then(response => {
    return response.json();
  })
  .then(urlData => {
    appendUrlATags(urlData);
  })
}