//柱状图模块一
(function () {
    var myChart = echarts.init(document.querySelector(".bar .chart"));
    var option = {
        color: ['#2f89cf'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '0%',
            top: "10px",
            right: '0%',
            bottom: '4%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: [
                    "旅游行业",
                    "教育行业",
                    "游戏行业",
                    "金融行业",
                    "电商行业",
                    "社交领域",
                    "医疗行业"
                ],
                axisTick: {
                    alignWithLabel: true
                },
                //修改刻度标签 相关样式
                axisLabel: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: "8",
                    //为坐标轴刻度标签的显示间隔，
                    //默认不重叠的策略间隔显示所有标签，可以通过设置为0强制显示所有标签
                    //如果超过范围，可设置rotate倾斜一定角度显示
                    interval: 0
                    // rorate:-30
                },
                //设置坐标轴线的样式
                axisLine: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 12
                },
                //设置坐标轴线的样式
                axisLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.1)",
                        //y宙线宽度为2px
                        width: 2
                    }
                },
                //设置分割线
                splitLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.1)"
                    }
                }
            }
        ],
        series: [
            {
                name: '直接访问',
                type: 'bar',
                //柱子的宽度
                barWidth: '35%',
                data: [110, 200, 334, 390, 330, 220, 121],
                //修改数据项的样式
                itemStyle: {
                    barBorderRadius: 5
                }
            }
        ]
    };
    myChart.setOption(option);
    window.addEventListener('resize', function () {
        myChart.resize();
    })
})();

// 柱状图2横向
(function () {
    var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
    var myChart = echarts.init(document.querySelector(".bar-right .chart"));
    var option = {
        grid: {
            top: "10%",
            left: '22%',
            bottom: '10%',
            // 不需要刻度标签的间隙
            // containLabel: true
        },
        xAxis: {
            show: false
        },
        //可接受对象数组，增加y轴
        yAxis: [
            {
                type: 'category',
                data: ["HTML5", "CSS3", "javascript", "VUE", "NODE"]
                , axisLine: {
                    show: false
                },
                //y轴刻度
                axisTick: {
                    show: false
                },
                //刻度标签
                axisLabel: {
                    color: "#fff"
                }
            }, {
                type: 'category',
                data: [702, 350, 610, 793, 664],
                axisLine: {
                    show: false
                },
                //y轴刻度
                axisTick: {
                    show: false
                },
                //刻度标签
                axisLabel: {
                    color: "#fff"
                }
            }
        ],
        series: [
            {
                name: '条',
                type: 'bar',
                yAxisIndex: 0,
                itemStyle: {
                    barBorderRadius: 20,
                    //使用数组给每个柱子不同的颜色
                    color: function (params) {
                        //params参数为六个柱子对象
                        return myColor[params.dataIndex];
                    }
                },
                barWidth: 10,
                //柱子的距离
                barCategoryCap: 50,
                //在图表上显示文字
                label: {
                    show: true,
                    positiion: 'inside',
                    //{c}字符串模板，a为系列名，b为数据名，c自动解析data中的数据
                    formatter: "{c}%"
                },
                data: [70, 40, 23, 56, 89]
            },
            {
                name: '框',
                type: 'bar',
                yAxisIndex: 1,
                itemStyle: {
                    barBorderRadius: 20,
                    //使用数组给每个柱子不同的颜色
                    color: "none",
                    borderColor: "#00c1de",
                    borderWidth: 3,
                    borderRadius: 15
                },
                barWidth: 15,
                //柱子的距离
                barCategoryCap: 50,
                data: [100, 100, 100, 100, 100]
            }
        ]
    };

    myChart.setOption(option);
    window.addEventListener('resize', function () {
        myChart.resize();
    })
})();

