const firebaseConfig = {
  apiKey: "AIzaSyDA7ts0AI64BEQ74IP8Rp5Ai1uaTd1J_Fk",
  authDomain: "mysignupapp-404b9.firebaseapp.com",
  projectId: "mysignupapp-404b9",
  storageBucket: "mysignupapp-404b9.firebasestorage.app",
  messagingSenderId: "789727345137",
  appId: "1:789727345137:web:18d30a22fe71509093ec50",
  measurementId: "G-CRYHMNVWBG"
  };
  // Init Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.database();
  document.getElementById("signUpForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const dob = document.getElementById("dob").value;
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");
    if (!name || !age || !dob || !email || !password) {
      message.textContent = "Please fill out all fields.";
      return;
    }
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        return db.ref("users/" + uid).set({
          name,
          age,
          dob,
          email,
          registeredAt: new Date()
        });
      })
      .then(() => {
        message.style.color = "green";
        message.textContent = "Account created successfully!";
        // Show user profile
        document.getElementById("displayName").textContent = name;
        document.getElementById("displayAge").textContent = age;
        document.getElementById("displayDob").textContent = dob;
        document.getElementById("displayEmail").textContent = email;
        document.getElementById("displayTime").textContent = new Date().toLocaleString();
        document.getElementById("userProfile").style.display = "block";
        document.getElementById("signUpForm").reset();
      })
      .catch((error) => {
        message.style.color = "red";
        message.textContent = error.message;
      });
  });
  