window.addEventListener('load', function() {
    var that;
    class Tab {
        constructor(id) {
            // 获取元素
            that = this;
            this.main = document.querySelector(id);

            this.add = this.main.querySelector('.tabadd');
            // li的父元素
            this.ul = this.main.querySelector('.firstnav ul');
            // section的父元素
            this.section = this.main.querySelector('.tabscon')
            this.init();
        };
        // 获取所有的li和section
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
                // 点击完在调用 所以不用加小括号
                this.lis[i].onclick = this.toggleTab;
                this.remove[i].onclick = this.removeTab;
                this.spans[i].ondblclick = this.editTab;
                this.sections[i].ondblclick = this.editTab;
            }
        };

        // 切换功能
        toggleTab() {
            that.clearClass();
            // 这里的this指向绑定了的li
            this.className = 'liactive';
            that.sections[this.index].className = 'conactive';
        };

        // 清除类
        clearClass() {
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].className = '';
                this.sections[i].className = '';
            }
        }

        // 添加功能
        addTab() {
            // 清除样式
            that.clearClass();
            // 创建元素
            var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
            var section = ' <section class="conactive">测试1</section>';
            // 添加元素
            that.ul.insertAdjacentHTML('beforeend', li);
            that.section.insertAdjacentHTML('beforeend', section);
            // 重新获取新增的li和section
            that.init();
        };

        // 删除功能
        removeTab(e) {
            // 阻止冒泡
            e.stopPropagation();
            // console.log(this.parentNode.index);
            var index = this.parentNode.index;
            // 根据索引号删除相应的li和section
            that.lis[index].remove();
            that.sections[index].remove();
            that.init();
            // 当我们删除的不是选定状态的li 那么删除后之前的选定状态li不变
            if (document.querySelector('.liactive')) {
                // 不执行以下代码 直接退出
                return;
            }
            // 当我们删除了选定状态的li 则让他前一个li默认选定状态
            index--;
            // 逻辑中断 先判断有没有 that.lis[index] 当index=-1时 不执行后面代码 则删除最后一个不会报错
            that.lis[index] && that.lis[index].click();
        };

        // 修改内容功能
        editTab() {
            var str = this.innerHTML;
            // console.log(this.innerHTML);
            // 双击禁止选中文字
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            // 双击选项卡变为input表单
            this.innerHTML = '<input type="text" />';
            // console.log(this.children[0]);
            // 获得input表单 将span的文字赋值给input表单
            var input = this.children[0];
            input.value = str;
            // 文本框的文字处于选中状态
            input.select();
            // 当离开文本框的时候把文本框的值赋给span
            input.onblur = function() {
                input.parentNode.innerHTML = this.value;
            };
            // 按下回车的时候 也可以把文本框的值赋给span
            input.onkeyup = function(e) {
                if (e.keyCode === 13) {
                    //  手动调用表单失去焦点事件 不需要鼠标离开操作
                    this.blur();
                }
            }
        };
    }
    var tab = new Tab('#tab');
})