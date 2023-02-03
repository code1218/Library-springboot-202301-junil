window.onload = () => {
    ComponentEvent.getInstance().addClickEventCategoryCheckboxs();
}

const searchObj = {
    page: 1,
    searchValue: null,
    categories: new Array(),
    count: 10
}

class SearchApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new SearchApi();
        }
        return this.#instance;
    }


}

class SearchService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new SearchService();
        }
        return this.#instance;
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

    addClickEventCategoryCheckboxs() {
        const checkboxs = document.querySelectorAll(".category-checkbox");

        checkboxs.forEach(checkbox => {
            checkbox.onclick = () => {
                if(checkbox.checked) {
                    searchObj.categories.push(checkbox.value);
                }else {
                    searchObj.categories.pop(searchObj.categories.indexOf(checkbox.value));
                }
                console.log(searchObj.categories);
            }
        });
    }
}