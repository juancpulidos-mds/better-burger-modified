(function(){
  const ALL = 'All';
  const TITLE_ALL = 'SGV & Portfolio News';
  const newsTitleFilter = document.getElementById('newsTitleFilter').querySelector('h1');
  newsTitleFilter.innerText = TITLE_ALL;

  const rows = document.getElementById('tableNews').querySelector('tbody').querySelectorAll('tr');

  const companies = [];
  //const years = [];
  
  // rows.forEach(row => {
    //   const date = row.children[0].textContent;
    //   const company = row.children[1].textContent;

  //   if (!companies.includes(company)) {
  //     companies.push(company);
  //   }

  //   row.dataset.company = company;
  //   row.dataset.year = new Date(date).getFullYear();
  // });

  // Gel all companies from dataset company
  rows.forEach(row => {
    const company = row.getAttribute('data-company');
    // const year = row.getAttribute('data-year');

    if (!companies.includes(company)) {
      companies.push(company);
    }

    // if (!years.includes(year)) {
    //   years.push(year);
    // }
  });
  companies.sort((a,b) => {
    const lca = a.toLowerCase(), lcb = b.toLowerCase();
    return lca > lcb ? 1 : lca < lcb ? -1 : 0;
  });

 const selectCompanies = document.getElementById('selectCompanies');

 // Assign the options to select
 companies.map(company => {
  const option = document.createElement('option');
  option.setAttribute('value', company);
  const optionText = document.createTextNode(company);
  option.appendChild(optionText);
  selectCompanies.appendChild(option);
 });

 // Listener when select option change
 selectCompanies.addEventListener('change', e => {
  const { value } = e.target;
  if (!value) return;
  newsTitleFilter.innerText = value === ALL ? TITLE_ALL : `${value} News`;

  rows.forEach(row => {
    const company = row.getAttribute('data-company');
    if (value !== ALL) {
      row.style.display = company === value ? 'block' : 'none';
      return;
    }
    row.style.display = 'block';
  });
 });

})();
