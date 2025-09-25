$(document).ready(function () {
  // get the data from menu.json
  $.getJSON("src/menu.json", function (data) {
    let menuContainer = $(".menu");

    data.categories.forEach((cat) => {
      // Divider
      let divider = `
                <div class="divider" id="${cat.id}">
                    <hr>
                    <span>${cat.title}|</span>
                    <img src="${cat.icon}" alt="${cat.title}">
                    <hr>
                </div>
            `;
      menuContainer.append(divider);

      // Items
      let itemsDiv = $('<div class="items"></div>');
      cat.items.forEach((item) => {
        let itemHtml = `
                    <div class="item">
                        <img src="${item.img}" alt="${item.name}">
                        <div class="desc">
                            <h3>${item.name}</h3>
                            ${item.desc ? `<p>${item.desc}</p>` : ""}
                            ${
                              item.price
                                ? `<p><b>${item.price}</b> تومان</p>`
                                : ""
                            }
                        </div>
                    </div>
                `;
        itemsDiv.append(itemHtml);
      });

      menuContainer.append(itemsDiv);
    });
  });

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

    $(".item").each(function () {
      let text = norm($(this).find("h3").text());
      console.log(text);
      if (text.includes(query)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
  $(".cat").on("click", function (e) {
    e.preventDefault();

    const targetId = $(this).attr("href");
    const target = $(targetId);

    if (target.length) {
      $("html, body").animate(
        { scrollTop: target.offset().top + 20 }, //adjust -20 for padding
        700 //scroll duration in ms
      );
    }
  });
  //Share button functionality
  $("#share-button").on("click", function () {
    const url = window.location.href;
    const title = document.title;

    if (navigator.share) {
      navigator
        .share({
          title: title,
          url: url,
        })
        .catch((err) => {
          console.log("خطا در اشتراک‌گذاری:", err);
        });
    } else if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          showMessage("لینک کپی شد ✅");
        })
        .catch(() => {
          showMessage("کپی لینک ناموفق بود ❌");
        });
    } else {
     
      const tempInput = document.createElement("input");
      tempInput.value = url;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      showMessage("لینک کپی شد ✅");
    }
  });

  function showMessage(text) {
    const msg = $("#share-message");
    msg.text(text).fadeIn();

    setTimeout(() => {
      msg.fadeOut();
    }, 2000);
  }
});
