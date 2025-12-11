// Türkiye illeri ve plaka kodları
const cities = [
  { code: "01", name: "Adana" },
  { code: "02", name: "Adıyaman" },
  { code: "03", name: "Afyonkarahisar" },
  { code: "04", name: "Ağrı" },
  { code: "05", name: "Amasya" },
  { code: "06", name: "Ankara" },
  { code: "07", name: "Antalya" },
  { code: "08", name: "Artvin" },
  { code: "09", name: "Aydın" },
  { code: "10", name: "Balıkesir" },
  { code: "11", name: "Bilecik" },
  { code: "12", name: "Bingöl" },
  { code: "13", name: "Bitlis" },
  { code: "14", name: "Bolu" },
  { code: "15", name: "Burdur" },
  { code: "16", name: "Bursa" },
  { code: "17", name: "Çanakkale" },
  { code: "18", name: "Çankırı" },
  { code: "19", name: "Çorum" },
  { code: "20", name: "Denizli" },
  { code: "21", name: "Diyarbakır" },
  { code: "22", name: "Edirne" },
  { code: "23", name: "Elazığ" },
  { code: "24", name: "Erzincan" },
  { code: "25", name: "Erzurum" },
  { code: "26", name: "Eskişehir" },
  { code: "27", name: "Gaziantep" },
  { code: "28", name: "Giresun" },
  { code: "29", name: "Gümüşhane" },
  { code: "30", name: "Hakkari" },
  { code: "31", name: "Hatay" },
  { code: "32", name: "Isparta" },
  { code: "33", name: "Mersin" },
  { code: "34", name: "İstanbul" },
  { code: "35", name: "İzmir" },
  { code: "36", name: "Kars" },
  { code: "37", name: "Kastamonu" },
  { code: "38", name: "Kayseri" },
  { code: "39", name: "Kırklareli" },
  { code: "40", name: "Kırşehir" },
  { code: "41", name: "Kocaeli" },
  { code: "42", name: "Konya" },
  { code: "43", name: "Kütahya" },
  { code: "44", name: "Malatya" },
  { code: "45", name: "Manisa" },
  { code: "46", name: "Kahramanmaraş" },
  { code: "47", name: "Mardin" },
  { code: "48", name: "Muğla" },
  { code: "49", name: "Muş" },
  { code: "50", name: "Nevşehir" },
  { code: "51", name: "Niğde" },
  { code: "52", name: "Ordu" },
  { code: "53", name: "Rize" },
  { code: "54", name: "Sakarya" },
  { code: "55", name: "Samsun" },
  { code: "56", name: "Siirt" },
  { code: "57", name: "Sinop" },
  { code: "58", name: "Sivas" },
  { code: "59", name: "Tekirdağ" },
  { code: "60", name: "Tokat" },
  { code: "61", name: "Trabzon" },
  { code: "62", name: "Tunceli" },
  { code: "63", name: "Şanlıurfa" },
  { code: "64", name: "Uşak" },
  { code: "65", name: "Van" },
  { code: "66", name: "Yozgat" },
  { code: "67", name: "Zonguldak" },
  { code: "68", name: "Aksaray" },
  { code: "69", name: "Bayburt" },
  { code: "70", name: "Karaman" },
  { code: "71", name: "Kırıkkale" },
  { code: "72", name: "Batman" },
  { code: "73", name: "Şırnak" },
  { code: "74", name: "Bartın" },
  { code: "75", name: "Ardahan" },
  { code: "76", name: "Iğdır" },
  { code: "77", name: "Yalova" },
  { code: "78", name: "Karabük" },
  { code: "79", name: "Kilis" },
  { code: "80", name: "Osmaniye" },
  { code: "81", name: "Düzce" }
];

let selectedCity = null;

// 81 düğme oluştur
const buttonGrid = document.getElementById('buttonGrid');

cities.forEach((city, index) => {
  const button = document.createElement('button');
  button.className = 'grid-btn';
  button.dataset.code = city.code;
  button.dataset.name = city.name;
  button.dataset.index = index;
  
  // İçerik: PC'de plaka ve isim, mobilde sadece plaka
  const spanPC = document.createElement('span');
  spanPC.className = 'pc-only';
  spanPC.textContent = city.name;
  
  const spanCode = document.createElement('span');
  spanCode.className = 'code';
  spanCode.textContent = city.code;
  
  button.appendChild(spanCode);
  button.appendChild(spanPC);
  
  button.addEventListener('click', function() {
    selectCity(this);
  });
  
  buttonGrid.appendChild(button);
});

