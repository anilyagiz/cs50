(function($) {
  "use strict"; // Start of use strict

  var tracks = [
    {
      id: "ai",
      title: "Yapay Zekâ",
      body:
        "Botlardan kişisel asistanlara ve alışveriş otomasyonuna kadar yapay zekânın geleceği tek kelimeyle tarif edilebilir: Heyecan verici. Makinelerimiz ve cihazlarımız her geçen gün daha hızlı, daha verimli hale geliyor ve işleri kendi başlarına yapmayı öğreniyor.",
      img: "img/track-ai.png"
    },
    {
      id: "blockchain",
      title: "Blokzincir",
      body:
        'Blokzincir teknolojisinin en heyecan verici kullanım alanları artık ödemeler ve dijital para birimlerinin çok ötesine geçti. "Akıllı sözleşmeler" ve turing-tam çerçeveler ile blokzincir, yalnızca bitcoinden ibaret olmayan yeni bir evreye ulaştı. Web 3.0 devrimine katılmanın zamanı!',
      img: "img/track-blockchain.png"
    },
    {
      id: "iot",
      title: "Nesnelerin İnterneti",
      body:
        "İnternetle birbirine bağlanan cihazların oluşturduğu dünya, daha önce aklımıza bile gelmeyen yeni fırsatları mümkün kılıyor. Cihazların veri paylaşarak akıllı kararlar almasını sağlayan yenilikçi uygulamalar geliştirebilirsin.",
      img: "img/track-iot.png"
    },
    {
      id: "algorithm",
      title: "Algoritma",
      body:
        "Aynı uçuşu defalarca aradığımızda neden fiyatların yükseldiğini hiç merak ettiniz mi? Hava yolları bunu algoritmalar sayesinde yapıyor. Algoritma kavramı yüzyıllardır var; uçuş ücretlerini dinamik tutmaktan çevrim içi işlerinizi kolaylaştırmaya kadar bilgisayarların veri işlemesinin temelinde yer alıyor. Bu alanda dünyanın en iyi programcılarına meydan okuyor, kodlama becerilerini zirveye taşıyorsun!",
      img: "img/track-algorithm.png"
    },
    {
      id: "fintech",
      title: "FinTek",
      body:
        "Finans sektörü, tüm yapıyı baştan şekillendiren dijital dönüşüm dalgasıyla karşı karşıya. Sağlık alanından sonra en büyük dönüşüm potansiyeline sahip endüstri konumunda.",
      img: "img/track-fintech.png"
    },
    {
      id: "future-mobility",
      title: "Geleceğin Mobilitesi",
      body:
        "Otonom araçlardan akıllı şehir yazılımlarına kadar sensör teknolojisi, hareket etme biçimimizi değiştiriyor. Trafikten nefret mi ediyorsun? Biz de! Kirlilikten bıktın mı? Aynı. Park yeri bulmak kabus mu? Kesinlikle. Geleceğin Mobilitesi alanına katıl ve bu sorunlara çözüm üret.",
      img: "img/track-future-mobility.png"
    },
    {
      id: "healthtech",
      title: "Sağlık Teknolojileri",
      body:
        "Hepimizin hastalık ya da yaralanmadan etkilenmiş bir yakınını hatırlaması ne yazık ki zor değil. En kırılgan anlarımızda, mevcut ihtiyaca cevap veremeyen bir sağlık sistemiyle karşı karşıyayız. Daha sağlıklı bir gelecek için tüm geliştiricileri ve sponsorları yenilik yapmaya çağırıyoruz.",
      img: "img/track-healthtech.png"
    },
    {
      id: "ml",
      title: "Makine Öğrenmesi",
      body:
        "Netflix'in zevkine uygun içerikleri nasıl önerdiğine hayran mısın? Google'ın bu kadar isabetli sonuçları hangi algoritmayla gösterdiğini merak ettin mi? Bu yeniliklerin arkasında makine öğrenmesi var. Bilgisayar bilimi, veri analizi, yazılım mühendisliği ve yapay zekâ alanlarında kritik bir evrimi temsil ediyor.",
      img: "img/track-ml.png"
    },
    {
      id: "ar-vr",
      title: "AR/VR",
      body:
        "AR ve VR, zihnimizin bir uzantısıdır ve gerçek endüstri uygulamaları için etkileyici, sürükleyici deneyimler geliştirmek isteyenlere hitap eder. Modadan spora, veri görselleştirmeden mühendisliğe, eğitimden sağlığa kadar her sektör VR & AR yükselişinden etkilenecek.",
      img: "img/track-ar-vr.png"
    }
  ];

  function getNextTrackIndex(currentTrackId) {
    var currentIndex = tracks
      .map(function(track) {
        return track.id;
      })
      .indexOf(currentTrackId);

    return currentIndex === tracks.length - 1 ? 0 : currentIndex + 1;
  }

  function setTrackData(track) {
    var modal = $("#trackModal");
    modal.find(".modal-title").text(track.title);
    modal.find(".modal-body").text(track.body);
    modal.find(".track-img").css("background", 'url("' + track.img + '")');
    modal.data("id", track.id);
  }

  $("#trackModal").on("show.bs.modal", function(event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var selectedTrackId = button.data("track"); // Extract info from data-* attributes

    var selectedTrack = tracks.filter(function(track) {
      return track.id === selectedTrackId;
    })[0];

    setTrackData(selectedTrack);
  });

  $("#nextTrack").on("click", function() {
    var currentTrackId = $("#trackModal").data("id");

    setTrackData(tracks[getNextTrackIndex(currentTrackId)]);
  });
})(jQuery); // End of use strict