// 折线图-左边
(function () {
    // 通常由ajax请求过来的
    var yearData = [
        {
            year: "2020", // 年份
            data: [
                // 两个数组是因为有两条线
                [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
            ]
        },
        {
            year: "2021", // 年份
            data: [
                // 两个数组是因为有两条线
                [123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38],
                [143, 131, 165, 123, 178, 21, 82, 64, 43, 60, 19, 34]
            ]
        }
    ];
    var myChart = echarts.init(document.querySelector(".line .chart"));
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            textStyle: {
                color: "#4c9bfd"
            },
            right: "10%"
        },
        //修改线条颜色
        color: ['#00f2f1', '#ed3f35'],
        grid: {
            top: "20%",
            left: '3%',
            right: '4%',
            bottom: '3%',
            //设置边框
            show: true,
            borderColor: "#012f4a",
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisTick: {
                show: false
            },
            //刻度标签颜色
            axisLabel: {
                color: "#4c9bfd",
                fontSize: "10",
                interval: 0,
            },
            axisLine: {
                show: false
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false
            },
            //刻度标签颜色
            axisLabel: {
                color: "#4c9bfd"
            },
            splitLine: {
                lineStyle: {
                    color: '#012f4a'
                }
            },
        },
        series: [
            {
                name: '新增粉丝',
                type: 'line',
                //线条平滑显示
                smooth: true,
                data: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120]
            },
            {
                name: '新增游客',
                type: 'line',
                smooth: true,
                data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
            }
        ]
    };

    myChart.setOption(option);

    window.addEventListener("resize", function () {
        myChart.resize();
    })

    $('.line h2').on("click", "a", function () {
        //获得第一个数据对象2020
        var obj = yearData[$(this).index()]
        option.series[0].data = obj.data[0];
        option.series[1].data = obj.data[1];
        //需要重新渲染
        myChart.setOption(option);
    })
})();

//折线图-right
(function () {
    var myChart = echarts.init(document.querySelector(".line-right .chart"))
    var option = {
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            top: "0%",
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: "12"
            }
        },
        grid: {
            left: "10",
            top: "30",
            right: "10",
            bottom: "10",
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 12
                },
                // 这里显示太密集了，还是就这样吧
                // interval:0,
                // rotate:-30
            },
            // x轴线的颜色为   rgba(255,255,255,.2)
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.2)"
                }
            },
            data: [ "01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","26","28","29","30"]
        },
        yAxis: {
            type: "value",
            axisTick: { show: false },
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)"
                }
            },
            axisLabel: {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 12
                }
            },
            // 修改分割线的颜色
            splitLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)"
                }
            }
        },
        series: [
            {
                name: '转发量',
                smooth: true,
                type: 'line',
                // 单独修改线的样式
                lineStyle: {
                    color: "#0184d5",
                    width: 2
                },
                // 填充区域
                areaStyle: {
                    // 渐变色，只需要复制官方案例即可
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                        [
                            {
                                offset: 0,
                                color: "rgba(1, 132, 213, 0.4)"   // 渐变色的起始颜色
                            },
                            {
                                offset: 0.8,
                                color: "rgba(1, 132, 213, 0.1)"   // 渐变线的结束颜色
                            }
                        ],
                        false
                    ),
                    //阴影
                    shadowColor: "rgba(0, 0, 0, 0.1)"
                },
                // 设置拐点 小圆点
                symbol: "circle",
                // 拐点大小
                symbolSize: 8,
                // 设置拐点颜色以及边框
                itemStyle: {
                    color: "#0184d5",
                    borderColor: "rgba(221, 220, 107, .1)",
                    borderWidth: 12
                },
                // 开始不显示拐点， 鼠标经过显示
                showSymbol: false,
                data: [ 30, 40, 30, 40,30, 40, 30,60,20, 40, 30, 40, 30, 40,30, 40, 30,60,20, 40, 30, 40, 30, 40,30, 40, 20,60,50, 40]
            },
            {
                name: "转发量",
                type: "line",
                smooth: true,
                lineStyle: {
                    normal: {
                        color: "#00d887",
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                            [
                                {
                                    offset: 0,
                                    color: "rgba(0, 216, 135, 0.4)"
                                },
                                {
                                    offset: 0.8,
                                    color: "rgba(0, 216, 135, 0.1)"
                                }
                            ],
                            false
                        ),
                        shadowColor: "rgba(0, 0, 0, 0.1)"
                    }
                },
                symbol: "circle",
                symbolSize: 5,
                itemStyle: {
                    color: "#00d887",
                    borderColor: "rgba(221, 220, 107, .1)",
                    borderWidth: 12
                },
                showSymbol: false,
                data: [ 130, 10, 20, 40,30, 40, 80,60,20, 40, 90, 40,20, 140,30, 40, 130,20,20, 40, 80, 70, 30, 40,30, 120, 20,99,50, 20]
            }
        ]
    }

    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    })
})();

// 模拟飞行路线模块代码有点多，单独写一个文件map.js
