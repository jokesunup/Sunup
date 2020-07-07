//特殊字符处理
export function stripscript(res) {
        var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
        var rs = "";
        for (var i = 0; i < res.length; i++) {
                rs = rs + res.substr(i, 1).replace(pattern, '');
            }
        return rs;
        }
    