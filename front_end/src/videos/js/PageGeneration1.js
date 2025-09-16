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

function Dynamic_Generation(type, url){
    if(type == "video"){
        newVideoPreview(url);
    }
}

function newVideoPreview(url){
    
    let d = document.querySelector("#PageResults").children[1];
    var l = d.getElementsByClassName("pageResultVideo");
    l = l.length;
    
    //pageResultInformation
    d.appendChild(createNewElement('div', null, 'pageResultVideo'));
    d.children[l].appendChild(createNewElement('div', null, 'pageResultInformation'));
    d.children[l].children[0].appendChild(createNewElement('div', null, 'resultPadding'));
    d.children[l].children[0].children[0].appendChild(createNewElement('div', null, 'previewVideoHolder'));
    d.children[l].children[0].children[0].children[0].appendChild(createNewElement('video', null, 'RECVideoPreview'));
    if(url != undefined){
        d.children[l].children[0].children[0].children[0].firstChild.src = "/" + url;
    }else{
        d.children[l].children[0].children[0].children[0].firstChild.src = "/Sponge.mp4";
    }
    d.children[l].children[0].children[0].appendChild(createNewElement('div', null, 'description'));

    //description
    d.children[l].children[0].children[0].children[1].appendChild(createNewElement('img', null, 'previewChannelIcon'));
    d.children[l].children[0].children[0].children[1].firstChild.src = "/nothing.jpg";
    d.children[l].children[0].children[0].children[1].appendChild(createNewElement('p', null, 'previewChannelName'));
    d.children[l].children[0].children[0].children[1].children[1].innerHTML = "Adult Swim";
    d.children[l].children[0].children[0].children[1].appendChild(createNewElement('a', null, 'previewTitle'));
    d.children[l].getElementsByClassName('previewTitle')[0].addEventListener('click', function(e) {
        e.preventDefault();
        setMainPlayer(this);
    });
    d.children[l].children[0].children[0].children[1].children[2].innerHTML = url;
    d.children[l].children[0].children[0].children[1].appendChild(createNewElement('p', null, 'previewInfo'));
    d.children[l].children[0].children[0].children[1].children[3].innerHTML = "-2 hours ago";
    
    //pageResultDisclaimer
    d.children[l].appendChild(createNewElement('div', null, 'pageResultDisclaimer'));
    d.children[l].children[1].appendChild(createNewElement('div', null, 'resultPadding'));

    d.children[l].appendChild(createNewElement('button', null, 'pageResultButton'));
    d.children[l].children[2].innerHTML = "description";

    var EV1 = document.getElementsByClassName('RECVideoPreview');
    EV1[l].addEventListener('click', previewPlayPause);
    var EV2 = document.getElementsByClassName('previewVideoHolder');
    EV2[l].addEventListener('mouseenter', PreviewHover);
    EV2[l].addEventListener('mouseleave', PreviewExit);
    var EV3 = document.getElementsByClassName('pageResultButton');
    EV3[l].addEventListener('click', DisplayFlag);
    var EV4 = document.getElementsByClassName('previewChannelIcon');
    EV4[l].addEventListener('mouseover', DisplayChannelName);
    EV4[l].addEventListener('mouseout', HideChannelName);
    
    
    /*
    <div class="pageResultVideo">
        <div class="pageResultInformation">
            <div class="resultPadding">
                <div class="previewVideoHolder">
                    <video class="RECVideoPreview" src="3Zee.mp4" id="v"></video>
                </div>
                <br>
                <div class="description">
                    <img class="previewChannelIcon" src="nothing.jpg">
                    <p class="previewChannelName">Channel Name</p>
                    <p class="previewTitle">Video Title Video Title Video Title Video Title Video Title</p>
                    <p class="previewInfo">-2 hours ago</p>
                </div>
            </div>
        </div>
        <div class="pageResultDisclaimer">
            <div class="resultPadding">
                            
            </div>
         </div>
        <button class="pageResultButton">description</button>
    </div>
    */
}
function Create_AddLinksButton(){
    let p = document.querySelector('.LinksDiv');
    p.appendChild(createNewElement('div', null, 'HyperLinkStyle'));
    p.children[0].appendChild(createNewElement('div', 'LinksAddButton', null));
    p.children[0].children[0].innerHTML = '+';
    p.children[0].appendChild(createNewElement('p', null, 'hyperlinktitle'));
    p.children[0].children[1].innerHTML = 'add';

    document.querySelector("#LinksAddButton").addEventListener('click', QuickLinkAdd);
}

function BuildQuickLink(new_link, index){
    let p = document.querySelector('.LinksDiv');
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