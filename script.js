// =========================================
// ELEMENTS
// =========================================

const homePage = document.querySelector(".hero");
const paymentsSection = document.querySelector(".payments-section");
const servicesSection = document.querySelector(".services-section");
const ctaSection = document.querySelector(".cta-section");
const footer = document.querySelector(".footer");

const loginPage = document.getElementById("loginPage");
const registerPage = document.getElementById("registerPage");

const getStarted = document.getElementById("getStarted");


// =========================================
// PAGE VISIBILITY
// =========================================

function showHome() {

    homePage.style.display = "block";
    paymentsSection.style.display = "grid";
    servicesSection.style.display = "block";
    ctaSection.style.display = "block";
    footer.style.display = "block";

    loginPage.classList.remove("active");
    registerPage.classList.remove("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function showLogin() {

    homePage.style.display = "none";
    paymentsSection.style.display = "none";
    servicesSection.style.display = "none";
    ctaSection.style.display = "none";
    footer.style.display = "none";

    registerPage.classList.remove("active");
    loginPage.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    document.getElementById("loginUsername").focus();
}


function showRegister() {

    homePage.style.display = "none";
    paymentsSection.style.display = "none";
    servicesSection.style.display = "none";
    ctaSection.style.display = "none";
    footer.style.display = "none";

    loginPage.classList.remove("active");
    registerPage.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    document.getElementById("registerFullName").focus();
}


// =========================================
// GET STARTED
// =========================================

if (getStarted) {

    getStarted.addEventListener("click", () => {
        showLogin();
    });

}


// =========================================
// CREATE ACCOUNT BUTTON
// =========================================

const showRegisterButton =
    document.getElementById("showRegister");

if (showRegisterButton) {

    showRegisterButton.addEventListener("click", () => {
        showRegister();
    });

}


// =========================================
// LOGIN BUTTON FROM REGISTER PAGE
// =========================================

const showLoginButton =
    document.getElementById("showLogin");

if (showLoginButton) {

    showLoginButton.addEventListener("click", () => {
        showLogin();
    });

}


// =========================================
// BACK TO HOME
// =========================================

const backHomeFromLogin =
    document.getElementById("backHomeFromLogin");

const backHomeFromRegister =
    document.getElementById("backHomeFromRegister");


if (backHomeFromLogin) {

    backHomeFromLogin.addEventListener("click", () => {
        showHome();
    });

}


if (backHomeFromRegister) {

    backHomeFromRegister.addEventListener("click", () => {
        showHome();
    });

}


// =========================================
// LOCAL STORAGE
// =========================================

// Get existing users from localStorage

function getUsers() {

    const users =
        localStorage.getItem("myBankUsers");

    if (!users) {
        return [];
    }

    try {

        return JSON.parse(users);

    } catch (error) {

        console.error(
            "Unable to read stored users.",
            error
        );

        return [];

    }

}


// Save users to localStorage

function saveUsers(users) {

    localStorage.setItem(
        "myBankUsers",
        JSON.stringify(users)
    );

}


// =========================================
// CREATE ACCOUNT
// =========================================

const registerForm =
    document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const fullName =
                document
                    .getElementById("registerFullName")
                    .value
                    .trim();

            const username =
                document
                    .getElementById("registerUsername")
                    .value
                    .trim();

            const accountNumber =
                document
                    .getElementById("registerAccountNumber")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("registerEmail")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("registerPassword")
                    .value;

            const confirmPassword =
                document
                    .getElementById("confirmPassword")
                    .value;

            const message =
                document.getElementById(
                    "registerMessage"
                );


            // -------------------------------
            // VALIDATION
            // -------------------------------

            if (
                !fullName ||
                !username ||
                !accountNumber ||
                !email ||
                !password ||
                !confirmPassword
            ){

                message.textContent =
                    "Please fill in all fields.";

                message.style.color = "#dc2626";

                return;
            }


            if (username.length < 3) {

                message.textContent =
                    "Username must contain at least 3 characters.";

                message.style.color = "#dc2626";

                return;
            }


            if (password.length < 6) {

                message.textContent =
                    "Password must contain at least 6 characters.";

                message.style.color = "#dc2626";

                return;
            }


            if (password !== confirmPassword) {

                message.textContent =
                    "Passwords do not match.";

                message.style.color = "#dc2626";

                return;
            }


            // -------------------------------
            // CHECK EXISTING USER
            // -------------------------------

            const users = getUsers();

            const usernameExists =
                users.some(
                    (user) =>
                        user.username.toLowerCase() ===
                        username.toLowerCase()
                );
            
            const accountNumberExists =
                users.some(
                    (user) =>
                        user.accountNumber ===
                        accountNumber
                );

            if (usernameExists) {

                message.textContent =
                    "This username is already taken.";

                message.style.color = "#dc2626";

                return;
            }

            if (accountNumberExists) {

                message.textContent =
                    "This account number is already registered.";

                message.style.color = "#dc2626";

                return;
            }


            // -------------------------------
            // CREATE USER
            // -------------------------------

           const newUser = {

                id: Date.now(),

                fullName: fullName,

                username: username,

                accountNumber: accountNumber,

                email: email,

                password: password,

                balance: 0,

                transactions: [],

                createdAt:
                    new Date().toISOString()

            };


            users.push(newUser);

            saveUsers(users);


            // -------------------------------
            // SUCCESS
            // -------------------------------

            message.textContent =
                "Account created successfully!";

            message.style.color = "#16a34a";


            registerForm.reset();


            // Wait before going to login

            setTimeout(() => {

                showLogin();

                const loginUsername =
                    document.getElementById(
                        "loginUsername"
                    );

                loginUsername.value =
                    username;

                document
                    .getElementById("loginPassword")
                    .focus();

            }, 1000);

        }
    );

}


