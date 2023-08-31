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
    $("#btn-save").on("click", function () {
        let btnName = $("#btn-name").val();
        let btnTxt = $("#text").val();
        if (btnName === "" || btnTxt === "") return alert("Both input is required to save !");
        let btnMarkup = `<button type="button" data-btn-text="${btnTxt}" class="btn btn-success rounded px-2 text-light bg-gradient">${btnName}</button>`;
        $("#buttons").append(btnMarkup);
        $("#modal").modal("hide");
    });

    // Initialize SpeechSynthesisUtterance
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();
    let IntervalId = null;

    // click on button
    $(document).on("click", ".action-buttons > .btn", function () {
        utterance.text = $(this).data("btn-text");
        synth.speak(utterance);
    });

    // volume control
    $("#volume").change(function () {
        $("#out").text(`(${$(this).val()})`);
        const volume = parseFloat($(this).val());
        utterance.volume = volume;
    });
    
});
