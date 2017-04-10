---
title: 【译】CSS Grid布局：一种新的Web布局模块
date: 2017-3-22 16:19:22
categories: css
tags: css,前端
description: 【翻译】《CSS Grid Layout:A New Layout Module for the Web》：。
---

> 原文链接：[CSS Grid Layout: A New Layout Module forthe Web](https://webkit.org/blog/7434/css-grid-layout-a-new-layout-module-for-the-web/)
>
> 原文发布时间：Mar 9, 2017
>
> 原作者：Manuel Rego [@regocas](https://twitter.com/regocas)
>
> 翻译者：IwYvI

早在Web出现之前，人们就已经对杂志、报纸、海报上的内容排版使用网格设计了。因此许多web开发者都在基于一种网格布局来创建web页面，为了实现网格布局，开发者们使用了许多不同的解决方案，如table、float、inline block、flexbox等，但是这些技术在实现复杂的网格设计时，总是会出现不同的问题。

为了解决这个问题，有人定义了一种创建网格设计的新标准，这种标准叫做[CSS Grid Layout](https://drafts.csswg.org/css-grid/)，它的主要目的是为了让开发者在页面上轻松地创建一个二维布局。同时它给了网页作者很大的灵活性，它能将页面分成多个不同的区域，然后再对不同区块分别定义大小和里面的内容。

WebKit已经研发了一段时间网格布局了，你可以现在在WebKit内核的Safari技术预览版中体验到网格布局。

### 基本概念

> 原文链接：[CSS Grid Layout: A New Layout Module forthe Web](https://webkit.org/blog/7434/css-grid-layout-a-new-layout-module-for-the-web/)
>
> 原文发布时间：Mar 9, 2017
>
> 原作者：Manuel Rego [@regocas](https://twitter.com/regocas)
>
> 翻译者：IwYvI
>
> 翻译时间：2017/3/22