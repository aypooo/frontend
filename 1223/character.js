const box = document.getElementById('box')
const gravity = 1
const FPS = 30// 초당 프레임 수
const limitBottom = 500
const limitLeft = 700
const limitTop = 300

let vx = 100
let vy = 0
let isJumping = true
let isDead = false


// 처음에 isJumping 을 true 로 설정해서 점핑 가능하게 함
// 점핑 가능하면 계속 점프하다가 vy 가 0 보다 작아지면 isJumping 이 false 가 되면서 더이상 점핑이 불가능함
// 중력은 계속 작용하니까 중력에 의해서 아래로 내려오다가 limit 에 닿으면 isJumping 이 다시 true 가 되면서 점핑이 가능하게 됨

// 슈퍼 마리오가 limitLeft 값을 넘어가면, 즉, 땅을 벗어나면 죽었으므로 isDead 가 true 가 되고 isDead 가 true 이면 계속 아래로 떨어짐



function down(){
    const topStyle = window.getComputedStyle(box).top
    //css에있는 속성을 읽어 올때 getComputedStyle?
    //캐릭터의 y 값을 받아옴
    let top = parseInt(topStyle)
    //중력에 의해서 캐릭터가 아래로 내려옴
    vy += gravity
    top += vy

    if(!isDead && top >= limitBottom){
        top = limitBottom//땅에 안착
        isJumping = true//점프 가능 여부
    }

    //실제 화면에서 캐릭터의 y 받향 위치가 업데이트 됨
    box.style.top = `${top.toString()}px`
}

const timerId = setInterval(down, 1000/FPS)

function move(e){
    const leftStyle = window.getComputedStyle(box).left
    const topStyle = window.getComputedStyle(box).top
    let left = parseInt(leftStyle)
    let top = parseInt(topStyle)

    if(e.keyCode === 39){
        box.style.backgroundImage = "url('super_mario.png')";
        left += vx //등속 운동
        if(left>limitLeft){ //땅을 벗어나면 죽은 것으로 설정함
            isDead =true
        }
        //화살표 키 좌측 누른 경우
    }else if(e.keyCode === 37){
        box.style.backgroundImage = "url('super_mario.png')";
        if(left > 0){
            left -= vx
        }
    
    }else if(e.keyCode ===32 || e.keyCode === 38){
        if(isJumping && top >= limitTop){//점프 높이에 제한을 둠
            vy -= gravity*3
            top = vy
        }
        if(vy <= 0){
            isJumping = false
        }

    }//화살표 우측으로 누른경우
    box.style.left = `${left.toString()}px`
    box.style.top = `${top.toString()}px`
}
function popup(){
    const topStyle = window.getComputedStyle(box).top
    let top = parseInt(topStyle)
    if(top>limitLeft){
        alert("YOU DIED")
    }
}

setInterval(popup,1000)
window.addEventListener('keydown', move)