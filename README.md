# SMBTI 人格测试

> MBTI 已经过时，SBTI 也过时了，SMBTI 来了。

基于 [SBTI](https://github.com/pingfanfan/SBTI) 原创人格测试，融合 MBTI 四维度评估，一套题同时得到两套人格结果 + 趣味融合解读。

## 致谢

本项目 fork 自 [@pingfanfan/SBTI](https://github.com/pingfanfan/SBTI)，原始测试创意来自 B站UP主 [@蛆肉儿串儿](https://space.bilibili.com/417038183)。感谢原作者的开源精神和创意设计。

## 在线体验

👉 [点击开始测试](https://anyiwang.github.io/SBTI/)

## SMBTI = SBTI × MBTI

做 34 道题，同时获得：

- 🧠 **SBTI 人格**（25 种 + 2 种隐藏）— 15 维度匹配
- 🔤 **MBTI 四字母**（16 种）— E/I、S/N、T/F、J/P 倾向
- 🎭 **融合人格名**（400 种组合）— 如"效率怪兽·行人"、"温柔暗涌·小丑"

### 融合命名示例

| MBTI | SBTI | 融合名 | 副标题 |
|------|------|--------|--------|
| ENTJ | GOGO | 效率怪兽·行人 | 外放脑洞型行人 |
| ISFP | JOKE-R | 温柔暗涌·小丑 | 闷骚务实型小丑 |
| INFP | DEAD | 温柔暗涌·死者 | 闷骚脑洞型死者 |
| ESTJ | CTRL | 效率怪兽·拿捏者 | 外放务实型拿捏者 |

## 相比原版 SBTI 的变化

- 新增 4 道 MBTI 专属题（总题数 30 → 34）
- 现有 22 道 SBTI 题增加了 MBTI 权重映射（不影响原始 SBTI 评分）
- 新增 MBTI 评分引擎（`calcMBTIScores` + `deriveMBTIType`）
- 新增融合命名系统（8 个修饰词 × 8 个组合名 = 400 种组合）
- 结果页新增：融合名卡片、MBTI 条形图、融合解读
- 分享图片包含融合信息

## 特性

- 🧠 **27 种 SBTI 人格** — 25 种标准 + 2 种隐藏/兜底
- 🔤 **16 种 MBTI 类型** — 从 SBTI 维度映射 + 4 道补充题
- 🎭 **400 种融合人格** — 趣味组合命名 + 模板生成解读
- 📊 **15 维度雷达图** — Canvas 绘制，无外部依赖
- 🎯 **曼哈顿距离匹配** — 15 维向量科学匹配
- 🍺 **隐藏彩蛋** — 酒鬼人格触发机制
- 📱 **移动端优先** — 响应式设计
- 🔧 **数据驱动** — 改 JSON 即可定制

## 项目结构

```
├── data/
│   ├── questions.json       # 30 道 SBTI 题 + 4 道 MBTI 题 + 酒鬼门
│   ├── dimensions.json      # 15 个维度定义
│   ├── types.json           # 25+2 种 SBTI 人格
│   ├── config.json          # 评分参数
│   ├── mbti-types.json      # 16 种 MBTI 类型描述
│   └── smbti-fusion.json    # 融合命名模板
├── src/
│   ├── engine.js            # SBTI + MBTI 评分引擎
│   ├── quiz.js              # 答题流程
│   ├── main.js              # 入口 + 数据加载
│   ├── result.js            # 结果渲染
│   ├── chart.js             # 雷达图
│   ├── share.js             # 分享图片生成
│   ├── utils.js             # 工具函数
│   └── style.css            # 样式
└── docs/
    └── analysis.md          # 数据分析
```

## 快速开始

```bash
git clone https://github.com/AnyiWang/SBTI.git
cd SBTI
npm install
npm run dev
```

## 部署

```bash
npm run build    # 生成 dist/
# 部署 dist/ 到任何静态托管
```

GitHub Pages: Settings → Pages → Source: GitHub Actions

## License

MIT
