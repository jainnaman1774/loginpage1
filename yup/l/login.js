var firebaseConfig = {
    apiKey: "AIzaSyChWbnJTTovdRCWJT8pjn_5wC6TUs6RVjM",
    authDomain: "weblogin-2ae66.firebaseapp.com",
    projectId: "weblogin-2ae66",
    storageBucket: "weblogin-2ae66.appspot.com",
    messagingSenderId: "50901765251",
    appId: "1:50901765251:web:5f7bc03421ceef40a1dfb6",
    measurementId: "G-HVB731EGSB"
};

firebase.initializeApp(firebaseConfig);

function checkEmailVerification() {
    var user = firebase.auth().currentUser;

    if (user && !user.emailVerified) {
        alert('Already Registered. Please check your inbox for a verification email.');
        window.open("login.html", "_self");
    } else {
        return true;
    }
}

function validate(event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(username, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log('Logged in as:', user.email);
            
            if(checkEmailVerification()){
                //alert("Login Successfully");
                window.open("home.html", "_self");
            }
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/too-many-requests') {
                alert('Too many attempts. Please try again later.');
            } else {
                alert("Login Failed");
            }
        });
}

function registerUser(event) {
    event.preventDefault();
    var fullName = document.getElementById('full_name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm_password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log('User registered:', user.email);
            user.sendEmailVerification()
                .then(() => {
                    alert('Registration successful. Verification email sent. Please verify your email.');
                    window.open("login.html", "_self");
                })
                .catch((error) => {
                    console.error('Email verification error:', error.message);
                });
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (checkEmailVerification() && errorCode === 'auth/email-already-in-use') {
                alert('Email is already registered. Please login instead.');
                window.open("login.html", "_self");
            } else {
                console.error('Registration error:', errorMessage);
            }
        });
}
