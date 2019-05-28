const printToDom = (id, content) => {
  const selectedDiv = document.getElementById(id);
  selectedDiv.innerHTML = content;
};

export default { printToDom };
