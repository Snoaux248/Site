function createNewElement(ElementType, Identification, Classification){
    var node = document.createElement(ElementType);
    if(!(Identification === null)){
        node.id = Identification;
    }
    if(!(Classification === null)){
        node.className = Classification;
    }
    return node;
}

function Dynamic_Generation(type, column){
    if(type == "link"){
        generate_Link(column);
        console.log("g1");
    }else if(type == "definition"){
        generate_Knowledge(column);
        console.log("g2");
    }else if(type == "graph2d"){
        generate_Graph(column, "2d");
        console.log("g3");
    }else if(type == "graph3d"){
        generate_Graph(column, "3d");
        console.log("g3");
    }
}

function generate_Link(location){
    let d = document.querySelector("#Col" + location);
    var links = d.getElementsByClassName("PageResult");
    var iframe = d.getElementsByClassName("pageResultIframe");
    var l = links.length + iframe.length;


  //pageResultInformation
    d.appendChild(createNewElement('div', null, 'PageResult hyperlink'));
    d.children[l].setAttribute('type', 'hyperlink');
    d.children[l].appendChild(createNewElement('div', null, 'pageResultInformation'));
    d.children[l].children[0].appendChild(createNewElement('div', null, 'resultPadding'));
    d.children[l].children[0].children[0].appendChild(createNewElement('a', null, 'PageLink'));
    d.children[l].children[0].children[0].children[0].href = "https://www.apple.com";
    d.children[l].children[0].children[0].children[0].innerHTML = "Apple.com";
    d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'PagePublish'));
    d.children[l].children[0].children[0].children[1].innerHTML = "Published: Eternity";
    d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'PageDescription'));
    d.children[l].children[0].children[0].children[2].innerHTML = "Iphone 12x24 max mini pro negative -2 aliquam malesuada bibendum arcu vitae.     Velit dignissim sodales ut eu sem integer vitae justo. Nisl purus in mollis nunc sed    i";
    d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'Keywords'));
    d.children[l].children[0].children[0].children[3].innerHTML = "Found Keywords: 1,2,3,4";
    d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'MKeywords'));
    d.children[l].children[0].children[0].children[4].innerHTML = "Missing Keywords: 5,6,7,8";

    //description
    
    //pageResultDisclaimer
    d.children[l].appendChild(createNewElement('div', null, 'pageResultDisclaimer'));
    d.children[l].children[1].appendChild(createNewElement('div', null, 'resultPadding'));

    d.children[l].appendChild(createNewElement('button', null, 'pageResultButtonH'));
    d.children[l].children[2].innerHTML = "description";

    d.children[l].querySelector(".pageResultButtonH").addEventListener('click', DisplayFlag);
    
}

function generate_Knowledge(location){
    let d = document.querySelector("#Col" + location);
    var links = d.getElementsByClassName("PageResult");
    var iframe = d.getElementsByClassName("pageResultIframe");
    var l = links.length + iframe.length;


  
    d.appendChild(createNewElement('div', null, 'PageResult definition'));
    d.children[l].setAttribute('type', 'definition');
    d.children[l].appendChild(createNewElement('div', null, 'pageResultInformation'));
    d.children[l].children[0].appendChild(createNewElement('div', null, 'resultPadding'));
    d.children[l].children[0].children[0].appendChild(createNewElement('h', null, 'DeffWordSound'));
    d.children[l].children[0].children[0].children[0].innerHTML = "Deffinition of _____ ";

    d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'deffWordIn'));
    d.children[l].children[0].children[0].children[1].innerHTML = "_____ in Chemestry:";
    d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'WordDeff'));
    d.children[l].children[0].children[0].children[2].innerHTML = "- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do     eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo       consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse     cillum    dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non    proident,    sunt in culpa qui officia deserunt mollit anim id est laborum.";
    d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'WordSyn'));
    d.children[l].children[0].children[0].children[3].innerHTML = "Synonyms: ";
    d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'etymology'));
    d.children[l].children[0].children[0].children[4].innerHTML = "Etymology of _____ ";

    //description
    
    //pageResultDisclaimer
    d.children[l].appendChild(createNewElement('div', null, 'pageResultDisclaimer'));
    d.children[l].children[1].appendChild(createNewElement('div', null, 'resultPadding'));

    d.children[l].appendChild(createNewElement('button', null, 'pageResultButtonH'));
    d.children[l].children[2].innerHTML = "description";

    let EL1 = d.getElementsByClassName('pageResultButtonH');
    EL1[links.length-1].addEventListener('click', DisplayFlag);
}

