var titre;
var artiste;
var prix;
var info;
var image;
var typefichier;

function Init() {
	titre = document.getElementById("titre");
  artiste = document.getElementById("artiste");
  prix = document.getElementById("prix");
  info = document.getElementById("info");
  image = document.getElementById("peinture");
  typefichier = document.getElementById("typefichier");
}

function ChargerInfo(el) {
  Init();
  var Code = el.value;
  var Type = typefichier.value;

  if(Type === "json"){
    LoadJsonDataDoc(Code);
  }
  else {
    LoadXMLDataDoc(Code);
  }	

  LoadInfoTxt(Code);
}

function LoadJsonDataDoc(Code){
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      JSONResponse(JSON.parse(xhr.responseText),Code);
    }
  }
  
  xhr.open("GET", "./ajax/peintures.json", true);
  xhr.send();
}

function LoadXMLDataDoc(Code){
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      XMLResponse(xhr.responseXML,Code);
    }
  }
  
  xhr.open("GET", "./ajax/peintures.xml", true);
  xhr.send();
}

function LoadInfoTxt(Code){
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
      ClearInfo();
      var nodeInfo = document.createTextNode(xhr.responseText);
      info.appendChild(nodeInfo);
		}
	}
  txt = "./ajax/" + Code + ".txt";
	
	xhr.open("GET", txt, true);
	xhr.send();
}

function JSONResponse(json,Code) {
	ClearAll();
	var peinture = json.peinture;
	
	for (i = 0; i < peinture.length; i++) {
      if(peinture[i].code == Code){
          var nodetitre = document.createTextNode(peinture[i].titre);
          titre.appendChild(nodetitre);
          var nodeartiste = document.createTextNode(peinture[i].artiste);
          artiste.appendChild(nodeartiste);
          var nodeprix = document.createTextNode(peinture[i].prix);
          prix.appendChild(nodeprix);
          var nodeimage = document.createTextNode(peinture[i].image);
          // console.log(nodeimage.data);
          image.src = "./img/" + nodeimage.data;
      }
	}
}

function XMLResponse(xml,Code) {
	ClearAll();
	var peinture = xml.getElementsByTagName("peinture");
	
	for (i = 0; i < peinture.length; i++) {
    if(peinture[i].getElementsByTagName("code")[0].firstChild.nodeValue == Code){
      var nodetitre = document.createTextNode(peinture[i].getElementsByTagName("titre")[0].firstChild.nodeValue);
      titre.appendChild(nodetitre);
      var nodeartiste = document.createTextNode(peinture[i].getElementsByTagName("artiste")[0].firstChild.nodeValue);
      artiste.appendChild(nodeartiste);
      var nodeprix = document.createTextNode(peinture[i].getElementsByTagName("prix")[0].firstChild.nodeValue);
      prix.appendChild(nodeprix);
      var nodeimage = document.createTextNode(peinture[i].getElementsByTagName("image")[0].firstChild.nodeValue);
      // console.log(nodeimage.data);
      image.src = "./img/" + nodeimage.data;
    }
	}
}

function ClearAll() {
	while (titre.firstChild) {
		titre.removeChild(titre.firstChild);
	}
  while (artiste.firstChild) {
		artiste.removeChild(artiste.firstChild);
	}
  while (prix.firstChild) {
		prix.removeChild(prix.firstChild);
	}
  while (peinture.firstChild) {
		peinture.removeChild(peinture.firstChild);
	}
}

function ClearInfo() {
	while (info.firstChild) {
		info.removeChild(info.firstChild);
	}
}
