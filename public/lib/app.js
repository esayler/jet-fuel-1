let activeFolder = undefined;

const setActiveFolderClass = (node) => {
  node.addClass('active')
  node.children('.fa').addClass('fa-folder-open-o')
  node.siblings().removeClass('active')
  node.siblings().children('.fa').removeClass('fa-folder-open-o')
}

const clearInputs = () => {
  $(':text').val('');
}

const handleErrors = (res) => {
  if (!res.ok) {
    throw Error(res);
  }
  return res;
}

//Closure to toggle each qqsort button
const sortStatus = (() => {
  let sortOrderVisits = 'desc'
  let sortOrderCreatedAt = 'desc'

  return {
    toggleSortOrder: (key) => {
      if (key === 'visits') {
        return sortOrderVisits = sortOrderVisits === 'desc' ? 'asc' : 'desc';
      } else if (key === 'created_at') {
        return sortOrderCreatedAt = sortOrderCreatedAt === 'desc' ? 'asc' : 'desc';
      }
    }
  }
})();

//Sorting fucntion
$('.btn-sort').on('click', function() {
  fetch(`/api/v1/folders/${activeFolder}/urls?key=${this.name}&order=${sortStatus.toggleSortOrder(this.name)}`)
    .then(response => {
      return response.json()
    })
    .then(folderURLsList => {
      loopUrlData(folderURLsList);
    })
})
