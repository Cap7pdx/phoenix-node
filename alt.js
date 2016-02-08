var jsdom = require("jsdom");


jsdom.env(
  "http://google.com/",
  function (err, window) {
    printDOMTree(window.document, 1);
  }
);

var domarray = [];
var domint = 0;
var domString = "";

/**
 * http://www.permadi.com/tutorial/domTree/ - Citation
 * @param currentElement
 * @param depth
 */
function traverseDOMTree(currentElement, depth) {
  if (currentElement && currentElement.nodeType != 3 && currentElement.nodeType != 8) {
    var j;
    var tagName = currentElement.tagName;
    // Prints the node tagName, such as <A>, <IMG>, etc
    if (tagName) {
      domarray[domint++] = "<" + currentElement.tagName + ">";
      if (currentElement.id) {
        domString += "<" + currentElement.tagName + ">" + " Id: " + currentElement.id;
      } else {
        domString += "<" + currentElement.tagName + ">";
      }
    } else {
      domString += "" + currentElement.nodeName;
    }

    // Traverse the tree
    var i = 0;
    var currentElementChild = currentElement.childNodes[i];
    while (currentElementChild) {
      if (currentElementChild.nodeType == 1) {
        domString += "\n";
        for (j = 0; j < depth; j++) {
          domString += "  |";
        }
        domString += "\n";
        for (j = 0; j < depth; j++) {
          domString += "  |";
        }
        if (tagName) {
          domString += "--";
        }
      }

      traverseDOMTree(currentElementChild, depth + 1);
      i++;
      currentElementChild = currentElement.childNodes[i];
    }
    domString += "\n";
    for (j = 0; j < depth - 1; j++) {
      domString += "  |";
    }
    domString += "  ";
  }
  if (tagName) {
    domarray[domint++] = "<" + currentElement.tagName + ">";
    domString += "<" + tagName + ">";
  }
}


/**
 * This function accepts a DOM element as parameter and prints
 * out the DOM tree structure of the element.
 * @param domElement DOM element that need to be pretty printed.
 * @param destinationWindow Where to print DOM Tree?
 */
function printDOMTree(domElement) {
  // Use destination window to print the tree.  If destinationWindow is
  // not specified, create a new window and print the tree into that window

  // Make a valid html page
  console.log("<HTML><HEAD><h1>DOM Tree</h1><TITLE>DOM Tree</TITLE></HEAD><BODY>\n");
  console.log("<CODE>\n");
  // Print the tree
  traverseDOMTree(domElement, 0);
  console.log(domString);
  console.log("\n\n");
  // Print the array
  console.log("Stored tags (in order): " + domarray.toString());
  console.log("\n\n");
  console.log("</CODE>\n");
  console.log("</BODY></HTML>\n");
}
