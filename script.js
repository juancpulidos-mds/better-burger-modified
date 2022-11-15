(function(){
    const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const template = document.createElement('template');
    const burgerSVGTemplate =  document.createElement('template');

    burgerSVGTemplate.innerHTML = `
<svg class="desktop-burger" style="vertical-align:middle;" width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.75 53.125V46.875H81.25V53.125H18.75ZM18.75 71.875V65.625H81.25V71.875H18.75ZM18.75 34.375V28.125H81.25V34.375H18.75Z" fill="#07a8f2"/>
</svg>
    `;
    template.innerHTML = `
    <style>
      :host {
        display: block;
        visibility: hidden;
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index:9999;
        background-color: rgba(255,255,255,0.5);
      }

      :host(.is-open) {
        visibility:visible;
      }

      :host(.is-open) .wrapper {
        visibility:visible;
        transform: translate(0%,0%);
      }

      :host(.is-open) .burgerToggle {
        opacity: 1;
      }

      .wrapper {
        display: block;
        visibility: hidden;
        position: fixed;
        /* Update */
        background: white;
        top: 0;
        right:0;
        width: 280px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;
        z-index:10000;  
        font-family: inherit;
        box-shadow: -5px 0px 5px 0px rgba(0,0,0,0.2);
        transform: translate(100%,0%);
        transition: all 0.6s cubic-bezier(0.85, 0, 0.15, 1);
        padding: 60px 0 100px 50px;
      }
  
      ::slotted(*) {
        font-family: inherit;
        opacity: 0;
      }
    
      .burgerToggle {
          position: absolute;
          top: 28px;
          right: 28px;
          z-index:10001;
          opacity: 0;
          transition: opacity 0.8s cubic-bezier(0.85, 0, 0.15, 1);
          cursor: pointer;
      }

      .burgerToggle svg {
          width: 32px;
          height: 32px;
          vertical-align:middle;
          cursor: pointer;
      }

      /* Custom css to new burger menu */
      .header-nav-item,
      .header-nav-item-active {
        font-size: 1.6rem;
        opacity: 0;
        padding: 1.0rem .8rem;
        text-decoration: none;
        color: #081b33;
        font-weight: 600;
        font-style: normal;
        letter-spacing: .08em;
        line-height: 1.6rem;
        transition: left 0ms linear 100ms;
      }

      .header-nav-item:active,
      .header-nav-item-active {
        color: #07a8f2;
        font-weight: 700;
        text-decoration: none;
      }

      .header-nav-item:hover {
        color: #07a8f2;
        text-decoration: none;
      }

      .header-nav-item-mobile {
        font-size: 1.4rem !important;
        padding: .3rem .8rem !important;
      }

      @media (min-width: 768px) {
        .wrapper {
          width: 280px;
          padding-top: 100px;
        }
        .header-nav-item,
        .header-nav-item-active {
          font-size: 1.8rem;
        }
      }

      @media (min-width: 1024px) {
        .wrapper {
          width: 300px;
        }
      }

      @media (orientation: landscape) {
        .wrapper {
          padding-top: 60px;
        }
      }

      @media (orientation: portrait) {
        :host {
          display: none;
          visibility: hidden;
        }
      }

    </style>
    <slot></slot>
    <div class="wrapper"></div>
    <div part="burgerToggle" class="burgerToggle"><svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25.6939 30.1128L30.1133 25.6934L74.3075 69.8875L69.888 74.3069L25.6939 30.1128Z" fill="DimGray"/>
    <path d="M30.1108 74.3071L25.6914 69.8877L69.8856 25.6935L74.305 30.1129L30.1108 74.3071Z" fill="DimGray"/>
    </svg>
    </div>
    `;
    class BetterBurger extends HTMLElement {
        constructor() {
            super()
            self=this;
            this.attachShadow({mode:'open'})
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            this.wrapper = this.shadowRoot.querySelector('.wrapper');
            this.burger = self.getBurgerMenu();
            this.links = this.burger.lastElementChild.querySelectorAll('a');

            // clean burger container and add icon
            this.burger.textContent='';
            this.burger.appendChild(burgerSVGTemplate.content.cloneNode(true));
            this.burgerToggle = this.shadowRoot.querySelector('.burgerToggle');

            this.burger.addEventListener('click', function() {
                self.classList.add('is-open');
              setTimeout(function() {
                  self.animateLinks();
              },120)
            });

            this.burgerToggle.addEventListener('click', function() {
                self.classList.remove('is-open');
            });
        }

        getBurgerMenu() {
          // if there are more tha two items, then we need to determine the burguer item
          const folders = Array.from(document.querySelectorAll('.nav-item.folder'));
          return folders.filter(el => el.textContent.includes('/burger'))[0];
        }

        animateLinks() {
            const links = this.wrapper.querySelectorAll('a');
            links.forEach((link, index) => {
                link.style.opacity = "0";
                link.animate(
                  {
                    opacity: ["0", "1"],
                    transform:[
                        "translateY(12px)","translateY(0px)"
                    ],
                    transform: ["scale(1.2)","scale(1)"]
                  },
                  {
                    duration: parseInt(500, 10),
                    delay: (index + 1) * 150,
                    fill: "both",
                    easing: "ease-in-out"
                  }
                );
              })
         };

         setLinks() {
          this.links.forEach(link => {
            const pathname = window.location.pathname;
            const exactHref = [link.getAttribute('href')];
            const myClass = exactHref.includes(pathname) ? 'header-nav-item-active' : 'header-nav-item';
            link.classList.add(myClass);
            if (isMobile()) {
              link.classList.add('header-nav-item-mobile');
            }
            this.wrapper.appendChild(link);
          })
         }

        connectedCallback() {
          this.setLinks();
        }
    }
    window.customElements.define('better-burger', BetterBurger)
})();
