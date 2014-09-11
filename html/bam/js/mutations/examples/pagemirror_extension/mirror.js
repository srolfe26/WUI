// Copyright 2012 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

window.addEventListener('DOMContentLoaded', function() {
  if (typeof WebKitMutationObserver !== 'function') {
    var h1 = document.body.appendChild(document.createElement('h3'));
    h1.textContent = 'This example requires Mutation Observers';

    var a = document.body.appendChild(document.createElement('a'));
    a.textContent = 'Try the Chrome Canary build';
    a.href = 'http://tools.google.com/dlpage/chromesxs';
    return;
  }

  var tabId = Number(location.href.match(/\?tabId=([0-9]*$)/)[1]);
  if (isNaN(tabId))
    return;

  while (document.firstChild) {
    document.removeChild(document.firstChild);
  }

  var base;

  var mirror = new TreeMirror(document, {
    createElement: function(tagName) {
      if (tagName == 'SCRIPT') {
        var node = document.createElement('NO-SCRIPT');
        node.style.display = 'none';
        return node;
      }

      if (tagName == 'HEAD') {
        var node = document.createElement('HEAD');
        node.appendChild(document.createElement('BASE'));
        node.firstChild.href = base;
        return node;
      }
    }
  });

  var port = chrome.tabs.connect(tabId);

  port.onMessage.addListener(function(msg) {
    if (msg.base)
      base = msg.base;
    else
      mirror[msg.f].apply(mirror, msg.args);
  });

  port.onDisconnect.addListener(function(msg) {
    window.close();
  });
});