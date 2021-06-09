 // 功能需求
 window.addEventListener('load', function() {
     var that;
     class Tab {
         constructor(id) {
             // 获取元素
             that = this;
             this.main = document.querySelector(id);
             this.add = this.main.querySelector('.tabadd');
             //  li的父元素
             this.ul = this.main.querySelector('.firstnav ul:first-child');
             //  section的父元素
             this.section = this.main.querySelector('.tabscon');
             this.init();

         };
         //  获取所有的li和section
         updateNode() {
             this.lis = this.main.querySelectorAll('li');
             this.sections = this.main.querySelectorAll('section');
             this.remove = this.main.querySelectorAll('.icon-guanbi');
             this.spans = this.main.querySelectorAll('.firstnav li span:first-child');
         };
         // 初始化功能
         init() {
             this.updateNode();
             // 初始化操作让相关元素绑定事件
             this.add.onclick = this.addTab;
             for (var i = 0; i < this.lis.length; i++) {
                 this.lis[i].index = i;
                 //  点击完再调用 不需要加小括号
                 this.lis[i].onclick = this.toggleTab;
                 this.remove[i].onclick = this.removeTab;
                 this.spans[i].ondblclick = this.editTab;
                 this.sections[i].ondblclick = this.editTab;
             }
         };
         // 切换功能
         toggleTab() {
             that.clearClass();
             //  console.log(this.index);
             this.className = "liactive";
             that.sections[this.index].className = 'conactive';
         };
         //  清除类
         clearClass() {
             for (var i = 0; i < this.lis.length; i++) {
                 this.lis[i].className = "";
                 this.sections[i].className = '';
             }
         };
         //  添加功能
         addTab() {
             that.clearClass();
             // 1.创建li元素和section元素
             var random = Math.random();
             var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
             var section = '<section class="conactive">测试1</section>';
             // 2.把这两个元素追加到对应的父元素里面
             that.ul.insertAdjacentHTML('beforeend', li);
             that.section.insertAdjacentHTML('beforeend', section);
             that.init();
         };

         //  删除功能
         removeTab(e) {
             e.stopPropagation(); // 阻止冒泡
             var index = this.parentNode.index;
             console.log(index);
             // 根据索引号删除对应的li和section
             that.lis[index].remove();
             that.sections[index].remove();
             that.init();
             //  当我们删除不是选定状态的li的时候 原来的状态不变
             if (document.querySelector('.liactive')) return;
             //  当我们删除了选定状态li的时候 让他前一个li 处于选定状态
             index--;
             //  click() 手动调用我们那的点击事件 不需要鼠标触发
             that.lis[index] && that.lis[index].click();

         };

         //  修改功能
         editTab() {
             var str = this.innerHTML;
             //  双击选项卡/tab栏可以修改文字
             // 双击禁止选中文字
             window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
             //  alert(11);
             this.innerHTML = '<input type="text" />';
             var input = this.children[0];
             input.value = str;
             // 文本框里面的文字处于选定状态
             input.select();
             //  当离开文本框就把文本框的值给span
             input.onblur = function() {
                 input.parentNode.innerHTML = this.value;
             };
             // 按下回车 也可以吧文本框的里面的值给span
             input.onkeyup = function(e) {
                 if (e.keyCode === 13) {
                     //  手动调用表单失去焦点事件 不需要鼠标离开操作
                     this.blur();
                 }

             }

         };
     };
     var tab = new Tab('#tab');

     // 1.点击tab栏可以切换
     // 2.点击 + 号 可以添加tab项和内容项
     // 3.点击 x 号 可以删除当前的tab项和内容项
     // 4.双击tab项文字或者内容项文字 可以修改里面的文字内容
 })