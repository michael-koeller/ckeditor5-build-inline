(function(d){	const l = d['uk'] = d['uk'] || {};	l.dictionary=Object.assign(		l.dictionary||{},		{"%0 of %1":"%0 із %1","Align center":"По центру","Align left":"По лівому краю","Align right":"По правому краю",Big:"Великий","Block quote":"Цитата","Blue marker":"Синій маркер",Bold:"Жирний","Bulleted List":"Маркерний список",Cancel:"Відміна","Cannot upload file:":"Неможливо завантажити файл:","Choose heading":"Оберіть заголовок",Column:"Стовпець","Could not insert image at the current position.":"Не можливо вставити зображення в поточну позицію.","Could not obtain resized image URL.":"Не вдалось отримати URL зміненого зображення.",Default:"За замовчуванням","Delete column":"Видалити стовпець","Delete row":"Видалити рядок",Downloadable:"Завантажувальне","Dropdown toolbar":"Випадаюча панель інструментів","Edit link":"Редагувати посилання","Editor toolbar":"Панель інструментів редактора","Font Size":"Розмір шрифту","Green marker":"Зелений маркер","Green pen":"Зелений маркер","Header column":"Заголовок стовпця","Header row":"Заголовок рядка",Heading:"Заголовок","Heading 1":"Заголовок 1","Heading 2":"Заголовок 2","Heading 3":"Заголовок 3","Heading 4":"Заголовок 4","Heading 5":"Заголовок 5","Heading 6":"Заголовок 6",Highlight:"Виділення",Huge:"Величезний","image widget":"Віджет зображення","Insert column left":"Вставити стовпець зліва","Insert column right":"Вставити стовпець справа","Insert image or file":"Вставте зображення або файл","Insert row above":"Вставити рядок знизу","Insert row below":"Вставити рядок зверху","Insert table":"Вставити таблицю","Inserting image failed":"Не вдалось вставити зображення",Italic:"Курсив",Justify:"По ширині",Link:"Посилання","Link URL":"URL посилання","Merge cell down":"Поєднати комірки внизу","Merge cell left":"Поєднати комірки ліворуч","Merge cell right":"Поєднати комірки праворуч","Merge cell up":"Поєднати комірки вгору","Merge cells":"Поєднати комірки",Next:"Наступний","Numbered List":"Нумерований список","Open in a new tab":"Вікрити у новій вкладці","Open link in new tab":"Відкрити посилання у новій вкладці",Paragraph:"Параграф","Pink marker":"Рожевий маркер",Previous:"Попередній","Red pen":"Червоний маркер",Redo:"Повтор","Remove highlight":"Видалити виділення","Rich Text Editor, %0":"Розширений текстовий редактор, %0",Row:"Рядок",Save:"Зберегти","Selecting resized image failed":"Не вдалося вибрати зображення зі зміненим розміром","Show more items":"Показати більше",Small:"Маленький","Split cell horizontally":"Розділити комірки горизонтально","Split cell vertically":"Розділити комірки вертикально",Subscript:"Нижній індекс",Superscript:"Верхній індекс","Table toolbar":"Панель інструментів таблиці","Text alignment":"Вирівнювання тексту","Text highlight toolbar":"Панель виділення тексту","This link has no URL":"Це посилання не має URL",Tiny:"Крихітний",Undo:"Відміна",Unlink:"Видалити посилання","Upload in progress":"Виконується завантаження","Widget toolbar":"Панель інструментів віджетів","Yellow marker":"Жовтий маркер"}	);l.getPluralForm=function(n){return (n % 1 == 0 && n % 10 == 1 && n % 100 != 11 ? 0 : n % 1 == 0 && n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 1 : n % 1 == 0 && (n % 10 ==0 || (n % 10 >=5 && n % 10 <=9) || (n % 100 >=11 && n % 100 <=14 )) ? 2: 3);;};})(window.CKEDITOR_TRANSLATIONS||(window.CKEDITOR_TRANSLATIONS={}));