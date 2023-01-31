window.onload = () => {
    BookRegisterService.getInstance().loadCategories();

    ComponentEvent.getInstance().addClickEventRegisterButton();
    ComponentEvent.getInstance().addClickEventImgAddButton();
    ComponentEvent.getInstance().addChangeEventImgFile();
}

const bookObj = {
    bookCode: "",
    bookName: "",
    author: "",
    publisher: "",
    publicationDate: "",
    category: ""
}

const fileObj = {
    files: new Array()
}

class BookRegisterApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new BookRegisterApi();
        }
        return this.#instance;
    }

    registerBook() {
        let successFlag = false;

        $.ajax({
            async: false,
            type: "post",
            url: "http://127.0.0.1:8000/api/admin/book",
            contentType: "application/json",
            data: JSON.stringify(bookObj),
            dataType: "json",
            success: response => {
                successFlag = true;
            },
            error: error => {
                console.log(error);
            }

        });

        return successFlag;
    }

    getCategories() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://127.0.0.1:8000/api/admin/categories",
            dataType: "json",
            success: response => {
                responseData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });

        return responseData;
    }

}

class BookRegisterService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new BookRegisterService();
        }
        return this.#instance;
    }

    setBookObjValues() {
        const registerInputs = document.querySelectorAll(".register-input");

        bookObj.bookCode = registerInputs[0].value;
        bookObj.bookName = registerInputs[1].value;
        bookObj.author = registerInputs[2].value;
        bookObj.publisher = registerInputs[3].value;
        bookObj.publicationDate = registerInputs[4].value;
        bookObj.category = registerInputs[5].value;
    }

    loadCategories() {
        const responseData = BookRegisterApi.getInstance().getCategories();

        const categorySelect = document.querySelector(".category-select");
        categorySelect.innerHTML = `<option value="">전체조회</option>`;

        responseData.forEach(data => {
            categorySelect.innerHTML += `
                <option value="${data.category}">${data.category}</option>
            `;
        });
    }
}


class ImgFileService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ImgFileService();
        }
        return this.#instance;
    }

    getImgPreview() {
        const bookImg = document.querySelector(".book-img");

        const reader = new FileReader();

        reader.onload = (e) => {
            bookImg.src = e.target.result;
        }

        reader.readAsDataURL(fileObj.files[0]);

    }
}


class ComponentEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ComponentEvent();
        }
        return this.#instance;
    }

    addClickEventRegisterButton() {
        const registerButton = document.querySelector(".register-button");

        registerButton.onclick = () => {
            BookRegisterService.getInstance().setBookObjValues();
            const successFlag = BookRegisterApi.getInstance().registerBook();
            
            if(!successFlag) {
                return;
            }

            if(confirm("도서 이미지를 등록하시겠습니까?")) {
                const imgAddButton = document.querySelector(".img-add-button");
                const imgRegisterButton = document.querySelector(".img-register-button");
    
                imgAddButton.disabled = false;
                imgRegisterButton.disabled = false;
            }else {
                location.reload();
            }
        }

    }

    addClickEventImgAddButton() {
        const imgFile = document.querySelector(".img-file");
        const addButton = document.querySelector(".img-add-button");

        addButton.onclick = () => {
            imgFile.click();
        }
    }

    addChangeEventImgFile() {
        const imgFile = document.querySelector(".img-file");

        imgFile.onchange = () => {
            const formData = new FormData(document.querySelector(".img-form"));
            let changeFlag = false;

            fileObj.files.pop();

            formData.forEach(value => {
                console.log(value);

                if(value.size != 0) {
                    fileObj.files.push(value);
                    changeFlag = true;
                }
            });

            if(changeFlag) {
                ImgFileService.getInstance().getImgPreview();
                imgFile.value = null;
            }

        }
    }
}