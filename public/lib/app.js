let activeFolder = undefined;

const setActiveFolderClass = (node) => {
  node.addClass('active')
  node.siblings().removeClass('active')
}