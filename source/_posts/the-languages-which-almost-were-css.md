---
title: 【译】几乎要成为CSS的语言们
data: 2016-07-07 11:35:58
categories: css
tags: css,前端
description: 【翻译】《The Languages Which Almost Became CSS》：在CSS出现之前，还有许多种样式语言来定义HTML标签的样式，本文就将介绍这些语言的历史。（这个介绍我实在是编不动了）
---

{% blockquote %}
原文链接：[The Languages Which Almost Became CSS](https://eager.io/blog/the-languages-which-almost-were-css/)

原文发布时间：06 Jul 2016

原作者：Zack Bloom / @[zackbloom](https://twitter.com/zackbloom)

翻译者：IwYvI
{% endblockquote %}

> In fact, it has been a constant source of delight for me over the past year to get to continually tell hordes (literally) of people who want to – strap yourselves in, here it comes – control what their documents look like in ways that would be trivial in TeX, Microsoft Word, and every other common text processing environment: “Sorry, you’re **screwed**.”
> — Marc Andreessen 1994

当Tim Berners-Lee在1991年宣布HTML规范时，还没有设置页面样式的方法。对于给定的HTML标签，如何渲染它们则是浏览器决定的，还通常根据用户输入的喜好来设置。这样看起来，为页面制定一种标准来“建议”它在样式上应该怎样被渲染是一个很好的想法。

但是CSS在5年里没有被引入，而10年里也没有被充分执行。这段时间里有许多创新和改革，涌现出多种样式化方法，而这些方法都很有机会演变成规范。

尽管这些语言显然在现在在现在已经不常用了，但我觉得想象世界本来有可能变成什么样还是很有趣的。更令人惊奇的是，这些语言中许多特性却是如今开发者更想在CSS中看到的。

### 第一项提议

在1993年初，Mosaic浏览器还没有发布1.0版本，同时那时的各种浏览器也只能处理HTML。没有方法能标识HTML的样式，例如浏览器决定`<h1>`应该是什么样，那么你看到的就是什么样的。

在那年六月，Robert Raisch向www-talk mailing list提出了一项提议，要创建一种和Web文档一起发送、用于传播样式化信息并易于解析的格式化语言，这就是RRP。

``` scss
@BODY fo(fa=he,si=18)
```

你应该原谅自己什么看不懂这段代码干了什么hhh。在gzip技术使用以前，同时那时的网络链接速度也徘徊在14.4k左右，把这种新格式的内容弄得尽可能短是很有必要的。上面这个规则是将字体（`fa`)设置为helvetica（`he`），将字体大小（`si`）设置为18points。

有趣的是在这个提议中没有提到任何单位，所有的数字都根据其上下文来解释（例如字体总是使用points）。因此RRP也被认为设计得更像一种渲染的”建议“而不是规则。这一点被认为很有必要，因为同样的样式表需要在命令行浏览器（如[Lynx](https://en.wikipedia.org/wiki/Lynx_(web_browser)）和变得越来越流行的图形化浏览器上有着相同的效果。

![](https://eager.io/blog/the-languages-which-almost-were-css/images/lynx.png)

RRP包含设定分栏布局的方法，而CSS却直到2011年才支持这项特性。例如设置一个三栏布局，每一栏”80 units“宽，可以这样写：

``` scss
@P co(nu=3,wi=80)
```

这分析起来有点难，但是大概不会比`white-space: nowrap`更坏。（我没看懂这句话）

值得注意的是RRP不支持我们今天使用的样式表中的“级联”。一个给定的document在同一时间只能有一个激活的样式表，这就需要逻辑方法来思考如何设置样式，虽然如今我们对此已经很陌生了。

Marc Andreessen（Mosaic的创造者）知道了RRP提议，但是却从没有在Mosaic浏览器中实现。取代而之的是Mosaic浏览器很快地（某种意义上是悲剧地）采用HTML标签来定义样式，引入了像`<FONT>`和`<CENTER>`这样的标签。

### Viola和早期浏览器之争

> >Then why don't you just implement one of the many style sheet proposals that are on the table. This would pretty much solve the problem if done correctly.
>
>So then I get to tell people, "Well, you get to learn this language to write your document, and then you get to learn that language for actually making your document look like you want it to." Oh, they'll love that.
>
>— Marc Andreessen 1994

与流行观点相反，Mosaic并不是第一个图形化浏览器。[ViolaWWW](https://en.wikipedia.org/wiki/ViolaWWW)的诞生就在它之前，这一个Pei-Yuan仅仅用了四天写出来的图形化浏览器。

![](https://eager.io/blog/the-languages-which-almost-were-css/images/viola.png)

Pei-Yuan创建了一种样式表语言，它支持一种我们现在在CSS中使用的嵌套结构。

``` scss
(BODY fontSize=normal
      BGColor=white
      FGColor=black
  (H1   fontSize=largest
        BGColor=red
        FGColor=white)
)
```

这种情况下我们对body应用了颜色设置，还专门对body里的`H1`元素设置了样式。为了取代使用重复的选择器来处理嵌套，PWP使用了圆括号系统，而这种系统在后来演化成缩进系统，例如如今一些开发者喜欢使用的Stylus和SASS便使用了这样的设计。这也使得PWP的语法在至少一个方面上潜在地比最终成为web通用语的CSS更加优秀。

PWP也需要以我们还在使用的方式来显著引入外部样式表：

``` html
<LINK REL="STYLE" HREF="URL_to_a_stylesheet">
```

ViolaWWW不幸地被主要用在[X Windowing System](https://en.wikipedia.org/wiki/X_Window_System)上，仅仅在Unix操作系统中比较流行。当Mosaic发布Windows版本后，就很快就把Viola远远甩在后面。

### 在Web之前的样式表

>HTML is the kind of thing that can only be loved by a computer scientist. Yes, it expresses the underlying structure of a document, but documents are more than just structured text databases; they have visual impact. HTML totally eliminates any visual creativity that a document’s designer might have.
>
>— Roy Smith 1993

早在互联网之前就有对文档样式化语言的需求。

你也许知道的，HTML最初是基于SGML这个互联网之前就存在的语言。1987年，美国国防部决定研究SGML能否存储和传输大量文档信息。像其他优秀的政府项目一样，他们没有在起名上浪费时间。他们最初叫Comuter-Aided Logistics Support Team，然后叫Computer-aided Acquisition and Logistics Support team，最终起名为Continuous Acquisition and Life-cycle Support initiative。无论怎样，首字母缩写为CALS。

CALS团队创建了一种用于样式化SGML文档的语言，叫做FOSI，毫无疑问这也是四个单词组合的首字母缩写。他们发表了全面的语言规范，因为语言不可理解。它还包含了一张我最喜欢的互联网上的无意义信息表[nonsensical infographics](http://people.opera.com/howcome/2006/phd/i/fosi.png)。

互联网的一个不可侵犯规则是：如果你能证明其他人在某件事中错误了，更多的事将会完成（more will always get done if you can prove someone wrong in the process）（什么辣鸡翻译）。1993年，在Pei-Yuan的提议提出的四天后，Steven Heaney提出了不必“再造轮子”，最好是用FOSI的一种变体来样式化页面。

FOSI文档也是由SGML写成，这确实在某种程度上对于熟悉SGML变体HTML的前端开发人员是一种符合逻辑的选择。下面是一个文档的例子：

``` xml
<outspec>
  <docdesc>
    <charlist>
      <font size="12pt" bckcol="white" fontcol="black">
    </charlist>
  </docdesc>
  <e-i-c gi="h1"><font size="24pt" bckcol="red", fontcol="white"></e-i-c>
  <e-i-c gi="h2"><font size="20pt" bckcol="red", fgcol="white"></e-i-c>
  <e-i-c gi="a"><font fgcol="red"></e-i-c>
  <e-i-c gi="cmd kbd screen listing example"><font style="monoser"></e-i-c>
</outspec>
```

你或许对`docdesc`或`charlist`是什么有点困惑，`www-talk`的成员也是这样。唯一与上下文有联系的信息是`e-i-c`，它代表“element in context”。然而值得注意的是FOSI引入了`em`这个单位，它在如今也成了那些对CSS了解比较深入的人更喜欢使用的单位。

语言冲突和编程一样古老。这是函数式“lisp-style”语法和声明式语言的战争。Pei-Yuan认为他的语法是类LISP式的，但是对于真正的LISP变体的出现也只是时间问题。

### 图灵完备的样式表

由于FOSI很复杂，它也被认为是一个样式化的临时解决方案。更长远的计划是创建一种基于函数的编程语言体系，它可以提供你能想象到的文档转换。这种语言就是DSSSL。他的贡献者（contributor）这样说：

>It’s a mistake to put DSSSL into the same bag as scripting languages. Yes, DSSSL is Turing-complete; yes, it’s a programming language. But a script language (at least the way I use the term) is procedural; DSSSL very definitely is not. DSSSL is entirely functional and entirely side-effect-free. Nothing ever happens in a DSSSL stylesheet. The stylesheet is one giant function whose value is an abstract, device-independent, nonprocedural description of the formatted document that gets fed as a specification (a declaration, if you will) of display areas to downstream rendering processes.

简单来说，DSSSL是一个相当合理的样式化语言：

``` scss
(element H1
  (make paragraph
    font-size: 14pt
    font-weight: 'bold))
```

因为他是一个编程语言，所以你甚至可以定义函数：

``` scss
(define (create-heading heading-font-size)
  (make paragraph
    font-size: heading-font-size
    font-weight: 'bold))

(element h1 (create-heading 24pt))
(element h2 (create-heading 18pt))
```

同时可以使用数学结构，例如为表格各行上色。

``` scss
(element TR
  (if (= (modulo (child-number) 2)
        0)
    ...   ;even-row
    ...)) ;odd-row
```

更让人嫉妒的是，DSSSL可以继承变量的值并且进行数学运算：

``` scss
(element H1
  (make paragraph
    font-size: (+ 4pt (inherited-font-size))))
```

不幸的是，DSSSL有影响到所有完备体系语言的致命缺点：它又太多圆括号了。此外，当它发布的时候，它可以说是一个*太过完备*的规范，威胁到了其他浏览器开发者。DSSSL规范包含超过210项单独的样式化属性。

这个团队继续创造了文档转换语言[XSL](https://en.wikipedia.org/wiki/XSL)，尽管这个语言并没有让人更容易理解，但是毫无疑问它却更受欢迎。

### 为什么样式表最终胜出了

CSS不包含父元素选择器（一种基于子元素来选择父元素的方法）。尽管在Stack Overflow上有许多人都在哀叹这个事实，然而他们却也为没有父元素选择器找出了许多原因。尤其是在互联网发展的早期，页面在document完全加载前就要开始渲染被认为是十分重要的事。换句话说，我们希望能HTML从一开始就被渲染，而不是还要等到完整下载以后才进行渲染。

父元素选择器意味着当HTML文档加载后样式会被更新。像DSSSL这样的语言就完全出局了，因为他们对HTML文档本身有一定的操作运算，而这有可能无法在渲染开始的时候就执行。

在1995年三月，Bert Bos 第一个提出这个问题并且提议出了一个可行的语言方案。同时他的建议还包含了“笑脸”表情的早期版本。:-)

这个语言在语法上有点“面向对象”的感觉：

``` scss
*LI.prebreak: 0.5
*LI.postbreak: 0.5
*OL.LI.label: 1
*OL*OL.LI.label: A
```
使用`.`表示直接子元素，使用`*`来指定祖先元素

这种语言还定义了在样式表中怎样创建链接：

``` scss
*A.anchor: !HREF
```

这种情况下，我们指定了元素的连接就是它的`HREF`属性的值。在当时，像链接这样可以控制元素行为的提议十分很流行。在JavaScript出现之前，还没有办法来做到这件事，所以它似乎顺理成章的在这些提议中出现。

又在1994年，一个名叫”C.M. Sperberg-McQueen"的人提出了一种函数形式的语言：

``` scheme
(style a
  (block #f)     ; format as inline phrase
  (color blue)   ; in blue if you’ve got it
  (click (follow (attval 'href)))  ; and on click, follow url
```

他的语言使用了`content`作为样式表控制HTML元素内容的关键词，在之后CSS2.1中也引入了这个概念。

### 本应该发生什么

在我讨论最终演变为CSS的语言之前，我还要提一下另外一门语言的提议，只是因为它在某种程度上实现了早期web开发者的梦想。

PSL96得名于1996版“规范表述语言”（Presentation Specification Language）。PSL看起来很像CSS：

``` css
H1 {
  fontSize: 20;
}
```

当然它很快变得有趣起来。例如，当你声明元素位置的时候，你不仅可以基于已经指定的尺寸（`Width`），还可以基于浏览器渲染后的实际尺寸（`Actual Width`）：

``` css
LI {
  VertPos: Top = LeftSib . Actual Bottom;
}
```

同时你还可以使用左边的兄弟元素作为其约束。

或者在样式中添加逻辑表达式。例如对一个有`hrefs`的元素进行样式化：

``` css
A {
  if (getAttribute(self, "href") != "") then
    fgColor = "blue";
    underlineNumber = 1;
  endif
}
```

<del>这种样式语言可以被拓展到完成所有我们求助于class去完成的方法</del>

``` css
LI {
  if (ChildNum(Self) == round(NumChildren(Parent) / 2 + 1)) then
    VertPos: Top = Parent.Top;
    HorizPos: Left = LeftSib.Left + Self.Width;
  else
    VertPos: Top = LeftSib.Actual Bottom;
    HorizPos: Left = LeftSib.Left;
  endif
}
```

语言对函数化的支持真正有机会让从样式中分离内容的梦想实现。然而不幸的是，由于这门语言由于具有太高的扩展性，在各种浏览器上的实现也会有很大不同。此外，它也仅仅被发表在学术界的一系列论文上面，而没有在www-talk邮件列表上出现，即它从来没有在任何主流浏览器中被实现。

### 昔日的CSS

1994年由 Håkon W Lie [提出](http://people.opera.com/howcome/2006/phd/archive/www.w3.org/People/howcome/p/cascade.html)的名为CHSS（Cascading HTML Style Sheets）的语言，就是某种程度上直接成为CSS的语言。

好的想法最初似乎都有些奇葩。

``` css
h1.font.size = 24pt 100%
h2.font.size = 20pt 40%
```

每个规则后面都跟有一个比例。这个比例代表了当前样式表在这个样式规则上的所有权的多少。例如，如果之前一个样式表已经定义了`h2`的字体大小为`30pt`，比例为`60%`，现在的样式表又定义`h2`标签的样式为`20px 40%`，那么两个值则会根据其所有权比例组合计算，最终为`26pt`（`30*0.6+20*0.4`）。

在页面基于HTML文档的时代，因为没有相对折中的设计能很好的工作，这种提议的出现也就显得很容易理解了。然而，它确实包含了样式表可以层叠这一基本的想法。换句话说，它本支持多个样式表应用在同一个页面上。

它最初的构想普遍被认为是十分重要的，因为它给了终端用户在他们所看见的基础上操作样式的能力。原始页面有一个样式表，然后网页用户也有他们自己的样式表，然后两者联合渲染出页面。支持多样式表被认为是保护了网络上的个人自由，而不是支持开发者（仍然手写单独页面的那些人）。

用户甚至能控制页面作者的建议样式有多大的“权限”，建议中用下面这样的ASCII图来表示：

```
       User                   Author
Font   o-----x--------------o 64%
Color  o-x------------------o 90%
Margin o-------------x------o 37%
Volume o---------x----------o 50%
```

像这样的建议一样，这门语言里还包含了许多在几十年中都不会在CSS里实现的特性。例如，它允许写基于用户环境的逻辑表达式：

``` scss
AGE > 3d ? background.color = pale_yellow : background.color = white
DISPLAY_HEIGHT > 30cm ? http://NYT.com/style : http://LeMonde.fr/style
```

在某种乐观的科幻想象里，浏览器可以判断页面中那一块内容是你想要的，并且把它放大来展示：

``` scss
RELEVANCE > 80 ? h1.font.size *= 1.5
```

### 你知道下面将会发生什么

>Microsoft is absolutely committed to open standards, especially on the Internet.
>
>— John Ludeman 1994

Håkon Lie继续精简他的提议，并且和Bert Bos一起在1996年12月发布了CSS规范的第一个版本。最终他把CSS的诞生写成了博士论文，这也是帮助我现在写这篇文章的一个重要的文档。

相比于其他提议来说，CSS一个很重要的特点就是它的简洁性。它可以被轻松地分析，书写和阅读。正如在互联网发展史上许多其他方面的例子一样，对于新手更简单友好的技术比起那些在专家手中更加强大的技术来说，更加能在发展中胜出。

它本身对大多数新技术革新存在的偶然性就是一种提醒。例如，支持上下文选择器（`body ol li`）特性的添加是因为网景（Netscape）浏览器已经有一个移除超链接图片边框的方法。同时实现当时流行浏览器所有的功能看起来也是很有必要的。然而这个功能本身也对CSS的实现增加了难度，因为在当时绝大多数浏览器都没有在解析HTML的时候维持一个标签“堆”。这也意味着想要完整支持CSS，解析器就要被重新设计。

像这样的挑战（还有被广泛使用的非标准HTML表情定义样式的方案）导致直到1997年CSS都无法使用，而直到2000年3月才有独立浏览器支持了CSS的完整功能。然而任何一个开发者都会告诉你，浏览器对CSS的支持并不是所有地方都和官方标准一致，大约在CSS发行15年后，这种情况才有所改变。

### 最终的挑战

>If Netscape 4 ignored CSS rules applied to the `<body>` element and added random amounts of whitespace to every structural element on your page, and if IE4 got `<body>` right but bungled padding, what kind of CSS was safe to write? Some developers chose not to write CSS at all. Others wrote one style sheet to compensate for IE4’s flaws and a different style sheet to compensate for the blunders of Netscape 4.
>
>— Jeffrey Zeldman

IE3著名的就是支持了CSS（虽然某种意义上很可怕）。为了与之竞争，Netscape4也对CSS有了支持。然而Netscape没有重点押注到这第三种语言上（相对于HTML和JavaScript），而是决定实现一种将CSS转换为JavaScript的技术。更进一步，它们设计的这种"JavaScript Style Sheet"中间语言允许被web开发者访问到。

它的语法就是JavaScript，同时附加了一些指定样式的API：

```javascript
tags.H1.color = "blue";
tags.p.fontSize = "14pt";
with (tags.H3) {
  color = "green";
}

classes.punk.all.color = "#00FF00"
ids.z098y.letterSpacing = "0.3em"
```

你甚至可以定义函数来计算tag不同状态下的样式：

```javascript
evaluate_style() {
  if (color == "red"){
    fontStyle = "italic";
  } else {
    fontWeight = "bold";
  }
}

tag.UL.apply = evaluate_style();
```


我们想弱化样式和脚本之间的分界线是有道理的，而如今在[React社区](https://facebook.github.io/react/tips/inline-styles.html)这种现象甚至再次出现。

JavaScript在当时还是一个十分新的语言，但是通过一些逆向工程，IE已经在IE3增加了对它的支持（叫做“JScript”）。更大的问题是社区已经重新围绕CSS来研究，而网景在当时则被主流社区认为是一个[恶霸](https://lists.w3.org/Archives/Public/www-style/1996Jun/0068.html)。网景向标准委员会[提交](https://www.w3.org/Submission/1996/1/WD-jsss-960822)了JSSS提议，但最终该提议被置若罔闻。三年以后，Netscape6取消了对JSSS的支持，JSSS也很快消亡了。

### 本来可能会发生什么

由于W3C的一些公开羞辱，IE5.5终于在2000年发行时提供了对完整CSS1的支持。当然正如我们所知，浏览器CSS的实现还有许多bug并且难以使用长达十年之久。如今这些问题已经幸运地改善了，让许多开发者也实现了编写一次代码，在各个浏览器上都有几乎相同的效果的梦想。

从以上内容中我认识到了那些有可能控制我们现在使用的工具的许多决定。如果当时CSS的设计只是为了满足1996年的限制，那么这一切对于20年后的我们将有所不同。

> 原文链接：[The Languages Which Almost Became CSS](https://eager.io/blog/the-languages-which-almost-were-css/)
>
> 原文发布时间：06 Jul 2016
>
> 原作者：Zack Bloom / @[zackbloom](https://twitter.com/zackbloom)
>
> 翻译者：IwYvI
>
> 翻译时间：2016/10/4
>
> 这篇文章从七月初就开始翻译了，然后各种拖，到现在也才基本翻译完，里面还有很多地方感觉语句不是很通顺，也带有很强的翻译腔。嘤嘤嘤