// =========================================
// LOGIN
// =========================================

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const username =
                document
                    .getElementById("loginUsername")
                    .value
                    .trim();

            const accountNumber =
                document
                    .getElementById("loginAccountNumber")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("loginPassword")
                    .value;


            const message =
                document.getElementById(
                    "loginMessage"
                );


            // Get stored users

            const users = getUsers();


            // Find matching account

            const user =
                users.find(
                    (account) =>
                        account.username.toLowerCase() ===
                            username.toLowerCase() &&
                        account.accountNumber ===
                            accountNumber &&
                        account.password ===
                            password
    );


            // -------------------------------
            // INVALID LOGIN
            // -------------------------------

            if (!user) {

                message.textContent =
                    "Incorrect username or password.";

                message.style.color = "#dc2626";

                return;
            }


            // -------------------------------
            // LOGIN SUCCESS
            // -------------------------------

            message.textContent =
                `Welcome back, ${user.fullName}!`;

            message.style.color = "#16a34a";


            // Store logged-in user

            localStorage.setItem(
                "myBankCurrentUser",
                 JSON.stringify({

                    id: user.id,

                    fullName: user.fullName,

                    username: user.username,

                    accountNumber: user.accountNumber,

                    email: user.email

                })
            );


            /*
             * For now we simply show a success message.
             *
             * In the next stage we can create the actual
             * banking dashboard that appears after login.
             */


            setTimeout(() => {

                window.location.href = "dashboard.html";

            }, 500);

        }
    );

}


// =========================================
// PASSWORD VISIBILITY
// =========================================

function setupPasswordToggle(
    toggleId,
    inputId
) {

    const toggle =
        document.getElementById(toggleId);

    const input =
        document.getElementById(inputId);


    if (!toggle || !input) {
        return;
    }


    toggle.addEventListener(
        "click",
        () => {

            const icon =
                toggle.querySelector("i");


            if (input.type === "password") {

                input.type = "text";

                icon.classList.remove(
                    "fa-eye"
                );

                icon.classList.add(
                    "fa-eye-slash"
                );

            } else {

                input.type = "password";

                icon.classList.remove(
                    "fa-eye-slash"
                );

                icon.classList.add(
                    "fa-eye"
                );

            }

        }
    );

}


setupPasswordToggle(
    "loginPasswordToggle",
    "loginPassword"
);


