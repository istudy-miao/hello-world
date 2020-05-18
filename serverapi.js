var http = require('http');

http.createServer(function (request, response) {

  // 发送 HTTP 头部
  // HTTP 状态值: 200 : OK
  // 内容类型: text/plain
  response.writeHead(200, {'Content-Type': 'text/plain'});

  // 发送响应数据 "Hello World"

  response.end('{"legendData":["整机","SOC+DDR","CPU_L","CPU+BM","GPU","CPU_MEM","其他指标"],\n' +
    '"seriesData":{"整机":[4.9,5.3,4.7,8.4,5.56,9.89,2.32],"SOC+DDR":[82,93,90,93,12,13,13],"CPU_L":[82,93,90,93,12,13,13],"CPU+BM":[82,93,90,93,12,13,13],"GPU":[82,93,90,93,12,13,13],"CPU_MEM":[82,93,90,93,12,13,13],"其他指标":[82,93,90,93,12,13,13]},\n' +
    ' "legendSelected": {\n' +
    '              "整机": true,\n' +
    '              "SOC+DDR": false,\n' +
    '              "CPU_L": false,\n' +
    '              "CPU+BM": false,\n' +
    '              "GPU": false,\n' +
    '              "CPU_MEM": false,\n' +
    '              "其他指标": false\n' +
    '            },\n' +
    '"xAxisData":["版本1", "版本2", "版本3", "版本4", "版本4.0", "版本5", "版本5.0"]\n' +
    '}');
}).listen(8888);

