/* =========================================================
   cards.js
   مكوّن بطاقات مكتبة الأوامر
========================================================= */

(function () {
    'use strict';

    /* =====================================================
       CSS
    ===================================================== */

    const CARD_STYLE_ID = 'command-cards-style';

    function loadCardStyles() {

        if (document.getElementById(CARD_STYLE_ID)) return;

        const style = document.createElement('style');

        style.id = CARD_STYLE_ID;

        style.textContent = `

        /* ==============================
           متغيرات البطاقة
        ============================== */

        :root {

            --card-bg: #1e1e2e;
            --card-border: #313244;

            --terminal-bg: #11111b;
            --terminal-header: #181825;

            --text-main: #cdd6f4;
            --text-sub: #a6adc8;
            --text-muted: #6c7086;

            --purple: #cba6f7;
            --purple-hover: #b4befe;

            --gold: #f9e2af;
            --gold-hover: #fab387;

            --green: #a6e3a1;
            --red: #f38ba8;

            --btn-bg: #313244;
            --btn-border: #45475a;
            --btn-hover: #45475a;

            --radius-card: 16px;
            --radius-inner: 10px;
            --radius-btn: 8px;

            --transition: 0.2s ease;

        }


        /* ==============================
           البطاقة
        ============================== */

        .command-card {

            position: relative;

            background: var(--card-bg);

            border: 1px solid var(--card-border);

            border-radius: var(--radius-card);

            padding: 22px;

            width: 100%;

            box-shadow:
                0 8px 24px rgba(0, 0, 0, 0.28);

            transition:
                border-color var(--transition),
                box-shadow var(--transition),
                transform var(--transition);

        }


        .command-card:hover {

            border-color: var(--purple);

            box-shadow:
                0 12px 32px rgba(203, 166, 247, 0.16);

            transform: translateY(-2px);

        }


        /* ==============================
           المفضلة
        ============================== */

        .command-card .fav-btn {

            position: absolute;

            top: 12px;

            left: 12px;

            width: 36px;
            height: 36px;

            display: flex;
            justify-content: center;
            align-items: center;

            background: rgba(30, 30, 46, 0.85);

            border: 1px solid var(--card-border);

            color: var(--text-muted);

            font-size: 1.45rem;

            cursor: pointer;

            border-radius: 50%;

            z-index: 5;

            transition:
                color var(--transition),
                transform var(--transition),
                border-color var(--transition),
                background var(--transition);

        }


        .command-card .fav-btn:hover {

            color: var(--gold);

            border-color: var(--gold);

            transform: scale(1.08);

        }


        .command-card .fav-btn.active {

            color: var(--gold);

            border-color: rgba(249,226,175,.5);

            filter:
                drop-shadow(
                    0 0 6px rgba(249,226,175,.45)
                );

        }


        /* ==============================
           Terminal
        ============================== */

        .command-card .terminal {

            background: var(--terminal-bg);

            border-radius: var(--radius-inner);

            overflow: hidden;

            border: 1px solid var(--card-border);

            margin:
                12px 0 16px;

        }


        .command-card .terminal-header {

            display: flex;

            align-items: center;

            direction: ltr;

            gap: 7px;

            padding: 10px 13px;

            background: var(--terminal-header);

            border-bottom:
                1px solid var(--card-border);

        }


        .command-card .dot {

            width: 11px;

            height: 11px;

            border-radius: 50%;

            opacity: .85;

        }


        .command-card .dot-red {
            background: var(--red);
        }


        .command-card .dot-yellow {
            background: var(--gold);
        }


        .command-card .dot-green {
            background: var(--green);
        }


        /* ==============================
           اسم الأمر
        ============================== */

        .command-card .command-text {

            padding: 17px 16px;

            font-family:
                'Fira Code',
                'Courier New',
                monospace;

            font-size: .95rem;

            font-weight: 500;

            color: var(--text-main);

            direction: ltr;

            text-align: left;

            user-select: all;

            white-space: nowrap;

            overflow-x: auto;

            scrollbar-width: thin;

            scrollbar-color:
                var(--card-border)
                transparent;

        }


        .command-card .command-text::selection {

            background: var(--purple);

            color: var(--terminal-bg);

        }


        /* ==============================
           الوصف
        ============================== */

        .command-card .command-desc {

            color: var(--text-sub);

            font-family:
                'Tajawal',
                'Cairo',
                sans-serif;

            font-size: .92rem;

            line-height: 1.8;

            margin-bottom: 18px;

            min-height: 52px;

        }


        /* ==============================
           الأزرار
        ============================== */

        .command-card .actions {

            display: grid;

            grid-template-columns:
                repeat(4, 1fr);

            gap: 7px;

        }


        .command-card .btn {

            background: var(--btn-bg);

            border:
                1px solid var(--btn-border);

            color: var(--text-main);

            padding: 9px 8px;

            border-radius: var(--radius-btn);

            font-size: .80rem;

            font-family:
                'Tajawal',
                sans-serif;

            font-weight: 500;

            cursor: pointer;

            transition: all var(--transition);

            display: inline-flex;

            align-items: center;

            justify-content: center;

            gap: 5px;

            white-space: nowrap;

        }


        .command-card .btn:hover {

            background: var(--btn-hover);

            border-color: var(--purple);

            color: var(--purple);

            transform: translateY(-1px);

        }


        .command-card .btn:active {

            transform: translateY(0);

        }


        .command-card .btn-copy {

            background: var(--purple);

            color: var(--terminal-bg);

            border-color: var(--purple);

            font-weight: 700;

        }


        .command-card .btn-copy:hover {

            background: var(--purple-hover);

            color: var(--terminal-bg);

            border-color: var(--purple-hover);

        }


        .command-card .btn-copy.copied {

            background: var(--green);

            border-color: var(--green);

            color: var(--terminal-bg);

        }


        /* ==============================
           Toast
        ============================== */

        .cards-toast {

            position: fixed;

            bottom: 24px;

            right: 24px;

            max-width: calc(100% - 48px);

            background: #313244;

            color: #cdd6f4;

            padding: 12px 18px;

            border-radius: 10px;

            border: 1px solid var(--purple);

            font-family: 'Tajawal', sans-serif;

            font-size: .9rem;

            z-index: 999999;

            box-shadow:
                0 6px 24px rgba(0,0,0,.45);

            animation:
                cardsToastIn .25s ease forwards;

        }


        .cards-toast.hide {

            animation:
                cardsToastOut .25s ease forwards;

        }


        @keyframes cardsToastIn {

            from {

                opacity: 0;

                transform:
                    translateY(20px);

            }

            to {

                opacity: 1;

                transform:
                    translateY(0);

            }

        }


        @keyframes cardsToastOut {

            from {

                opacity: 1;

                transform:
                    translateY(0);

            }

            to {

                opacity: 0;

                transform:
                    translateY(20px);

            }

        }


        /* ==============================
           الجوال
        ============================== */

        @media(max-width:600px) {

            .command-card {

                padding: 17px;

            }


            .command-card .actions {

                grid-template-columns:
                    repeat(2, 1fr);

            }


            .command-card .btn {

                padding: 10px 6px;

            }

        }

        `;

        document.head.appendChild(style);

    }


    /* =====================================================
       تحميل الخطوط
    ===================================================== */

    function loadFonts() {

        const id = 'command-cards-fonts';

        if (document.getElementById(id)) return;


        const link = document.createElement('link');

        link.id = id;

        link.rel = 'stylesheet';

        link.href =
            'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Tajawal:wght@400;500;700&display=swap';

        document.head.appendChild(link);

    }



    /* =====================================================
       Toast
    ===================================================== */

    function showToast(message) {

        const old =
            document.querySelector('.cards-toast');

        if (old) old.remove();


        const toast =
            document.createElement('div');

        toast.className =
            'cards-toast';

        toast.textContent =
            message;

        document.body.appendChild(toast);


        setTimeout(() => {

            toast.classList.add('hide');

            setTimeout(() => {
                toast.remove();
            }, 300);

        }, 2200);

    }



    /* =====================================================
       تنزيل Blob
    ===================================================== */

    function downloadBlob(blob, filename) {

        const url =
            URL.createObjectURL(blob);


        const a =
            document.createElement('a');

        a.href = url;

        a.download = filename;

        document.body.appendChild(a);

        a.click();

        a.remove();


        setTimeout(() => {

            URL.revokeObjectURL(url);

        }, 500);

    }



    /* =====================================================
       نسخ
    ===================================================== */

    async function copyText(text) {

        try {

            await navigator.clipboard.writeText(text);

            return true;

        }

        catch (error) {

            try {

                const textarea =
                    document.createElement('textarea');

                textarea.value = text;

                textarea.style.position = 'fixed';

                textarea.style.opacity = '0';

                document.body.appendChild(textarea);

                textarea.select();

                document.execCommand('copy');

                textarea.remove();

                return true;

            }

            catch {

                return false;

            }

        }

    }



    /* =====================================================
       تنظيف اسم الملف
    ===================================================== */

    function commandToFilename(command) {

        return command
            .replace(/^\\//, '')
            .replace(/[^a-zA-Z0-9-_]/g, '-')
            || 'command';

    }



    /* =====================================================
       المفضلة
    ===================================================== */

    function getFavorites() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    'commandFavorites'
                )
            ) || [];

        }

        catch {

            return [];

        }

    }


    function saveFavorites(favorites) {

        localStorage.setItem(
            'commandFavorites',
            JSON.stringify(favorites)
        );

    }


    function isFavorite(command) {

        return getFavorites()
            .includes(command);

    }


    function toggleFavorite(command) {

        let favorites =
            getFavorites();


        if (favorites.includes(command)) {

            favorites =
                favorites.filter(
                    item => item !== command
                );

            saveFavorites(favorites);

            return false;

        }


        favorites.push(command);

        saveFavorites(favorites);

        return true;

    }



    /* =====================================================
       تنزيل TXT
    ===================================================== */

    function downloadTxt(command, description) {

        const text =

`${command}

${description}`;


        const blob =
            new Blob(
                [text],
                {
                    type:
                    'text/plain;charset=utf-8'
                }
            );


        downloadBlob(
            blob,
            commandToFilename(command) + '.txt'
        );


        showToast('تم تنزيل ملف TXT 📄');

    }



    /* =====================================================
       PNG باستخدام Canvas
    ===================================================== */

    function downloadPng(command, description) {

        const canvas =
            document.createElement('canvas');


        canvas.width = 1200;

        canvas.height = 675;


        const ctx =
            canvas.getContext('2d');


        /* الخلفية */

        ctx.fillStyle = '#1a1b26';

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        /* البطاقة */

        ctx.fillStyle = '#1e1e2e';

        roundRect(
            ctx,
            70,
            70,
            1060,
            535,
            35
        );

        ctx.fill();


        /* Terminal */

        ctx.fillStyle = '#11111b';

        roundRect(
            ctx,
            130,
            135,
            940,
            210,
            24
        );

        ctx.fill();


        /* Header */

        ctx.fillStyle = '#181825';

        ctx.fillRect(
            130,
            135,
            940,
            65
        );


        /* النقاط */

        drawCircle(
            ctx,
            170,
            168,
            12,
            '#f38ba8'
        );

        drawCircle(
            ctx,
            205,
            168,
            12,
            '#f9e2af'
        );

        drawCircle(
            ctx,
            240,
            168,
            12,
            '#a6e3a1'
        );


        /* الأمر */

        ctx.direction = 'ltr';

        ctx.textAlign = 'left';

        ctx.fillStyle = '#cdd6f4';

        ctx.font =
            '600 34px monospace';

        ctx.fillText(
            command,
            175,
            285
        );


        /* الوصف */

        ctx.direction = 'rtl';

        ctx.textAlign = 'right';

        ctx.fillStyle = '#a6adc8';

        ctx.font =
            '30px Arial';


        wrapText(
            ctx,
            description,
            1030,
            420,
            850,
            52
        );


        canvas.toBlob(blob => {

            if (!blob) {

                showToast(
                    'تعذر إنشاء الصورة'
                );

                return;

            }


            downloadBlob(
                blob,
                commandToFilename(command)
                + '.png'
            );


            showToast(
                'تم تنزيل البطاقة PNG 🖼️'
            );

        }, 'image/png');

    }



    /* =====================================================
       Canvas Helpers
    ===================================================== */

    function roundRect(
        ctx,
        x,
        y,
        width,
        height,
        radius
    ) {

        ctx.beginPath();

        ctx.roundRect(
            x,
            y,
            width,
            height,
            radius
        );

    }


    function drawCircle(
        ctx,
        x,
        y,
        radius,
        color
    ) {

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = color;

        ctx.fill();

    }


    function wrapText(
        ctx,
        text,
        x,
        y,
        maxWidth,
        lineHeight
    ) {

        const words =
            text.split(' ');


        let line = '';

        let currentY = y;


        for (
            let i = 0;
            i < words.length;
            i++
        ) {

            const testLine =
                line + words[i] + ' ';


            const width =
                ctx.measureText(
                    testLine
                ).width;


            if (
                width > maxWidth &&
                i > 0
            ) {

                ctx.fillText(
                    line,
                    x,
                    currentY
                );


                line =
                    words[i] + ' ';


                currentY +=
                    lineHeight;

            }

            else {

                line =
                    testLine;

            }

        }


        ctx.fillText(
            line,
            x,
            currentY
        );

    }



    /* =====================================================
       إنشاء البطاقة
    ===================================================== */

    function createCommandCard(data = {}) {

        const command =
            data.command ||
            data.c ||
            '/example_command';


        const description =
            data.description ||
            data.d ||
            'وصف الأمر يظهر هنا.';


        const card =
            document.createElement('article');


        card.className =
            'command-card';


        card.dataset.command =
            command;


        /* =========================
           زر المفضلة
        ========================= */

        const favorite =
            isFavorite(command);


        const favButton =
            document.createElement('button');


        favButton.className =
            'fav-btn';


        if (favorite) {

            favButton.classList.add(
                'active'
            );

        }


        favButton.innerHTML = '★';


        favButton.title =
            favorite
            ? 'إزالة من المفضلة'
            : 'إضافة إلى المفضلة';


        favButton.setAttribute(
            'aria-label',
            favButton.title
        );



        /* =========================
           Terminal
        ========================= */

        const terminal =
            document.createElement('div');

        terminal.className =
            'terminal';


        terminal.innerHTML = `

            <div class="terminal-header">

                <span class="dot dot-red"></span>

                <span class="dot dot-yellow"></span>

                <span class="dot dot-green"></span>

            </div>

            <div class="command-text"></div>

        `;


        terminal.querySelector(
            '.command-text'
        ).textContent = command;



        /* =========================
           الوصف
        ========================= */

        const desc =
            document.createElement('p');


        desc.className =
            'command-desc';


        desc.textContent =
            description;



        /* =========================
           Actions
        ========================= */

        const actions =
            document.createElement('div');


        actions.className =
            'actions';


        actions.innerHTML = `

            <button
                class="btn btn-copy"
                type="button"
            >

                <span>📋</span>

                <span class="btn-label">
                    نسخ
                </span>

            </button>


            <button
                class="btn btn-creator"
                type="button"
            >

                <span>➕</span>

                <span>
                    للمنشئ
                </span>

            </button>


            <button
                class="btn btn-png"
                type="button"
            >

                <span>🖼️</span>

                <span>
                    PNG
                </span>

            </button>


            <button
                class="btn btn-txt"
                type="button"
            >

                <span>📄</span>

                <span>
                    TXT
                </span>

            </button>

        `;



        /* =========================
           تركيب البطاقة
        ========================= */

        card.appendChild(
            favButton
        );


        card.appendChild(
            terminal
        );


        card.appendChild(
            desc
        );


        card.appendChild(
            actions
        );



        /* =================================================
           Events
        ================================================= */


        /* المفضلة */

        favButton.addEventListener(
            'click',
            function () {

                const active =
                    toggleFavorite(
                        command
                    );


                favButton.classList.toggle(
                    'active',
                    active
                );


                favButton.title =
                    active
                    ? 'إزالة من المفضلة'
                    : 'إضافة إلى المفضلة';


                favButton.setAttribute(
                    'aria-label',
                    favButton.title
                );


                showToast(
                    active
                    ? 'تمت الإضافة إلى المفضلة ⭐'
                    : 'تمت الإزالة من المفضلة'
                );


                /* حدث خارجي */

                document.dispatchEvent(
                    new CustomEvent(
                        'commandFavoriteChanged',
                        {
                            detail: {
                                command,
                                active
                            }
                        }
                    )
                );

            }
        );



        /* النسخ */

        const copyButton =
            actions.querySelector(
                '.btn-copy'
            );


        copyButton.addEventListener(
            'click',
            async function () {

                const success =
                    await copyText(
                        command
                    );


                if (!success) {

                    showToast(
                        'تعذر نسخ الأمر'
                    );

                    return;

                }


                const label =
                    copyButton.querySelector(
                        '.btn-label'
                    );


                copyButton.classList.add(
                    'copied'
                );


                label.textContent =
                    'تم النسخ';


                showToast(
                    'تم نسخ الأمر 📋'
                );


                setTimeout(() => {

                    copyButton.classList.remove(
                        'copied'
                    );

                    label.textContent =
                        'نسخ';

                }, 1600);

            }
        );



        /* للمنشئ */

        actions
            .querySelector('.btn-creator')
            .addEventListener(
                'click',
                function () {

                    /*
                    يمكنك استقبال الأمر
                    في library.html
                    عبر الحدث:
                    commandCreator
                    */

                    document.dispatchEvent(

                        new CustomEvent(
                            'commandCreator',
                            {
                                detail: {
                                    command,
                                    description,
                                    data
                                }
                            }
                        )

                    );


                    showToast(
                        'تم إرسال الأمر للمنشئ ⚙️'
                    );

                }
            );



        /* PNG */

        actions
            .querySelector('.btn-png')
            .addEventListener(
                'click',
                function () {

                    downloadPng(
                        command,
                        description
                    );

                }
            );



        /* TXT */

        actions
            .querySelector('.btn-txt')
            .addEventListener(
                'click',
                function () {

                    downloadTxt(
                        command,
                        description
                    );

                }
            );


        return card;

    }



    /* =====================================================
       عرض مجموعة بطاقات
    ===================================================== */

    function renderCommandCards(
        target,
        commands = []
    ) {

        let container;


        if (
            typeof target === 'string'
        ) {

            container =
                document.querySelector(
                    target
                );

        }

        else {

            container =
                target;

        }


        if (!container) {

            console.error(
                'cards.js: لم يتم العثور على حاوية البطاقات.'
            );

            return;

        }


        container.innerHTML = '';


        commands.forEach(item => {

            container.appendChild(

                createCommandCard(
                    item
                )

            );

        });

    }



    /* =====================================================
       إضافة بطاقة واحدة
    ===================================================== */

    function appendCommandCard(
        target,
        data
    ) {

        const container =
            typeof target === 'string'
                ? document.querySelector(
                    target
                )
                : target;


        if (!container) return;


        const card =
            createCommandCard(
                data
            );


        container.appendChild(
            card
        );


        return card;

    }



    /* =====================================================
       تصدير الدوال
    ===================================================== */

    window.CommandCards = {

        create:
            createCommandCard,

        render:
            renderCommandCards,

        append:
            appendCommandCard,

        favorites:
            getFavorites,

        showToast:
            showToast

    };



    /* =====================================================
       تشغيل الملفات المطلوبة
    ===================================================== */

    loadFonts();

    loadCardStyles();

})();
