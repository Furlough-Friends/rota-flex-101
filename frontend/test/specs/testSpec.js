// spec.js
describe('Login page tests', () => {
    it('Should load the correct elements', async ()  => {
        let headerDiv = element(by.className('landing_landing__ckBbE')); 
        let welcome = element(by.className('landing_header__3qjNB'));
        let toRotaFlex = element(by)
        await browser.get('http://localhost:3000');
    
        expect(await welcome.getText()).toEqual('Welcome'); 
      });

    });