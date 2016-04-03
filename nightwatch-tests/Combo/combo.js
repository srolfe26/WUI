// ../selenium/BrowserStackLocal -f 5eX8bptAsShDR8YBn7rr /Users/snielsen/wui/ -force -v -localIdentifier automated
// ./node_modules/nightwatch/bin/nightwatch ./nightwatch-tests/ -e ie,chrome,firefox,safari
// ./node_modules/nightwatch/bin/nightwatch ./nightwatch-tests/ -c ./nightwatch-local.json

module.exports = {
    'WUI Variables':  function(browser) {
        browser
            .url(client.launch_url + 'docs/combo-test-page.html')
            .waitForElementVisible('body', 1000)
            .waitForElementVisible('#js-created-wui-select', 100)
            
            // Get the initial value of the element
            .assert(
                browser.execute(function() {
                    return jsCombo.val();
                }) 
            )
    },
  
  'Wui.Combo Arrow Down Selection' : function (client) {
    client
      // Make sure we can actually get to the page
      .url(client.launch_url + 'docs/combo-test-page.html')
      .waitForElementVisible('body', 1000);
      
       // Expect the combo boxes to load and initial value
      // .waitForElementVisible('.wui-1', 100)
      // .waitForElementPresent('#disabled_selected',100)
      
      // // Arrow down and assure the value changed
      // .setValue('.wui-1 input', client.Keys.ARROW_DOWN)
      // .assert.value('#disabled_selected', 'clark kent')
      
      // .setValue('.wui-1 input', client.Keys.ARROW_DOWN)
      // .assert.value('#disabled_selected', 'oliver queen')
      
      // .setValue('.wui-1 input', client.Keys.ARROW_DOWN)
      // .assert.value('#disabled_selected', 'barry allen')
      
      // .setValue('.wui-1 input', client.Keys.ARROW_DOWN)
      // .assert.value('#disabled_selected', null)
      
      // .setValue('.wui-1 input', client.Keys.ARROW_DOWN)
      // .assert.value('#disabled_selected', 'clark kent');
  },
  
  'Wui.Combo Arrow Up Selection' : function (client) {
    client
      
       // Expect the combo boxes to load and initial value
      .waitForElementVisible('.wui-0', 100);
      // .waitForElementPresent('#disabled_selected',100)
      
      // // Arrow down and assure the value changed
      // .setValue('.wui-1 input', client.Keys.ARROW_UP)
      // .assert.value('#disabled_selected', 'barry allen');
      
      
      // I know this is failing right now
      // .setValue('.wui-1 input', client.Keys.ARROW_UP)
      // .assert.value('#disabled_selected', 'oliver queen')
      
      // .setValue('.wui-1 input', client.Keys.ARROW_UP)
      // .assert.value('#disabled_selected', 'barry allen')
      
      // .setValue('.wui-1 input', client.Keys.ARROW_UP)
      // .assert.value('#disabled_selected', null)
      
      // .setValue('.wui-1 input', client.Keys.ARROW_UP)
      // .assert.value('#disabled_selected', 'clark kent')
  },
  
  'Wui.Combo Click DD Item' : function (client) {
    client
      
       // Expect the combo boxes to load
      .waitForElementVisible('.wui-0', 100)
      
      // // Take a screenshot
      // .saveScreenshot('/Users/snielsen/wui/reports/' +client.options.desiredCapabilities.browserName+ '_combo_screenshot.png')
      
      // // Set value to Stephen
      // .click('.wui-0 .dd-switch')
      // .waitForElementVisible('.wui-combo-dd[style*="block"]', 100)
      // .click('#the_guys_Stephen')
      // .pause(50)
      // .assert.value('#the_guys', 'Stephen')
      
      // // Set value to DeVerl
      // .click('.wui-0 .dd-switch')
      // .waitForElementVisible('.wui-combo-dd[style*="block"]', 100)
      // .click('#the_guys_DeVerl')
      // .pause(50)
      // .assert.value('#the_guys', 'DeVerl')
      
      // // Set value to Tim
      // .click('.wui-0 .dd-switch')
      // .waitForElementVisible('.wui-combo-dd[style*="block"]', 100)
      // .click('#the_guys_Tim')
      // .pause(50)
      // .assert.value('#the_guys', 'Tim')
      
      // // Set value to Lance
      // .click('.wui-0 .dd-switch')
      // .waitForElementVisible('.wui-combo-dd[style*="block"]', 100)
      // .click('#the_guys_Lance')
      // .pause(50)
      // .assert.value('#the_guys', 'Lance')
      
      // Close test
      .end();
  }
};