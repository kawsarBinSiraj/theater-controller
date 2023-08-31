/**
 * @method_name :- method_name
 *
 * @argument  :-  {{}|any}
 * ?return :-  {{}|any}
 * author :-  {{}|null}
 * created_by:- Kawsar Bin Siraj
 * created_at:- 31/08/2023 01:07:09
 * description :- A method is simply a “chunk” of code.
 */

$(function () {
    let buttons = [
        {
            id: Math.random().toString(16).slice(2),
            btnName: "After add new button will inject here",
            btnTxt: "After add new button will inject here",
        },
    ];
    function insertButtonsIntoHtml() {
        const storageButtons = localStorage.getItem("storageButtons");
        const storedButtons = JSON.parse(storageButtons);
        if (Array.isArray(storedButtons) && storedButtons.length > 0) {
            console.log(storageButtons);
            // Parse the string back to an array using JSON.parse
            //insertion into html
            let markup = "";
            markup = storedButtons
                .map(({ btnTxt, btnName, id }, index) => {
                    return `<button type="button" data-index="${index}" data-id="${id}" data-btn-text="${btnTxt}" class="btn d-flex align-items-center btn-success rounded px-2 text-light bg-gradient">
                          ${btnName} <span style="width:30px;height:30px" class="btn p-0 rounded-circle bg-danger ms-1">x</span>
                      </button>`;
                })
                .join(" ");
            $("#buttons").html(markup);
        } else {
            console.log("lo");
            $("#buttons").html("<p class='mb-0'>There is no buttons to show !</p>");
        }
    }

    // initial call insertButtonsIntoHtml
    insertButtonsIntoHtml();

    // btn save action
    $("#btn-save").on("click", function () {
        let btnName = $("#btn-name").val();
        let btnTxt = $("#text").val();
        if (btnName === "" || btnTxt === "") return alert("Both input is required to save !");
        buttons.push({
            id: Math.random().toString(16).slice(2),
            btnName,
            btnTxt,
        });
        localStorage.setItem("storageButtons", JSON.stringify(buttons));
        insertButtonsIntoHtml();
        $("#modal").modal("hide");
        $("#btn-name").val("");
        $("#text").val("");
    });

    // Initialize SpeechSynthesisUtterance
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();

    // click on button
    $(document).on("click", ".action-buttons > .btn", function (e) {
        let isSpan = e.target.closest("span");
        if (isSpan) {
            let index = $(this).data("index");
            buttons.splice(index, 1);
            localStorage.setItem("storageButtons", JSON.stringify(buttons));
            insertButtonsIntoHtml();
        } else {
            utterance.text = $(this).data("btn-text");
            synth.speak(utterance);
        }
    });

    // volume control
    $("#volume").change(function () {
        $("#out").text(`(${$(this).val()})`);
        const volume = parseFloat($(this).val());
        utterance.volume = volume;
    });

    // reading speed control
    $("#readingSpeed").change(function () {
        $("#speed-out").text(`(${$(this).val()})`);
        const speed = parseFloat($(this).val());
        utterance.rate = speed;
    });
});
