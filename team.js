(function(){
    const teamProcess = () => {
      const templateClose = document.createElement('template');
      const templateContent = document.createElement('template');

      templateClose.innerHTML = `<div id="closeCompany" class="lightbox__close">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.6939 30.1128L30.1133 25.6934L74.3075 69.8875L69.888 74.3069L25.6939 30.1128Z" fill="DimGray"/>
            <path d="M30.1108 74.3071L25.6914 69.8877L69.8856 25.6935L74.305 30.1129L30.1108 74.3071Z" fill="DimGray"/>
          </svg>
        </div>`;

      const elementMemberFormat = (id) => {
        const elementMember = document.getElementById(id).cloneNode(true);
        elementMember.removeAttribute('id');

        const excerpt = elementMember.querySelector('.excerpt');
        const link = excerpt.querySelector('a');
        link.remove();

        const paragraphs = elementMember.querySelectorAll('p');
        console.log(paragraphs);

        let paragraphsText = '';
        paragraphs.forEach((paragraph, index) => {
          if (index !== 0) {
            paragraph.style.display = 'block';
          }
          if (index < paragraphs.length -1) {
            paragraphsText += `<p>${paragraph.textContent}</p>\n`;
          }
        });

        const picture = elementMember.querySelector('img');
        const name = elementMember.querySelector('h2');
        const role = elementMember.querySelector('h3');
        const linkedIn = elementMember.querySelector('a');
        var last = paragraphs[paragraphs.length - 1];

        const content = `<article>
          <header>
            <div class="photo"><img src="${picture.getAttribute('src')}"/></div>
            <div>
              <h2>${name.textContent}</h2>
              <h3>${role.textContent}</h3>
              <div class="social">
                <p>${last.innerHTML}</p>
                <a href="${linkedIn.getAttribute('href')}" target="_blank"><img src="${linkedInImg}" alt="${linkedIn.textContent}" class="icon-linked-in" /></a>
              </div>
            </div>
          </header>
          <div>${paragraphsText}</div>
        </article>`;

        return content;
      };
      
      const lightbox = document.createElement('div');
      lightbox.id = 'lightBox';
      lightbox.appendChild(templateClose.content.cloneNode(true));
      document.body.appendChild(lightbox);

      const wrapper = document.createElement('div');
      wrapper.classList.add('about');
      lightbox.appendChild(wrapper);

      const team = Array.from(document.querySelector('.sqs-layout').querySelectorAll('.row.sqs-row'));
      team.shift();

      team.map(item => {
        let name = item.querySelector('h2').textContent;
        item.id = name.replace(' ', '_').toLowerCase();
        const paragraphs = item.querySelectorAll('p');

        paragraphs.forEach((paragraph, index) => {
          if (index === 0) {
            const textWithLink = `${paragraph.textContent} <a href="#${item.id}" class="team-bio">Full Bio</a>`;
            paragraph.innerHTML = textWithLink;
            paragraph.classList.add('excerpt');
            return;
          }

          if (index < paragraphs.length -1) {
            paragraph.style.display = 'none';
          }
        });

        return true;
      });

      const members = Array.from(document.querySelector('.sqs-layout').querySelectorAll('.team-bio'));

      members.forEach(member => {
        member.addEventListener('click', event => {
          event.preventDefault();
          const href = member.getAttribute('href');
          const id = href.replace('#', '');

          templateContent.innerHTML = elementMemberFormat(id);

          while (wrapper.firstChild) {
            wrapper.removeChild(wrapper.firstChild)
          }

          wrapper.appendChild(templateContent.content.cloneNode(true));

          lightbox.classList.add('is-open');

          setTimeout(function(){
            preventBodyScrollWhenVisible();
          },1000)

          return false;
        });
      });

      const closeCompany = lightbox.querySelector('.lightbox__close');
      closeCompany.addEventListener('click', () => {
        lightbox.classList.remove('is-open');
        resetBodyPositionWhenNotVisible();
      });
    };
      
    const pathname = window.location.pathname;
    if (pathname.includes('/about')) teamProcess();

    //teamProcess();
})();