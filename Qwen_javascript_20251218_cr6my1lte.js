// Auto detect language (Hi/En)
let lang = navigator.language.startsWith('hi') ? 'hi' : 'en';

// Reduce number to single digit (with master number handling)
function reduceToSingle(numStr) {
  let sum = numStr.split('').reduce((a, b) => a + Number(b), 0);
  while (sum > 9 && ![11, 22, 33].includes(sum)) {
    sum = sum.toString().split('').reduce((a, b) => a + Number(b), 0);
  }
  return sum;
}

function generateReport() {
  const name = document.getElementById('name').value.trim();
  const dobInput = document.getElementById('dob').value;

  if (!name || !dobInput) {
    alert(lang === 'hi' ? 'कृपया नाम और जन्म तिथि भरें।' : 'Please enter your name and date of birth.');
    return;
  }

  const loader = document.getElementById('loader');
  loader.style.display = 'block';

  setTimeout(() => {
    // Life Path Calculation
    const cleanDOB = dobInput.replace(/-/g, '');
    const sumAll = cleanDOB.split('').reduce((a, b) => a + Number(b), 0);
    const lifePath = reduceToSingle(sumAll.toString());

    // Lo Shu Grid
    const loShu = [4, 9, 2, 3, 5, 7, 8, 1, 6];
    const presentSet = new Set(cleanDOB.split('').map(Number));
    const missing = loShu.filter(n => !presentSet.has(n));

    // Generate Lo Shu Grid HTML
    let gridHTML = '<div class="loshu-grid">';
    for (let num of loShu) {
      const className = presentSet.has(num) ? 'present' : 'missing';
      gridHTML += `<div class="loshu-cell ${className}">${num}</div>`;
    }
    gridHTML += '</div>';

    // Interpretations
    const texts = {
      lifePath: {
        hi: "आपका Life Path Number 9 है — आप एक आदर्शवादी, सहायक और समाज-सेवी हैं। आप दूसरों के लिए कुछ करना पसंद करते हैं, लेकिन अपनी भावनाओं को छुपाते हैं। आपकी ताकत: नेतृत्व, समझदारी, सेवा। चुनौती: अति-भावुकता, अपेक्षाएँ, आत्म-त्याग।",
        en: "Your Life Path is 9 — you are idealistic, helpful, and service-oriented. You prefer to do things for others but hide your own emotions. Your strengths: leadership, empathy, service. Challenges: over-emotional, expectations, self-sacrifice."
      },
      missing: {
        hi: `आपके Lo Shu Grid में निम्न नंबर अनुपस्थित हैं: ${missing.join(', ')}। इसका अर्थ: आपको इन क्षेत्रों में अभ्यास करने की आवश्यकता है — जैसे: अनुशासन (4), निर्णय लेने की क्षमता (5), पारिवारिक जिम्मेदारी (6), धैर्य (7), धन प्रबंधन (8)।`,
        en: `Your Lo Shu Grid is missing these numbers: ${missing.join(', ')}. This means you need to practice in these areas — like discipline (4), decision-making (5), family responsibility (6), patience (7), money management (8).`
      },
      career: {
        hi: "आपके लिए Sales, Teaching, NGO, Management जैसे क्षेत्र उपयुक्त हैं। आप लोगों के साथ काम करना पसंद करते हैं और नेतृत्व कर सकते हैं।",
        en: "Sales, Teaching, NGO, Management are suitable for you. You enjoy working with people and can lead effectively."
      },
      money: {
        hi: "पैसा आएगा, लेकिन आपको बचत और लंबे समय की योजना बनाने की आवश्यकता है। भावनात्मक निर्णय से बचें।",
        en: "Money will come, but you need to save and plan long-term. Avoid emotional decisions."
      },
      relationships: {
        hi: "आप दिल से देते हैं, लेकिन जब आपको सम्मान नहीं मिलता तो आप घायल हो जाते हैं। स्पष्ट संचार रखें।",
        en: "You give from the heart, but get hurt when not appreciated. Maintain clear communication."
      },
      truth: {
        hi: "ये भविष्य की गारंटी नहीं है — ये एक स्व-समझ का उपकरण है। आपकी मेहनत, कौशल और कार्य ही आपका भविष्य बनाते हैं।",
        en: "This is not a guarantee of future — it’s a tool for self-understanding. Your effort, skill, and action shape your destiny."
      }
    };

    // Build Report
    const reportHTML = `
      <div class="section-title">👤 ${lang === 'hi' ? 'आपकी व्यक्तिगत रिपोर्ट' : 'Your Personal Report'}</div>
      <p><b>${lang === 'hi' ? 'नाम' : 'Name'}:</b> ${name}</p>
      <p><b>${lang === 'hi' ? 'जन्म तिथि' : 'Date of Birth'}:</b> ${dobInput}</p>
      
      <div class="section-title">🔢 ${lang === 'hi' ? 'लाइफ पाथ नंबर' : 'Life Path Number'}</div>
      <p><b>${sumAll} → ${lifePath}</b></p>
      <p>${texts.lifePath[lang]}</p>

      <div class="section-title">🧩 ${lang === 'hi' ? 'लो शु ग्रिड विश्लेषण' : 'Lo Shu Grid Analysis'}</div>
      <p>${lang === 'hi' ? 'आपके जन्म तिथि में मौजूद अंक:' : 'Numbers present in your DOB:'} ${Array.from(presentSet).join(', ')}</p>
      <p>${texts.missing[lang]}</p>
      ${gridHTML}

      <div class="section-title">💼 ${lang === 'hi' ? 'करियर' : 'Career'}</div>
      <p>${texts.career[lang]}</p>

      <div class="section-title">💰 ${lang === 'hi' ? 'धन' : 'Money'}</div>
      <p>${texts.money[lang]}</p>

      <div class="section-title">❤️ ${lang === 'hi' ? 'संबंध' : 'Relationships'}</div>
      <p>${texts.relationships[lang]}</p>

      <div class="section-title">⚠️ ${lang === 'hi' ? 'सबसे ज़रूरी सच्चाई' : 'Most Important Truth'}</div>
      <p><i>${texts.truth[lang]}</i></p>
    `;

    document.getElementById('report').innerHTML = reportHTML;
    document.getElementById('report').style.display = 'block';
    loader.style.display = 'none';
  }, 800);
}