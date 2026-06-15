const PLAN_DATA = [
  {
    tag: 'TRIAL PLAN',
    name: 'フェイシャルトリートメント',
    regular: '通常 ¥12,000',
    price: '¥4,980（税込）',
    duration: '所要時間 60分',
    desc: '毛穴・乾燥・くすみなど基本的な肌悩みに対応するフェイシャルケア。クレンジングから美容液導入まで、肌状態に合わせて丁寧に施術します。',
  },
  {
    tag: 'TRIAL PLAN',
    name: 'シミ・美白集中ケア',
    regular: '通常 ¥15,000',
    price: '¥5,980（税込）',
    duration: '所要時間 75分',
    desc: '紫外線ダメージや色素沈着に特化したケア。美白導入成分を使い、透明感のある肌へ整えます。気になるシミや色ムラを、継続的に改善していきます。',
  },
  {
    tag: 'TRIAL PLAN',
    name: '水素導入ケア',
    regular: '通常 ¥14,000',
    price: '¥5,480（税込）',
    duration: '所要時間 70分',
    desc: '水素の抗酸化作用で肌の深部からエイジングにアプローチ。しっとりとしたハリのある肌へ導きます。敏感肌の方にも対応しています。',
  },
  {
    tag: 'TRIAL PLAN',
    name: 'ボディトリートメント',
    regular: '通常 ¥16,000',
    price: '¥6,800（税込）',
    duration: '所要時間 80分',
    desc: '全身の筋肉のこりや疲労を和らげるリラクゼーションボディケア。肌をなめらかに整えながら、心も身体もゆったりほぐします。',
  },
  {
    tag: 'TRIAL PLAN',
    name: 'リンパボディメイク',
    regular: '通常 ¥18,000',
    price: '¥7,200（税込）',
    duration: '所要時間 90分',
    desc: 'リンパの流れを整え、むくみやたるみを改善するボディケア。ラインをすっきり整えたい方に特におすすめのコースです。',
  },
  {
    tag: 'TRIAL PLAN',
    name: 'ヘッドスパ＆頭皮ケア',
    regular: '通常 ¥10,000',
    price: '¥3,980（税込）',
    duration: '所要時間 50分',
    desc: '頭皮の血行を促進し、薄毛・抜け毛・頭皮のニオイなどのお悩みにアプローチ。全身リラクゼーション効果も高く、心地よい眠りに誘います。',
  },
];

const REC_DATA = [
  {
    tag: 'SKIN CARE',
    name: '肌質改善プログラム',
    desc: '毛穴・くすみ・乾燥など、肌の土台から整える集中ケア。カウンセリングで肌状態を丁寧に確認し、最適な施術メニューをご提案します。フェイシャルトリートメントと美容液導入を組み合わせたプログラムで、継続的な肌質改善が期待できます。',
  },
  {
    tag: 'BODY CARE',
    name: '部分ボディ集中ケア',
    desc: '背中・脚・ハンドなど、気になる箇所に合わせたオーダーメイドのボディトリートメント。お客さまのご要望と身体の状態に合わせて施術エリアと手技を選定し、定期的なケアで気になる部分の状態を改善します。',
  },
  {
    tag: 'BRIDAL',
    name: 'ブライダルケア',
    desc: '顔・背中・デコルテを、特別な日に向けて丁寧に整えます。挙式の日程に合わせたスケジュールをご提案し、ブライダル専用の美容液を使用。特別な日を最高の肌コンディションでお迎えいただけます。挙式3〜6か月前からのご相談をおすすめしています。',
  },
];

function initModals() {
  const bg       = document.getElementById('detail-modal');
  if (!bg) return;

  const closeBtn  = bg.querySelector('.dmodal-close');
  const tagEl     = bg.querySelector('.dmodal-tag');
  const titleEl   = bg.querySelector('.dmodal-title');
  const priceRow  = bg.querySelector('.dmodal-price-row');
  const regEl     = bg.querySelector('.dmodal-reg');
  const priceEl   = bg.querySelector('.dmodal-price');
  const durEl     = bg.querySelector('.dmodal-dur');
  const descEl    = bg.querySelector('.dmodal-desc');
  const btnEl     = bg.querySelector('.dmodal-btn');

  let prevFocus = null;

  function openModal(data) {
    prevFocus = document.activeElement;
    tagEl.textContent  = data.tag;
    titleEl.textContent = data.name;
    descEl.textContent = data.desc;

    if (data.price) {
      priceRow.hidden  = false;
      regEl.textContent   = data.regular;
      priceEl.textContent = data.price;
      durEl.textContent   = data.duration;
      btnEl.textContent   = 'このプランを相談する';
    } else {
      priceRow.hidden  = true;
      btnEl.textContent = 'ご相談・ご予約はこちら';
    }

    bg.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    bg.classList.remove('is-open');
    document.body.style.overflow = '';
    prevFocus?.focus();
  }

  closeBtn.addEventListener('click', closeModal);
  bg.addEventListener('click', e => { if (e.target === bg) closeModal(); });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && bg.classList.contains('is-open')) closeModal();
  });

  // Focus trap
  bg.addEventListener('keydown', e => {
    if (e.key !== 'Tab' || !bg.classList.contains('is-open')) return;
    const focusable = [...bg.querySelectorAll('button, a[href]')];
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { last.focus(); e.preventDefault(); }
    } else {
      if (document.activeElement === last)  { first.focus(); e.preventDefault(); }
    }
  });

  // Booking button closes modal, lets href="#booking" handle scroll
  btnEl.addEventListener('click', closeModal);

  // Plan cards
  document.querySelectorAll('.plan-card').forEach((card, i) => {
    const name = card.querySelector('.plan-name')?.textContent || '';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', name + ' — 詳細を見る');
    function activate() { if (PLAN_DATA[i]) openModal(PLAN_DATA[i]); }
    card.addEventListener('click', activate);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });
  });

  // Rec cards
  document.querySelectorAll('.rec-card').forEach((card, i) => {
    const name = card.querySelector('.rec-card-name')?.textContent || '';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', name + ' — 詳細を見る');
    function activate() { if (REC_DATA[i]) openModal(REC_DATA[i]); }
    card.addEventListener('click', activate);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });
  });
}

function initLightbox() {
  const bg = document.getElementById('lightbox');
  if (!bg) return;

  const closeBtn = bg.querySelector('.lbx-close');
  const imgEl    = bg.querySelector('.lbx-img');

  let prevFocus = null;

  function openLightbox(src, alt) {
    prevFocus = document.activeElement;
    imgEl.src = src.replace(/w=\d+/, 'w=1200');
    imgEl.alt = alt;
    bg.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    bg.classList.remove('is-open');
    document.body.style.overflow = '';
    imgEl.src = '';
    prevFocus?.focus();
  }

  closeBtn.addEventListener('click', closeLightbox);
  bg.addEventListener('click', e => { if (e.target === bg) closeLightbox(); });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && bg.classList.contains('is-open')) closeLightbox();
  });

  document.querySelectorAll('.insta-item').forEach(item => {
    const img = item.querySelector('img');
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', (img?.alt || '写真') + ' — 拡大表示');
    function activate() { if (img) openLightbox(img.src, img.alt); }
    item.addEventListener('click', activate);
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });
  });
}
