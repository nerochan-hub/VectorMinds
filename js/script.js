const navbarCollapseDiv = document.getElementById('navbar-collapse');
const navbarShowBtn = document.getElementById('navbar-show-btn');
const navbarCloseBtn = document.getElementById('navbar-close-btn');

navbarShowBtn.addEventListener('click',() => {
    navbarCollapseDiv.classList.add('navbar-collapse-rmw');
});

navbarCloseBtn.addEventListener('click',() => {
    navbarCollapseDiv.classList.remove('navbar-collapse-rmw');
});
const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const overlay = document.getElementById('overlay');
    const loginPanel = document.getElementById('loginPanel');
    const signupPanel = document.getElementById('signupPanel');
    const goSignup = document.getElementById('goSignup');
    const goLogin = document.getElementById('goLogin');
    const closeOverlay = document.getElementById('closeOverlay');


    function openPanel(panel) {
      overlay.style.display = 'flex';
      loginPanel.classList.remove('active');
      signupPanel.classList.remove('active');
      panel.classList.add('active');
    }

    function closePanel() {
      overlay.style.display = 'none';
      signupPanel.classList.remove('active');
      loginPanel.classList.remove('active');
      
    }

    loginBtn.addEventListener('click', () => openPanel(loginPanel));
    signupBtn.addEventListener('click', () => openPanel(signupPanel));
    goSignup.addEventListener('click', () => openPanel(signupPanel));
    goLogin.addEventListener('click', () => openPanel(loginPanel));
    closeOverlay.addEventListener('click', closePanel);

    
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closePanel();
      });
async function searchInternships() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return alert("Please enter a search term");

  const res = await fetch('https://Vector-minds.000webhostapp.com/search.php?q=${encodeURIComponent(query)}');
  const data = await res.json();
  const baseURL = window.location.origin; 
//const res = await fetch(${baseURL}/search.php?q=${encodeURIComponent(query)});
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (data.length === 0) {
    resultsDiv.innerHTML = "<p>No internships found.</p>";
    return;
  }

  data.forEach(intern => {
    const card = document.createElement("div");
    card.innerHTML = `
      <h3>${intern.role}</h3>
      <p><strong>Company:</strong> ${intern.company}</p>
      <p><strong>Location:</strong> ${intern.location}</p>
      <p><strong>Stipend:</strong> ${intern.stipend}</p>
      <p><strong>Duration:</strong> ${intern.duration}</p>
      <p>${intern.description}</p>
      <hr>
    `;
    resultsDiv.appendChild(card);
  });
}