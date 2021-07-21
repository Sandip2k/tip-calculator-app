let numPeople = document.getElementById("noOfPeopleValue");

setInterval(() => {
    if (numPeople.value.length === 0 || numPeople.value === "0") {
        document.getElementById("zeroError").className = "";
        document.getElementById("divPeopleWrapper").className =
            "divWrapperError";
    } else {
        document.getElementById("zeroError").className = "hide";
        document.getElementById("divPeopleWrapper").className = "";
    }
}, 500);

let buttonKeys = [5, 10, 15, 25, 50];
let buttonValues = [
    ...document.getElementsByClassName("percentChoiceSelections"),
];

let buttonMap = Object.fromEntries(
    buttonKeys.map((_, i) => [
        buttonKeys[i],
        { DOM: buttonValues[i], clicked: false },
    ])
);

Object.keys(buttonMap).forEach((key) => {
    buttonMap[key].DOM.addEventListener("click", (event) => {
        Object.values(buttonMap).forEach((e) => {
            if (e !== buttonMap[key]) {
                e.DOM.style.background = "hsl(183, 100%, 15%)";
                e.DOM.style.color = "hsl(189, 41%, 97%)";
                e.clicked = false;
            }
        });

        buttonMap[key].clicked = !buttonMap[key].clicked;

        if (buttonMap[key].clicked) {
            buttonMap[key].DOM.style.background = "hsl(172, 67%, 45%)";
            buttonMap[key].DOM.style.color = "hsl(183, 100%, 15%)";
        } else {
            buttonMap[key].DOM.style.background = "hsl(183, 100%, 15%)";
            buttonMap[key].DOM.style.color = "hsl(189, 41%, 97%)";
        }

        console.log(buttonMap);
    });
});

let canReset = true;

const reset = () => {
    if (!canReset) return;
    document.getElementById("billAmountValue").value = "";
    document.getElementById("noOfPeopleValue").value = "0";
    document.getElementById("percentChoiceCustomInput").value = "";
    Object.values(buttonMap).forEach((e) => {
        e.DOM.style.background = "hsl(183, 100%, 15%)";
        e.DOM.style.color = "hsl(189, 41%, 97%)";
        e.clicked = false;
    });
    document.getElementById("tipAmountVal").innerHTML = "0.00";
    document.getElementById("totalVal").innerHTML = "0.00";

    document.getElementById("reset").disabled = true;
    document.getElementById("reset").className = "disabledButton";

    canReset = false;
};

reset();

document.getElementById("reset").addEventListener("click", () => reset());

setInterval(() => {
    let bill = document.getElementById("billAmountValue").value;
    if (bill.length == 0) return;

    let tipAmt = 0.0;

    let numPeople = document.getElementById("noOfPeopleValue").value;

    let custom = document.getElementById("percentChoiceCustomInput").value;

    console.log(custom.length);

    if (bill.length > 0 || numPeople.length > 0 || custom.length > 0) {
        document.getElementById("reset").disabled = false;
        document.getElementById("reset").className = "";
        canReset = true;
    }

    if (custom.length == 0) {
        let tip = Object.keys(buttonMap).find(
            (e) => buttonMap[e].clicked === true
        );
        if (!tip) return;

        tipAmt = (parseFloat(tip) / 100.0) * bill;
    } else {
        tipAmt = (parseFloat(custom) / 100.0) * bill;
    }

    bill = parseFloat(bill) + parseFloat(tipAmt);

    if (numPeople.length == 0 || parseInt(numPeople) === 0) return;

    let tipAmountVal = document.getElementById("tipAmountVal");
    tipAmountVal.innerHTML = (tipAmt / parseInt(numPeople)).toFixed(2);

    let totalVal = document.getElementById("totalVal");
    totalVal.innerHTML = (bill / parseInt(numPeople)).toFixed(2);

    console.log(bill);
}, 500);

console.log(buttonMap);
