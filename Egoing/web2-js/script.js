// let body = document.querySelector('body');
// body.setColor = function(color){
//     this.style.color = color;
// }
// body.setBackgroundColor = function(color){
//     this.style.backgroundColor = color;
// }

let body = {
    setColor: function(color){
        $('body').css('color',color);
    },
    setBackgroundColor: function(color){
        $('body').css('backgroundColor',color);
    }
}

// let links = document.querySelectorAll('a');
// links.setColor= function setColor(color){
//     for(i = 0 ; i < links.length ; i++){
//         this[i].style.color = color;
//     }
//     }

let links = {
    setColor:function(color){
        $('a').css("color", color);
    }
}

function nightDayHandler(self){
    if(self.value==='night'){
        body.setBackgroundColor('black');
        body.setColor('white');
        self.value='day';
        links.setColor('powderblue');
    }else{
        body.setBackgroundColor('white');
        body.setColor('black');
        self.value='night';
        links.setColor('blue');
    }
    }