#!/bin/bash

# ##################################################
# Make A WUI Application package based on a namespace and project name passed in.
# @param  string  Namespace of the JS Application
# @param  string  Name of the Application that will be used in page title and for the folder 
#                 name (whitespace replaced, so 'Sample App' gets changed to 'sample-app')


#handle parameters
namespace=$1
dirName="$(echo -e "${2}" | tr ' ' '-' | tr '[:upper:]' '[:lower:]')"

# Determines if something is a directory
function is_dir() {
  if [[ -d "$1" ]]; then
    return 0
  fi
  return 1
}


# Non destructive exit for when script exits naturally.
# Usage: Add this function at the end of every script
function safeExit() {
  # Delete temp files, if any
  if is_dir "${tmpDir}"; then
    rm -r "${tmpDir}"
  fi
  trap - INT TERM EXIT
  exit
}

#exits with a message
function die () { 
    local _message="${@} Exiting."; 
    echo "$_message"; 
    safeExit;
}

# Set Temp Directory
# -----------------------------------
# Create temp directory with two random numbers and the process ID
# in the name.  This directory is removed automatically at exit.
# -----------------------------------
tmpDir="/tmp/${scriptName}.$RANDOM.$RANDOM.$$"
(umask 077 && mkdir "${tmpDir}") || {
  die "Could not create temporary directory! Exiting."
}

# Make the files
mkdir -p "${tmpDir}/${dirName}/resources/css/fonts"
mkdir -p "${tmpDir}/${dirName}/resources/js"
mkdir -p "${tmpDir}/${dirName}/resources/img"

touch "${tmpDir}/${dirName}/resources/css/main.css"
touch "${tmpDir}/${dirName}/resources/js/appSetup.js"
touch "${tmpDir}/${dirName}/resources/js/utils.js"
touch "${tmpDir}/${dirName}/resources/js/MainView.js"
touch "${tmpDir}/${dirName}/resources/js/MainController.js"
touch "${tmpDir}/${dirName}/index.html"

# Fill main.css with default
echo "html, body {
    margin: 0;
    padding: 0;
}

* {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}" > "${tmpDir}/${dirName}/resources/css/main.css"


# Fill appSetup.js with default
echo "var ${namespace} = ${namespace} || {};
${namespace}.view = ${namespace}.view || {};
${namespace}.instance = ${namespace}.instance || {};
${namespace}.util = ${namespace}.limited || {};
${namespace}.state = ${namespace}.state || {};

_wuiVar = 'Wui';

(function(${namespace},Wui,$){

// Set the default request type to post
\$.ajaxSetup({
    type:       'POST',
    dataType:   'json',
    headers:    { \"cache-control\": \"no-cache\" }
});

// Set up state machine

${namespace}.state = new Wui.stateMachine();

// Handles errors and authentication problems - If an authentication problem it will re-run the request once the authentication window is closed.
\$.ajaxPrefilter(function( originalAjaxSettings, options, jqXHR ) {
    // preserve original error handler
    originalAjaxSettings.origError = originalAjaxSettings.origError || originalAjaxSettings.error;

    // overwrite error handler for current request
    originalAjaxSettings.error = function( response ){
        if(response.status == 401){
            new Wui.Window({
                title:      'Your session has expired. Please login again.',
                width:      600,
                height:     400,
                onWinClose: function(){ \$.ajax(originalAjaxSettings); },
                items:      [ new Wui.O({el:\$('<iframe>').css({border:0, height:'100%', width:'100%'}).attr({src:response.responseText})}) ]
            });
        }else if(jqXHR.getAllResponseHeaders()){
            var err = \$.parseJSON( response.responseText ) || {fatalError:'Aw Snap! There was a problem talking to the server.'};
            console.log(newErr = new Wui.Window({
                title:      'Error On Server',
                items:      [ new Wui.O({ el: \$(err.fatalError) }) ],
                isModal:    true,
                onWinClose: originalAjaxSettings.origError,
                width:      600,
                height:     400
            }));
        }
    };
});


}(${namespace},window[_wuiVar],jQuery));" > "${tmpDir}/${dirName}/resources/js/appSetup.js"


# Fill utils.js with default
echo "(function(${namespace},Wui,$){

${namespace}.util = {
    someUtilFn:     function(bytes) {

                    }
};

}(${namespace},window[_wuiVar],jQuery));" > "${tmpDir}/${dirName}/resources/js/utils.js"


# Fill MainView.js with default
echo "(function(${namespace},Wui,$){


/** Main file viewer of the app */
${namespace}.view.MainView = function(args){
    return new Wui.Pane(\$.extend({},{
        // Add object specific configs here
    },args));
};


}(${namespace},window[_wuiVar],jQuery));" > "${tmpDir}/${dirName}/resources/js/MainView.js"


# Fill MainController.js with default
echo "(function(${namespace},Wui,$){


(function(me){
    // Listeners
    \$(document).on('wuibtnclick','[name=btn_name]',me.controllerFn);
        // .on('wuichange','[name=${namespace}viewer]', me.showDetails)
        // .on('keypress','input[name=prefix_str]', me.gotoPrefix )
        // .on('click','.clickable-path a', me.locationLink)
        // .on('valchange','[name=pt_story]',me.toggleComments)
        
    \$(document).ready(function(){
        \$(window).resize(function(){
            ${namespace}.instance.mainView.height = \$.viewportH();
            ${namespace}.instance.mainView.layout();
        });
        \$(window).resize();
    });

// CONTROLLER METHODS
}(${namespace}.MainController = {
    controllerFn:   function(evnt,btn){

    }
}));


}(${namespace},window[_wuiVar],jQuery));" > "${tmpDir}/${dirName}/resources/js/MainController.js"

# Fill index.html with default
echo "<!doctype html>
<html class=\"no-js\" lang=\"\">
<head>
    <meta charset=\"utf-8\">
    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\">
    <title>${2}</title>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
</head>
<body>
    <link href=\"../wui-1-2/css/wui-min.css\" rel=\"stylesheet\">
    <link href=\"resources/css/main.css\" rel=\"stylesheet\">
    
    <script type=\"application/javascript\" src=\"../wui-1-2/js/wui-1-2-min.js\"></script>
    <script type=\"application/javascript\" src=\"https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js\"></script>
    
    <script type=\"application/javascript\" src=\"resources/js/appSetup.js\"></script>
    <script type=\"application/javascript\" src=\"resources/js/utils.js\"></script>
    <script type=\"application/javascript\" src=\"resources/js/MainView.js\"></script>
    <script type=\"application/javascript\" src=\"resources/js/MainController.js\"></script>
    <script type=\"application/javascript\">
        ${namespace}.instance.mainView = new ${namespace}.view.MainView({
            width:      '100%',
            height:     '100%',
            title:      '${2}'
            // Add instance specific configs here
        });
        ${namespace}.instance.mainView.place();
    </script>
</body>
</html>" > "${tmpDir}/${dirName}/index.html"

#copy files to their final destination
cp -r "${tmpDir}/${dirName}" "./"

# -----------------------------------
# Give success message and cleanup temp directory
# -----------------------------------
echo "

Successfully created the '${dirName}' directory containing a WUI app with namespace '${namespace}'."
safeExit
