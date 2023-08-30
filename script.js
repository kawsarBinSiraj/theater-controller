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
        let btnTxt = $("#text").val();
        if (btnTxt === "") return alert("Input value is required to save !");
        let btnMarkup = `<button type="button" data-btn-text="${btnTxt}" class="btn btn-info rounded px-2 text-light bg-gradient">${btnTxt}</button>`;
        $("#buttons").append(btnMarkup);
        $("#modal").modal("hide");
    });

    $(document).on("click", "#buttons > .btn", function () {
        let speech = new SpeechSynthesisUtterance();
        speech.volume = parseFloat($("#volume").val());
        speech.text = $(this).data("btn-text");
        window.speechSynthesis.speak(speech);
    });
    $("#volume").change(function(){
        $('#out').text(`(${$(this).val()})`);
    })
});