setupPasswordToggle(
    "registerPasswordToggle",
    "registerPassword"
);


// =========================================
// SCROLL REVEAL
// =========================================

const revealElements =
    document.querySelectorAll(
        ".payments-section, .service-card, .cta-content, .footer-column"
    );


revealElements.forEach(
    (element) => {

        element.classList.add(
            "reveal"
        );

    }
);


function revealOnScroll() {

    const windowHeight =
        window.innerHeight;


    revealElements.forEach(
        (element) => {

            const elementTop =
                element.getBoundingClientRect()
                    .top;


            if (
                elementTop <
                windowHeight - 100
            ) {

                element.classList.add(
                    "active"
                );

            }

        }
    );

}


revealOnScroll();

window.addEventListener(
    "scroll",
    revealOnScroll
);


// =========================================
// PAYMENT CARD HOVER
// =========================================

const paymentItems =
    document.querySelectorAll(
        ".payment-item"
    );


paymentItems.forEach(
    (item) => {

        item.addEventListener(
            "mouseenter",
            () => {

                const icon =
                    item.querySelector("i");

                if (icon) {
                    icon.style.transform =
                        "scale(1.2)";
                }

            }
        );


        item.addEventListener(
            "mouseleave",
            () => {

                const icon =
                    item.querySelector("i");

                if (icon) {
                    icon.style.transform =
                        "scale(1)";
                }

            }
        );

    }
);


// =========================================
// SERVICE CARD TILT
// =========================================

const serviceCards =
    document.querySelectorAll(
        ".service-card"
    );