function generate_Graph(location, type){
    let d = document.querySelector("#Col" + location);
    var links = d.getElementsByClassName("PageResult");
    var iframe = d.getElementsByClassName("pageResultIframe");
    var l = links.length + iframe.length;

    d.appendChild(createNewElement('div', null, 'pageResultIframe external_link'));
    d.children[l].setAttribute('type', 'external_link');
    d.children[l].appendChild(createNewElement('div', null, 'pageResultInformation'));
    d.children[l].children[0].appendChild(createNewElement('div', null, 'iframeResultPadding'));

    d.children[l].children[0].children[0].appendChild(createNewElement('iframe', null, 'graph'));
    if(type === "2d"){
        d.children[l].children[0].children[0].children[0].src = "https://www.desmos.com/calculator/qvwwggxb93";
    }else if(type === "3d"){
        d.children[l].children[0].children[0].children[0].src = "https://www.desmos.com/3d";
    }

    d.children[l].appendChild(createNewElement('div', null, 'pageResultDisclaimer'));
    d.children[l].children[1].appendChild(createNewElement('div', null, 'resultPadding'));

    d.children[l].appendChild(createNewElement('button', null, 'iframeResultButtonK'));
    d.children[l].children[2].innerHTML = "fullscreen";
    d.children[l].appendChild(createNewElement('button', null, 'pageResultButtonH'));
    d.children[l].children[3].innerHTML = "description";

    d.children[l].querySelector(".pageResultButtonH").addEventListener('click', DisplayFlag);
    d.children[l].querySelector(".iframeResultButtonK").addEventListener('click', TheatreMode);
}


function gen1(){ // URLs
    let d = 0;
    if(window.innerWidth <= 830){
        d = document.querySelector("#Col2");
    }else if(window.innerWidth <= 1400){
        d = document.querySelector("#Col1");
    }else if(window.innerWidth > 1400){
        d = document.querySelector("#Col3");
    }
    var links = d.getElementsByClassName("PageResult");
    var iframe = d.getElementsByClassName("pageResultIframe");
    var l = links.length  + iframe.length;

  //pageResultInformation
    d.appendChild(createNewElement('div', null, 'PageResult hyperlink'));
    d.children[l].setAttribute('type', 'hyperlink');
    d.children[l].appendChild(createNewElement('div', null, 'pageResultInformation'));
    d.children[l].children[0].appendChild(createNewElement('div', null, 'resultPadding'));
    d.children[l].children[0].children[0].appendChild(createNewElement('a', null, 'PageLink'));
    d.children[l].children[0].children[0].children[0].href = "https://www.apple.com";
    d.children[l].children[0].children[0].children[0].innerHTML = "Apple.com";
    d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'PagePublish'));
    d.children[l].children[0].children[0].children[1].innerHTML = "Published: Eternity";
    d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'PageDescription'));
    d.children[l].children[0].children[0].children[2].innerHTML = "Iphone 12x24 max mini pro negative -2 aliquam malesuada bibendum arcu vitae.     Velit dignissim sodales ut eu sem integer vitae justo. Nisl purus in mollis nunc sed    i";
    d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'Keywords'));
    d.children[l].children[0].children[0].children[3].innerHTML = "Found Keywords: 1,2,3,4";
    d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'MKeywords'));
    d.children[l].children[0].children[0].children[4].innerHTML = "Missing Keywords: 5,6,7,8";

    //description
    
    //pageResultDisclaimer
    d.children[l].appendChild(createNewElement('div', null, 'pageResultDisclaimer'));
    d.children[l].children[1].appendChild(createNewElement('div', null, 'resultPadding'));

    d.children[l].appendChild(createNewElement('button', null, 'pageResultButtonH'));
    d.children[l].children[2].innerHTML = "description";

    let EL1 = d.getElementsByClassName('pageResultButtonH');
    EL1[links.length-1].addEventListener('click', DisplayFlag);
    
}
function gen2(){ //Definition
    let d = 0;
    if(window.innerWidth <= 830){
        d = document.querySelector("#Col1");
    }else if(window.innerWidth <= 1400){
        d = document.querySelector("#Col2");
    }else if(window.innerWidth > 1400){
        d = document.querySelector("#Col3");
    }
    var links = d.getElementsByClassName("PageResult");
    var iframe = d.getElementsByClassName("pageResultIframe");
    var l = links.length + iframe.length;
  
    d.appendChild(createNewElement('div', null, 'PageResult definition'));
    d.children[l].setAttribute('type', 'definition');
    d.children[l].appendChild(createNewElement('div', null, 'pageResultInformation'));
    d.children[l].children[0].appendChild(createNewElement('div', null, 'resultPadding'));
    d.children[l].children[0].children[0].appendChild(createNewElement('h', null, 'DeffWordSound'));
    d.children[l].children[0].children[0].children[0].innerHTML = "Deffinition of _____ ";

    d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'deffWordIn'));
    d.children[l].children[0].children[0].children[1].innerHTML = "_____ in Chemestry:";
    d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'WordDeff'));
    d.children[l].children[0].children[0].children[2].innerHTML = "- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do     eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo       consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse     cillum    dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non    proident,    sunt in culpa qui officia deserunt mollit anim id est laborum.";
    d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'WordSyn'));
    d.children[l].children[0].children[0].children[3].innerHTML = "Synonyms: ";
    d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'etymology'));
    d.children[l].children[0].children[0].children[4].innerHTML = "Etymology of _____ ";

    //description
    
    //pageResultDisclaimer
    d.children[l].appendChild(createNewElement('div', null, 'pageResultDisclaimer'));
    d.children[l].children[1].appendChild(createNewElement('div', null, 'resultPadding'));

    d.children[l].appendChild(createNewElement('button', null, 'pageResultButtonH'));
    d.children[l].children[2].innerHTML = "description";

    let EL1 = d.getElementsByClassName('pageResultButtonH');
    EL1[links.length-1].addEventListener('click', DisplayFlag);
    
}

