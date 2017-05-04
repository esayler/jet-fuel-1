$(() => {
  fetch('/api/v1/folders')
    .then(response => response.json())
    .then(foldersList => loopFolderData(foldersList))
})

//Function to append folders to DOM
const loopFolderData = (foldersList) => {
  foldersList.forEach(folder =>
    appendFolderLinks(folder)
  )
  activeFolder = undefined;
  $('#folders').children().removeClass('active')
  $('#folders').children().children('.fa').removeClass('fa-folder-open')
}

//Helper function to create folder link button
const appendFolderLinks = (linkInfo) => {
  const { id, folderName } = linkInfo;
  const folderLink = $(`
    <button class="folder-btn" id="${id}"><i class="folder-icon fa fa-folder-o" aria-hidden="true"></i>${folderName}</button>
  `);
  $('#folders').append(folderLink)
  activeFolder = id;
  setActiveFolderClass(folderLink)
  folderUrlFetch(folderLink, id)
}

//Folder input handler
$('.folder-submit').on('click', (e) => {
  e.preventDefault();
  const folderInput = $('.folder-input').val();
  addFolderFetch(folderInput)
  $('#urls').empty()
  clearInputs();
})

// Folder input POST call and DOM append
const addFolderFetch = (folderName) => {
  fetch('/api/v1/folders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ folderName })
  })
  .then(response => {
    return response.json();
  })
  .then(folderData => {
    appendFolderLinks(folderData);
  })
}