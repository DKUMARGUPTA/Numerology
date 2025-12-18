
// Auto-detect language
let lang = navigator.language.startsWith('hi') ? 'hi' : 'en';

// Letter-to-number mapping (Pythagorean)
const letterMap = {
  'A':1,'B':2,'C':3,'D':4,'E':5,'F':6,'G':7,'H':8,'I':9,
  'J':1,'K':2,'L':3,'M':4,'N':5,'O':6,'P':7,'Q':8,'R':9,
  'S':1,'T':2,'U':3,'V':4,'W':5,'X':6,'Y':7,'Z':8
};

// Reduce to single digit (preserve 11,22,33)
function reduceToSingle(num) {
  while (num > 9 && ![11,22,33].includes(num)) {
    num = num.toString().split('').reduce((a, b) => a + Number(b), 0);
  }
  return num;
}

// Life Path from DOB
function getLifePath(dob) {
  const clean = dob.replace(/-/g, '');
  return reduceToSingle([...clean].reduce((a, b) => a + Number(b), 0));
}

// Name number (vowels or consonants)
function getNameNumber(name, useVowels) {
  const clean = name.toUpperCase().replace(/[^A-Z]/g, '');
  let sum = 0;
  for (let c of clean) {
    const isVowel = 'AEIOU'.includes(c);
    if ((useVowels && isVowel) || (!useVowels && !isVowel)) {
      sum += letterMap[c] || 0;
    }
  }
  return reduceToSingle(sum);
}

// Karmic Lessons (missing numbers 1-9)
function getKarmicLessons(name) {
  const present = new Set();
  for (let c of name.toUpperCase().replace(/[^A-Z]/g, '')) {
    present.add(letterMap[c]);
  }
  const missing = [];
  for (let i = 1; i <= 9; i++) {
    if (!present.has(i)) missing.push(i);
  }
  return missing.length ? missing.join(', ') : (lang === 'hi' ? 'कोई नहीं' : 'None');
}

// Compatibility logic
function getCompatibility(lp1, lp2) {
  const diff = Math.abs(lp1 - lp2);
  if (diff === 0) return { score: 'Very High', desc: lang === 'hi' ? 'आप एक-दूसरे को गहराई से समझते हैं। आध्यात्मिक जुड़ाव।' : 'Deep mutual understanding. Spiritual alignment.' };
  if ([1,3,6,9].includes(diff)) return { score: 'High', desc: lang === 'hi' ? 'आपकी ऊर्जाएँ पूरक हैं। संतुलन और समझ संभव है।' : 'Your energies are complementary. Balance and understanding are possible.' };
  if ([2,4,5,7,8].includes(diff)) return { score: 'Medium', desc: lang === 'hi' ? 'सीखने के अवसर हैं, लेकिन प्रयास की आवश्यकता है।' : 'Growth opportunities, but requires effort.' };
  return { score: 'Low', desc: lang === 'hi' ? 'चुनौतियाँ हैं, लेकिन सीखना संभव है।' : 'Challenges exist, but learning is possible.' };
}

