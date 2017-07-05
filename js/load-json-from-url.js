
            document.getElementById("submitURLButton").onclick = function() {


                // Get value of text field
                var urlText = document.getElementById("url").value;

                // Check the text entered contains c.gethopscotch.com, meaning it is a valid url to a Hopscotch project
                var validUrlRegex = /(c\.gethopscotch.com\/p\/)\w+/;
                if (validUrlRegex.test(urlText) == true ) {

                    // Get uuid from URL, based on removing c.gethopscotch.com/p/ from the rest of the URL
                    var EXPECTED_DOMAIN_LENGTH = "c.gethopscotch.com/p/".length;
                    var url_section = urlText.match(validUrlRegex)[0];

                    // Extract uuid from section of url after c.gethopscotch.com/p/
                    var uuid = url_section.substring(EXPECTED_DOMAIN_LENGTH);

                    // Construct new URL with https://hopscotchprojects.s3.amazonaws.com/production/UUID.hopscotch format, for use with Yahoo Query Language
                    var YQLQueryUrl = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22https%3A%2F%2Fhopscotchprojects.s3.amazonaws.com%2Fproduction%2F".concat(uuid, ".hopscotch%22&format=json&diagnostics=true");

                    // Get json from this URL
                    var yqlQueryResults = $.getJSON(YQLQueryUrl, {}, function(json, textStatus) {

                        // query was successful

                        if (yqlQueryResults.readyState == 4) {

                            // Extract project JSON from query results
                            var projectJSON = JSON.parse(yqlQueryResults.responseJSON.query.results.body);
                            getHopscotchData(projectJSON);
                        }
                   });



                } else {
                    alert("This does not appear to be a valid URL to a Hopscotch project");
                    // in future can put a error message on the page, rather than an alert
                }


            };
