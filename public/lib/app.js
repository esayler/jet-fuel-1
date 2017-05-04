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