function Create_AddLinksButton(){
    let p = document.getElementById("LinksDiv");
    p.appendChild(createNewElement('div', null, 'HyperLinkStyle'));
    p.children[0].appendChild(createNewElement('div', 'LinksAddButton', null));
    p.children[0].children[0].innerHTML = '+';
    p.children[0].appendChild(createNewElement('p', null, 'hyperlinktitle'));
    p.children[0].children[1].innerHTML = 'add';

    document.querySelector("#LinksAddButton").addEventListener('click', QuickLinkAdd);
}

function BuildQuickLink(new_link, index){
    let p = document.getElementById("LinksDiv");
    console.log(index);
    p.appendChild(createNewElement('div', null, 'HyperLinkStyle'));
    //p.children[index].appendChild(createNewElement('div', null, null));
    p.children[index].setAttribute('draggable', true);
    p.children[index].style.display = "inline-flex";
    p.children[index].appendChild(createNewElement('button', null, 'LinkDeleteButton'));
    p.children[index].children[0].innerHTML = 'close';
    p.children[index].appendChild(createNewElement('button', null, 'LinkEditButton'));
    p.children[index].children[1].innerHTML = 'menu';
  
    let EV = p.children[index].getElementsByClassName("LinkDeleteButton");
    EV[0].addEventListener('click', QuickLinkRemove);
    EV = p.children[index].getElementsByClassName("LinkEditButton");
    EV[0].addEventListener('click', QuickLinkEdit);
        
    p.children[index].appendChild(createNewElement('p', 'LinksRedirect', null));
  
    p.children[index].children[2].innerHTML = new_link.title.at(0).toUpperCase();
    p.children[index].children[2].style.color = new_link.title_color;
    p.children[index].children[2].style.backgroundColor = new_link.background_color;

  
    EV = p.children[index].querySelector("#LinksRedirect");
    EV.addEventListener('click', QuickLinkRedirect);
    EV.addEventListener('mouseover', QuickLinkHover);
    EV.addEventListener('mouseout', QuickLinkHoverOut);
    p.children[index].addEventListener('dragstart', StartDrag);
    p.children[index].addEventListener('dragover', initSortableList);
  
    p.children[index].appendChild(createNewElement('p', null, 'hyperlinktitle'));
    p.children[index].children[3].innerHTML = new_link.title;
    CurrentLink = index;
}

