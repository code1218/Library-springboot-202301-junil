window.onload = () => {
    RegisterEvent.getInstance().addRegisterSubmitOnclickEvent();
}

class RegisterApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new RegisterApi();
        }
        return this.#instance;
    }

    register(user) {
        $.ajax({
            async: false,
            type: "post",
            url: "/api/account/register",
            contentType: "application/json",
            data: JSON.stringify(user),
            dataType: "json",
            success: response => {
                console.log(response);
            },
            error: error => {
                console.log(error);
            }
        });
    }
}


class RegisterService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new RegisterService();
        }
        return this.#instance;
    }
}


class RegisterEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new RegisterEvent();
        }
        return this.#instance;
    }

    addRegisterSubmitOnclickEvent() {
        const registerSubmit = document.querySelector(".register-submit");

        registerSubmit.onclick = () => {
            const usernameValue = document.querySelectorAll(".register-inputs")[0].value;
            const passwordValue = document.querySelectorAll(".register-inputs")[1].value;
            const nameValue = document.querySelectorAll(".register-inputs")[3].value;
            const emailValue = document.querySelectorAll(".register-inputs")[4].value;

            const user = new User(usernameValue, passwordValue, nameValue, emailValue);

            RegisterApi.getInstance().register(user);
        }
    }
}

class User {
    username = null;
    password = null;
    name = null;
    email = null;

    constructor(username, password, name, email) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.email = email;
    }
}