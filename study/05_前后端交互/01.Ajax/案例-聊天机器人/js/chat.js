$(function() {
    // 将用户输入内容渲染到聊天框中
    // 为发送按钮绑定鼠标点击事件
    $('#btnSend').on('click', function() {
        // 获取用户输入文本框的值 为保证输入空格 则前后去除空格trim()
        var text = $('#ipt').val().trim();
        // 判断用户是否输入内容 如果没有输入内容使文本框的值为空
        if (text.length <= 0) {
            return $('#ipt').val('');
        }
        // 如果用户输入了内容 则将聊天内容追加到页面上显示
        $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li>');
        $('#ipt').val('');
        // 初始化右侧滚动条
        // 这个方法定义在scroll.js中
        resetui();

        // 发送请求获取聊天信息 
        getMsg(text);
    })

    // 获取聊天机器人返回的信息
    // http://www.liulongbin.top:3006/api/robot
    function getMsg(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success: function(res) {
                if (res.message === 'success') {
                    // 接收聊天消息
                    var message = res.data.info.text;
                    $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>' + message + '</span></li>');
                    // 重置滚动条的位置
                    resetui();
                    getVoice(message);
                }
            }
        })
    }

    // 将机器人的聊天内容转为语音
    // http://www.liulongbin.top:3006/api/synthesize
    function getVoice(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: text
            },
            success: function(res) {
                if (res.status == 200) {
                    // 播放语音
                    var voice = res.voiceUrl;
                    $('#voice').attr('src', voice);
                }
            }
        })
    }

    // 利用回车发送消息
    $('#ipt').on('keyup', function(e) {
        if (e.keyCode == 13) {
            // 触发按钮的点击事件
            $('#btnSend').click();
        }
    })
})