function generate_definition(word, subjects, definitions){
    if(definitions[0] === "" || definitions[0] === ''){
        console.log("empty");
        return;
    }
    //console.log(definitions);

    let d = document.querySelector("#Col2");
    var links = d.getElementsByClassName("pageResult");
    var iframe = d.getElementsByClassName("pageResultIframe");
    var l = links.length + iframe.length;


    d.appendChild(createNewElement('div', null, 'PageResult'));
    d.children[l].setAttribute('type', 'definition');
    d.children[l].appendChild(createNewElement('div', null, 'pageResultInformation'));
    d.children[l].children[0].appendChild(createNewElement('div', null, 'resultPadding'));
    d.children[l].children[0].children[0].appendChild(createNewElement('h', null, 'DeffWordSound'));
    d.children[l].children[0].children[0].children[0].innerHTML = "Definition of \"" + word +"\"";

    for(let i = 0; i < definitions.length; i++){
        //console.log(definitions.length);
        //console.log(definitions[i]);
        //console.log(definitions[i].def);
        d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'deffWordIn'));
        d.children[l].children[0].children[0].children[5*i+1].innerHTML = subjects;
        d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'deffWordIn'));
        d.children[l].children[0].children[0].children[5*i+2].innerHTML = "Lexical Categor";
        if(definitions[i].atomicProperty.length == 1){
            d.children[l].children[0].children[0].children[5*i+2].innerHTML += "y: "
        }else{
            d.children[l].children[0].children[0].children[5*i+2].innerHTML += "ies: ";
        }
        for(var j = 0; j < definitions[i].atomicProperty.length; j++){
            if(j != 0){
                d.children[l].children[0].children[0].children[5*i+2].innerHTML += ", ";
            }
            d.children[l].children[0].children[0].children[5*i+2].innerHTML += definitions[i].atomicProperty[j];
        }
        if(definitions[i].atomicProperty.length == 0){
            d.children[l].children[0].children[0].children[5*i+2].style.display = "none";
        }
        d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'WordDeff'));
        d.children[l].children[0].children[0].children[5*i+3].innerHTML = '- ' + definitions[i].def;
        d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'WordSyn'));
        d.children[l].children[0].children[0].children[5*i+4].innerHTML = "Synonyms: ";
        d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'etymology'));
        d.children[l].children[0].children[0].children[5*i+5].innerHTML = "Etymology of _____ ";

        //description
        
        //pageResultDisclaimer
        d.children[l].appendChild(createNewElement('div', null, 'pageResultDisclaimer'));
        d.children[l].children[1].appendChild(createNewElement('div', null, 'resultPadding'));

        d.children[l].appendChild(createNewElement('button', null, 'pageResultButtonH'));
        d.children[l].children[2].innerHTML = "description";

        d.children[l].querySelector(".pageResultButtonH").addEventListener('click', DisplayFlag);
    }
}
class page_coluns{
    constructor(){
        this.columns = [];
        this.length = 0;
    }
}


class arr{
    constructor(){
        this.structure = [];
        this.length = 0;
    }
    insert(node, location){
        if(location == null){
            this.structure[this.length] = node;
            console.log("inserting node:", node);
        }else{
            this.structure.splice(location, 0, node);
            console.log(CurrentLink);
            return this.length
        }
        this.length = this.length + 1;
        return this.length;
    }
    compare(node){
        this.display();
        if(this.length == 0){ return false };
        const node_string = JSON.stringify(node);
        for(var i = 0; i < this.length; i++){
            if(JSON.stringify(this.structure[i]) === node_string){
                console.log("Search collision");
                return true;
            }
        }
        return false;
    }
    remove_by_location(location){
        console.log("attribute to drop", this.length, location, this.length-location);
        console.log(this.structure[location]);
        this.structure.splice(location, 1);
        this.length = this.length - 1;
        console.log(CurrentLink);
    }
    clear_structure(){
        //no true clearing to limit code draw. elements are instead inserted at an index if data index is beyond lenght it will be ignored or written over "could waste memory but saves computation"
        this.length = 0;
    }
    display(){
        for(var i = 0; i < this.length; i++){
            console.log(i, this.structure[i]);
        }
    }
}