# accessibility.browsewithcaret

最近浏览 Firefox 时，发现页面上总是有一个光标，在页面上，导致无法使用方向键控制滚屏。

查询发现时 Firefox 的一个配置被打开了名为 `accessibility.browsewithcaret` [链接](http://kb.mozillazine.org/Accessibility.browsewithcaret)

> ### Background

> Originally for debugging purposes, this preference now determines whether or not Caret Browsing mode is active. Caret Browsing is provided as a way to navigate through a web page—using only the keyboard—by moving a text caret. This mode is more easily toggled by pressing [F7].

> Caret Browsing mode changes the effects of the arrow keys, as well as the [Home] and [End] keys.

> ### Possible values and their effects

> - True

> A blinking cursor (the caret) is visible on all displayed webpages, allowing the user to navigate through the page as they might a word processor document.

> - False

> The system caret is hidden. (Default)

> ### UI

> **Firefox**

> Tools → Options → Advanced → General / Accessibility → "Always use the cursor keys to navigate within pages" (Firefox 2 and above)
> Tools → Options → Advanced → General / Accessibility → "Allow text to be selected with the keyboard" (Firefox 1.5)
