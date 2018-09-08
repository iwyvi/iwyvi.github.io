---
title: 【译】深入了解CSS自定义属性
date: 2016-04-22 17:25:58
categories: css
tags:
- css
- 前端
- 翻译
description: 【翻译】《CSS custom properties (native variables) In-Depth》：CSS自定义属性是一项新的CSS特性，它是一种在CSS中定义的变量，我们可以用这些变量实现一些新的功能，同时CSS自定义属性也提供了CSS与JS交互的新方式，与其他CSS预处理器也能做到完美配合。
---

{% blockquote %}
 原文链接：[CSS custom properties (native variables) In-Depth](https://blog.gospodarets.com/css_properties_in_depth)

 原文发布时间：March 29, 2016
 原作者：Serg Gospodarets

 翻译者：IwYvI
{% endblockquote %}
{% blockquote %}
这将是我翻译的第一篇文章，主要是关于CSS自定义属性等内容。（这篇文章看上去翻译起来比较简单，（不知道我翻译完了还会不会这么说
{% endblockquote %}
{% blockquote %}
词汇翻译：

* CSS property：CSS属性
* CSS custom property：CSS自定义属性
* CSS variable：CSS变量

翻译这篇文章借助了有道、bing、Google的翻译。如果出现不准确的地方希望能向我提出来
{% endblockquote %}

在这篇文章中，我本想从解释CSS变量的用途开始说起，但是事实上许多流行的CSS预、后处理器已经实现了这个功能

几个用途的例子：

* 颜色变量
* 组件的常量属性（布局，位置属性等等）
* 避免代码冗余

当然，你仍然可以手动在你的代码库里查找或者替换你所想修改的部分，但是这就像在JS中没有定义变量直接使用硬编码的值一样痛苦。动态的和限定作用域的CSS变量将对你的实验和应用程序提供更多功能：你可以自由地阅读，设置和更新它们！同时你可以避免在代码库中造成代码冗余，你可以看看最近的这篇文章[Webkit guys did in their Web Inspector](https://webkit.org/blog/5989/css-variables-in-webkit/)。

同时你终于有了一个可以轻松地从CSS向JS传递数据的接口（例如媒体断点的值(media breakpoint values)）

下面是CSS属性具有的几个特点：

* 它们是动态的，能在运行时被修改
* 它们可以轻松地用JS读写
* 它们是可继承的，层叠的且有作用域

下面，让我们深入了解什么是CSS属性和怎么使用它们

### 名称

最开始，这项特性被叫做CSS变量，但是后来被扩展和重构为CSS自定义属性

然而，根据它所使用的语法，更准确的名称应该是CSS属性。这篇相关文章[CSS @apply rule](http://tabatkins.github.io/specs/css-apply-rule/)让我们觉得有点"mixins"的感觉。

所以目前的名称是[CSS Custom Properties for Cascading Variables](https://drafts.csswg.org/css-variables/)（CSS层叠变量的自定义属性）。

[CSS变量目前有两种形式](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables#What_are_CSS_Variables):

> 变量是指一个标识符指代一个任意常规的值。`var()`符号：`var(--example-variable)`将返回`--example-variable`的值。

> 自定义属性是指用`--*`这样的形式表示的属性，其中`*`代表变量名称。用这种形式给变量赋值：`--example-variable: 20px;`，这句话表示将变量`--example-variable`赋值为`20px`。

### 第一个CSS变量

或许这会让你惊讶，因为你有可能已经了解并且使用过一个CSS变量（看起来是第一个）`currentColor`，这个变量虽然并不是众所周知的但是[仍然可以使用](https://css-tricks.com/currentcolor/)并且[可以在所有浏览器中工作](http://caniuse.com/#feat=currentcolor)。

它同样有作用域并且可以被重新定义：

``` css
:root { color: red; }
div { border: 1px solid currentColor; } /* border-color is red */
```

如果你加上这一句

``` css
div {
  color: black;
}
```

边框的颜色[将变回黑色](http://codepen.io/malyw/pen/yObLEX)

### CSS变量的语法

#### 赋值

你可以使用`--variable-name: variable-value;`这个语法来定义一个变量（变量名是大小写敏感的）。而变量的值可以是颜色，字符串等等：

``` css
:root{
  --main-color: #4d4e53;
  --main-bg: rgb(255, 255, 255);
  --logo-border-color: rebeccapurple;
  --header-height: 68px;
  --content-padding: 10px 20px;
  --base-line-height: 1.428571429;
  --transition-duration: .35s;
  --external-link: "external link";
  --margin-top: calc(2vh + 20px);
}
```

语法似乎看起来很吃藕，但是这是因为[种种原因](http://www.xanthir.com/blog/b4KT0)。例如`$var`这样的变量语法就会被其他的CSS预处理器处理。

#### 用法

你可以在CSS像这样用变量：`some-css-value: var(--variable-name [, declaration-value]);`

``` css
p {
  margin: var(--p-margin, 0 0 10px);
}
```

在上面这个例子中如果`--p-margin`没有被定义，`0 0 10px`将被使用。这样的特性会让编写的代码更灵活，例如你可以使用一些来自框架的变量（通常多数变量已经被定义了），但是当你要移除它们的时候这个特性将会节约做其他【高端】的事的时间。

#### 作用域

正如[module’s documentation title](https://drafts.csswg.org/css-variables/)里提到的，自定义属性也遵守[CSS层叠规则](https://drafts.csswg.org/css-cascade-4/#cascade)。

用[`:root scope`](https://developer.mozilla.org/en-US/docs/Web/CSS/:root)来创建一个全局变量：

``` css
:root{
  --global-var: 'global';
}
```

如果你想创建一个只在某个元素或组件里存在的变量，就在那个元素里面[重]定义这个变量（[demo](http://codepen.io/malyw/pen/QNvwRV)）：

``` html
<div class="block">
  My block is
  <div class="block__highlight">awesome</div>
</div>
```
``` css
.block {
  --block-font-size: 1rem;
  font-size: var(--block-font-size);
}

.block__highlight {
  --block-highlight-font-size: 1.5rem;
  font-size: var(--block-highlight-font-size);
}
```

媒体查询同样提供了作用域（[demo](http://codepen.io/malyw/pen/grgJJJ)）：

``` css
@media screen and (min-width: 1025px) {
  :root {
    --screen-category: 'desktop';
  }
}
```

下一个关于作用域的例子是[伪类](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)（例如：`:hover`）（[demo](http://codepen.io/malyw/pen/ZWygyv)）：

``` css
body {
  --bg: #f00;
  background-color: var(--bg);
  transition: background-color 1s;
}

body:hover {
  --bg: #ff0;
}
```

当定义了全局的自定义变量，为了避免命名冲突，可以看看这篇文章[a common convention naming your variables](http://codepen.io/malyw/pen/eZgaQv)（或者更简单地用[BEM naming convention](http://getbem.com/naming/)这个方法来命名），例如：

``` css
:root {
  /* main (page-wide) variables */
  --main-color: #555;
  --main-bg: rgb(200, 200, 200);
  /* accordion variables */
  --accordion-bg: #f00;
  --accordion-font-size: 1.5rem;
  --accordion__item-bg: #ded;
}

body {
  color: var(--main-color);
  background-color: var(--main-bg);
  /*...*/
}
```

#### 用其他变量来赋值

同样我们可以用其他变量来给变量赋值`--variable-name: var(--another-variable-name);`（[demo](http://codepen.io/malyw/pen/NNjqWB)）：

``` css
.block {
  --block-text: 'This is my block';
  --block-highlight-text: var(--block-text)' with highlight';
}

.block:before {
  content: var(--block-text);
}

.block__highlight:before {
  content: var(--block-highlight-text); /*This is my block with highlight*/
}
```

这里有一个小问题，就是不能简单地用已定义的变量来计算出新的变量值。但是我们可以用[`calc()`](https://developer.mozilla.org/en/docs/Web/CSS/calc)来代替（[demo](http://codepen.io/malyw/pen/GZmJgO)）：

``` css
.block {
  --block-font-size: 1rem;
}

.block__highlight {
  /* DOESN'T WORK */
  --block-highlight-font-size: --block-font-size)*1.5;
  font-size: var(--block-highlight-font-size);

  /* WORKS */
  font-size: calc(var(--block-font-size)*1.5);
}
```

注意，那些很庞大的表达式可能会影响到应用的性能

#### 使用calc()计算

上面已经提到你不能像这样使用变量：

``` css
  padding: var(--spacer)px
```

但是可以使用`calc()`来进行计算。让我们做一个[vertical rhythm](http://codepen.io/malyw/pen/MymmNK)（这个怎么翻译嘤嘤嘤）的例子：

``` css
  margin: 0 0 calc(var(--base-line-height, 0) * 1rem);
```

#### 重置或继承变量的值

CSS自定义属性默认是继承的。这种情况下为了减小对块或组件的副作用，你可以[重置自定义属性](http://codepen.io/malyw/pen/qZReZB)：

``` css
.with-reset {
  --bgcolor: initial;/* RESETS VALUE */
  --color: green;/* CHANGES VALUE */
  --border: inherit;/* DOESN'T CHANGE ANYTHING, AS INHERITED BY DEFAULT */
}
```

### 用JavaScript控制自定义属性

你可以使用JS轻松地读写自定义属性。（[CSS样式声明接口](https://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration)(`getPropertyValue`,`setProperty`)）：

``` javascript
// READ
const rootStyles = getComputedStyle(document.documentElement);
const varValue = rootStyles.getPropertyValue('--screen-category').trim();
// WRITE
document.documentElement.style.setProperty('--screen-category', value);
```

下面是一个DEMO，使用``--screen-category`这个自定义变量代表当前显示类型，它可以在UI界面中被修改。（[demo](http://codepen.io/malyw/pen/grgJJJ)）

这个demo中展示了JS中对自定义变量进行debug的方法：

``` javascript
// GET
alert(
    getComputedStyle(document.documentElement).getPropertyValue('--screen-category').trim();
);

// SET
document.documentElement.style.setProperty('--screen-category', 'custom');

// or reassign from an another prop
document.documentElement.style.setProperty(
    '--screen-category', 'var(--default-screen-category, '%DEFAULT VALUE IF VAR IS NOT SET%')'
);
```

现在我们能把任意值赋给CSS变量，也有了接口在JS读写这些变量，这样我们就可以摆脱以前使用的[从CSS/SASS中向JS传递数据](https://blog.gospodarets.com/passing_data_from_sass_to_js)这样的方法。（例如：[list of media queries breakpoints](http://codepen.io/malyw/pen/zGxodr)）。

把变量放在`content`中，将会在页面上输出它的值，这样可以用来做debug：

``` css
body:after {
  content: '--screen-category : 'var(--screen-category);
}
```

### 浏览器支持

自定义属性已经可以在Chrome，Firefox和桌面版Safari 9.1里正常使用了：

![browser_support](https://i.loli.net/2018/09/08/5b935d2c13e90.jpg)

<p style="text-align:center">Stats from <a href="http://caniuse.com/#feat=css-variables">caniuse.com</a></p>

这个特性在[Microsoft Edge浏览器里的支持还在考虑中](https://dev.windows.com/en-us/microsoft-edge/platform/status/cssvariables)

它们目前还有一些限制和bug：

* [用`calc()`计算CSS变量](http://codepen.io/malyw/pen/ONmjzp)可能会在某些浏览器上出错
* 人们还在讨论[为当前作用域中的自定义属性添加一些基础规则](https://github.com/w3c/webcomponents/issues/300#issuecomment-144551648)，例如`--: initial;`
* 不能使用常规CSS属性名称： <del>`var(--side): 10px;`</del>
* 用`calc()`计算时需要这样写：`calc(var(--base-line-height, 0) * 1rem)`
* 不能当做媒体查询的值 <del>`@media screen and (min-width: var(--desktop-breakpoint))`</del>
* 图片的url也不可以使用变量 <del>`url(var(--image-url))`</del>

这里有个[DEMO](http://codepen.io/malyw/pen/GZmzPG)可以用来测试浏览器对CSS自定义属性的支持。

``` css
@supports ( (--a: 0)) {
  /* supported */
}

@supports ( not (--a: 0)) {
  /* not supported */
}
```
``` javascript
if (window.CSS && window.CSS.supports && window.CSS.supports('--a', 0)) {
  alert('CSS properties are supported');
} else {
  alert('CSS properties are NOT supported');
}
```

对于以前的浏览器（[没有 CSS.sgpports() API](http://caniuse.com/#feat=css-featurequeries)），你可以看看[Wes Bos' test](https://gist.github.com/wesbos/8b9a22adc1f60336a699)。

### Fallbacks/polyfills

（这个标题似乎并没有什么中文词语能直接翻译，大意就是让老浏览器支持新功能）

> 接下来这两段翻译的实在是有些勉强

>There are couple examples of PostCSS plugins, but `no plugin can achieve true complete parity according to the specification because of the DOM cascade unknowns` + they are not dynamic.
>
>It might be solved when we see the bright future and CSS Houdini group dream of implementing [an easy native way for CSS "polyfills" to all major browsers](https://www.smashingmagazine.com/2016/03/houdini-maybe-the-most-exciting-development-in-css-youve-never-heard-of/) will come true. And even in that case variables syntax, most of all, cannot be shimmed.

现在已经有许多关于PostCSS插件的例子，但是这些插件都不能根据规范真正实现对等处理，因为DOM层叠结构对它们是未知的，而且这些插件所做的处理也是非动态的。

这个问题最终将会被解决，CSS Houdini组织提出的[an easy native way for CSS “polyfills” to all major browsers](https://www.smashingmagazine.com/2016/03/houdini-maybe-the-most-exciting-development-in-css-youve-never-heard-of/)，应该会实现，我们也可以看得出CSS广阔的前景。最重要的是在这种情况下，变量语法不再会被忽视。

然而到目前为止有这样一个清单：

* [转换W3C CSS自定义属性的PostCSS插件](https://github.com/postcss/postcss-custom-properties)- 一个只处理`:root`里声明的变量的插件
* [将CSS自定义属性（CSS变量）的语法转换为静态的语句](https://github.com/MadLittleMods/postcss-css-variables)，这有一个[在线的DEMO](https://madlittlemods.github.io/postcss-css-variables/playground/)。它尝试处理了媒体查询、伪类元素和元素嵌套这些部分的作用域问题。
* [Myth](https://github.com/segmentio/myth)- 一个预处理器
* [CSS next](https://github.com/MoOx/postcss-cssnext)，为CSS添加新的语法

### 和CSS预处理器（SCSS）一起使用

#### 相同的变量名

现在开始和预处理器一起使用CSS自定义属性，我们可以使用[一种混合语法来检查浏览器的支持](http://codepen.io/malyw/pen/grRQeq)

``` scss
@supports ( (--a: 0)) {
  /* Custom properties are supported in the browser */
  :root{
    --main-bg: #4d4e53;
  }

  body {
    background-color: var(--main-bg);
  }
}

@supports ( not (--a: 0)) {
  /* Custom properties are NOT supported in the browser */
  $main-bg: #4d4e53;

  body {
    background-color: $main-bg;
  }
}
```

在这种情况下CSS和Sass的变量都存在，但是只有在浏览器不支持自定义属性时Sass变量才会被使用。

或者你可以把这种逻辑[藏在Sass的mixin中](http://codepen.io/malyw/pen/aNwKKv)：

``` scss
@mixin setVar($varName, $value){
  @include setVarSass($varName, $value);
  @include setVarCss($varName, $value);
}

@mixin setPropFromVar($propName, $varName){
  @supports ( (--a: 0)) {
    // Custom properties are supported in the browser
    #{$propName}: getVarCss($varName);
  }

  @supports ( not (--a: 0)) {
    // Custom properties are NOT supported in the browser
    #{$propName}: getVarSass($varName);
  }
}

// SET
@include setVar('main-color', #f00);

// GET
body {
  @include setPropFromVar('color', 'main-color');
}
```

#### 全局变量

在Sass和CSS中变量的作用域是不同的，但是它们都可以这样做：

``` scss
/* SCSS */
$main-color: #f00 !global;

/* CSS */
:root{
    --main-color: #f00;
}
```

### 给没有赋值的变量赋值

一个常见的情况是，我们希望使用一个变量给另一个变量赋值时，如果用于赋值的变量本身没有被赋值，则需要一个默认值来赋给新的变量。

``` scss
/* SCSS */
$main-color: #f00 !default;

body{
    color: $main-color;
}
```

然而你并不能在CSS里这样做：

``` css
/* CSS */
body{
    --main-color: var(--main-color, #f00); /* DOESN'T WORK */
}
```

但是你可以创建一个新的变量

``` css
/* CSS */
body{
    --local-main-color: var(--main-color, #f00); /* DOES WORK */
    color: var(--local-main-color);
}
```

或者直接使用

``` css
/* CSS */
body{
    color: var(--main-color, #f00); /* DOES WORK */
}
```

### 有趣的用法

自定义属性提出了这些有趣的想法：

* 现在可以使用原生的方法来处理CSS与JS的通信，而不是[以前用的hack方法](https://css-tricks.com/making-sass-talk-to-javascript-with-json/)
* 另一个例子是[国际化地使用自定义属性](http://codepen.io/malyw/pen/grgVGx)，不同语言中的text和colors可以使用`external link`来解决
* Jake Archibald 提出了一个想法：根据加载到页面的块和样式，使用CSS变量控制元素的可见性（[文章链接](https://jakearchibald.com/2016/css-loading-with-custom-props/)）
* 主题切换：现在不必再为特定class添加CSS样式或者增加新的CSS样式文件来改变网站主题，你可以使用自定义属性来解决这个问题。Michael Scharnagl在[这篇文章](https://justmarkup.com/log/2016/02/theme-switcher-using-css-custom-properties/)中描述了如何处理主题切换。
* 我还想到了一些用法，例如用于特定域名（对 domain1.site.com和domain1.site.com提供不同的外观）（原文如此）。这样我们就可以很轻松上传并应用重定义了自定义属性的CSS文件（取决于域名）

最后一个想法很贴近使用自定义属性的主题切换，所以可以把他们放在一起用（[demo](https://blog.gospodarets.com/demos/css-custom-props-theme-switcher/)）

[![](https://i.imgur.com/DwLCfC0.gif)](https://blog.gospodarets.com/demos/css-custom-props-theme-switcher/)

* 当然，自定义属性在[补全CSS属性](http://codepen.io/malyw/pen/KzZXRq?editors=1100)这里看起来也很好用

[![](https://i.imgur.com/E0FTuI1.jpg)](http://codepen.io/malyw/pen/KzZXRq?editors=1100)

### Demo

受到Wes Bos [demos of interacting with CSS custom properties](https://twitter.com/wesbos/status/697808716905652224)的启发，我决定更进一步在CSS中使用`calc();`对颜色的R,G,B值进行计算。

这是灰度过滤器的代码：

``` css
.grayscale {
  background-color: rgba(
    calc(0.2126 * var(--r)),
    calc(0.7152 * var(--g)),
    calc(0.0722 * var(--b)),
    1
  );
}
```
[DEMO](https://blog.gospodarets.com/demos/css-colors-from-custom-props/)

[![](https://i.imgur.com/9IUE3FR.gif)](https://blog.gospodarets.com/demos/css-colors-from-custom-props/)

有趣的事实：

* Chrome似乎并不喜欢`calc()`中的CSS变量的非整数乘除法
* Firefox完全不计算`rgba()`里面需要使用`calc()`计算的自定义变量
* Demo在Safari里能达到预期效果O(∩_∩)O~~（原本是个emoji表情）

### 结论

现在你应该已经知道了CSS自定义变量的含义和如下几点：

* 它的语法支持CSS和JS的交互
* 它是动态的、可继承的、层叠的和有作用域的
* 浏览器的支持和它的fallbacks
* 它可以和Sass变量一起使用
* 总之，通过一些有趣的用法和示例，自定义属性确实为开发者和web平台加入了新的能力

我希望读完这篇文章后你能用上自定义属性

### 扩展阅读

近期CSS原生mixins语法发布 - [【译】CSS @apply规则(mixins)](http://www.iwyvi.com/css/css-apply-rule)

> 原文链接：[CSS custom properties (native variables) In-Depth](https://blog.gospodarets.com/css_properties_in_depth)
>
> 原文发布时间：March 29, 2016
>
> 原作者：Serg Gospodarets
>
> 翻译者：IwYvI
>
> 翻译时间：2016/4/22
>
> 第一次翻译英语文章，如有不准确的地方希望向我提出来

