const numbers = document.querySelectorAll(".numbers");
const operator = document.querySelectorAll(".operator");
const result = document.querySelector(".result span");
const signs = document.querySelectorAll(".sign");
const equals = document.querySelector(".equals");
const percent = document.querySelector(".percent");
const plusMinus = document.querySelector(".plus-minus");
const by = document.querySelector(".by");
const times = document.querySelector(".times");
const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
const dot = document.querySelector(".dot");
const AC = document.querySelector(".AC");

let firstValue = "";
let isFirstValue = false;
let secondValue = "";
let isSecondValue = false;
let sign = "";
let resultValue = 0;
let isActive = false;

function deleteActive(){
  operator.forEach((op1) => {
    op1.classList.remove("active");
  });
}

function changeActive() {
  operator.forEach((op) => {
    op.addEventListener("click", () => {
      deleteActive();
      isActive = !isActive;
      op.classList.add("active");
    });
  });
}

changeActive();

numbers.forEach((button) => {
  button.addEventListener("click", (e) => {
    let atr = e.target.getAttribute("value");
    if (isFirstValue === false) {
      getFirstValue(atr);
    }
    if (isSecondValue == false) {
      getSecondValue(atr);
    }
  });
});

function getFirstValue(el) {
  result.innerHTML = "";
  firstValue += el;
  firstValue = +firstValue;
  result.innerHTML = firstValue;
  
}

function getSecondValue(el) {
  if (firstValue !== "" && sign !== "") {
    secondValue += el;
    result.innerHTML = secondValue;
    secondValue = +secondValue;
    
  }
}

function getSign() {
  for (let i = 0; i < signs.length; i++) {
    signs[i].addEventListener("click", (e) => {
      sign = e.target.getAttribute("value");
      isFirstValue = true;
    });
  }
}
getSign();

equals.addEventListener("click", () => {
  deleteActive();
  result.innerHTML = "";
  if (sign === "+") {
    resultValue = firstValue + secondValue;
  } else if (sign === "-") {
    resultValue = firstValue - secondValue;
  } else if (sign === "x") {
    resultValue = firstValue * secondValue;
  } else if (sign === "/") {
    resultValue = firstValue / secondValue;
  }
  if (!isNaN(resultValue) && (resultValue !== "") && isFinite(resultValue)) {
    result.innerHTML = resultValue;
  }
  else{
    result.innerHTML = "Error";
  }
  firstValue = resultValue;
  secondValue = "";

  checkResultLenght();

});

AC.addEventListener("click", () =>{
  result.innerHTML = 0;
  firstValue = "";
  isFirstValue = false;
  secondValue = "";
  isSecondValue = false
  sign = "";
  resultValue = 0;
  isActive = false;
});

plusMinus.addEventListener("click", () => {
  result.innerHTML = "";
  if (firstValue != "") {
    resultValue = -firstValue;
    firstValue = resultValue;
  }
  if (firstValue != "" && secondValue != "" && sign != "" ) {
    resultValue = -resultValue;
  }

  result.innerHTML = resultValue;

});

percent.addEventListener("click", () => {
  result.innerHTML = "";
  if (firstValue != "") {
    resultValue = firstValue/100;
    firstValue = resultValue;
  }
  if (firstValue != "" && secondValue != "" && sign != "" ) {
    resultValue = resultValue/100;
  }

  result.innerHTML = resultValue;
});
 

function checkResultLenght(){
  resultValue = JSON.stringify(resultValue);

  if (resultValue.length >= 8) {
    resultValue = JSON.parse(resultValue);
    result.innerHTML = resultValue.toFixed(5);
  }
}
