import { drawRadar } from './chart.js'
import { generateShareImage } from './share.js'

const LEVEL_LABEL = { L: '低', M: '中', H: '高' }
const LEVEL_CLASS = { L: 'level-low', M: 'level-mid', H: 'level-high' }

/**
 * 渲染测试结果
 */
export function renderResult(result, userLevels, dimOrder, dimDefs, config, smbti) {
  const { primary, secondary, rankings, mode } = result

  // ── SMBTI 融合区块 ──
  const fusionSection = document.getElementById('fusion-section')
  if (smbti && fusionSection) {
    fusionSection.style.display = ''
    document.getElementById('fusion-name').textContent = smbti.fusion.name
    document.getElementById('fusion-formula').textContent = `${smbti.mbti.type} × ${primary.code}`
    document.getElementById('fusion-subtitle').textContent = smbti.fusion.subtitle
    document.getElementById('fusion-desc').textContent = smbti.fusionDesc
    const mbtiBar = document.getElementById('mbti-bars')
    if (mbtiBar) {
      const p = smbti.mbti.percentages
      const dims = [
        { left: 'E', right: 'I', pct: p.E },
        { left: 'N', right: 'S', pct: p.N },
        { left: 'T', right: 'F', pct: p.T },
        { left: 'J', right: 'P', pct: p.J },
      ]
      mbtiBar.innerHTML = dims.map((d) => `
        <div class="mbti-bar-row">
          <span class="mbti-letter ${d.pct >= 50 ? 'mbti-active' : ''}">${d.left} ${d.pct}%</span>
          <div class="mbti-bar-track"><div class="mbti-bar-fill" style="width: ${d.pct}%"></div></div>
          <span class="mbti-letter ${d.pct < 50 ? 'mbti-active' : ''}">${100 - d.pct}% ${d.right}</span>
        </div>`).join('')
    }
    const mbtiTag = document.getElementById('mbti-type-tag')
    if (mbtiTag) {
      mbtiTag.textContent = `${smbti.mbtiTypeInfo.code} · ${smbti.mbtiTypeInfo.cn} — "${smbti.mbtiTypeInfo.tagline}"`
    }
  } else if (fusionSection) {
    fusionSection.style.display = 'none'
  }

  // Kicker
  const kicker = document.getElementById('result-kicker')
  if (mode === 'drunk') kicker.textContent = '隐藏人格已激活'
  else if (mode === 'fallback') kicker.textContent = '系统强制兜底'
  else kicker.textContent = '你的 SBTI 类型'

  // 主类型
  document.getElementById('result-code').textContent = primary.code
  document.getElementById('result-name').textContent = primary.cn

  // 匹配度
  document.getElementById('result-badge').textContent =
    `匹配度 ${primary.similarity}%` + (primary.exact != null ? ` · 精准命中 ${primary.exact}/15 维` : '')

  // Intro & 描述
  document.getElementById('result-intro').textContent = primary.intro || ''
  document.getElementById('result-desc').textContent = primary.desc || ''

  // 次要匹配
  const secEl = document.getElementById('result-secondary')
  if (secondary && (mode === 'drunk' || mode === 'fallback')) {
    secEl.style.display = ''
    document.getElementById('secondary-info').textContent =
      `${secondary.code}（${secondary.cn}）· 匹配度 ${secondary.similarity}%`
  } else {
    secEl.style.display = 'none'
  }

  // 雷达图
  const canvas = document.getElementById('radar-chart')
  drawRadar(canvas, userLevels, dimOrder, dimDefs)

  // 维度详情
  const detailEl = document.getElementById('dimensions-detail')
  detailEl.innerHTML = ''
  for (const dim of dimOrder) {
    const level = userLevels[dim] || 'M'
    const def = dimDefs[dim]
    if (!def) continue

    const row = document.createElement('div')
    row.className = 'dim-row'
    row.innerHTML = `
      <div class="dim-header">
        <span class="dim-name">${def.name}</span>
        <span class="dim-level ${LEVEL_CLASS[level]}">${LEVEL_LABEL[level]}</span>
      </div>
      <div class="dim-desc">${def.levels[level]}</div>
    `
    detailEl.appendChild(row)
  }

  // TOP 5
  const topEl = document.getElementById('top-list')
  topEl.innerHTML = ''
  const top5 = rankings.slice(0, 5)
  top5.forEach((t, i) => {
    const item = document.createElement('div')
    item.className = 'top-item'
    item.innerHTML = `
      <span class="top-rank">#${i + 1}</span>
      <span class="top-code">${t.code}</span>
      <span class="top-name">${t.cn}</span>
      <span class="top-sim">${t.similarity}%</span>
    `
    topEl.appendChild(item)
  })

  // 免责声明
  document.getElementById('disclaimer').textContent =
    mode === 'normal' ? config.display.funNote : config.display.funNoteSpecial

  // 下载分享图
  const btnDownload = document.getElementById('btn-download')
  btnDownload.onclick = () => {
    generateShareImage(primary, userLevels, dimOrder, dimDefs, mode, smbti)
  }

  // 复制 AI Agent 命令
  const btnAgent = document.getElementById('btn-agent')
  btnAgent.onclick = () => {
    const cmd = `git clone https://github.com/pingfanfan/SBTI.git && cd SBTI && npm install && npm run dev`
    navigator.clipboard.writeText(cmd).then(() => {
      btnAgent.textContent = '已复制!'
      setTimeout(() => { btnAgent.textContent = '复制一键部署命令' }, 2000)
    })
  }
}
