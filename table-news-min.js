window.location.pathname.includes("/news")&&(()=>{const e="SGV & Portfolio News",t=document.getElementById("newsTitleFilter").querySelector("h1");t.innerText=e;const n=document.getElementById("tableNews").querySelector("tbody").querySelectorAll("tr"),o=[];n.forEach((e=>{const t=e.getAttribute("data-company");o.includes(t)||o.push(t)})),o.sort(((e,t)=>{const n=e.toLowerCase(),o=t.toLowerCase();return n>o?1:n<o?-1:0}));const c=document.getElementById("selectCompanies");o.map((e=>{const t=document.createElement("option");t.setAttribute("value",e);const n=document.createTextNode(e);t.appendChild(n),c.appendChild(t)})),c.addEventListener("change",(o=>{const{value:c}=o.target;c&&(t.innerText="All"===c?e:`${c} News`,n.forEach((e=>{const t=e.getAttribute("data-company");e.style.display="All"===c||t===c?"block":"none"})))}))})();