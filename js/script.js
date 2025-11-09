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

// Signup
document.querySelector('#signupPanel button').addEventListener('click', function() {
    const fullname = document.getElementById('signupName').value;
    const number = document.getElementById('signupNumber').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    fetch('signup.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            fullname: fullname,
            number: number,
            email: email,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
    });
});

// Login
document.querySelector('#loginPanel button').addEventListener('click', function() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    fetch('login.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: email, password: password})
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
    });
});
    


    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closePanel();
      });
function searchInternships(event) {
    event.preventDefault(); 
    
    const searchTerm = document.getElementById('searchInput').value;

    if (!searchTerm) {
        alert("Please enter a search query.");
        return;
    }

    
    const url = `search.php?q=${encodeURIComponent(searchTerm)}`;

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            console.error('Search PHP Error:', data.error);
            return;
        }     
        console.log("Search Results:", data);
 

    })
    .catch(error => {
        console.error('Fetch Error:', error);
        alert('An unexpected error occurred during the search.');
    });
}
/*async function searchInternships() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return alert("Please enter a search term");

  const res = await fetch('https://Vector-minds.000webhostapp.com/search.php?q=${encodeURIComponent(query)}');
  const data = await res.json();
  const baseURL = window.location.origin; 

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (data.length === 0) {
    resultsDiv.innerHTML = "<p>No internships found.</p>";
    return;
  }

  data.forEach(intern => {
    const card = document.createElement("div");
    card.innerHTML = `
      <h3>${internships.role}</h3>
      <p><strong>Company:</strong> ${internships.company}</p>
      <p><strong>Location:</strong> ${internships.location}</p>
      <p><strong>Stipend:</strong> ${internships.stipend}</p>
      <p><strong>Duration:</strong> ${internships.duration}</p>
      <p>${intern.description}</p>
      <hr>
    `;
    resultsDiv.appendChild(card);
  });
}

/*function submitAuthForm(endpoint, data) {
    
    const formData = new URLSearchParams();
    for (const key in data) {
        formData.append(key, data[key]);
    }
    
    
    fetch(endpoint, {
        method: 'POST',
       
        body: formData 
    })
    .then(res => res.json())
    .then(result => {
        alert(result.message);
        if (result.status === 'success') {
            closePanel(); 
        }
    })
    .catch(error => {
        console.error('Fetch Error:', error);
        alert('A network error occurred.');
    });
}


document.querySelector('#signupPanel button').addEventListener('click', function() {
    const fullname = document.getElementById('signupName').value;
    const number = document.getElementById('signupNumber').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    const data = {
        name: fullname,  
        number: number,
        email: email,
        password: password
    };
    
    
    submitAuthForm('signup.php', data); 
    
});



document.querySelector('#loginPanel button').addEventListener('click', function() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const data = {
        email: email,
        password: password
    };

 
    submitAuthForm('login.php', data);
});