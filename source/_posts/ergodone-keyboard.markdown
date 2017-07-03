---
title: 新键盘之ergodone
date:  2017-06-21 17:37:58
categories: keyboard
tags: ergodone,keyboard,ergodox
---
距离第一个客制化键盘购入还没满一年，我又入坑了一个新的键盘。

ergodone是一个分体式机械键盘，是基于ergodox的一个平民化修改版，相比ergodox原版的材料来说，这个的各种元件的价格更加便宜。<!--more-->

关于了解到这个键盘，实际上经历了一个复杂的过程。最初是想在儿童节期间买个什么好玩的东西，然后想起了客制化键盘，先是在淘宝店里看到了staryu和cospad。staryu虽然看上去很好玩，但是价格有点高，而且没有什么实际的作用，而cospad相比价格更加合理一些，然后也可以有更多的玩法，所以最初是想买一片cospad来玩的。后来去了[kle](http://www.keyboard-layout-editor.com/)，突然觉得分体键盘也很有趣，而cospad也可以当作分体planck来用，然后机缘巧合又研究了一下那个网站里所有的分体键盘布局，通过搜索ergodox发现了ergodone。后来又发现一整套ergodone价格其实比买一块cospad并没有贵多少（除了键帽），所以又多研究了几天，最终下决心要买一套ergodone。

> 一套ergodone的价格大概是：
> * pcb + 元件 + 亚克力外壳 + 对录线：249 + 20（运费） = 269
> * 5脚g轴 * 76：1 * 76 ≈ 80（因为轴都是按整数来卖）
> * pcb卫星轴(2×) * 4：15（只有一家的价格是这样的，其他的都是25一套）
> * usb typeB线：10+或0（我是用了以前键盘的线）
> * 键帽：0 ~ +∞（穷人不敢买键帽，然后淘宝上全套的ergodox键帽有119的和129的，在写这篇文章的时候我正在用OEM键帽乱组出来的参差不齐的一套）
> * 各种工具（电烙铁，螺丝刀，焊锡等）：？
>
> 所以到目前为止，我一共用了364元+20元工具
> 更新：我还是上了119的键帽，因为现在的键帽实在是太奇怪了而且各种残缺。
> 另外为了支撑键帽，我还买了两套笔记本散热用的硅胶支撑垫，然后吸在了底部亚克力上面，这个用了6元。

淘宝上只有一家在卖ergodone，然后还是抢购，所以我从儿童节一直等到17号考六级的那个中午才抢到。

这次因为直插二极管没有了，所以部长发的是贴片二极管。讲真看到贴片二极管我很慌，因为我还依稀记得小时候不小心扣掉了一个贴片led，然后就再也没有焊上去过。

![](https://ooo.0o0.ooo/2017/06/21/594a534c701c7.jpg)

这次的键盘仍然是主红轴功能键混轴的形式，等我下次拆键帽的时候再照一下混轴方案的图吧。主要思想还是tab，backspace，enter，win键段落轴，拇指黑轴，shift白轴（g轴的白轴比红轴轻，触发力度似乎是35g？），esc茶轴。

然后ergodone本身没有设计按键灯，所以只用装一下键盘上的三个指示灯，然后我选了三个暖白（事实上这是一个错误的选择，因为这三个灯在一起，亮了以后不数是哪个灯根本不知道是什么的指示灯，应该选三个不同的颜色）。

因为太久没有焊过东西了，所以刚开始焊主控的时候各种不熟练。在焊接usb的飞线时，不小心还把上面的塑料焊出了一道坑。之后焊贴片二极管，发现如果不是二极管太小不容易找的话，实际上焊起来还是挺容易的，而且不用担心虚焊什么的问题。最后用了半个下午加一个晚上焊完了所有键盘。

焊的时候还不小心在剪刀上留下了一道印记...

（第二天仔细看了一下晚上眼睛都睁不开的时候焊的焊点，丑的简直不忍直视）

ergodone的外壳由五层亚克力组成，其中有一层是轴的定位板。pcb上的轴孔开得比较小，插轴的时候十分紧，导致之后大拇指疼了一整天。

#### 配列

之后就是根据最初的设想刷配列，这个和刷gh60的方法基本上差不多。

这次用的是yang的新键位编辑器[YDKB](http://ydkb.io/)

然后配列这几天修改了很多次，这个是目前最新的一个版本：[地址](http://ydkb.io/?ergodone#456C4oOW4Kmg6biL5oKGcOOOiNeA5rWM4YaA7LCD5oCG6KyB7aOw1oDimKPkrKvmq7HssoLpoJXog4PooKDguILTouKAgYDKBGEuuWiqu6IpOysi8K615HmkKLkoo/is7zipIjqnYLplIrjoIjliaHktoXkiJXjoZHuhZ/ouKHjorLsvYPoqo7jtozgo6Pmvp3unJzjsbPvjKLhj4LsjKTguaLqjKPtjKHujKPmjKDuj4Dnmo7mn6HmiJHmjqHmiqHmj5HmlaPmhaTikqXul6Xsr5btiKnooKrqi6DhiYrrlK7miKjgs6Psh6Psn6biiJbijqbigorqlKDimKPoqaDvhbbuvavqrpHmh6bik6biiaLuj5LukZvmi6Tii6TuhKTmq6ful6Lhl6Pql6Lqka3uiaXuhpPpl6Til6Tul6HuhKzhiJLsgJHhhbThnKjhj6zji7rjn5XvtLLvt4zrvYviv43kl7HrjInusbLisKjpoYfqlobkoqTkkJzhm4Psionlj7nvkIbmsbHok43ovpnqoqztsLrhnILotKDnj4joo5TrqKHotJ3sgKDrhozpiIHrrJjkvqDknJDhsIrkmb7okY3liKPvgrDpmJXjj5Xoj7PuiLLkkYTmuY3iuZ3ioZXsr6Lvi5nnkrvknK/sl73oporulZnhjovhhpTsiZLssJ7ihZ7luazlkKvllJbpraXqmp3mrrbjra3gu5vmrqrtpYvrmrDtpKrnjILisYHmpbTooonsqKLiiojmn4/mlajilabmuaHpkZbuoY/kiqnkurvmmrjsnrLihrDpjKnvjaXhoorouqblhqntqb3nj5Djop7nlJrnj5XvrZXmirbvm4Xon53niaTtirfph4DmlIvpuIHrq5rqjYXqh5Dij7TsmZPhm5/ktaXrhKbps67lnKTpurzsjpzop4vnmrLktKzkoYfkkZnijI7sjKLui5nspI/vjIXomqrnmpLspInqsqfpn7Pqra/mirHlkaXupojki67hgovovaDvk57ul5fjuInsvYbngbHnmarlm6bug4fklYLukY3srKXproXlprjim43thbXjma/sg6XikZTlnZ7umr3ivJXku7LsjJ3ksKvvm4zgo7Plh6LugrjgqYXrl4PigpzioonppJnluIHsj4DoiLrgvILqgJjnmInoj4DtoLzhgoPsg4DokLroq4LtqaziqpDuoojsrZ/gsqPgo4njirXmtqTvhLPvkZTjibfhq4TugpnnnJvigonug5vtmY7qlKHnno/inbDunZ/ht4PqgrzljKvor5HsoIbironui7jrpKLkt43ktJ7jtqDgorPcpYDKBWTqOuNquWigeWHnOYDKBrjYDKByyvMuC7LuP65CU64S36L2Z7pWO466O7pa46Z6b7KCZ662F5J6l55Wo6Zie6K6R4aO24aaN5oys6Lim7L2g7Jyc6beB7KGY7JmE4qyZ6ImA7aiq74mE46Kl5I6K65mO4qCM5ZKE6JSY4omr6Imf4qOV4Yyv5pqo5Y6L6bmo6rCz4aan1JDqjbLTsYDKBW8suqJtOuktuuOmuKtkeqtiemQqRfsoIA=)

这一次把八层全部使用上了，第0层默认qwerty键盘，第一层dvorak键盘，第二层随便编了一个单手键盘布局，第三层游戏模式，第四层小键盘，第五层f区，第六层单手布局的meta层，第七层主要meta层。

然后键盘主控上还有两个指示灯，可以指示当前是在哪一层上面，使用本地刷机工具的话似乎是默认0层什么都不亮，1层亮上面的灯，2层亮下面的。

今天早上下单了一个笔记本脚垫，不知道能不能用在键盘上。然后现在还很想买一套专用的键帽，因为现在的大量1.5×的位置还在用1.25×的键帽，然后拇指的那两个键则是倒置的小键盘enter和0，其他键帽则是随便乱配。

![](https://ooo.0o0.ooo/2017/06/21/594a534c4778c.jpg)

之后有时间可以尝试在表层亚克力上贴上碳纤维膜，然后学一下怎么加底灯。

更新：已经把碳纤维膜加好了，看起来美滋滋（就是主控默认的红灯一直在亮成一团，然后就是之前指示灯的问题，现在极难分辨出是什么指示灯在亮），等键帽来了一起照几张照片。

#### 手感

虽然按键位置与标准键盘相比有一定的位移，但是总体来说如果之前的指法比较规范的话实际上还是能较好的适应的。

用了这两天最明显的问题是数字键会经常按错位，比如2总是按成1。还有发现了之前我一直使用左手食指按c的问题。

然后主要的变化是以前全部属于右手小指的很多键位平分到了食指和大拇指的区域里。

可能是因为我暂时还是使用oem高度的键帽，拇指的按键感觉有点高，不是很舒服，等之后买了矮一点的键帽再来试一下。

然后目前来看因为键位位置不够熟悉，所以玩游戏的时候还是感觉不习惯。

### 总结

整体键盘的价位比较合适，就是需要花时间自己来焊接各种原件。

然后键帽不是很好配（意思是加钱上豪车）。

然后操作需要一段时间来适应，听说会有适应以后回不去普通键盘的症状。

外壳不够好看（可以通过上碳纤维的车解决）。

整体大小和占用空间比gh60要大一些（因为拇指区突出来的原因）。

无法直接加按键灯。


  