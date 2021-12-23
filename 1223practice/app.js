const contents =document.querySelectorAll('.contents')


function move(){
    for (let content of contents){

        console.log(content.getBoundingClientRect().top)
        if(!content.classList.contains('show') && content.getBoundingClientRect().top > 400){
            content.classList.add('show')
        }

    }
}

window.addEventListener('scroll',move)