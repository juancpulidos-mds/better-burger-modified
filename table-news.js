(function(){

  const TITLE_ALL = 'SGV & Portfolio News';
  const newsTitleFilter = document.getElementById('newsTitleFilter');
  newsTitleFilter.innerText = TITLE_ALL;

  const el = document.querySelector('#newsContent');
  const rows = el.querySelector('table').querySelector('tbody').querySelectorAll('tr');
  console.log(rows);

  const companies = [];
  
  rows.forEach(row => {
    const company = row.children[1].textContent;
    if (!companies.includes(company)) {
      companies.push(company);
    }
  });

 const selectCompanies = document.getElementById('selectCompanies');

 companies.map(company => {
  const option = document.createElement('option');
  option.setAttribute('value', company);
  const optionText = document.createTextNode(company);
  option.appendChild(optionText);
  selectCompanies.appendChild(option);
 });

 selectCompanies.addEventListener('change', e => {
  const { value } = e.target;
  newsTitleFilter.innerText = value === 'All' ? TITLE_ALL : value;
 });

  // if table.dataset.type then get data from dataset.company in tr
  // else get data from column company

})();
