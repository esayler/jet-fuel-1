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

const validateInput = (inputValue, msg) => {
  $('.error-msg').empty()
  if (inputValue.length === 0) {
    $('.error-msg').append(`${msg}`)
    return false;
  }

  return true;
}

//Closure to toggle each qqsort button
const sortStatus = (() => {
  let sortOrderVisits = 'desc'
  let sortOrderCreatedAt = 'desc'

  return {
    toggleSortOrder: (key) => {
      if (key === 'created_at') {
        $('.btn-sort-visits').children('.fa').removeClass('fa-sort-up fa-sort-down').addClass('fa-sort');
        if (sortOrderVisits === 'desc') {
          sortOrderVisits = 'asc';
          $('.btn-sort-date').children('.fa').removeClass('fa-sort-down').addClass('fa-sort-up');
        } else {
          sortOrderVisits = 'desc';
          $('.btn-sort-date').children('.fa').removeClass('fa-sort-up').addClass('fa-sort-down');
        }
        return sortOrderVisits;
      } else if (key === 'visits') {
         if (sortOrderCreatedAt === 'desc') {
           $('.btn-sort-date').children('.fa').removeClass('fa-sort-up fa-sort-down').addClass('fa-sort')
           sortOrderCreatedAt = 'asc';
           $('.btn-sort-visits').children('.fa').removeClass('fa-sort-down').addClass('fa-sort-up');
        } else {
           sortOrderCreatedAt = 'desc';
           $('.btn-sort-visits').children('.fa').removeClass('fa-sort-up').addClass('fa-sort-down')
        }
        return sortOrderCreatedAt;
      }
    }
  }
})();

//Sorting fucntion
$('.btn-sort').on('click', function() {
  fetch(`/api/v1/folders/${activeFolder}/urls?key=${this.name}&order=${sortStatus.toggleSortOrder(this.name)}`)
    .then(response => {
      return response.json();
    })
    .then(folderURLsList => {
      loopUrlData(folderURLsList);
    })
})
