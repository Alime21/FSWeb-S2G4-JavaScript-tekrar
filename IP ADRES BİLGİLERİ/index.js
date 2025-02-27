import axios from 'axios';

/*Arkadaşın onur için bir restaurant sitesi yapmıştın. Bugün sana teşekkür etmek için seni yemeğe davet etti. İşlerinin iyi gittiğini, kafasında süper fikirler olduğunu söyledi.
Aralarından bir tanesi ilginç geldi. Kullanıcıların lokasyonuna göre sitede bazı değişiklikler yapmak istiyor. Yurt dışından gelen ziyarteçilere farklı mesajlar ve kampanyalar yapmak istiyor.
Sen de bu konuyu merak ettin. Ufak bir PoC(proof of concept) çalışması yapmaya karar verdin. İlk aşama olarak da bir ip datasını nereden alabilirim ve neler yaparım diye düşündün.
Yaptığın araştırmalar sonucunda bazı bilgiler öğrendin ve örnek bir proje yapmaya başladın.
Sadece 2 adım eksik kaldı. index.js dosyasındaki 2 fonksiyonu tamamladığın an projen çalışacak.*/



// Aşağıdaki Fonksiyonu değiştirmeyin

export async function ipAdresimiAl() {
  return await axios({
    method: 'get',
    url: 'https://apis.ergineer.com/ipadresim',
  }).then(function (response) {
    return response.data;
  });
}

/*

	ADIM 1: Aşağdıdaki getData() fonskiyonunda axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız:
  https://apis.ergineer.com/ipgeoapi/{ipAdresiniz}

  Fonksiyon gelen data'yı(obje) geri dönmeli
	
	NOT: ipAdresinizi ipAdresimiAl fonksiyonu ile alabilirsiniz.

  NOT2: gelen datayı browser'da network tab'ından inceleyin. 
  (network tab'ından inceleyemezseniz get isteklerinin URL'ini browser'dan açıp da kontrol edebilirsiniz. 😉)

  Bu data Adım 2'de oluşturacağınız component'de argüman olarak kullanılıyor, önden içindeki verilere(key-Value ikililerine) bakmanız iyi olur).
*/

export async function getData() {
  const ip = await ipAdresimiAl();
  return await axios({
    method: 'get',
    url: `https://apis.ergineer.com/ipgeoapi/${ip}`,
  }).then(function (response) {
    return response.data;
  });
}

/*
	ADIM 2: Aşağıdaki cardOlustur fonskiyonunu argüman olarak sadece 1 nesne alacak şekilde tanımlayın.

  Bu fonksiyonda DOM metotlarını ve özelliklerini kullanarak, aşağıdaki element'i oluşturup dönün.

  Not: Ülke Bayrağını bu linkten alabilirsiniz:
  'https://flaglog.com/codes/standardized-rectangle-120px/{ülkeKodu}.png';
	
	<div class="card">
    <img src={ülke bayrağı url} />
    <div class="card-info">
      <h3 class="ip">{ip adresi}</h3>
      <p class="ulke">{ülke bilgisi (ülke kodu)}</p>
      <p>Enlem: {enlem} Boylam: {boylam}</p>
      <p>Şehir: {şehir}</p>
      <p>Saat dilimi: {saat dilimi}</p>
      <p>Para birimi: {para birimi}</p>
      <p>ISP: {isp}</p>
    </div>
  </div>
*/

export function cardOlustur(data) {
  const cards = document.querySelector('.cards');

  const card = document.createElement('div');
  card.classList.add('card');

  const img = document.createElement('img');
  img.setAttribute(
    'src',
    `https://flaglog.com/codes/standardized-rectangle-120px/${data.ülkeKodu}.png`
  );
  card.appendChild(img);

  const card2 = document.createElement('div');
  card2.classList.add('card-info');

  const header = document.createElement('h3');
  header.classList.add('ip');
  header.textContent = data.sorgu;
  card2.appendChild(header);

  const paragraph = document.createElement('p');
  paragraph.classList.add('ulke');
  paragraph.textContent = `${data.ülke} (${data.ülkeKodu})`;
  card2.appendChild(paragraph);

  const paragraph2 = document.createElement('p');
  paragraph2.textContent = `Enlem: ${data.enlem} Boylam: ${data.boylam}`;
  card2.appendChild(paragraph2);

  const paragraph3 = document.createElement('p');
  paragraph3.textContent = `Şehir: ${data.şehir}`;
  card2.appendChild(paragraph3);

  const paragraph4 = document.createElement('p');
  paragraph4.textContent = `Saat dilimi: ${data.saatdilimi}`;
  card2.appendChild(paragraph4);

  const paragraph5 = document.createElement('p');
  paragraph5.textContent = `Para birimi: ${data.parabirimi}`;
  card2.appendChild(paragraph5);

  const paragraph6 = document.createElement('p');
  paragraph6.textContent = `ISP: ${data.isp}`;
  card2.appendChild(paragraph6);

  card.appendChild(card2);

  cards.appendChild(card);
}
