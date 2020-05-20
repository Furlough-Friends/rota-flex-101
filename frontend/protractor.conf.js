// conf.js
exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['test/specs/testSpec.js'], 
    onPrepare: function () {
        //Ignores page wait for Angular
        browser.ignoreSynchronization = true;
    }    
  }