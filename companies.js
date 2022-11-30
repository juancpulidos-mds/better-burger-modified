(function(){
    const companiesProcess = () => {
      const templateClose = document.createElement('template');
      const templateHeader = document.createElement('template');

      templateClose.innerHTML = `<div id="closeCompany" class="company__close">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.6939 30.1128L30.1133 25.6934L74.3075 69.8875L69.888 74.3069L25.6939 30.1128Z" fill="DimGray"/>
            <path d="M30.1108 74.3071L25.6914 69.8877L69.8856 25.6935L74.305 30.1129L30.1108 74.3071Z" fill="DimGray"/>
          </svg>
        </div>`;

      const createHeader = (data) => {
        return `<div>
            <img src="${data.src}"/>
          </div>
          <div>
            <h2>${data.name}</h2>
            <a href="${data.href}" target="_blank">${data.domain}</a>
          </div>`;
      }

      const companies = Array.from(document.getElementById('contentCompanies').querySelectorAll('article'));
      const idsCompanies = companies.map(company => company.id);

      const lightbox = document.createElement('div');
      lightbox.id = 'lightBox';
      lightbox.appendChild(templateClose.content.cloneNode(true));
      document.body.appendChild(lightbox);

      const wrapper = document.createElement('div');
      wrapper.classList.add('company');
      lightbox.appendChild(wrapper);

      const companiesGallery = Array.from(document.querySelectorAll('.sqs-gallery-design-grid-slide'));
      
      companiesGallery.forEach(company => {
        const link = company.querySelector('a');
        const logo = link.querySelector('img');
        
        link.addEventListener('click', event => {
          event.preventDefault();
          const href = link.getAttribute('href');
          const domain = (new URL(href));
          const nakedDomain = domain.hostname.replace('www.', '');
          const id = nakedDomain.split('.')[0];
          const companyIndex = idsCompanies.indexOf(id);
          
          // if exist a ID with equal data in popups then open this else return link
          if (companyIndex !== -1) {  
            const data = {};
            data.href = href;
            data.src = logo.src;
            data.name = logo.alt;
            data.domain = domain.hostname;

            templateHeader.innerHTML = createHeader(data);

            const article = companies[companyIndex];
            const articleHeader = article.querySelector('header');

            while(articleHeader.firstChild) {
              articleHeader.removeChild(articleHeader.firstChild);
            }

            articleHeader.appendChild(templateHeader.content.cloneNode(true));

            while (wrapper.firstChild) {
              wrapper.removeChild(wrapper.firstChild)
            }

            wrapper.appendChild(article);

            lightbox.classList.add('is-open');
            return false;
          }
          return true;
        });
      });

      const closeCompany = lightbox.querySelector('.company__close');
      closeCompany.addEventListener('click', () => {
        lightbox.classList.remove('is-open');
      });
    };

    companiesProcess();

})();