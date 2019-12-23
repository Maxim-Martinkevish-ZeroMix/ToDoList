export default new class Filters {
    constructor() {
    }
    filterFinButton = () => {
        document.querySelectorAll('li').forEach((li, id) => {
            li.style.display = '';
            if (li.classList.contains('checked') === false && li.classList.contains('listItem')) {
                li.style.display = 'none';
            }
        })
    }
    filterUnFinButton = () => {
        document.querySelectorAll('li').forEach((li, id) => {
            li.style.display = '';
            if (li.classList.contains('checked') === true) {
                li.style.display = 'none';
            }
        })
    }
    filterAllButton = () => {
        document.querySelectorAll('li').forEach((li, id) => {
            li.style.display = '';
        })
    }
}