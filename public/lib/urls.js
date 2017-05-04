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
  const { id, long_url, visits, created_at } = urlInfo;
  const urlATag = $(`
    <article class="card url-card">
      <a class="link url-link" href="/${id}" target="_blank">${long_url}</a>
      <hr/>
      <a class="info url-short" href="/${id}" target="_blank">${document.URL + id}</a>
      <p class="info visits">visits: ${visits}</p> 
      <p> created: ${created_at} </p>
    </article>
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