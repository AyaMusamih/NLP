const { handleSubmit } = require("../client/js/formHandler");

beforeEach(() => {
    let elements = [
        { tag: 'form', id: 'testForm' },
        { tag: 'input', id: 'inputField', type: 'text' },
        { tag: 'section', id: 'output' }
    ];
    
    document.body.innerHTML = '';
    elements.forEach(el => {
        let newElement = document.createElement(el.tag);
        if (el.id) newElement.id = el.id;
        if (el.type) newElement.type = el.type;
        document.body.appendChild(newElement);
    });
});

describe('handleSubmit function verification', () => {
    test('should be properly defined', () => {
        expect(typeof handleSubmit === 'function').toBeTruthy();
    });
});
