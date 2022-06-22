const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const clearBtn = document.getElementById("jsClear");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

//기본 배경이 하얀 색으로 저장하고 싶을 때 default로 지정해둠
// ctx.fillStyle = "white";
// ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handelColorClick(event) {
  console.log(event);
  console.log(event.target);
  console.log(event.path);
  //color 바꿀 때 brush 색, fill 색 둘 다 바꾸기
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = ctx.strokeStyle;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "FILL";
    canvas.classList.remove("cursor__fill");
  } else {
    filling = true;
    mode.innerText = "PAINT";
    canvas.classList.add("cursor__fill");
  }
}

function handelCanvasClick() {
  //filling일 때만 클릭하면 전체 덮기
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  //오른쪽 마우스 방지
  event.preventDefault();
}

function handleSaveClick() {
  //canvas 내용을 이미지처럼 받기
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image; //url
  link.download = "PaintJS[🎨]"; //다운로드할 때 이름
  link.click();
}

function handleClearClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); //mouse가 canvas 위에 올라왔을 때
  canvas.addEventListener("mousedown", startPainting); //mouse를 클릭했을 때
  canvas.addEventListener("mouseup", stopPainting); //mouse 클릭을 놓을 때
  canvas.addEventListener("mouseleave", stopPainting); //mouse가 canvas를 떠났을 때
  canvas.addEventListener("click", handelCanvasClick); //fill할 때 canvas 아무 곳이든 클릭했을 때
  canvas.addEventListener("contextmenu", handleCM); //canvas 그림을 저장할 때 오른쪽 마우스 키 누르지 않도록
}

//Array.from() => object로부터 array를 만든다.
Array.from(colors).forEach((color) => color.addEventListener("click", handelColorClick));

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

if (clearBtn) {
  clearBtn.addEventListener("click", handleClearClick);
}