// Interpretations (Hindi + English)
const interpretations = {
  1: { hi: { title: "स्वतंत्र नेता", desc: "आप नए रास्ते बनाते हैं। चुनौती: जिद। करियर: उद्यमिता। मंत्र: 'मैं अपना रास्ता बनाता हूँ।'" }, en: { title: "Independent Leader", desc: "You forge new paths. Challenge: Stubbornness. Career: Entrepreneurship. Mantra: 'I create my own path.'" } },
  2: { hi: { title: "शांति निर्माता", desc: "आप सहयोग में माहिर हैं। चुनौती: अति-संवेदनशीलता। करियर: काउंसलिंग। मंत्र: 'मैं संतुलन लाता हूँ।'" }, en: { title: "Peacemaker", desc: "You excel in cooperation. Challenge: Oversensitivity. Career: Counseling. Mantra: 'I bring harmony.'" } },
  3: { hi: { title: "रचनात्मक अभिव्यक्ति", desc: "आपकी भाषा आपकी ताकत है। चुनौती: फोकस। करियर: कला, मीडिया। मंत्र: 'मैं प्रेरणा देता हूँ।'" }, en: { title: "Creative Expression", desc: "Your voice is your power. Challenge: Focus. Career: Arts, Media. Mantra: 'I inspire others.'" } },
  4: { hi: { title: "व्यावहारिक निर्माता", desc: "आप मेहनत से सब कुछ बना सकते हैं। चुनौती: कठोरता। करियर: इंजीनियरिंग। मंत्र: 'मैं स्थिरता लाता हूँ।'" }, en: { title: "Practical Builder", desc: "You build through hard work. Challenge: Rigidity. Career: Engineering. Mantra: 'I create stability.'" } },
  5: { hi: { title: "स्वतंत्रता प्रेमी", desc: "आप परिवर्तन से जीते हैं। चुनौती: अनुशासन की कमी। करियर: यात्रा, बिक्री। मंत्र: 'मैं स्वतंत्र हूँ।'" }, en: { title: "Freedom Lover", desc: "You thrive on change. Challenge: Lack of discipline. Career: Travel, Sales. Mantra: 'I am free.'" } },
  6: { hi: { title: "जिम्मेदार देखभालकर्ता", desc: "आप परिवार के लिए सब कुछ कर सकते हैं। चुनौती: ओवरगिविंग। करियर: शिक्षा, चिकित्सा। मंत्र: 'मैं प्रेम से सेवा करता हूँ।'" }, en: { title: "Responsible Caregiver", desc: "You give everything for family. Challenge: Over-giving. Career: Teaching, Healthcare. Mantra: 'I serve with love.'" } },
  7: { hi: { title: "आध्यात्मिक खोजी", desc: "आप गहराई में सच्चाई ढूंढते हैं। चुनौती: भरोसा करना। करियर: शोध, आध्यात्म। मंत्र: 'मैं ज्ञान पाता हूँ।'" }, en: { title: "Spiritual Seeker", desc: "You seek truth in depth. Challenge: Trust. Career: Research, Spirituality. Mantra: 'I find wisdom.'" } },
  8: { hi: { title: "शक्ति और सफलता", desc: "आप धन और प्रभाव बना सकते हैं। चुनौती: नैतिकता। करियर: वित्त, नेतृत्व। मंत्र: 'मैं संतुलित शक्ति रखता हूँ।'" }, en: { title: "Power & Success", desc: "You manifest wealth and influence. Challenge: Ethics. Career: Finance, Leadership. Mantra: 'I hold power with balance.'" } },
  9: { hi: { title: "मानवता के लिए दाता", desc: "आप दूसरों के लिए जीते हैं। चुनौती: अपनी उपेक्षा। करियर: सेवा, कला। मंत्र: 'मैं सभी के लिए हूँ।'" }, en: { title: "Humanitarian Giver", desc: "You live for others. Challenge: Self-neglect. Career: Service, Arts. Mantra: 'I am here for all.'" } },
  11: { hi: { title: "आध्यात्मिक दूत (मास्टर)", desc: "आप प्रेरणा और अंतर्ज्ञान से भरे हैं। चुनौती: भावनात्मक अतिभार। करियर: आध्यात्मिक शिक्षक। मंत्र: 'मैं प्रकाश लाता हूँ।'" }, en: { title: "Spiritual Messenger (Master)", desc: "You are filled with inspiration and intuition. Challenge: Emotional overwhelm. Career: Spiritual teacher. Mantra: 'I channel light.'" } },
  22: { hi: { title: "महान निर्माता (मास्टर)", desc: "आप विशाल सपनों को वास्तविकता में बदल सकते हैं। चुनौती: दबाव। करियर: सामाजिक उद्यम। मंत्र: 'मैं विश्व को बदलता हूँ।'" }, en: { title: "Master Builder (Master)", desc: "You turn grand visions into reality. Challenge: Pressure. Career: Social enterprise. Mantra: 'I build a better world.'" } },
  33: { hi: { title: "महान गुरु (मास्टर)", desc: "आपका उद्देश्य मानवता की सेवा करना है। चुनौती: आत्म-देखभाल। करियर: चिकित्सक, शिक्षक। मंत्र: 'मैं प्रेम से सेवा करता हूँ।'" }, en: { title: "Master Teacher (Master)", desc: "Your purpose is to serve humanity. Challenge: Self-care. Career: Healer, Educator. Mantra: 'I serve with unconditional love.'" } }
};

// Get interpretation
function getInterp(num) {
  return interpretations[num] ? interpretations[num][lang] : { title: "Unknown", desc: "Interpretation not available." };
}

