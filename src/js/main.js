$(document).ready(function () {
  // normalizing the searchbar text
  const norm = (s) =>
    (s || "")
      .toString()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "") // remove accents if any
      .toLowerCase()
      .trim();

  $("#search").on("input", function () {
    let query = norm($(this).val());

    // show all items if the search bar is empty
    if (!query) {
      $(".item").show();
      return;
    }

    $(".item").each(function() {
        let text = norm($(this).find("h3").text());
        console.log(text);
        if (text.includes(query)) {
            $(this).show();
        }
        else {
            $(this).hide();
        }
    })
  });
});