serviceCards.forEach(
    (card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -3;


                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    3;


                card.style.transform =
                    `perspective(700px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "perspective(700px) rotateX(0) rotateY(0) translateY(0)";

            }
        );

    }
);


// =========================================
// NAVBAR SCROLL EFFECT
// =========================================

const navbar =
    document.querySelector(".navbar");


if (navbar) {

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 30) {

                navbar.style.background =
                    "rgba(255, 255, 255, 0.9)";

                navbar.style.backdropFilter =
                    "blur(10px)";

                navbar.style.borderRadius =
                    "0 0 10px 10px";

                navbar.style.boxShadow =
                    "0 5px 25px rgba(0, 0, 0, 0.06)";

            } else {

                navbar.style.background =
                    "transparent";

                navbar.style.backdropFilter =
                    "none";

                navbar.style.borderRadius =
                    "0";

                navbar.style.boxShadow =
                    "none";

            }

        }
    );

}


// =========================================
// AUTOMATIC FOOTER YEAR
// =========================================

const footerYear =
    document.querySelector(
        ".footer-bottom p"
    );


if (footerYear) {

    const currentYear =
        new Date().getFullYear();


    footerYear.innerHTML =
        `© ${currentYear} Copyright:
         <strong>Mybank.com</strong>`;

}


// =========================================
// INITIAL PAGE
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        showHome();

        console.log(
            "My Bank website loaded successfully."
        );

    }
);

// =========================================
// BANKING DASHBOARD
// =========================================

const isDashboard =
    document.body.classList.contains(
        "dashboard-body"
    );


if (isDashboard) {

    // -----------------------------------------
    // GET CURRENT USER
    // -----------------------------------------

    const currentUserData =
        localStorage.getItem(
            "myBankCurrentUser"
        );


    // If there is no logged-in user,
    // return to the home page.

    if (!currentUserData) {

        window.location.href =
            "index.html";

    } else {

        const currentUser =
            JSON.parse(currentUserData);


        // -----------------------------------------
        // GET USERS
        // -----------------------------------------

        function getDashboardUsers() {

            const users =
                localStorage.getItem(
                    "myBankUsers"
                );


            if (!users) {
                return [];
            }


            try {

                return JSON.parse(users);

            } catch (error) {

                return [];

            }

        }


        // -----------------------------------------
        // SAVE USERS
        // -----------------------------------------

        function saveDashboardUsers(users) {

            localStorage.setItem(
                "myBankUsers",
                JSON.stringify(users)
            );

        }


        // -----------------------------------------
        // FIND LOGGED-IN USER
        // -----------------------------------------

        let users =
            getDashboardUsers();


        let userIndex =
            users.findIndex(
                (user) =>
                    user.id ===
                    currentUser.id
            );


        if (userIndex === -1) {

            localStorage.removeItem(
                "myBankCurrentUser"
            );

            window.location.href =
                "index.html";

        } else {

            let user =
                users[userIndex];


            // -----------------------------------------
            // INITIALIZE DATA
            // -----------------------------------------

            if (
                typeof user.balance !==
                "number"
            ) {

                user.balance = 0;

            }


            if (
                !Array.isArray(
                    user.transactions
                )
            ) {

                user.transactions = [];

            }


            // -----------------------------------------
            // DISPLAY USER INFORMATION
            // -----------------------------------------

            const navbarUsername =
                document.getElementById(
                    "navbarUsername"
                );

            const welcomeUsername =
                document.getElementById(
                    "welcomeUsername"
                );

            const dashboardAccountNumber =
                document.getElementById(
                    "dashboardAccountNumber"
                );


            if (navbarUsername) {

                navbarUsername.textContent =
                    user.username;

            }


            if (welcomeUsername) {

                welcomeUsername.textContent =
                    user.fullName;

            }


            if (dashboardAccountNumber) {

                dashboardAccountNumber.textContent =
                    user.accountNumber;

            }


            // -----------------------------------------
            // DISPLAY BALANCE
            // -----------------------------------------

            function updateBalance() {

                const balanceAmount =
                    document.getElementById(
                        "balanceAmount"
                    );


                if (balanceAmount) {

                    balanceAmount.textContent =
                        user.balance.toLocaleString(
                            "en-IN",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }
                        );

                }

            }


            updateBalance();


            // -----------------------------------------
            // DISPLAY TRANSACTIONS
            // -----------------------------------------

            function displayTransactions() {

                const history =
                    document.getElementById(
                        "transactionHistory"
                    );


                if (!history) {
                    return;
                }


                history.innerHTML = "";


                if (
                    user.transactions.length ===
                    0
                ) {

                    history.innerHTML = `
                        <div class="history-empty">
                            <i class="fa-solid fa-receipt"></i>
                            <br><br>
                            No transactions yet.
                        </div>
                    `;

                    return;

                }


                // Newest transaction first

                const transactions =
                    [...user.transactions]
                        .reverse();


                transactions.forEach(
                    (transaction) => {

                        const item =
                            document.createElement(
                                "div"
                            );


                        item.className =
                            "history-item";


                        const isDeposit =
                            transaction.type ===
                            "deposit";


                        const icon =
                            isDeposit
                                ? "fa-arrow-down"
                                : "fa-arrow-up";


                        const amountSign =
                            isDeposit
                                ? "+"
                                : "-";


                        const amountClass =
                            isDeposit
                                ? "deposit"
                                : "withdraw";


                        const amount =
                            Number(
                                transaction.amount
                            ).toLocaleString(
                                "en-IN",
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }
                            );


                        const date =
                            new Date(
                                transaction.date
                            ).toLocaleString(
                                "en-IN"
                            );


                        item.innerHTML = `

                            <div class="history-left">

                                <div class="history-icon">

                                    <i class="
                                        fa-solid
                                        ${icon}
                                    "></i>

                                </div>

                                <div class="history-info">

                                    <strong>
                                        ${
                                            isDeposit
                                                ? "Money Deposited"
                                                : "Money Withdrawn"
                                        }
                                    </strong>

                                    <span>
                                        ${date}
                                    </span>

                                </div>

                            </div>


                            <div
                                class="
                                    history-amount
                                    ${amountClass}
                                "
                            >
                                ${amountSign} ₹${amount}
                            </div>

                        `;


                        history.appendChild(
                            item
                        );

                    }
                );

            }


            displayTransactions();


            // -----------------------------------------
            // DEPOSIT
            // -----------------------------------------

            const depositForm =
                document.getElementById(
                    "depositForm"
                );


            if (depositForm) {

                depositForm.addEventListener(
                    "submit",
                    (event) => {

                        event.preventDefault();


                        const amount =
                            Number(
                                document.getElementById(
                                    "depositAmount"
                                ).value
                            );


                        const accountNumber =
                            document.getElementById(
                                "depositAccountNumber"
                            ).value.trim();


                        const message =
                            document.getElementById(
                                "depositMessage"
                            );


                        // Validate amount

                        if (
                            !Number.isFinite(
                                amount
                            ) ||
                            amount <= 0
                        ) {

                            message.textContent =
                                "Please enter a valid amount.";

                            message.style.color =
                                "#dc2626";

                            return;

                        }


                        // Validate account number

                        if (
                            accountNumber !==
                            user.accountNumber
                        ) {

                            message.textContent =
                                "Account number does not match.";

                            message.style.color =
                                "#dc2626";

                            return;

                        }


                        // Add money

                        user.balance += amount;


                        // Save transaction

                        user.transactions.push({

                            type: "deposit",

                            amount: amount,

                            accountNumber:
                                accountNumber,

                            date:
                                new Date()
                                    .toISOString()

                        });


                        // Update user

                        users[userIndex] =
                            user;


                        saveDashboardUsers(
                            users
                        );


                        // Update display

                        updateBalance();

                        displayTransactions();


                        // Message

                        message.textContent =
                            `₹${amount.toLocaleString(
                                "en-IN"
                            )} deposited successfully.`;

                        message.style.color =
                            "#16a34a";


                        // Clear form

                        depositForm.reset();

                    }
                );

            }


            // -----------------------------------------
            // WITHDRAW
            // -----------------------------------------

            const withdrawForm =
                document.getElementById(
                    "withdrawForm"
                );


            if (withdrawForm) {

                withdrawForm.addEventListener(
                    "submit",
                    (event) => {

                        event.preventDefault();


                        const amount =
                            Number(
                                document.getElementById(
                                    "withdrawAmount"
                                ).value
                            );


                        const accountNumber =
                            document.getElementById(
                                "withdrawAccountNumber"
                            ).value.trim();


                        const message =
                            document.getElementById(
                                "withdrawMessage"
                            );


                        // Validate amount

                        if (
                            !Number.isFinite(
                                amount
                            ) ||
                            amount <= 0
                        ) {

                            message.textContent =
                                "Please enter a valid amount.";

                            message.style.color =
                                "#dc2626";

                            return;

                        }


                        // Validate account number

                        if (
                            accountNumber !==
                            user.accountNumber
                        ) {

                            message.textContent =
                                "Account number does not match.";

                            message.style.color =
                                "#dc2626";

                            return;

                        }


                        // Check balance

                        if (
                            amount >
                            user.balance
                        ) {

                            message.textContent =
                                "Insufficient balance.";

                            message.style.color =
                                "#dc2626";

                            return;

                        }


                        // Withdraw money

                        user.balance -= amount;


                        // Save transaction

                        user.transactions.push({

                            type: "withdraw",

                            amount: amount,

                            accountNumber:
                                accountNumber,

                            date:
                                new Date()
                                    .toISOString()

                        });


                        // Update user

                        users[userIndex] =
                            user;


                        saveDashboardUsers(
                            users
                        );


                        // Update display

                        updateBalance();

                        displayTransactions();


                        // Success message

                        message.textContent =
                            `₹${amount.toLocaleString(
                                "en-IN"
                            )} withdrawn successfully.`;

                        message.style.color =
                            "#16a34a";


                        // Clear form

                        withdrawForm.reset();

                    }
                );

            }


            // -----------------------------------------
            // LOGOUT
            // -----------------------------------------

            const logoutButton =
                document.getElementById(
                    "logoutButton"
                );


            if (logoutButton) {

                logoutButton.addEventListener(
                    "click",
                    () => {

                        localStorage.removeItem(
                            "myBankCurrentUser"
                        );


                        window.location.href =
                            "index.html";

                    }
                );

            }

        }

    }

}