function selectCity(button) {
  // Önceki seçimi temizle
  if (selectedCity) {
    selectedCity.classList.remove('selected');
  }
  
  // Yeni seçimi yap
  button.classList.add('selected');
  selectedCity = button;
  
  // Seçilen ili göster ve mesafeleri hesapla
  const selectedCode = button.dataset.code;
  const selectedName = button.dataset.name;
  
  updateSelectedCityInfo(selectedCode, selectedName);
  calculateAndDisplayDistances(selectedCode);
}

function updateSelectedCityInfo(code, name) {
  const infoElement = document.getElementById('selectedCityInfo');
  infoElement.textContent = `${code} - ${name}`;
}

function calculateAndDisplayDistances(selectedCode) {
  const resultElement = document.getElementById('result');
  
  // Mesafe verilerini kontrol et
  if (!window.distanceData || !window.distanceData[selectedCode]) {
    resultElement.innerHTML = `
      <div class="no-selection">
        <i class="fas fa-exclamation-triangle"></i>
        <p>No distance data available for this city</p>
      </div>
    `;
    return;
  }
  
  // Seçilen ilin mesafe verilerini al
  const distances = window.distanceData[selectedCode];
  
  // Mesafeleri içeren dizi oluştur
  const distanceArray = [];
  
  cities.forEach(city => {
    if (city.code !== selectedCode) {
      const distance = distances[city.code];
      if (distance !== undefined) {
        distanceArray.push({
          code: city.code,
          name: city.name,
          distance: distance
        });
      }
    }
  });
  
  // Mesafeleri küçükten büyüğe sırala
  distanceArray.sort((a, b) => a.distance - b.distance);
  
  // Sonuçları göster
  displayDistanceList(distanceArray, selectedCode);
}

function displayDistanceList(distances, selectedCode) {
  const resultElement = document.getElementById('result');
  
  if (distances.length === 0) {
    resultElement.innerHTML = `
      <div class="no-selection">
        <i class="fas fa-exclamation-triangle"></i>
        <p>No distance data available for this city</p>
      </div>
    `;
    return;
  }
  
  let html = '<div class="distance-list">';
  
  distances.forEach((city, index) => {
    const rank = index + 1;
    const distance = city.distance.toFixed(1);
    
    html += `
      <div class="distance-item">
        <div class="rank">${rank}</div>
        <div class="distance-details">
          <div class="city-info">
            <div class="city-code">${city.code}</div>
            <div class="city-name">${city.name}</div>
          </div>
          <div class="distance-value">
            ${distance} <span class="distance-unit">km</span>
          </div>
        </div>
      </div>
    `;
  });
  
  html += '</div>';
  resultElement.innerHTML = html;
}

function resetSelection() {
  if (selectedCity) {
    selectedCity.classList.remove('selected');
    selectedCity = null;
  }
  
  const infoElement = document.getElementById('selectedCityInfo');
  infoElement.textContent = 'No city has been selected yet';
  
  const resultElement = document.getElementById('result');
  resultElement.innerHTML = `
    <div class="no-selection">
      <i class="fas fa-info-circle"></i>
      <p>Select a city to see the distances to other cities</p>
    </div>
  `;
}

function copyResults() {
  if (!selectedCity) {
    alert('Selected a city first!');
    return;
  }
  
  const selectedCode = selectedCity.dataset.code;
  const selectedName = selectedCity.dataset.name;
  
  if (!window.distanceData || !window.distanceData[selectedCode]) {
    alert('No distance data available for this city!');
    return;
  }
  
  const distances = window.distanceData[selectedCode];
  const distanceArray = [];
  
  cities.forEach(city => {
    if (city.code !== selectedCode) {
      const distance = distances[city.code];
      if (distance !== undefined) {
        distanceArray.push({
          code: city.code,
          name: city.name,
          distance: distance
        });
      }
    }
  });
  
distanceArray.sort((a, b) => a.distance - b.distance);

let textToCopy = `${selectedName.toUpperCase()} ŞEHRİNİN DİĞER İLLERE MESAFELERİ\n\n`;

distanceArray.forEach((city) => {
  const distance = city.distance.toFixed(1);
  textToCopy += `${city.name}: ${distance} km\n`;
});

textToCopy += `──────────────────────────────\n`;
textToCopy += `Created on ${new Date().toLocaleDateString('en-EN')} by MESAFE © Serhat Kiraz.\n`;

  
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      const copyBtn = document.querySelector('.btn-copy');
      const originalHtml = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      copyBtn.style.background = 'rgba(76, 175, 80, 0.3)';
      
      setTimeout(() => {
        copyBtn.innerHTML = originalHtml;
        copyBtn.style.background = '';
      }, 2000);
    })
    .catch(err => {
      alert('Error: ' + err);
    });
}


