const companies = [
  {
    name: 'My Company',
    urlLogo: 'https...',
    urlSite: 'https....',
    headquarter: 'San Diego, CA',
    description: '...',
    details: {
        sector: '...',
        partnered: '...',
        sgvInvestments: '...',
        currentStage: '...',
    },
    social: [
      {
        urlLogo: '.',
        urlName: '.',
      }
    ]
  }
]

(function(){
  const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const template = document.createElement('template');
    const closeSVGTemplate =  document.createElement('template');

    closeSVGTemplate.innerHTML = `
      <svg class='desktop-burger' style='vertical-align:middle;' width='32' height='32' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M18.75 53.125V46.875H81.25V53.125H18.75ZM18.75 71.875V65.625H81.25V71.875H18.75ZM18.75 34.375V28.125H81.25V34.375H18.75Z' fill='#07a8f2'/>
      </svg>
    `;

    template.innerHTML = `
      <styless></styles>
    `;

    class Companies extends HTMLElement {
      constructor() {
        super();
        self=this;
        this.attachShadow({mode:'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true));

      }
    }
})();