// Generate full report
function generateReport() {
  const name1 = document.getElementById("name1").value.trim();
  const dob1 = document.getElementById("dob1").value;
  if (!name1 || !dob1) return alert(lang === 'hi' ? "कृपया अपना नाम और जन्म तिथि भरें" : "Please enter your name and date of birth.");

  document.getElementById("loader").style.display = "block";

  setTimeout(() => {
    // Calculate numbers
    const lifePath = getLifePath(dob1);
    const soulUrge = getNameNumber(name1, true);
    const expression = getNameNumber(name1, false);
    const karmic = getKarmicLessons(name1);

    // Build report
    const lifeI = getInterp(lifePath);
    const soulI = getInterp(soulUrge);
    const exprI = getInterp(expression);

    let reportHTML = `
      <h2>${lang === 'hi' ? 'आपका न्यूमेरोलॉजी प्रोफाइल' : 'Your Numerology Profile'}</h2>
      
      <div class="section-title">${lang === 'hi' ? '1. लाइफ पाथ नंबर (जीवन का मिशन)' : '1. Life Path Number (Life Mission)'}</div>
      <p><b>${lifePath}</b> – ${lifeI.title}</p>
      <p>${lifeI.desc}</p>
      
      <div class="section-title">${lang === 'hi' ? '2. सोल अर्ज नंबर (हृदय की इच्छा)' : '2. Soul Urge Number (Heart’s Desire)'}</div>
      <p><b>${soulUrge}</b> – ${soulI.title}</p>
      <p>${soulI.desc}</p>
      
      <div class="section-title">${lang === 'hi' ? '3. एक्सप्रेशन नंबर (व्यक्तित्व)' : '3. Expression Number (Personality)'}</div>
      <p><b>${expression}</b> – ${exprI.title}</p>
      <p>${exprI.desc}</p>
      
      <div class="section-title">${lang === 'hi' ? '4. कर्मिक लेसन्स' : '4. Karmic Lessons'}</div>
      <p>${karmic}</p>
    `;

    // Compatibility (if provided)
    const name2 = document.getElementById("name2").value.trim();
    const dob2 = document.getElementById("dob2").value;
    if (name2 && dob2) {
      const lp2 = getLifePath(dob2);
      const comp = getCompatibility(lifePath, lp2);
      reportHTML += `
        <div class="section-title">${lang === 'hi' ? '5. संगतता विश्लेषण' : '5. Compatibility Analysis'}</div>
        <div class="compatibility-result">
          <p><b>${lang === 'hi' ? 'स्कोर:' : 'Score:'}</b> ${comp.score}</p>
          <p>${comp.desc}</p>
        </div>
      `;
    }

    document.getElementById("report").innerHTML = reportHTML;
    document.getElementById("report").classList.remove("hidden");

    // Update certificate
    document.getElementById("cname").innerText = name1;
    document.getElementById("clife").innerText = lifePath;
    document.getElementById("csoul").innerText = soulUrge;
    document.getElementById("cexpr").innerText = expression;
    document.getElementById("ckarma").innerText = karmic;
    document.getElementById("cno").innerText = "NUM-" + Math.floor(100000 + Math.random() * 900000);
    document.getElementById("certificate").classList.remove("hidden");
    document.getElementById("shareBtns").style.display = "flex";

    document.getElementById("loader").style.display = "none";
  }, 800);
}

// Toggle language
function toggleLang() {
  lang = lang === 'hi' ? 'en' : 'hi';
  const btn = document.querySelector('.btn.secondary');
  btn.innerText = lang === 'hi' ? 'English' : 'हिंदी';
  if (!document.getElementById("report").classList.contains("hidden")) {
    generateReport(); // Regenerate in new language
  }
}

// PDF Download
function downloadPDF() {
  const element = document.getElementById("certificate");
  const opt = {
    margin: 0.5,
    filename: 'Numerology-Certificate.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}

// Email Report (opens mailto)
function emailReport() {
  const name = document.getElementById("cname").innerText;
  const report = document.getElementById("report").innerText;
  const subject = encodeURIComponent(`My Numerology Report - ${name}`);
  const body = encodeURIComponent(`Hello,\n\nHere is my numerology report:\n\n${report}\n\nGenerated from Ultimate Numerology`);
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

// Share functions
function shareWhatsApp() {
  const name = document.getElementById("cname").innerText;
  const url = encodeURIComponent(window.location.href + '?shared=true');
  window.open(`https://wa.me/?text=Check%20out%20my%20Numerology%20Profile%20-%20${name}%20%F0%9F%94%AE%0A${url}`, '_blank');
}

function shareFacebook() {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function shareInstagram() {
  alert(lang === 'hi' ? "Instagram पर लिंक शेयर नहीं की जा सकती। कृपया अपना प्रोफाइल स्क्रीनशॉट लेकर पोस्ट करें!" : "Instagram doesn't allow link sharing. Please screenshot your report and post it!");
}
