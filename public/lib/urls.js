//Folder link closure
const folderUrlFetch = (link, id) => {
  link.on('click', () => {
    activeFolder = id;
    setActiveFolderClass(link)
    urlFetchAll(id)
  })
}

//Fetch URLs call for active folder
const urlFetchAll = (id) => {
  fetch(`/api/v1/folders/${id}/urls`)
  .then(response => {
    return response.json()
  })
  .then(folderURLsList => {
    loopUrlData(folderURLsList);
  })
}

//Clear out all urls and reappend
const loopUrlData = (urlList) => {
  $('#urls').empty();
  urlList.forEach(eachUrl =>
    appendUrlATags(eachUrl)
  )
}

//Helper function to create url link nodes
const appendUrlATags = (urlInfo) => {
  const { id, long_url, visits, created_at } = urlInfo;
  const deleteURLButton = $(`<i class="delete-url-btn fa fa-trash-o" id=${id} aria-hidden="true"></i>`)
  const urlATag = $(`
    <article class="card url-card">
      <a class="link url-link" href="/${id}" target="_blank">
        <i class="fa fa-external-link" aria-hidden="true"></i>
        ${long_url}
      </a>
      <hr/>
      <a class="info url-short" href="/${id}" target="_blank">
        <i class="fa fa-external-link" aria-hidden="true"></i>
        ${document.URL + id}
      </a>
      <p class="info visits">
        <i class="fa fa-eye" aria-hidden="true"></i> 
        Visits: ${visits}
      </p>
      <p class="info created-at"><i class="fa fa-clock-o" aria-hidden="true"></i>
         Created: ${created_at}
      </p>
    </article>
  `).prepend(deleteURLButton)
  $('#urls').append(urlATag)
  deleteURL(deleteURLButton, id)
}

//Delete URL closure
const deleteURL = (deleteBtn, id) => {
  deleteBtn.on('click', () => {
    fetch(`/api/v1/urls/${id}`, {
      method: 'DELETE',
    })
    .then(handleErrors)
    .then(res => {
      urlFetchAll(activeFolder)
    })
    .catch(err => {
      console.error(err);
    })
  })
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
