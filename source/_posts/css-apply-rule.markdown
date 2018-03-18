---
title: 【译】CSS @apply规则(mixins)
date: 2016-04-22 17:25:58
categories: css
tags:
- css
- 前端
- 翻译
description: 【翻译】《CSS @apply rule (native CSS mixins) 》：使用@apply规则，实现CSS原生的mixins。随着CSS的发展，或许我们以后将不再使用CSS预处理器（然而目前这个特性并没有得到广泛的支持），就是这样。
---

> 原文链接：[CSS @apply rule (native CSS mixins)](https://blog.gospodarets.com/css_apply_rule)
>
> 原文发布时间：April 11, 2016
>
> 原作者：Serg Gospodarets
>
> 翻译者：IwYvI

在我前一篇文章[深入了解CSS自定义属性](http://www.iwyvi.com/css/css-properties-in-depth)中，我描述了CSS属性（变量）和它们各种不同的用法。

如果你读完之后打算开始从CSS预处理器转变成用纯CSS，你的下一个问题可能是这样：“mixins要怎么办？”

答案就是：我们现在不仅有一个编辑者草案（editor's draft）：[https://tabatkins.github.io/specs/css-apply-rule/](https://tabatkins.github.io/specs/css-apply-rule/)

还在Chrome浏览器中实现了：[https://www.chromestatus.com/feature/5753701012602880](https://www.chromestatus.com/feature/5753701012602880)

在继续阅读之前，你最好已经理解了[CSS自定义属性](http://www.iwyvi.com/css/css-properties-in-depth)和[CSS mixins](https://css-tricks.com/custom-user-mixins/)的规则

### 定义自定义集

正如我们所知，你可以[为一个自定义属性赋任意值](http://www.iwyvi.com/css/css-properties-in-depth#section-1)

让我们先定义一个属性集

``` scss
:root {
  --pink-theme: {
    color: #6A8759;
    background-color: #F64778;
  }
}
```

（然而目前我的CSS代码高亮在这个语法下好口怕所以我用了SCSS来代替）

它仍然是一个有效的CSS自定义属性，因为它还是包括在`{}`里的一系列CSS属性。

### 使用方法

为了区分[CSS自定义属性的用法](http://www.iwyvi.com/css/css-properties-in-depth#section-2)和mixins，我们提出使用一个新的[@规则语句](https://developer.mozilla.org/en/docs/Web/CSS/At-rule)

你应该更熟悉这些：使用`@`开头并跟着一些关键词，以此作为CSS的一些功能标识符

例子：`@charset`，`@import`，`@keyframes`，`@media`和[更多内容](https://css-tricks.com/the-at-rules-of-css/)。

下面我们再接触一个实现CSS mixins的新CSS语句：`@apply`。

让我们应用一下这些规则（原谅我罗罗嗦嗦说了这么多[表情]）：

``` scss
body{
  @apply --pink-theme;
}
```

<iframe id="cp_embed_yOXWdm" src="//codepen.io/malyw/embed/yOXWdm?height=150&amp;theme-id=178&amp;slug-hash=yOXWdm&amp;user=malyw&amp;default-tab=result" scrolling="no" frameborder="0" height="150" allowtransparency="true" allowfullscreen="true" name="CodePen Embed" title="CodePen Embed" class="cp_embed_iframe " style="width: 100%; overflow: hidden;"></iframe>

上面我们轻松使用了我们的第一个CSS mixin，它看起来确实很像[SCSS mixins](http://sass-lang.com/guide#topic-6)。

所以一般的语法是这样：

``` scss
// DEFINING
:root {
    --custom-property-name: {
        prop-name: value;
        /*...*/
    }
}

// APPLYING
@apply custom-property-name;
```

### Mixins的例子

通常情况项目中会用到许多mixins。如[清除浮动](http://stackoverflow.com/questions/9543541/what-does-the-clearfix-class-do-in-css)，创建CSS三角形和其他内容。

让我们使用纯CSS来重写它们

#### 清除浮动（clearfix） mixins

有[很多](https://github.com/twbs/bootstrap/blob/master/less/mixins/clearfix.less)，[很多](https://gist.github.com/mrinalwadhwa/2934863)，[很多](https://gist.github.com/jelmerdemaat/3804403)关于清除浮动的实现，然而我们可以使用这个简单的方法：

``` scss
// DEFINE
:root {
  --clearfix: {
    display: table;
    clear: both;
    content: '';
  };
}

// USE
.box:after{
  @apply --clearfix;
}
```

<iframe id="cp_embed_grRNRQ" src="//codepen.io/malyw/embed/grRNRQ?height=150&amp;theme-id=178&amp;slug-hash=grRNRQ&amp;user=malyw&amp;default-tab=result" scrolling="no" frameborder="0" height="150" allowtransparency="true" allowfullscreen="true" name="CodePen Embed" title="CodePen Embed" class="cp_embed_iframe " style="width: 100%; overflow: hidden;"></iframe>

如果你没有进行清除浮动，浏览器将合并红色背景

BTW，在现在Chrome浏览器的实现中有一个有趣的bug：在mixin之前如果没写有`.box:after{content:'SOME';`，在mixin中的`content`规则将会无效

#### 溢出省略号（overflow-ellipsis） mixin

当你的UI界面要保证文字不会超出block，通常的解决方案（根据不同的需求）是使用[text-overflow](https://developer.mozilla.org/en/docs/Web/CSS/text-overflow)规则。

但是`text-overflow: ellipsis;`在没有`overflow: hidden;`和`white-space: nowrap;`下并没有什么用。这正是mixin大展身手的地方！

``` scss
// DEFINE
:root {
  --mixin-overflow-ellipsis: {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  };
}

// USE
.overflow-box{
  @apply --mixin-overflow-ellipsis;
}
```

<iframe id="cp_embed_mVqPwz" src="//codepen.io/malyw/embed/mVqPwz?height=150&amp;theme-id=178&amp;slug-hash=mVqPwz&amp;user=malyw&amp;default-tab=result" scrolling="no" frameborder="0" height="150" allowtransparency="true" allowfullscreen="true" name="CodePen Embed" title="CodePen Embed" class="cp_embed_iframe " style="width: 100%; overflow: hidden;"></iframe>

#### CSS三角形 mixin

有大量的方法可以使用CSS创建简单的几何图形，最受欢迎的就是[使用CSS border绘制三角形](http://www.sitepoint.com/sass-mixin-css-triangles/)。

让我们为此创建一个简单的mixin：

``` scss
:root {
  --triangle-to-bottom: {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 50px 50px 0 50px;
    border-color: #007bff transparent transparent transparent;
  };
}
```

如你所见，我们可以定义大小和颜色的变量。另一个想法就是做一个单独的0宽高的mixin并重用它

``` scss
:root {
  --zero-size: {
    width: 0;
    height: 0;
  };

  --triangle-to-bottom-size: 50px;
  --triangle-to-bottom-color: #007bff;

  --triangle-to-bottom: {
    @apply --zero-size;
    border-style: solid;
    border-width: var(--triangle-to-bottom-size) var(--triangle-to-bottom-size) 0 var(--triangle-to-bottom-size);
    border-color: var(--triangle-to-bottom-color) transparent transparent transparent;
  };
}

.triangle-to-bottom {
  @apply --triangle-to-bottom;
}
```

<iframe id="cp_embed_grRNZy" src="//codepen.io/malyw/embed/grRNZy?height=150&amp;theme-id=178&amp;slug-hash=grRNZy&amp;user=malyw&amp;default-tab=result" scrolling="no" frameborder="0" height="150" allowtransparency="true" allowfullscreen="true" name="CodePen Embed" title="CodePen Embed" class="cp_embed_iframe " style="width: 100%; overflow: hidden;"></iframe>

### 将变量传递给mixins

根据不同的应用规则把变量传递给mixins将会很有用。

然而不幸的是，如果你在全局作用域中（`:root'）定义了`@apply`规则，它将只能使用在那个作用域中的变量，因此不能使用你的局部变量

虽然不爽，但是至少你还能使用CSS预处理器把mixins复制粘贴到需要的作用域中，直到CSS变量正常

目前关于这个问题还在讨论

### 浏览器支持和fallbacks

#### 浏览器

1. `@apply`在[Chrome Dev and Canary（桌面和移动端）](https://codereview.chromium.org/1645433002)中，开启`chrome://flags/#enable-experimental-web-platform-features`（
实验性网络平台功能）（[issue](https://bugs.chromium.org/p/chromium/issues/detail?id=586974)）

2. 可以查看[Chrome Platform Status issue](https://www.chromestatus.com/feature/5753701012602880)从而获得最新的支持消息

#### Fallbacks

看起来似乎现在想用的这个特性话唯一方法就是使用一个PostCSS的插件：[https://github.com/pascalduez/postcss-apply](https://github.com/pascalduez/postcss-apply)

它允许自定义属性集的使用

如你所见“这个插件还是一个早期版本，许多特性还没有被支持”，但是它也包含了一些简单的内容

同时著名的[cssnext](https://github.com/MoOx/postcss-cssnext)插件作者也[期待一个Pull Request](https://github.com/MoOx/postcss-cssnext/issues/203)来添加这种特性

### 测试浏览器支持

这有一个[复制过来的例子](https://gist.github.com/malyw/477cd45bd0ed501a1c3ce0870ae16dd1)，可以检测`@apply`规则在浏览器中是否被支持：

``` javascript
function testCSSApply() {
  const ID = 'id' + new Date().getTime();

  // include styles
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
  :root {
    --${ID}: {
      font-family: ${ID};
    }
  }
  #${ID}{
    @apply --${ID};
  }
  `;
  document.head.appendChild(styleEl);

  // include element
  const el = document.createElement('i');
  el.setAttribute('id', ID)
  document.documentElement.appendChild(el);

  // test
  const styles = getComputedStyle(el);
  const doesSupport = styles.fontFamily === ID;

  // cleaning
  document.head.removeChild(styleEl);
  document.documentElement.removeChild(el);

  return doesSupport;
}
```

使用它也很简单：

``` javascript
if(testCSSApply()){
  document.documentElement.className += ' supported';
};
```

<iframe id="cp_embed_yOoMRp" src="//codepen.io/malyw/embed/yOoMRp?default-tab=result&amp;user=malyw&amp;slug-hash=yOoMRp&amp;theme-id=178&amp;height=150" scrolling="no" allowtransparency="true" allowfullscreen="true" name="CodePen Embed" title="CodePen Embed" class="cp_embed_iframe " style="width: 100%; overflow: hidden;" frameborder="0" height="150"></iframe>

### 写在最后

你可以这样想：“CSS又变得越来越难了嘤嘤嘤”：

![](https://i.imgur.com/a7sW8y2.gif)

但是我们已经习惯了CSS预处理器带来的这些概念，换句话说，现在我们将不用任何预处理器就能使用CSS变量和mixins！

是是是，语法这样并不是很好，但是想想你开始学习使用一门新的预处理器时的感觉

我倒是觉得这个发展过程会像ES6的进化发展一样：

为了代替如CoffeeScript一样的转译语言，社区开始为JavaScript添加新的特性，然后到目前为止大多数主流浏览器对其的支持度都达到了80-95%。

因此希望不久以后，所有的这些你都可以在项目中轻松地使用

> 原文链接：[CSS @apply rule (native CSS mixins)](https://blog.gospodarets.com/css_apply_rule)
>
> 原文发布时间：April 11, 2016
>
> 原作者：Serg Gospodarets
>
> 翻译者：IwYvI
>
> 翻译时间：2016/5/5
