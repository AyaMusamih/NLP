const { validateURL } = require("../client/js/urlChecker");

describe('Testing URL validation function', () => {
    it('confirms valid URLs', () => {
        expect(validateURL('https://www.google.com')).toEqual(true);
    });
    
    it('detects invalid URLs', () => {
        expect(validateURL('invalidURL')).toEqual(false);
    });
    
    it('rejects empty strings', () => {
        expect(validateURL('')).toEqual(false);
    });
    
    it('identifies URLs missing a protocol', () => {
        expect(validateURL('www.example.com')).toEqual(false);
    });
    
    it('rejects emails as valid URLs', () => {
        expect(validateURL('example@example.com')).toEqual(false);
    });
});
