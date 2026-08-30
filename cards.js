/* =====================================================
   cards.js
   إنشاء بطاقة الأمر
===================================================== */

function createCommandCard(item, options = {}) {

  const {
    favorite = false,
    onFavorite = () => {},
    onCopy = () => {},
    onBuilder = () => {},
    onPNG = () => {},
    onTXT = () => {}
  } = options;


  /* البطاقة */
  const card =
    document.createElement("article");


  card.className =
    "command-card";


  /* ==========================================
     المفضلة
  ========================================== */

  const favoriteButton =
    document.createElement(
      "button"
    );


  favoriteButton.type =
    "button";


  favoriteButton.className =
    "fav-badge";


  if (favorite) {

    favoriteButton.classList.add(
      "active"
    );

  }


  favoriteButton.textContent =
    favorite
      ? "★"
      : "☆";


  favoriteButton.title =
    favorite
      ? "إزالة من المفضلة"
      : "إضافة إلى المفضلة";


  favoriteButton.addEventListener(
    "click",
    onFavorite
  );


  card.appendChild(
    favoriteButton
  );


  /* ==========================================
     التصنيف
  ========================================== */

  if (item.category) {

    const categoryBadge =
      document.createElement(
        "div"
      );


    categoryBadge.className =
      "command-category";


    categoryBadge.textContent =
      item.category;


    card.appendChild(
      categoryBadge
    );

  }


  /* ==========================================
     Terminal
  ========================================== */

  const terminal =
    document.createElement(
      "div"
    );


  terminal.className =
    "terminal-window";


  const terminalHeader =
    document.createElement(
      "div"
    );


  terminalHeader.className =
    "terminal-header";


  terminalHeader.innerHTML = `
    <span class="dot dot-red"></span>
    <span class="dot dot-yellow"></span>
    <span class="dot dot-green"></span>
  `;


  const commandCode =
    document.createElement(
      "div"
    );


  commandCode.className =
    "command-code";


  commandCode.textContent =
    item.c || "";


  terminal.appendChild(
    terminalHeader
  );


  terminal.appendChild(
    commandCode
  );


  card.appendChild(
    terminal
  );


  /* ==========================================
     Description
  ========================================== */

  const description =
    document.createElement(
      "p"
    );


  description.className =
    "command-desc";


  description.textContent =
    item.d ||
    "لا يوجد وصف لهذا الأمر.";


  card.appendChild(
    description
  );


  /* ==========================================
     Actions
  ========================================== */

  const actions =
    document.createElement(
      "div"
    );


  actions.className =
    "card-actions";


  /* نسخ */
  const copyButton =
    makeCardButton(
      "📋",
      "نسخ",
      onCopy
    );


  copyButton.classList.add(
    "copy-command-btn"
  );


  /* منشئ */
  const builderButton =
    makeCardButton(
      "➕",
      "للمنشئ",
      onBuilder
    );


  /* PNG */
  const pngButton =
    makeCardButton(
      "🖼️",
      "PNG",
      onPNG
    );


  /* TXT */
  const txtButton =
    makeCardButton(
      "📄",
      "TXT",
      onTXT
    );


  actions.append(
    copyButton,
    builderButton,
    pngButton,
    txtButton
  );


  card.appendChild(
    actions
  );


  return card;

}


/* =====================================================
   زر داخل البطاقة
===================================================== */

function makeCardButton(
  icon,
  text,
  callback
) {

  const button =
    document.createElement(
      "button"
    );


  button.type =
    "button";


  button.className =
    "card-btn";


  const iconSpan =
    document.createElement(
      "span"
    );


  iconSpan.textContent =
    icon;


  const textSpan =
    document.createElement(
      "span"
    );


  textSpan.textContent =
    text;


  button.append(
    iconSpan,
    textSpan
  );


  button.addEventListener(
    "click",
    callback
  );


  return button;

}


/* إتاحة الدالة لباقي الصفحة */
window.createCommandCard =
  createCommandCard;
