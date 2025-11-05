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