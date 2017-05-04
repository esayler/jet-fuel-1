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

$('.btn-sort-date').on('click', () => {
  console.log('test');
})
