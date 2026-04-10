import {
  calcDimensionScores, scoresToLevels, determineResult,
  calcMBTIScores, deriveMBTIType, generateFusionName, generateFusionDesc,
} from './engine.js'
import { createQuiz } from './quiz.js'
import { renderResult } from './result.js'
import './style.css'

async function loadJSON(path) {
  const res = await fetch(path)
  return res.json()
}

async function init() {
  const [questions, dimensions, types, config, mbtiTypes, fusionData] = await Promise.all([
    loadJSON(new URL('../data/questions.json', import.meta.url).href),
    loadJSON(new URL('../data/dimensions.json', import.meta.url).href),
    loadJSON(new URL('../data/types.json', import.meta.url).href),
    loadJSON(new URL('../data/config.json', import.meta.url).href),
    loadJSON(new URL('../data/mbti-types.json', import.meta.url).href),
    loadJSON(new URL('../data/smbti-fusion.json', import.meta.url).href),
  ])

  const pages = {
    intro: document.getElementById('page-intro'),
    quiz: document.getElementById('page-quiz'),
    result: document.getElementById('page-result'),
  }

  function showPage(name) {
    Object.values(pages).forEach((p) => p.classList.remove('active'))
    pages[name].classList.add('active')
    window.scrollTo(0, 0)
  }

  function onQuizComplete(answers, isDrunk) {
    const scores = calcDimensionScores(answers, questions.main)
    const levels = scoresToLevels(scores, config.scoring.levelThresholds)
    const result = determineResult(levels, dimensions.order, types.standard, types.special, { isDrunk })

    const allQs = [...questions.main, ...(questions.mbti || [])]
    const mbtiScores = calcMBTIScores(answers, allQs)
    const mbtiResult = deriveMBTIType(mbtiScores)
    const mbtiTypeInfo = mbtiTypes.find((t) => t.code === mbtiResult.type) || { code: mbtiResult.type, cn: '未知', tagline: '' }
    const fusion = generateFusionName(mbtiResult.type, result.primary, fusionData)
    const fusionDesc = generateFusionDesc(mbtiResult.type, result.primary, fusionData)

    renderResult(result, levels, dimensions.order, dimensions.definitions, config, {
      mbti: mbtiResult, mbtiTypeInfo, fusion, fusionDesc,
    })
    showPage('result')
  }

  const quiz = createQuiz(questions, config, onQuizComplete)

  document.getElementById('btn-start').addEventListener('click', () => {
    quiz.start()
    showPage('quiz')
  })

  document.getElementById('btn-restart').addEventListener('click', () => {
    quiz.start()
    showPage('quiz')
  })
}

init()
