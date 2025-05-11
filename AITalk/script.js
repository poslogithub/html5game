// データの読み込み
async function loadData() {
  const files = ['nouns', 'verbs', 'adjectives', 'adverbs', 'places', 'situations', 'templates', 'reactions'];
  const data = {};
  for (const file of files) {
    try {
      const response = await fetch(`data/${file}.json`);
      data[file] = await response.json();
    } catch (error) {
      console.error(`Error loading ${file}.json:`, error);
      data[file] = []; // エラー時は空配列を設定
    }
  }
  return data;
}

// const data = loadData();

// ランダムに要素を選択
function getRandomElement(arr) {
  if (!arr || arr.length === 0) {
    console.warn('getRandomElement: 配列が空または未定義です');
    return ''; // デフォルト値を返す
  }
  return arr[Math.floor(Math.random() * arr.length)];
}

// ランダムな画像を選択（1.png～6.png）
function getRandomImage() {
  const imageNumber = Math.floor(Math.random() * 6) + 1; // 1～6
  return `img/${imageNumber}.png`;
}

// フレーズ生成
function generatePhrase(data) {
  const endings = ['', 'よ', 'よね', 'んだ', 'って', 'んだって', 'らしいよ', 'みたい'];
  const template = getRandomElement(data.templates);
  
  // プレースホルダーを置換
  return template
    .replace('{noun}', getRandomElement(data.nouns))
    .replace('{noun2}', getRandomElement(data.nouns))
    .replace('{verb}', getRandomElement(data.verbs))
    .replace('{adjective}', getRandomElement(data.adjectives))
    .replace('{adverb}', getRandomElement(data.adverbs))
    .replace('{place}', getRandomElement(data.places))
    .replace('{situation}', getRandomElement(data.situations))
    .replace('{ending}', getRandomElement(endings));
}

// メイン処理
document.addEventListener('DOMContentLoaded', async () => {
  const generateBtn = document.getElementById('generateBtn');
  const phraseElement = document.getElementById('phrase');
  const girlImage = document.getElementById('girlImage');
  
  // データ読み込み
  const data = await loadData();

  // ボタンクリックでフレーズ、画像、相槌を更新
  generateBtn.addEventListener('click', () => {
    // 新しいフレーズを生成
    const phrase = generatePhrase(data);
    const reaction = getRandomElement(data.reactions);
    phraseElement.textContent = phrase;
    generateBtn.textContent = reaction;
    
    // 画像をランダムに切り替え
    girlImage.src = getRandomImage();
  });
  // ページ読み込み後にクリックイベントをトリガー
  generateBtn.click();
});

