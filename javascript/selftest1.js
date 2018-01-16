function buildPage() {

  //Afmetingen van body ophalen
  bodyRect = document.body.getBoundingClientRect();
  console.log(bodyRect);

  //Section element in body maken als container
  mainSection = document.createElement("section");
  mainSection.setAttribute("id", "Section1");
  document.body.appendChild(mainSection);

  //Header met een logo en een footer als een clone van de header maken
  header = document.createElement("div");
  header.setAttribute("id", "header");
  header.style.backgroundColor = "black";
  header.style.width = bodyRect.width;
  header.style.height = "80";
  logoContainer = document.createElement("div");
  logoContainer.setAttribute("id", "logoContainer");
  logoContainer.style.position = "fixed";
  logoContainer.style.right = "50px";
  logoContainer.style.top = "20px";
  logoContainer.style.width = "30px";
  logoContainer.style.height = "30px";
  logoContainer.style.backgroundColor = "black";
  logoContainer.innerHTML = "<img src='img/logo.svg' width=60px>";
  footer = header.cloneNode(true);
  footer.setAttribute("id", "footer");
  footer.style.backgroundColor = "black";
  footer.style.position = "absolute";
  footer.style.bottom = "0";

  //Div nodes maken met hun id, style en attributen.
  div1 = document.createElement("div");
  div1.setAttribute("id", "div1");
  div1.style.paddingLeft = "20px";
  div1.className = 'fade';
  div1.style.overflow = "auto";
  div1.style.paddingTop="20px";
  div2 = div1.cloneNode(true);
  div2.setAttribute("id", "div2");
  div2.style.backgroundColor = "#ddd";

  //Paragrafen toevoegen om later te verdelen in de div elementen
  textNode = document.createElement("p");
  textNode.style.textAlign = "left";
  textNode.style.padding = "0px";
  textNode.innerHTML = "<H2>" + div1.id + "</H2>Verander de hoogte en de breedte van" +
    "<br> dit window met een drag van de rechter onderhoek.";
  textNode2 = textNode.cloneNode(true);
  textNode2.innerHTML = "<H2>Div2</H2>" +
    "Browser: " + navigator.appName + " " + navigator.appCodeName + navigator.userAgent +
    "<br> Support:" + GetMimeTypes() +
    "<br> Taalinstelling:" + navigator.language || navigator.userLanguage;

  //Alle elementen verdelen over de `parents`
  document.body.appendChild(header);
  header.appendChild(logoContainer);
  div1.appendChild(textNode);
  mainSection.appendChild(div1);
  div2.appendChild(textNode2);
  mainSection.appendChild(div2);
  document.body.appendChild(mainSection);
  document.body.appendChild(footer);

  //Functie voor het tellen van het aantal elementen in een `parent`
  function getCount(parent, getChildrensChildren) {
    var relevantChildren = 0;
    var children = parent.childNodes.length;
    for (var i = 0; i < children; i++) {
      if (parent.childNodes[i].nodeType != 3) {
        if (getChildrensChildren)
          relevantChildren += getCount(parent.childNodes[i], true);
        relevantChildren++;
      }
    }
    return relevantChildren;
  }

  //Na de `appending` de div elementen gelijk verdelen over de beschikbare hoogte
  header_height = header.offsetHeight;
  footer_height = footer.offsetHeight;
  number_div = getCount(Section1);
  div_height = (bodyRect.height - (header.getBoundingClientRect().height * 2)) / 2;
  div1.style.height = div_height + "px";
  div2.style.height = div_height + "px";

  //De afmetingen van de div elementen aanpassen aan de veranderende afmeting van het windows
  window.addEventListener("resize", function(event) {
    div_height = (document.body.getBoundingClientRect().height - (header.getBoundingClientRect().height * 2)) / 2;
    div1.style.height = div_height;
    div2.style.height = div_height;

    //De 100% width obdersteunen voor een selectie van elementen
    max_width = document.body.getBoundingClientRect().width;
    allNodes = document.getElementsByTagName("*");
    id_array = ["header", "footer", "div1", "div2"];
    for (i = 0; i < allNodes.length; i++) {
      if (id_array.indexOf(allNodes[i].id)  > -1 ) {
          allNodes[i].style.width = max_width;
          console.log(id_array.indexOf(allNodes[i].id) + " | " + allNodes[i].id);
      }
    };

    //De veranderende afmetingen weergeven in div1
    textNode.innerHTML = "<H2>Div1</H2>" +
      "Width: " + div1.getBoundingClientRect().width +
      " <br> height: " + div1.getBoundingClientRect().height +
      " <br> top: " + div1.getBoundingClientRect().top +
      " <br> bottom: " + div1.getBoundingClientRect().bottom +
      " <br> right: " + div1.getBoundingClientRect().right +
      " <br> left: " + div1.getBoundingClientRect().left;

  })

}

//Het onload event gebruiken als start voor de opbouw van de html.
if (window.attachEvent) {
    window.attachEvent('onload', buildPage);
  } else if (window.addEventListener) {
    window.addEventListener('load', buildPage, false);
  } else {
    document.addEventListener('load', fillNode, false);
}

//Ondersteuning JavaScript
function GetMimeTypes() {
    var message = "";
    // Bij internet Explorer blijft dit leeg
    if (navigator.mimeTypes && navigator.mimeTypes.length > 0) {
        var mimes = navigator.mimeTypes;
        for (var i=0; i < mimes.length; i++) {
            message += "<b>" + mimes[i].type + "</b> : " + mimes[i].description + "<br />";
        }
    }
    else {
        message = "Your browser does not support this example!";
    }
    return message;
}
