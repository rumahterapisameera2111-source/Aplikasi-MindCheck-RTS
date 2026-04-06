export interface Option {
  text: string;
  score: number;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
}

export interface ScoringRule {
  min: number;
  max: number;
  category: string;
  explanation: string;
  insights: string[];
  actionableSteps?: string[];
}

export interface Test {
  id: string;
  title: string;
  category: 'Kesehatan Mental' | 'Kepribadian' | 'Karir & Pendidikan' | 'Hubungan & Asmara' | 'Lainnya';
  description: string;
  duration: string;
  popular?: boolean;
  isPaid?: boolean;
  iconName: string;
  questions: Question[];
  scoring: ScoringRule[];
  education: string;
  actionableSteps: string[];
  reflectionPrompt: string;
  showWeaknesses?: boolean;
}

const standardOptions: Option[] = [
  { text: "Tidak pernah", score: 0 },
  { text: "Beberapa hari", score: 1 },
  { text: "Lebih dari separuh waktu", score: 2 },
  { text: "Hampir setiap hari", score: 3 },
];

const yesNoOptions: Option[] = [
  { text: "Tidak", score: 0 },
  { text: "Ya", score: 1 },
];

const frequencyOptions: Option[] = [
  { text: "Sangat jarang / Tidak pernah", score: 0 },
  { text: "Kadang-kadang", score: 1 },
  { text: "Sering", score: 2 },
  { text: "Sangat sering / Selalu", score: 3 },
];

const ikpOptions: Option[] = [
  { text: "Sangat Tidak Sesuai", score: 1 },
  { text: "Tidak Sesuai", score: 2 },
  { text: "Ragu-ragu / Netral", score: 3 },
  { text: "Sesuai", score: 4 },
  { text: "Sangat Sesuai", score: 5 },
];

export const tests: Test[] = [
  {
    id: "depresi",
    title: "Tes Depresi (PHQ-9)",
    category: "Kesehatan Mental",
    iconName: "CloudRain",
    description: "PENTING: Alat ini bersifat SKREENING MANDIRI saja dan bukan diagnosis klinis. Menggunakan Patient Health Questionnaire-9 (PHQ-9), instrumen standar emas yang digunakan oleh profesional medis global untuk mengukur tingkat keparahan depresi.",
    duration: "⏱ 5 menit",
    popular: true,
    reflectionPrompt: "Apa hal yang paling terasa berat untuk Anda jalani belakangan ini?",
    education: "Depresi adalah kondisi medis yang memengaruhi perasaan, cara berpikir, dan tindakan Anda. PHQ-9 membantu mengidentifikasi gejala klinis. Ingat, hasil ini adalah langkah awal skrining, konsultasi lebih lanjut dengan Hipnoterapis kami sangat disarankan untuk penanganan mendalam.",
    actionableSteps: [
      "Mulai dengan rutinitas kecil yang sangat mudah diselesaikan",
      "Usahakan terkena sinar matahari pagi minimal 10 menit",
      "Tetap terhubung dengan satu orang yang Anda percaya",
      "Jadwalkan sesi terapi dengan Hipnoterapis kami untuk eksplorasi akar masalah"
    ],
    questions: [
      { id: "q1", text: "Kurang bersemangat atau tidak tertarik melakukan apa pun?", options: standardOptions },
      { id: "q2", text: "Merasa sedih, murung, atau putus asa?", options: standardOptions },
      { id: "q3", text: "Sulit tidur, sering terbangun, atau malah tidur terlalu lama?", options: standardOptions },
      { id: "q4", text: "Merasa sangat lelah atau kurang bertenaga?", options: standardOptions },
      { id: "q5", text: "Kurang nafsu makan atau justru makan berlebihan?", options: standardOptions },
      { id: "q6", text: "Merasa gagal, membenci diri sendiri, atau merasa mengecewakan keluarga?", options: standardOptions },
      { id: "q7", text: "Sulit fokus saat melakukan sesuatu, seperti membaca atau menonton TV?", options: standardOptions },
      { id: "q8", text: "Bergerak atau berbicara sangat lambat (sampai orang lain sadar)? Atau sebaliknya, merasa sangat gelisah?", options: standardOptions },
      { id: "q9", text: "Muncul pikiran bahwa lebih baik mati atau ingin melukai diri sendiri?", options: standardOptions },
    ],
    scoring: [
      { 
        min: 0, 
        max: 4, 
        category: "Depresi Minimal", 
        explanation: "Skor Anda menunjukkan gejala depresi yang minimal atau tidak ada. Anda tampaknya memiliki keseimbangan emosional yang baik saat ini.", 
        insights: ["Kondisi mood stabil", "Fungsi harian normal", "Resiliensi psikologis baik"],
        actionableSteps: [
          "Pertahankan rutinitas tidur dan makan yang teratur",
          "Lanjutkan hobi atau aktivitas yang membuat Anda bahagia",
          "Lakukan journaling syukur seminggu sekali untuk menjaga mindset positif"
        ]
      },
      { 
        min: 5, 
        max: 9, 
        category: "Depresi Ringan", 
        explanation: "Anda mungkin mengalami gejala depresi ringan. Ini sering kali merupakan respon terhadap stres yang menumpuk atau kelelahan mental.", 
        insights: ["Sering merasa lelah", "Motivasi kadang menurun", "Kualitas tidur mulai terganggu"],
        actionableSteps: [
          "Identifikasi sumber stres utama dalam seminggu terakhir",
          "Luangkan waktu 15 menit untuk jalan santai di luar ruangan",
          "Batasi penggunaan media sosial sebelum tidur",
          "Coba teknik pernapasan 4-7-8 saat merasa kewalahan"
        ]
      },
      { 
        min: 10, 
        max: 14, 
        category: "Depresi Sedang", 
        explanation: "Gejala yang Anda alami cukup mengganggu aktivitas harian. Perasaan sedih atau hampa mungkin mulai terasa menetap.", 
        insights: ["Kehilangan minat pada hobi", "Perubahan pola tidur/makan", "Sering merasa bersalah tanpa alasan jelas"],
        actionableSteps: [
          "Bicarakan perasaan Anda dengan orang terdekat yang suportif",
          "Pecah tugas besar menjadi langkah-langkah kecil yang sangat mudah",
          "Jadwalkan sesi konsultasi awal dengan Hipnoterapis kami untuk rilis emosi",
          "Pastikan Anda mendapatkan asupan nutrisi yang cukup"
        ]
      },
      { 
        min: 15, 
        max: 19, 
        category: "Depresi Sedang-Berat", 
        explanation: "Kondisi ini sangat membebani Anda dan mungkin membuat Anda sulit berfungsi seperti biasanya. Anda tidak harus menghadapinya sendirian.", 
        insights: ["Rasa putus asa yang kuat", "Kehilangan energi signifikan", "Isolasi diri dari lingkungan"],
        actionableSteps: [
          "Sangat disarankan untuk segera menjadwalkan sesi dengan profesional",
          "Jangan memaksakan diri untuk melakukan tugas berat",
          "Hubungi layanan bantuan jika perasaan ingin menyakiti diri muncul",
          "Fokus pada perawatan diri dasar: mandi, makan, dan istirahat"
        ]
      },
      { 
        min: 20, 
        max: 27, 
        category: "Depresi Berat", 
        explanation: "Anda mengalami gejala depresi berat yang memerlukan perhatian segera. Mohon prioritaskan keselamatan dan kesehatan Anda saat ini.", 
        insights: ["Penderitaan emosional mendalam", "Gangguan fungsi harian total", "Risiko krisis emosional tinggi"],
        actionableSteps: [
          "Segera hubungi tenaga profesional kesehatan mental atau Hipnoterapis kami",
          "Minta bantuan keluarga atau teman untuk mendampingi Anda",
          "Jauhkan benda-benda berbahaya dari sekitar Anda",
          "Ingatlah bahwa bantuan tersedia dan kondisi ini bisa membaik dengan penanganan tepat"
        ]
      },
    ]
  },
  {
    id: "kecemasan",
    title: "Tes Kecemasan (GAD-7)",
    category: "Kesehatan Mental",
    iconName: "Wind",
    description: "PENTING: Alat ini bersifat SKREENING MANDIRI saja. Menggunakan Generalized Anxiety Disorder-7 (GAD-7), alat skrining klinis tervalidasi untuk mendeteksi gangguan kecemasan umum.",
    duration: "⏱ 5 menit",
    popular: true,
    reflectionPrompt: "Apa yang paling sering membuat Anda merasa khawatir atau cemas akhir-akhir ini?",
    education: "Kecemasan adalah respon alami tubuh terhadap ancaman. GAD-7 membantu memetakan intensitas kekhawatiran Anda. Untuk hasil yang lebih akurat dan penanganan yang tepat, Anda dapat berkonsultasi dengan Hipnoterapis kami.",
    actionableSteps: [
      "Latihan pernapasan dalam (teknik 4-7-8)",
      "Membatasi konsumsi kafein dan gula",
      "Mencoba mindfulness atau meditasi singkat",
      "Konsultasi dengan Hipnoterapis untuk meredakan kecemasan dari pikiran bawah sadar"
    ],
    questions: [
      { id: "q1", text: "Merasa gugup, gelisah, atau sangat tegang?", options: standardOptions },
      { id: "q2", text: "Sulit menghentikan atau mengendalikan rasa khawatir?", options: standardOptions },
      { id: "q3", text: "Terlalu mengkhawatirkan banyak hal yang berbeda?", options: standardOptions },
      { id: "q4", text: "Merasa sulit untuk santai atau rileks?", options: standardOptions },
      { id: "q5", text: "Merasa sangat gelisah sampai sulit untuk duduk diam?", options: standardOptions },
      { id: "q6", text: "Menjadi mudah marah, jengkel, atau tersinggung?", options: standardOptions },
      { id: "q7", text: "Merasa takut seolah-olah sesuatu yang buruk akan terjadi?", options: standardOptions },
    ],
    scoring: [
      { 
        min: 0, 
        max: 4, 
        category: "Kecemasan Minimal", 
        explanation: "Tingkat kecemasan Anda saat ini berada dalam batas normal dan dapat dikelola dengan baik.", 
        insights: ["Mampu mengelola stres harian", "Kondisi emosional stabil"],
        actionableSteps: [
          "Lanjutkan kebiasaan mindfulness atau meditasi jika sudah ada",
          "Tetap aktif secara fisik untuk menjaga hormon kebahagiaan",
          "Gunakan teknik grounding sesekali untuk tetap 'present'"
        ]
      },
      { 
        min: 5, 
        max: 9, 
        category: "Kecemasan Ringan", 
        explanation: "Anda mungkin mengalami tingkat kecemasan ringan yang kadang mengganggu fokus Anda.", 
        insights: ["Kadang merasa tegang", "Pikiran sedikit berlomba"],
        actionableSteps: [
          "Tuliskan hal-hal yang Anda khawatirkan (Brain Dump)",
          "Kurangi asupan kafein yang berlebihan",
          "Lakukan peregangan otot ringan sebelum tidur",
          "Gunakan teknik pernapasan kotak (box breathing)"
        ]
      },
      { 
        min: 10, 
        max: 14, 
        category: "Kecemasan Sedang", 
        explanation: "Tingkat kecemasan Anda cukup mengganggu aktivitas sehari-hari. Konsultasi klinis disarankan.", 
        insights: ["Overthinking", "Ketegangan fisik", "Kesulitan relaksasi"],
        actionableSteps: [
          "Batasi paparan berita atau informasi yang memicu kecemasan",
          "Coba teknik relaksasi otot progresif",
          "Jadwalkan 'waktu khawatir' khusus selama 15 menit agar tidak mengganggu sepanjang hari",
          "Konsultasikan dengan Hipnoterapis untuk meredakan ketegangan bawah sadar"
        ]
      },
      { 
        min: 15, 
        max: 21, 
        category: "Kecemasan Berat", 
        explanation: "Tingkat kecemasan yang tinggi. Sangat disarankan untuk mencari bantuan profesional segera.", 
        insights: ["Kewalahan oleh rasa takut", "Gangguan tidur signifikan", "Gejala fisik nyata"],
        actionableSteps: [
          "Segera cari bantuan profesional untuk teknik manajemen krisis",
          "Lakukan teknik grounding 5-4-3-2-1 saat merasa panik",
          "Hindari pengambilan keputusan besar saat sedang sangat cemas",
          "Ingatlah bahwa perasaan cemas ini akan berlalu dan Anda aman"
        ]
      },
    ]
  },
  {
    id: "stres",
    title: "Tes Stres (PSS-10)",
    category: "Kesehatan Mental",
    iconName: "Zap",
    description: "PENTING: Alat ini bersifat SKREENING MANDIRI saja. Menggunakan Perceived Stress Scale (PSS-10) versi lengkap untuk akurasi lebih tinggi dalam mengukur persepsi stres subjektif.",
    duration: "⏱ 5 menit",
    popular: true,
    reflectionPrompt: "Situasi apa yang saat ini terasa paling di luar kendali Anda?",
    education: "Stres yang berkepanjangan dapat berdampak buruk pada kesehatan fisik. Skrining ini membantu Anda menyadari beban mental Anda. Hipnoterapi dapat membantu Anda mengelola respon stres dengan lebih tenang.",
    actionableSteps: [
      "Fokus pada hal yang berada dalam kendali Anda",
      "Buat batasan (boundaries) yang jelas dengan orang lain",
      "Luangkan waktu 15 menit sehari untuk 'me time'",
      "Pertimbangkan Hipnoterapi untuk melepaskan beban emosional yang menumpuk"
    ],
    questions: [
      { id: "q1", text: "Seberapa sering Anda merasa kesal karena ada kejadian mendadak yang tidak disangka-sangka?", options: frequencyOptions },
      { id: "q2", text: "Seberapa sering Anda merasa tidak mampu mengendalikan hal-hal penting dalam hidup Anda?", options: frequencyOptions },
      { id: "q3", text: "Seberapa sering Anda merasa gelisah, stres, dan tertekan?", options: frequencyOptions },
      { id: "q4", text: "Seberapa sering Anda merasa yakin dengan kemampuan diri untuk menangani masalah pribadi?", options: frequencyOptions },
      { id: "q5", text: "Seberapa sering Anda merasa segala sesuatunya berjalan sesuai keinginan Anda?", options: frequencyOptions },
      { id: "q6", text: "Seberapa sering Anda merasa tidak sanggup lagi mengatasi semua tugas yang harus dilakukan?", options: frequencyOptions },
      { id: "q7", text: "Seberapa sering Anda mampu mengendalikan rasa jengkel dalam hidup Anda?", options: frequencyOptions },
      { id: "q8", text: "Seberapa sering Anda merasa bisa menangani semua tanggung jawab dengan baik?", options: frequencyOptions },
      { id: "q9", text: "Seberapa sering Anda merasa marah karena hal-hui di luar kendali Anda?", options: frequencyOptions },
      { id: "q10", text: "Seberapa sering Anda merasa kesulitan menumpuk begitu tinggi sampai rasanya tidak bisa diatasi lagi?", options: frequencyOptions },
    ],
    scoring: [
      { 
        min: 0, 
        max: 13, 
        category: "Stres Rendah", 
        explanation: "Anda mampu mengelola tekanan hidup dan merasa memegang kendali dengan baik.", 
        insights: ["Merasa memegang kendali", "Mampu beradaptasi"],
        actionableSteps: [
          "Pertahankan keseimbangan kerja dan kehidupan pribadi",
          "Lakukan aktivitas kreatif untuk menjaga kesegaran mental",
          "Gunakan waktu luang untuk relaksasi aktif seperti yoga atau jalan santai"
        ]
      },
      { 
        min: 14, 
        max: 26, 
        category: "Stres Sedang", 
        explanation: "Anda sedang menghadapi tekanan yang cukup terasa, namun masih berusaha mengatasinya.", 
        insights: ["Kadang merasa kewalahan", "Kapasitas mental menurun"],
        actionableSteps: [
          "Identifikasi pemicu stres utama dan buat rencana mitigasi",
          "Belajarlah untuk berkata 'tidak' pada tanggung jawab tambahan yang tidak mendesak",
          "Lakukan teknik pernapasan dalam saat merasa mulai tegang",
          "Pastikan tidur malam yang cukup (7-8 jam)"
        ]
      },
      { 
        min: 27, 
        max: 40, 
        category: "Stres Tinggi", 
        explanation: "Tingkat stres Anda sangat tinggi dan berisiko menyebabkan kelelahan fisik maupun mental (burnout).", 
        insights: ["Merasa kehilangan kendali", "Kelelahan mental", "Rentan sakit fisik"],
        actionableSteps: [
          "Segera ambil waktu jeda (break) yang signifikan dari rutinitas",
          "Bicarakan beban Anda dengan orang yang dipercaya atau profesional",
          "Prioritaskan hanya tugas yang benar-benar krusial",
          "Pertimbangkan Hipnoterapi untuk merilis ketegangan saraf yang mendalam"
        ]
      },
    ]
  },
  {
    id: "trauma",
    title: "Tes Trauma (PC-PTSD-5)",
    category: "Kesehatan Mental",
    iconName: "ShieldAlert",
    description: "Menggunakan Primary Care PTSD Screen for DSM-5 (PC-PTSD-5), alat skrining awal untuk mendeteksi Gangguan Stres Pascatrauma.",
    duration: "⏱ 2 menit",
    popular: false,
    reflectionPrompt: "Adakah ingatan masa lalu yang sering tiba-tiba muncul dan mengganggu Anda?",
    education: "Trauma emosional dapat mengubah cara otak memproses ancaman. PC-PTSD-5 mendeteksi gejala seperti penghindaran, kewaspadaan berlebih, dan kilas balik (flashback).",
    actionableSteps: [
      "Sadari pemicu (trigger) emosi Anda tanpa menghakiminya",
      "Latih teknik grounding (sebutkan 5 benda yang bisa Anda lihat, 4 yang bisa disentuh)",
      "Pertimbangkan dengan serius untuk mencari bantuan psikolog klinis"
    ],
    questions: [
      { id: "q1", text: "Dalam sebulan terakhir, apakah Anda mengalami mimpi buruk tentang kejadian buruk di masa lalu atau memikirkannya saat sedang tidak ingin?", options: yesNoOptions },
      { id: "q2", text: "Apakah Anda berusaha keras untuk tidak memikirkan kejadian itu atau menghindari situasi yang mengingatkan Anda padanya?", options: yesNoOptions },
      { id: "q3", text: "Apakah Anda terus-menerus merasa waspada, curiga, atau mudah terkejut?", options: yesNoOptions },
      { id: "q4", text: "Apakah Anda merasa 'mati rasa' atau merasa jauh dari orang lain, aktivitas, atau lingkungan sekitar?", options: yesNoOptions },
      { id: "q5", text: "Apakah Anda merasa bersalah atau menyalahkan diri sendiri/orang lain atas kejadian tersebut?", options: yesNoOptions },
    ],
    scoring: [
      { 
        min: 0, 
        max: 2, 
        category: "Risiko PTSD Rendah", 
        explanation: "Gejala trauma yang Anda alami saat ini berada di bawah ambang batas klinis. Anda tampaknya memiliki mekanisme koping yang cukup baik.", 
        insights: ["Mampu memproses emosi", "Merasa cukup aman di masa kini", "Gangguan tidur minimal"],
        actionableSteps: [
          "Lanjutkan praktik perawatan diri yang sudah Anda lakukan",
          "Tetap terhubung dengan komunitas yang suportif",
          "Gunakan teknik journaling untuk mengekspresikan perasaan secara rutin"
        ]
      },
      { 
        min: 3, 
        max: 5, 
        category: "Risiko PTSD Tinggi", 
        explanation: "Skor ini mengindikasikan kemungkinan adanya PTSD. Pengalaman masa lalu mungkin masih sangat memengaruhi kesejahteraan Anda saat ini.", 
        insights: ["Flashback yang mengganggu", "Hypervigilance (kewaspadaan berlebih)", "Penghindaran emosional", "Mimpi buruk berulang"],
        actionableSteps: [
          "Sangat disarankan untuk melakukan asesmen lanjutan dengan psikolog klinis",
          "Latih teknik grounding 5-4-3-2-1 saat merasa terpicu (triggered)",
          "Edukasi diri tentang trauma untuk mengurangi rasa bersalah",
          "Pertimbangkan Hipnoterapi untuk membantu memproses memori traumatik di level bawah sadar"
        ]
      },
    ]
  },
  {
    id: "burnout",
    title: "Tes Burnout (Adaptasi CBI)",
    category: "Lainnya",
    iconName: "Flame",
    description: "Diadaptasi dari Copenhagen Burnout Inventory (CBI) untuk mengukur tingkat kelelahan fisik dan psikologis terkait rutinitas/pekerjaan.",
    duration: "⏱ 2 menit",
    popular: true,
    reflectionPrompt: "Apa bagian dari rutinitas Anda yang terasa paling menguras energi?",
    education: "Burnout bukan sekadar lelah biasa. Ini adalah sindrom kelelahan kronis, sinisme, dan penurunan efikasi diri akibat stres berkepanjangan yang tidak terkelola.",
    actionableSteps: [
      "Ambil cuti atau waktu istirahat sejenak tanpa rasa bersalah",
      "Pisahkan waktu kerja dan waktu pribadi dengan tegas (disconnect)",
      "Bicarakan beban kerja Anda dengan atasan atau rekan"
    ],
    questions: [
      { id: "q1", text: "Seberapa sering Anda merasa lelah secara fisik dan emosional?", options: frequencyOptions },
      { id: "q2", text: "Seberapa sering Anda berpikir 'Saya tidak tahan lagi' terkait pekerjaan/rutinitas Anda?", options: frequencyOptions },
      { id: "q3", text: "Seberapa sering Anda merasa kehabisan energi di penghujung hari?", options: frequencyOptions },
      { id: "q4", text: "Seberapa sering Anda merasa setiap jam kerja/rutinitas terasa sangat melelahkan?", options: frequencyOptions },
    ],
    scoring: [
      { 
        min: 0, 
        max: 3, 
        category: "Energi Terjaga", 
        explanation: "Anda masih memiliki antusiasme dan energi yang baik untuk rutinitas Anda. Keseimbangan hidup Anda tampak terjaga.", 
        insights: ["Motivasi stabil", "Work-life balance cukup baik", "Kualitas istirahat memadai"],
        actionableSteps: [
          "Pertahankan batasan antara waktu kerja dan waktu pribadi",
          "Lakukan hobi secara rutin untuk 'mengisi ulang' baterai mental",
          "Evaluasi beban kerja secara berkala agar tetap proporsional"
        ]
      },
      { 
        min: 4, 
        max: 7, 
        category: "Gejala Burnout", 
        explanation: "Anda mulai merasakan kelelahan kronis. Tubuh dan pikiran Anda mulai memberikan sinyal bahwa Anda butuh jeda.", 
        insights: ["Kelelahan di akhir hari", "Mulai merasa sinis terhadap tugas", "Butuh istirahat lebih lama"],
        actionableSteps: [
          "Ambil cuti atau waktu istirahat sejenak tanpa rasa bersalah",
          "Delegasikan tugas yang bisa didelegasikan",
          "Lakukan aktivitas fisik ringan untuk merilis ketegangan",
          "Bicarakan beban kerja Anda dengan atasan atau rekan terpercaya"
        ]
      },
      { 
        min: 8, 
        max: 12, 
        category: "Burnout Berat", 
        explanation: "Anda mengalami kelelahan ekstrem yang berdampak serius pada kesehatan dan performa Anda. Ini adalah kondisi darurat mental.", 
        insights: ["Kehilangan motivasi total", "Kelelahan kronis yang tidak hilang dengan tidur", "Perasaan tidak berdaya dan hampa"],
        actionableSteps: [
          "Segera ambil waktu istirahat total (sabbatical atau cuti panjang)",
          "Konsultasikan kondisi Anda dengan profesional kesehatan mental",
          "Evaluasi kembali prioritas hidup dan karier Anda",
          "Pertimbangkan Hipnoterapi untuk memulihkan energi psikis yang terkuras habis"
        ]
      },
    ]
  },
  {
    id: "self-esteem",
    title: "Tes Self Esteem (Adaptasi RSES)",
    category: "Lainnya",
    iconName: "User",
    description: "Diadaptasi dari Rosenberg Self-Esteem Scale (RSES), alat ukur psikologi paling luas digunakan untuk mengevaluasi harga diri.",
    duration: "⏱ 2 menit",
    popular: false,
    reflectionPrompt: "Apa hal yang paling sering Anda kritik dari diri Anda sendiri?",
    education: "Self-esteem adalah evaluasi subjektif menyeluruh tentang nilai diri Anda. Self-esteem yang sehat bertindak sebagai 'sistem imun emosional' terhadap penolakan.",
    actionableSteps: [
      "Berhenti membandingkan diri dengan 'highlight reel' orang lain di media sosial",
      "Tulis 3 hal yang Anda hargai dari diri Anda setiap hari",
      "Bicaralah pada diri sendiri seperti Anda berbicara pada sahabat yang sedang kesulitan"
    ],
    questions: [
      { id: "q1", text: "Saya merasa bahwa saya adalah orang yang gagal.", options: frequencyOptions },
      { id: "q2", text: "Saya merasa saya tidak memiliki banyak hal untuk dibanggakan.", options: frequencyOptions },
      { id: "q3", text: "Terkadang saya merasa saya tidak berguna sama sekali.", options: frequencyOptions },
      { id: "q4", text: "Saya cenderung merasa bahwa saya tidak sebaik orang lain.", options: frequencyOptions },
    ],
    scoring: [
      { 
        min: 0, 
        max: 3, 
        category: "Self Esteem Sehat", 
        explanation: "Anda memiliki pandangan yang positif, realistis, dan menghargai diri Anda sendiri. Anda mampu menerima diri apa adanya.", 
        insights: ["Menerima kelebihan dan kekurangan", "Percaya diri", "Resilien terhadap penolakan"],
        actionableSteps: [
          "Terus asah potensi diri dengan tantangan baru",
          "Jadilah mentor atau bantu orang lain untuk memperkuat rasa kebermaknaan",
          "Lakukan afirmasi positif untuk mempertahankan mindset sehat"
        ]
      },
      { 
        min: 4, 
        max: 7, 
        category: "Self Esteem Rendah", 
        explanation: "Anda cenderung meragukan nilai diri Anda dan sering mengkritik diri sendiri secara tidak adil. Suara batin Anda mungkin terlalu keras mengkritik.", 
        insights: ["Sering merasa kurang dibanding orang lain", "Sensitif terhadap kritik", "Sulit menerima pujian"],
        actionableSteps: [
          "Tuliskan 3 pencapaian kecil setiap hari",
          "Berhenti membandingkan diri dengan media sosial",
          "Latih 'self-compassion': bicaralah pada diri sendiri seperti pada sahabat",
          "Identifikasi dan tantang pikiran negatif tentang diri sendiri"
        ]
      },
      { 
        min: 8, 
        max: 12, 
        category: "Self Esteem Sangat Rendah", 
        explanation: "Pandangan negatif yang kuat terhadap diri sendiri menghambat potensi dan kebahagiaan Anda. Anda mungkin merasa tidak berharga.", 
        insights: ["Perasaan tidak berharga yang mendalam", "Self-sabotage", "Takut mencoba hal baru karena takut gagal"],
        actionableSteps: [
          "Cari bantuan profesional untuk mengeksplorasi akar rasa tidak berharga",
          "Mulai dengan satu aktivitas kecil yang memberikan rasa penguasaan (mastery)",
          "Kelilingi diri dengan orang-orang yang memberikan afirmasi positif",
          "Pertimbangkan Hipnoterapi untuk memprogram ulang keyakinan negatif di pikiran bawah sadar"
        ]
      },
    ]
  },
  {
    id: "overthinking",
    title: "Tes Overthinking (Adaptasi PSWQ)",
    category: "Lainnya",
    iconName: "Brain",
    description: "Diadaptasi dari Penn State Worry Questionnaire (PSWQ) untuk mengukur kecenderungan kekhawatiran yang berlebihan dan tidak terkendali.",
    duration: "⏱ 2 menit",
    popular: false,
    reflectionPrompt: "Pikiran apa yang paling sering berputar-putar di kepala Anda saat mau tidur?",
    education: "Overthinking (ruminasi) adalah kebiasaan memikirkan sesuatu secara berlebihan tanpa henti, yang seringkali berujung pada kelumpuhan analisis dan kecemasan.",
    actionableSteps: [
      "Beri 'waktu khusus khawatir' (misal: 15 menit di sore hari saja)",
      "Tuliskan pikiran Anda di kertas (brain dump) agar keluar dari kepala",
      "Alihkan perhatian dengan aktivitas fisik yang menuntut fokus"
    ],
    questions: [
      { id: "q1", text: "Pikiran saya sering dipenuhi oleh kekhawatiran tentang masa depan.", options: frequencyOptions },
      { id: "q2", text: "Saya sering membayangkan kemungkinan terburuk dari suatu kejadian.", options: frequencyOptions },
      { id: "q3", text: "Saya sering memikirkan kembali kesalahan masa lalu berulang-ulang.", options: frequencyOptions },
      { id: "q4", text: "Saya sulit menghentikan pikiran yang mengganggu saat mencoba untuk tidur.", options: frequencyOptions },
    ],
    scoring: [
      { 
        min: 0, 
        max: 3, 
        category: "Pola Pikir Praktis", 
        explanation: "Anda cenderung berpikir berorientasi solusi dan tidak mudah terjebak dalam pikiran sendiri. Anda fokus pada apa yang bisa dilakukan.", 
        insights: ["Fokus pada solusi", "Mudah melepaskan masa lalu", "Mentalitas 'can-do'"],
        actionableSteps: [
          "Gunakan kemampuan ini untuk membantu perencanaan jangka panjang",
          "Tetap waspada terhadap tanda-tanda stres agar tidak berubah menjadi overthinking",
          "Bagikan cara berpikir solutif Anda pada orang sekitar"
        ]
      },
      { 
        min: 4, 
        max: 7, 
        category: "Overthinking Ringan", 
        explanation: "Anda kadang terjebak dalam siklus pikiran, terutama saat menghadapi ketidakpastian atau keputusan penting.", 
        insights: ["Sering menganalisis berlebih", "Kadang sulit tidur karena pikiran", "Ragu-ragu dalam bertindak"],
        actionableSteps: [
          "Gunakan teknik '5-Second Rule' untuk segera bertindak tanpa terlalu banyak berpikir",
          "Tuliskan pikiran Anda (brain dump) sebelum tidur",
          "Tetapkan batas waktu untuk pengambilan keputusan kecil",
          "Lakukan aktivitas fisik untuk mengalihkan energi dari kepala ke tubuh"
        ]
      },
      { 
        min: 8, 
        max: 12, 
        category: "Overthinking Berat", 
        explanation: "Pikiran Anda sangat menguras energi mental dan menghambat Anda untuk bertindak. Anda mungkin merasa 'lumpuh' oleh analisis.", 
        insights: ["Kelelahan mental kronis", "Terjebak di masa lalu atau masa depan", "Kelumpuhan analisis (analysis paralysis)"],
        actionableSteps: [
          "Beri 'waktu khusus khawatir' (misal: 15 menit saja di sore hari)",
          "Latih teknik mindfulness untuk kembali ke saat ini (present moment)",
          "Fokus pada satu langkah kecil yang bisa dilakukan SEKARANG",
          "Pertimbangkan Hipnoterapi untuk menenangkan dialog internal yang berisik"
        ]
      },
    ]
  },
  {
    id: "regulasi-emosi",
    title: "Tes Regulasi Emosi (Adaptasi ERQ)",
    category: "Lainnya",
    iconName: "HeartPulse",
    description: "Diadaptasi dari Emotion Regulation Questionnaire (ERQ) untuk melihat kesulitan dalam mengelola emosi yang intens.",
    duration: "⏱ 2 menit",
    popular: false,
    reflectionPrompt: "Emosi apa yang paling sulit Anda kendalikan saat sedang marah atau sedih?",
    education: "Regulasi emosi adalah kemampuan merespons pengalaman emosional secara sehat. Menekan emosi (suppression) secara terus-menerus justru meningkatkan stres internal.",
    actionableSteps: [
      "Beri jeda 5 detik (tarik napas) sebelum merespons saat marah",
      "Kenali dan beri nama emosi yang sedang dirasakan (Name it to tame it)",
      "Salurkan emosi lewat tulisan, seni, atau olahraga"
    ],
    questions: [
      { id: "q1", text: "Saat saya marah atau sedih, saya merasa kehilangan kendali atas perilaku saya.", options: frequencyOptions },
      { id: "q2", text: "Saya sering memendam emosi saya sampai akhirnya meledak tak terkendali.", options: frequencyOptions },
      { id: "q3", text: "Saya kesulitan menenangkan diri setelah mengalami kejadian yang membuat kesal.", options: frequencyOptions },
      { id: "q4", text: "Emosi saya seringkali mengganggu kemampuan saya untuk berpikir jernih dan menyelesaikan masalah.", options: frequencyOptions },
    ],
    scoring: [
      { 
        min: 0, 
        max: 3, 
        category: "Regulasi Baik", 
        explanation: "Anda mampu memproses dan mengelola emosi Anda dengan cara yang sehat dan adaptif. Anda memiliki kecerdasan emosional yang baik.", 
        insights: ["Mampu menenangkan diri", "Respon proporsional", "Kesadaran diri tinggi"],
        actionableSteps: [
          "Terus asah empati terhadap diri sendiri dan orang lain",
          "Latih teknik komunikasi asertif untuk mengekspresikan emosi",
          "Gunakan kemampuan ini untuk memimpin atau menengahi konflik"
        ]
      },
      { 
        min: 4, 
        max: 7, 
        category: "Kesulitan Ringan", 
        explanation: "Anda kadang kesulitan mengendalikan emosi saat berada di bawah tekanan tinggi atau saat merasa lelah.", 
        insights: ["Mudah terpancing emosi", "Kadang reaktif", "Sering memendam perasaan"],
        actionableSteps: [
          "Kenali tanda-tanda fisik saat emosi mulai naik (misal: jantung berdebar)",
          "Beri jeda 5 detik sebelum merespons situasi yang memicu emosi",
          "Beri nama pada emosi yang dirasakan ('Saya merasa kecewa karena...')",
          "Lakukan journaling emosi untuk melihat pola pemicu"
        ]
      },
      { 
        min: 8, 
        max: 12, 
        category: "Kesulitan Signifikan", 
        explanation: "Emosi seringkali mengambil alih kendali diri Anda, berdampak pada hubungan dan kesejahteraan mental Anda.", 
        insights: ["Ledakan emosi yang tidak terkendali", "Kesulitan menenangkan diri setelah marah/sedih", "Merasa dikuasai oleh perasaan"],
        actionableSteps: [
          "Cari bantuan profesional untuk mempelajari teknik regulasi emosi",
          "Latih teknik pernapasan dalam secara rutin, bukan hanya saat emosi naik",
          "Identifikasi pemicu (triggers) utama dan buat rencana respons alternatif",
          "Pertimbangkan Hipnoterapi untuk merilis sumbatan emosi masa lalu yang membuat Anda reaktif"
        ]
      },
    ]
  },
  {
    id: "relationship",
    title: "Tes Relationship Health (Adaptasi CSI)",
    category: "Hubungan & Asmara",
    iconName: "Heart",
    description: "Diadaptasi dari Couples Satisfaction Index (CSI) untuk mengevaluasi dinamika toksik vs sehat dalam hubungan terdekat Anda.",
    duration: "⏱ 2 menit",
    popular: false,
    reflectionPrompt: "Apa hal yang paling sering memicu konflik dalam hubungan Anda?",
    education: "Hubungan yang sehat dibangun di atas rasa aman (psychological safety). Jika Anda merasa harus selalu 'berjalan di atas cangkang telur', itu adalah tanda bahaya (red flag).",
    actionableSteps: [
      "Gunakan pernyataan 'Saya merasa...' daripada menuduh 'Kamu selalu...'",
      "Dengarkan untuk memahami, bukan sekadar menunggu giliran membalas",
      "Tetapkan batasan (boundaries) yang sehat dan komunikasikan dengan jelas"
    ],
    questions: [
      { id: "q1", text: "Seberapa sering Anda dan pasangan bertengkar tentang hal kecil yang berujung pada konflik besar?", options: frequencyOptions },
      { id: "q2", text: "Seberapa sering Anda merasa tidak dihargai, diremehkan, atau tidak didengarkan?", options: frequencyOptions },
      { id: "q3", text: "Seberapa sering Anda merasa harus sangat berhati-hati dalam bersikap agar tidak memicu kemarahan pasangan?", options: frequencyOptions },
      { id: "q4", text: "Seberapa sering Anda merasa harus menyembunyikan perasaan atau pikiran asli Anda dari pasangan?", options: frequencyOptions },
    ],
    scoring: [
      { 
        min: 0, 
        max: 3, 
        category: "Hubungan Sehat", 
        explanation: "Hubungan Anda secara umum memiliki dinamika yang positif, aman, dan saling mendukung. Anda dan pasangan memiliki fondasi komunikasi yang baik.", 
        insights: ["Komunikasi asertif", "Merasa aman (secure attachment)", "Saling menghargai batasan"],
        actionableSteps: [
          "Terus pupuk kedekatan emosional dengan 'quality time' rutin",
          "Lakukan apresiasi harian untuk hal-hal kecil yang dilakukan pasangan",
          "Pertahankan keterbukaan dalam membicarakan rencana masa depan"
        ]
      },
      { 
        min: 4, 
        max: 7, 
        category: "Hubungan Tegang", 
        explanation: "Ada pola komunikasi atau konflik yang perlu diperbaiki agar tidak merusak hubungan jangka panjang. Ketegangan mulai terasa menguras energi.", 
        insights: ["Kurang komunikasi jujur", "Sering salah paham", "Mulai muncul rasa tidak puas"],
        actionableSteps: [
          "Gunakan pernyataan 'Saya merasa...' daripada menyalahkan pasangan",
          "Jadwalkan waktu khusus untuk bicara dari hati ke hati tanpa gangguan gadget",
          "Belajarlah untuk mendengarkan tanpa langsung memberikan pembelaan diri",
          "Identifikasi pola pertengkaran yang berulang dan cari akar masalahnya"
        ]
      },
      { 
        min: 8, 
        max: 12, 
        category: "Indikasi Toksik", 
        explanation: "Dinamika hubungan Anda saat ini sangat menguras emosi dan berpotensi merugikan kesehatan mental Anda. Rasa aman dalam hubungan ini mulai menipis.", 
        insights: ["Merasa tidak aman (walking on eggshells)", "Konflik destruktif", "Kebutuhan emosional sering terabaikan", "Manipulasi atau kontrol berlebih"],
        actionableSteps: [
          "Prioritaskan keamanan dan kesehatan mental Anda sendiri",
          "Bicarakan kondisi ini dengan pihak ketiga yang netral atau profesional",
          "Tetapkan batasan (boundaries) yang tegas untuk melindungi diri Anda",
          "Pertimbangkan apakah hubungan ini masih memberikan ruang untuk pertumbuhan Anda"
        ]
      },
    ]
  },
  {
    id: "inner-child",
    title: "Tes Luka Batin (Schema Therapy Based)",
    category: "Lainnya",
    iconName: "Baby",
    description: "Didasarkan pada konsep Schema Therapy (Jeffrey Young) untuk mendeteksi 'Early Maladaptive Schemas' atau luka masa kecil.",
    duration: "⏱ 2 menit",
    popular: false,
    reflectionPrompt: "Sikap apa dari orang tua/pengasuh masa kecil yang tanpa sadar Anda ulangi sekarang?",
    education: "Luka batin (Inner Child wounds) seringkali bermanifestasi sebagai pola perilaku berulang di masa dewasa, seperti takut ditinggalkan (abandonment) atau merasa cacat (defectiveness).",
    actionableSteps: [
      "Sadari saat Anda bereaksi berlebihan (trigger) terhadap kritik kecil",
      "Latih teknik reparenting: berikan kasih sayang pada diri sendiri seperti Anda merawat anak kecil",
      "Pertimbangkan terapi psikologis untuk memproses trauma masa lalu"
    ],
    questions: [
      { id: "q1", text: "Saya sering merasa sangat takut diabaikan atau ditinggalkan oleh orang-orang terdekat saya.", options: frequencyOptions },
      { id: "q2", text: "Saya merasa harus selalu tampil 'sempurna' atau berprestasi agar pantas untuk dicintai.", options: frequencyOptions },
      { id: "q3", text: "Saya sering merasa sangat bersalah saat mencoba mengutamakan kebutuhan saya sendiri.", options: frequencyOptions },
      { id: "q4", text: "Saya sangat sensitif dan mudah hancur terhadap penolakan atau kritik sekecil apapun.", options: frequencyOptions },
    ],
    scoring: [
      { 
        min: 0, 
        max: 3, 
        category: "Luka Batin Terkelola", 
        explanation: "Anda tampaknya memiliki fondasi emosional yang cukup aman dari masa kecil Anda. Pola asuh masa lalu tidak mendikte reaksi Anda saat ini secara negatif.", 
        insights: ["Mampu menetapkan batasan", "Merasa cukup berharga (secure attachment)", "Respon emosional stabil"],
        actionableSteps: [
          "Terus pelajari pola komunikasi yang sehat",
          "Latih kesadaran diri (mindfulness) untuk tetap terhubung dengan perasaan",
          "Gunakan pemahaman ini untuk membangun hubungan yang lebih dalam"
        ]
      },
      { 
        min: 4, 
        max: 7, 
        category: "Luka Batin Aktif", 
        explanation: "Beberapa pola dari masa kecil (schema) masih memengaruhi cara Anda berelasi dan memandang diri. Anda mungkin sering merasa tidak cukup baik.", 
        insights: ["Kecenderungan people-pleasing", "Takut akan penolakan", "Sering merasa bersalah saat mengutamakan diri"],
        actionableSteps: [
          "Mulai belajar berkata 'tidak' pada hal yang tidak sesuai kapasitas Anda",
          "Latih teknik 'reparenting': berikan kata-kata penyemangat pada diri sendiri",
          "Identifikasi situasi apa yang paling sering memicu reaksi emosional masa kecil Anda",
          "Tulis surat untuk diri Anda di masa kecil sebagai bentuk rilis emosi"
        ]
      },
      { 
        min: 8, 
        max: 12, 
        category: "Luka Batin Mendalam", 
        explanation: "Luka masa kecil sangat mendikte reaksi emosional Anda, memicu kecemasan relasional yang tinggi dan rasa tidak aman yang menetap.", 
        insights: ["Reaktivitas emosional tinggi", "Takut ditinggalkan (Abandonment anxiety)", "Perfeksionisme ekstrem sebagai bentuk perlindungan diri"],
        actionableSteps: [
          "Sangat disarankan untuk memproses luka ini bersama profesional",
          "Latih teknik grounding saat merasa emosi masa lalu meluap",
          "Berhenti menyalahkan diri sendiri atas reaksi emosional yang muncul",
          "Pertimbangkan Hipnoterapi untuk menjangkau dan menyembuhkan memori bawah sadar yang terluka"
        ]
      },
    ]
  },
  {
    id: "pmo",
    title: "Tes PMO Addiction (Adaptasi PATHOS)",
    category: "Lainnya",
    iconName: "ShieldCheck",
    description: "Diadaptasi dari kuesioner PATHOS, alat skrining klinis untuk mendeteksi indikasi kecanduan seksual/pornografi.",
    duration: "⏱ 2 menit",
    popular: true,
    reflectionPrompt: "Biasanya, emosi apa yang memicu Anda untuk kembali melakukan kebiasaan ini? (misal: bosan, stres, kesepian)",
    education: "Kecanduan PMO (Porn, Masturbation, Orgasm) seringkali bukan tentang tingginya libido, melainkan mekanisme pelarian (maladaptive coping) dari stres, kebosanan, atau kesepian.",
    actionableSteps: [
      "Kenali pemicu utama Anda menggunakan metode HALT (Hungry, Angry, Lonely, Tired)",
      "Gunakan aplikasi pemblokir situs dan batasi waktu menyendiri dengan gadget",
      "Cari aktivitas fisik pengganti (dopamin sehat) saat dorongan muncul",
      "Jangan menghukum diri sendiri jika relaps, fokus pada perbaikan sistem"
    ],
    questions: [
      { id: "q1", text: "Apakah Anda sering menggunakan pornografi/masturbasi sebagai cara untuk melarikan diri dari stres atau emosi negatif?", options: frequencyOptions },
      { id: "q2", text: "Apakah Anda merasa bersalah, malu, atau menyesal setelah melakukannya?", options: frequencyOptions },
      { id: "q3", text: "Apakah kebiasaan ini mulai mengganggu produktivitas, waktu tidur, atau hubungan sosial nyata Anda?", options: frequencyOptions },
      { id: "q4", text: "Apakah Anda pernah mencoba berhenti atau mengurangi namun gagal dan kembali mengulanginya?", options: frequencyOptions },
    ],
    scoring: [
      { 
        min: 0, 
        max: 3, 
        category: "Terkendali", 
        explanation: "Kebiasaan Anda tampaknya tidak mengganggu fungsi kehidupan sehari-hari secara signifikan. Anda memiliki kontrol diri yang baik.", 
        insights: ["Bukan sebagai pelarian utama", "Mampu mengendalikan dorongan", "Fokus tetap terjaga"],
        actionableSteps: [
          "Tetap waspada terhadap pemicu stres yang bisa mengubah kebiasaan",
          "Pertahankan gaya hidup aktif dan produktif",
          "Edukasi diri tentang dampak jangka panjang pornografi untuk pencegahan"
        ]
      },
      { 
        min: 4, 
        max: 7, 
        category: "Ketergantungan Ringan", 
        explanation: "Anda mulai menggunakan kebiasaan ini sebagai cara utama mengatasi emosi negatif atau kebosanan. Waspadai siklus ketergantungan ini.", 
        insights: ["Sering merasa bersalah setelahnya", "Mulai mengganggu fokus harian", "Digunakan sebagai pelarian stres"],
        actionableSteps: [
          "Identifikasi emosi apa yang memicu dorongan (bosan, stres, atau sepi?)",
          "Gunakan aplikasi pemblokir konten dewasa di gadget Anda",
          "Cari hobi baru yang memberikan dopamin sehat (olahraga, seni)",
          "Jangan menyendiri dengan gadget saat merasa rentan"
        ]
      },
      { 
        min: 8, 
        max: 12, 
        category: "Indikasi Kecanduan", 
        explanation: "Kebiasaan ini telah menjadi kompulsi yang sulit dihentikan dan mulai berdampak negatif pada kualitas hidup dan hubungan Anda.", 
        insights: ["Siklus kecanduan aktif", "Pelarian emosional utama", "Kehilangan kendali (Loss of control)", "Penurunan sensitivitas terhadap hal nyata"],
        actionableSteps: [
          "Cari bantuan profesional atau komunitas pendukung (support group)",
          "Lakukan 'digital detox' atau batasi penggunaan internet secara ketat",
          "Bicarakan masalah ini dengan orang yang Anda percayai",
          "Pertimbangkan Hipnoterapi untuk memutus rantai adiksi di level pikiran bawah sadar"
        ]
      },
    ]
  },
  {
    id: "enneagram",
    title: "Tes Kepribadian Enneagram",
    category: "Kepribadian",
    iconName: "Fingerprint",
    description: "Temukan tipe kepribadian Anda dari 9 tipe Enneagram untuk memahami motivasi dasar dan potensi diri Anda.",
    duration: "⏱ 5-7 menit",
    popular: true,
    reflectionPrompt: "Apa ketakutan terdalam yang seringkali mendikte keputusan Anda?",
    education: "Enneagram adalah sistem tipologi kepribadian yang mendeskripsikan sembilan tipe kepribadian yang saling berhubungan, masing-masing dengan motivasi, ketakutan, dan cara memandang dunia yang unik.",
    actionableSteps: [
      "Pelajari 'Sayap' (Wing) dari tipe utama Anda untuk pemahaman lebih dalam",
      "Gunakan pengetahuan ini untuk memperbaiki komunikasi dengan orang lain",
      "Sadari pola perilaku otomatis Anda saat berada di bawah tekanan"
    ],
    questions: [
      { id: "q1", text: "Saya cenderung perfeksionis dan merasa harus selalu melakukan segalanya dengan benar.", options: frequencyOptions },
      { id: "q2", text: "Membantu orang lain adalah hal yang memberikan saya kepuasan terbesar.", options: frequencyOptions },
      { id: "q3", text: "Saya sangat fokus pada pencapaian dan kesuksesan agar dihargai orang lain.", options: frequencyOptions },
      { id: "q4", text: "Saya merasa berbeda dari orang lain dan seringkali merasa melankolis.", options: frequencyOptions },
    ],
    scoring: [
      { 
        min: 0, 
        max: 3, 
        category: "Eksplorasi Awal", 
        explanation: "Anda baru mulai menyentuh permukaan dari tipe kepribadian Anda. Butuh observasi diri lebih lanjut untuk hasil yang akurat.", 
        insights: ["Butuh observasi diri lebih lanjut", "Motivasi mungkin masih tersembunyi", "Pola perilaku belum terlihat jelas"],
        actionableSteps: [
          "Baca deskripsi lengkap ke-9 tipe Enneagram",
          "Amati reaksi otomatis Anda saat sedang stres vs saat sedang tenang",
          "Tanyakan pada orang terdekat tentang pola perilaku Anda yang paling menonjol"
        ]
      },
      { 
        min: 4, 
        max: 8, 
        category: "Kecenderungan Kuat", 
        explanation: "Anda menunjukkan pola yang konsisten dengan tipe kepribadian tertentu. Ini adalah awal yang baik untuk pengembangan diri.", 
        insights: ["Pola perilaku mulai terbaca", "Motivasi dasar mulai terlihat", "Ketakutan dasar mulai teridentifikasi"],
        actionableSteps: [
          "Pelajari 'Sayap' (Wing) dari tipe yang paling mendekati skor Anda",
          "Gunakan pengetahuan ini untuk memperbaiki cara Anda berkomunikasi",
          "Sadari kapan Anda bertindak berdasarkan 'ketakutan dasar' tipe Anda"
        ]
      },
      { 
        min: 9, 
        max: 12, 
        category: "Tipe Dominan", 
        explanation: "Anda memiliki profil yang sangat kuat pada salah satu spektrum Enneagram. Anda memiliki pemahaman yang kuat tentang motivasi dan ketakutan dasar Anda.", 
        insights: ["Motivasi dasar sangat jelas", "Ketakutan inti mendikte perilaku", "Potensi pertumbuhan spesifik", "Kesadaran diri tinggi"],
        actionableSteps: [
          "Pelajari jalur integrasi (pertumbuhan) dan disintegrasi (stres) tipe Anda",
          "Latih diri untuk tidak terjebak dalam aspek negatif tipe kepribadian Anda",
          "Gunakan wawasan ini untuk membangun hubungan yang lebih empatik dengan tipe lain"
        ]
      },
    ]
  },
  {
    id: "minat-bakat-karir",
    title: "Minat Bakat: Pekerjaan & Karir",
    category: "Karir & Pendidikan",
    iconName: "Briefcase",
    description: "Identifikasi bidang pekerjaan yang paling sesuai dengan minat dan potensi alami Anda.",
    duration: "⏱ 5 menit",
    popular: true,
    reflectionPrompt: "Jika uang bukan masalah, pekerjaan apa yang akan Anda lakukan dengan senang hati setiap hari?",
    education: "Kesesuaian antara minat dan pekerjaan (Person-Job Fit) adalah kunci utama kepuasan kerja dan produktivitas jangka panjang.",
    actionableSteps: [
      "Riset lebih dalam tentang industri yang sesuai dengan hasil tes Anda",
      "Cari mentor di bidang yang Anda minati",
      "Kembangkan skill spesifik yang dibutuhkan di bidang tersebut"
    ],
    questions: [
      { id: "q1", text: "Saya lebih suka bekerja dengan data dan angka daripada dengan orang.", options: frequencyOptions },
      { id: "q2", text: "Saya senang memecahkan masalah teknis atau mekanis.", options: frequencyOptions },
      { id: "q3", text: "Saya memiliki kemampuan untuk memimpin dan mengorganisir orang lain.", options: frequencyOptions },
      { id: "q4", text: "Saya sangat menikmati aktivitas kreatif seperti menulis atau menggambar.", options: frequencyOptions },
    ],
    scoring: [
      { 
        min: 0, 
        max: 4, 
        category: "Eksplorasi Karir", 
        explanation: "Minat Anda masih tersebar di berbagai bidang. Ini adalah waktu yang tepat untuk bereksperimen dan mengenal berbagai industri.", 
        insights: ["Coba berbagai pengalaman baru", "Identifikasi nilai-nilai kerja Anda", "Belum ada dominasi bidang tertentu"],
        actionableSteps: [
          "Ikuti berbagai kursus singkat atau webinar dari bidang yang berbeda",
          "Lakukan wawancara informasional dengan orang-orang di berbagai profesi",
          "Identifikasi apa yang paling Anda benci dalam pekerjaan untuk mempersempit pilihan"
        ]
      },
      { 
        min: 5, 
        max: 8, 
        category: "Spesialisasi Potensial", 
        explanation: "Anda memiliki kecenderungan kuat pada bidang tertentu. Fokus pada pengembangan skill spesifik akan sangat menguntungkan Anda.", 
        insights: ["Fokus pada pengembangan skill mulai terbentuk", "Mulai bangun jejaring di bidang terkait", "Kecocokan peran mulai terlihat"],
        actionableSteps: [
          "Cari magang atau proyek sampingan di bidang yang Anda minati",
          "Mulai membangun portofolio yang relevan dengan minat Anda",
          "Cari mentor yang sudah sukses di bidang tersebut untuk bimbingan"
        ]
      },
      { 
        min: 9, 
        max: 12, 
        category: "Panggilan Karir", 
        explanation: "Anda memiliki minat yang sangat spesifik dan kuat pada bidang tertentu. Ini adalah 'panggilan' yang bisa memberikan kepuasan kerja tinggi.", 
        insights: ["Sangat cocok untuk peran spesialis", "Potensi kepuasan kerja tinggi", "Keahlian alami yang menonjol"],
        actionableSteps: [
          "Fokuslah untuk menjadi ahli (expert) di bidang spesifik tersebut",
          "Bangun personal branding yang kuat sebagai profesional di bidang itu",
          "Jangan takut untuk mengambil risiko demi mengejar karir impian Anda"
        ]
      },
    ]
  },
  {
    id: "ocean",
    title: "Tes Kepribadian (OCEAN)",
    category: "Kepribadian",
    iconName: "Compass",
    description: "Ukur 5 dimensi besar kepribadian Anda: Openness, Conscientiousness, Extraversion, Agreeableness, dan Neuroticism.",
    duration: "⏱ 5 menit",
    popular: false,
    reflectionPrompt: "Dari 5 dimensi ini, mana yang menurut Anda paling mendefinisikan diri Anda?",
    education: "The Big Five (OCEAN) adalah model kepribadian yang paling banyak diterima secara ilmiah karena stabilitasnya sepanjang waktu dan lintas budaya.",
    actionableSteps: [
      "Pahami kekuatan Anda di setiap dimensi untuk pengembangan diri",
      "Gunakan hasil ini untuk memahami perbedaan cara orang lain bereaksi",
      "Fokus pada dimensi yang ingin Anda kembangkan secara sadar"
    ],
    questions: [
      { id: "q1", text: "Saya terbuka terhadap ide-ide baru dan pengalaman yang tidak biasa.", options: frequencyOptions },
      { id: "q2", text: "Saya selalu mengerjakan tugas dengan teliti dan tepat waktu.", options: frequencyOptions },
      { id: "q3", text: "Saya merasa bersemangat saat berada di tengah banyak orang.", options: frequencyOptions },
      { id: "q4", text: "Saya cenderung mendahulukan kepentingan orang lain daripada kepentingan sendiri.", options: frequencyOptions },
    ],
    scoring: [
      { 
        min: 0, 
        max: 4, 
        category: "Profil Seimbang", 
        explanation: "Anda memiliki profil kepribadian yang cukup fleksibel di berbagai dimensi. Anda mampu beradaptasi dengan berbagai tuntutan lingkungan.", 
        insights: ["Adaptif dalam berbagai situasi", "Keseimbangan antara logika dan emosi", "Tidak ada dimensi yang terlalu ekstrem"],
        actionableSteps: [
          "Gunakan fleksibilitas Anda untuk menjembatani perbedaan dalam tim",
          "Identifikasi situasi mana yang menuntut Anda untuk lebih menonjolkan satu dimensi",
          "Terus asah kesadaran diri tentang kapan harus 'berubah' peran"
        ]
      },
      { 
        min: 5, 
        max: 8, 
        category: "Profil Terarah", 
        explanation: "Anda memiliki kecenderungan yang jelas pada beberapa dimensi utama. Karakter Anda mulai terlihat konsisten dan terprediksi.", 
        insights: ["Kekuatan karakter terlihat jelas", "Gaya interaksi konsisten", "Preferensi lingkungan kerja mulai terbentuk"],
        actionableSteps: [
          "Fokuskan pengembangan diri pada dimensi yang menjadi kekuatan Anda",
          "Pahami bagaimana dimensi dominan Anda memengaruhi orang lain",
          "Cari lingkungan yang mendukung gaya kepribadian alami Anda"
        ]
      },
      { 
        min: 9, 
        max: 12, 
        category: "Profil Ekstrem", 
        explanation: "Anda memiliki skor yang sangat menonjol pada dimensi tertentu. Ini memberikan Anda keunggulan unik namun juga tantangan spesifik.", 
        insights: ["Karakter yang sangat khas", "Potensi kekuatan besar di bidang tertentu", "Butuh kesadaran akan 'blind spots'"],
        actionableSteps: [
          "Manfaatkan kekuatan ekstrem Anda untuk peran yang sangat spesifik",
          "Waspadai sisi negatif dari dimensi yang terlalu dominan (misal: terlalu perfeksionis atau terlalu cemas)",
          "Belajarlah untuk mengimbangi dimensi ekstrem Anda dengan skill pendukung"
        ]
      },
    ]
  },
  {
    id: "mbti-inspired",
    title: "Tes 16 Kepribadian (MBTI Inspired)",
    category: "Kepribadian",
    iconName: "LayoutGrid",
    isPaid: true,
    description: "Versi Bahasa Indonesia dari tes 16 tipe kepribadian untuk memahami cara Anda memproses informasi dan mengambil keputusan.",
    duration: "⏱ 8-10 menit",
    popular: true,
    reflectionPrompt: "Apakah Anda lebih sering mengikuti logika atau perasaan saat mengambil keputusan sulit?",
    education: "Model 16 kepribadian membantu kita memahami preferensi kognitif kita dalam empat dimensi utama: Introversion/Extraversion, Sensing/Intuition, Thinking/Feeling, dan Judging/Perceiving.",
    actionableSteps: [
      "Baca deskripsi lengkap tipe Anda untuk memahami 'blind spots' Anda",
      "Pelajari bagaimana tipe Anda biasanya berinteraksi dengan tipe lain",
      "Gunakan hasil ini sebagai alat komunikasi, bukan sebagai label permanen"
    ],
    questions: [
      { id: "q1", text: "Saya lebih suka menghabiskan waktu sendirian untuk mengisi energi.", options: frequencyOptions },
      { id: "q2", text: "Saya lebih fokus pada detail fakta daripada gambaran besar.", options: frequencyOptions },
      { id: "q3", text: "Logika lebih penting bagi saya daripada perasaan orang lain saat memutuskan sesuatu.", options: frequencyOptions },
      { id: "q4", text: "Saya lebih suka rencana yang sudah terjadwal daripada spontanitas.", options: frequencyOptions },
    ],
    scoring: [
      { 
        min: 0, 
        max: 4, 
        category: "Tipe Fleksibel", 
        explanation: "Anda memiliki preferensi yang tidak terlalu kaku antara berbagai dimensi MBTI. Anda mampu beralih mode berpikir dengan cukup lancar.", 
        insights: ["Mampu beralih peran dengan mudah", "Open-minded", "Mudah beradaptasi dengan gaya kerja orang lain"],
        actionableSteps: [
          "Gunakan kemampuan ini untuk menjadi mediator dalam tim",
          "Identifikasi situasi apa yang membuat Anda lebih cenderung ke satu kutub",
          "Jangan biarkan fleksibilitas membuat Anda sulit mengambil keputusan tegas"
        ]
      },
      { 
        min: 5, 
        max: 8, 
        category: "Tipe Konsisten", 
        explanation: "Anda menunjukkan preferensi yang cukup jelas pada tipe tertentu. Anda memiliki gaya kognitif yang stabil dan terarah.", 
        insights: ["Gaya kerja yang terprediksi", "Nilai-nilai yang stabil", "Cara memproses informasi yang konsisten"],
        actionableSteps: [
          "Pelajari kekuatan dan kelemahan spesifik dari tipe MBTI Anda",
          "Cari peran yang memaksimalkan preferensi kognitif alami Anda",
          "Latih diri untuk memahami perspektif dari tipe yang berlawanan dengan Anda"
        ]
      },
      { 
        min: 9, 
        max: 12, 
        category: "Tipe Dominan", 
        explanation: "Anda memiliki profil kepribadian yang sangat kuat dan khas. Cara Anda melihat dunia sangat dipengaruhi oleh fungsi dominan tipe Anda.", 
        insights: ["Kekuatan kognitif yang sangat terfokus", "Gaya kepemimpinan yang unik", "Pendirian yang sangat teguh"],
        actionableSteps: [
          "Waspadai 'blind spots' yang muncul akibat preferensi yang terlalu kuat",
          "Belajarlah untuk menghargai cara orang lain memproses informasi yang berbeda dari Anda",
          "Gunakan kekuatan dominan Anda untuk menyelesaikan masalah kompleks di bidang Anda"
        ]
      },
    ]
  },
  {
    id: "love-language",
    title: "Tes Love Language (5 Bahasa Cinta)",
    category: "Hubungan & Asmara",
    iconName: "HeartHandshake",
    description: "Cari tahu bagaimana Anda memberi dan menerima cinta untuk hubungan yang lebih harmonis.",
    duration: "⏱ 3 menit",
    popular: true,
    reflectionPrompt: "Tindakan apa dari orang lain yang membuat Anda merasa paling dicintai dan dihargai?",
    education: "Konsep 5 Bahasa Cinta oleh Gary Chapman menjelaskan bahwa setiap orang memiliki cara berbeda dalam mengekspresikan cinta: Words of Affirmation, Acts of Service, Receiving Gifts, Quality Time, dan Physical Touch.",
    actionableSteps: [
      "Komunikasikan bahasa cinta utama Anda kepada pasangan atau orang terdekat",
      "Coba pelajari bahasa cinta pasangan Anda dan praktikkan secara rutin",
      "Pahami bahwa perbedaan bahasa cinta bukan berarti kurangnya rasa sayang"
    ],
    questions: [
      { id: "q1", text: "Pujian dan kata-kata penyemangat sangat berarti bagi saya.", options: frequencyOptions },
      { id: "q2", text: "Saya merasa dicintai saat seseorang membantu pekerjaan saya.", options: frequencyOptions },
      { id: "q3", text: "Menghabiskan waktu berkualitas tanpa gangguan adalah prioritas saya.", options: frequencyOptions },
      { id: "q4", text: "Sentuhan fisik seperti pelukan membuat saya merasa aman dan dicintai.", options: frequencyOptions },
    ],
    scoring: [
      { 
        min: 0, 
        max: 4, 
        category: "Multilingual", 
        explanation: "Anda menghargai berbagai bentuk ekspresi cinta secara seimbang. Anda mudah merasa dicintai melalui banyak cara.", 
        insights: ["Mudah merasa dicintai", "Fleksibel dalam memberi kasih sayang", "Apresiatif terhadap berbagai tindakan pasangan"],
        actionableSteps: [
          "Teruslah memberikan kasih sayang dalam berbagai bentuk kepada pasangan",
          "Komunikasikan bahwa hal-hal kecil dari berbagai kategori sangat berarti bagi Anda",
          "Gunakan fleksibilitas ini untuk menyesuaikan diri dengan bahasa cinta pasangan"
        ]
      },
      { 
        min: 5, 
        max: 8, 
        category: "Bahasa Dominan", 
        explanation: "Anda memiliki satu atau dua bahasa cinta yang sangat menonjol. Ini adalah kunci utama untuk mengisi 'tangki cinta' Anda.", 
        insights: ["Kebutuhan emosional yang spesifik", "Peka terhadap tindakan tertentu", "Sering merasa terabaikan jika bahasa ini tidak terpenuhi"],
        actionableSteps: [
          "Beritahu pasangan secara spesifik tindakan apa yang paling membuat Anda merasa dicintai",
          "Berikan contoh nyata dari bahasa cinta dominan Anda",
          "Ingatkan pasangan dengan lembut jika Anda merasa 'tangki cinta' mulai kosong"
        ]
      },
      { 
        min: 9, 
        max: 12, 
        category: "Bahasa Utama", 
        explanation: "Anda memiliki satu cara utama yang sangat krusial untuk merasa dicintai. Tanpa ini, Anda mungkin merasa sulit terhubung secara emosional.", 
        insights: ["Sangat sensitif jika kebutuhan ini tidak terpenuhi", "Kunci utama kebahagiaan hubungan", "Cara Anda paling alami dalam memberi cinta"],
        actionableSteps: [
          "Pastikan pasangan memahami betapa krusialnya bahasa cinta ini bagi Anda",
          "Diskusikan bagaimana bahasa cinta ini bisa diintegrasikan dalam rutinitas harian",
          "Belajarlah untuk juga menghargai bahasa cinta pasangan yang mungkin berbeda"
        ]
      },
    ]
  },
  {
    id: "minat-bakat-kuliah",
    title: "Minat Bakat: Jurusan Kuliah",
    category: "Karir & Pendidikan",
    iconName: "GraduationCap",
    description: "Bantu pilih jurusan kuliah yang sesuai dengan minat akademik dan potensi karir masa depan Anda.",
    duration: "⏱ 5 menit",
    popular: false,
    reflectionPrompt: "Mata pelajaran apa yang paling Anda nikmati saat sekolah?",
    education: "Memilih jurusan kuliah adalah investasi masa depan. Tes ini membantu memetakan minat Anda ke rumpun ilmu tertentu (Saintek, Soshum, Seni, dll).",
    actionableSteps: [
      "Konsultasikan hasil ini dengan guru BK atau orang tua",
      "Cari tahu kurikulum dan prospek kerja dari jurusan yang disarankan",
      "Ikuti trial class atau webinar terkait jurusan tersebut"
    ],
    questions: [
      { id: "q1", text: "Saya senang melakukan eksperimen sains atau memecahkan soal matematika.", options: frequencyOptions },
      { id: "q2", text: "Saya tertarik mempelajari perilaku manusia dan dinamika sosial.", options: frequencyOptions },
      { id: "q3", text: "Saya lebih suka bekerja dengan bahasa, sastra, atau komunikasi.", options: frequencyOptions },
      { id: "q4", text: "Saya memiliki minat besar dalam dunia bisnis dan manajemen.", options: frequencyOptions },
    ],
    scoring: [
      { 
        min: 0, 
        max: 4, 
        category: "Eksplorasi Akademik", 
        explanation: "Minat akademik Anda masih cukup luas. Ini adalah kesempatan untuk mengeksplorasi berbagai bidang ilmu sebelum memutuskan.", 
        insights: ["Pertimbangkan jurusan interdisipliner", "Cari tahu lebih banyak bidang ilmu", "Belum ada dominasi minat akademik"],
        actionableSteps: [
          "Ikuti tes minat bakat yang lebih mendalam atau konsultasi dengan konselor pendidikan",
          "Baca silabus atau kurikulum dari jurusan-jurusan yang membuat Anda penasaran",
          "Bicara dengan mahasiswa dari berbagai jurusan untuk mendapatkan gambaran nyata"
        ]
      },
      { 
        min: 5, 
        max: 8, 
        category: "Kecenderungan Rumpun", 
        explanation: "Anda memiliki minat yang mulai mengerucut pada rumpun ilmu tertentu. Fokus pada persiapan di bidang tersebut akan sangat membantu.", 
        insights: ["Fokus pada persiapan ujian masuk mulai terarah", "Perdalam materi terkait rumpun ilmu tersebut", "Kecocokan dengan gaya belajar tertentu"],
        actionableSteps: [
          "Mulailah mengambil bimbingan belajar atau kursus tambahan di rumpun ilmu tersebut",
          "Cari tahu universitas mana yang memiliki reputasi terbaik di bidang itu",
          "Ikuti kompetisi atau proyek yang relevan dengan rumpun ilmu pilihan Anda"
        ]
      },
      { 
        min: 9, 
        max: 12, 
        category: "Minat Spesifik", 
        explanation: "Anda memiliki passion yang sangat kuat pada bidang ilmu tertentu. Jurusan ini kemungkinan besar akan membuat Anda sangat antusias saat kuliah.", 
        insights: ["Sangat direkomendasikan untuk jurusan terkait", "Potensi prestasi akademik tinggi", "Motivasi belajar yang intrinsik"],
        actionableSteps: [
          "Jangan ragu untuk memilih jurusan tersebut sebagai pilihan utama",
          "Cari tahu peluang riset atau beasiswa di bidang spesifik tersebut",
          "Mulailah membangun jejaring dengan profesional atau akademisi di bidang itu"
        ]
      },
    ]
  },
  {
    id: "introvert-test",
    title: "Tes Introvert",
    category: "Kepribadian",
    iconName: "Moon",
    description: "Ukur seberapa besar kecenderungan introvert dalam diri Anda dan bagaimana Anda mengisi energi mental.",
    duration: "⏱ 3 menit",
    popular: false,
    reflectionPrompt: "Setelah seharian bersosialisasi, apa yang paling Anda butuhkan untuk merasa segar kembali?",
    education: "Introvert bukan berarti pemalu. Ini adalah tentang dari mana Anda mendapatkan energi: dari dalam diri (solitude) atau dari luar (social interaction).",
    actionableSteps: [
      "Hargai kebutuhan Anda akan waktu sendiri (solitude) tanpa merasa bersalah",
      "Cari lingkungan kerja yang tenang jika memungkinkan",
      "Gunakan kekuatan observasi dan pemikiran mendalam Anda"
    ],
    questions: [
      { id: "q1", text: "Saya merasa lelah setelah berada di keramaian dalam waktu lama.", options: frequencyOptions },
      { id: "q2", text: "Saya lebih suka percakapan mendalam satu-lawan-satu daripada obrolan ringan kelompok.", options: frequencyOptions },
      { id: "q3", text: "Saya sering berpikir matang-matang sebelum berbicara.", options: frequencyOptions },
      { id: "q4", text: "Menghabiskan waktu sendirian adalah cara terbaik saya mengisi energi.", options: frequencyOptions },
    ],
    scoring: [
      { 
        min: 0, 
        max: 4, 
        category: "Ambivert", 
        explanation: "Anda memiliki keseimbangan antara sifat introvert dan ekstrovert. Anda mampu menyesuaikan diri dengan berbagai tuntutan sosial.", 
        insights: ["Fleksibel dalam situasi sosial", "Bisa menikmati keramaian maupun kesendirian", "Adaptif dalam mengisi energi"],
        actionableSteps: [
          "Gunakan fleksibilitas Anda untuk bekerja dalam tim yang beragam",
          "Kenali kapan Anda butuh waktu sendiri dan kapan butuh interaksi sosial",
          "Jangan paksakan diri jika salah satu sisi sedang mendominasi"
        ]
      },
      { 
        min: 5, 
        max: 8, 
        category: "Introvert Moderat", 
        explanation: "Anda cenderung lebih nyaman dalam lingkungan yang tenang dan terkendali. Anda menghargai kedalaman daripada keluasan interaksi.", 
        insights: ["Butuh waktu sendiri secara teratur", "Pendengar yang baik", "Lebih suka kelompok kecil"],
        actionableSteps: [
          "Jadwalkan waktu 'recharge' setelah aktivitas sosial yang padat",
          "Gunakan kekuatan mendengarkan Anda dalam diskusi kelompok",
          "Cari lingkungan kerja yang meminimalkan gangguan suara"
        ]
      },
      { 
        min: 9, 
        max: 12, 
        category: "Introvert Kuat", 
        explanation: "Dunia internal Anda sangat kaya dan Anda sangat menghargai kesendirian. Anda mendapatkan energi maksimal dari refleksi diri.", 
        insights: ["Sangat mandiri", "Pemikir mendalam", "Butuh banyak waktu pemulihan sosial", "Fokus internal yang kuat"],
        actionableSteps: [
          "Hargai kebutuhan Anda akan kesendirian sebagai kekuatan, bukan kelemahan",
          "Komunikasikan kebutuhan Anda akan waktu tenang kepada orang terdekat",
          "Cari karir yang memungkinkan Anda bekerja secara mandiri atau dalam fokus tinggi"
        ]
      },
    ]
  },
  {
    id: "disc-test",
    title: "Tes Kepribadian DISC",
    category: "Kepribadian",
    iconName: "PieChart",
    isPaid: true,
    description: "Pahami gaya perilaku Anda dalam lingkungan kerja dan sosial: Dominance, Influence, Steadiness, dan Compliance.",
    duration: "⏱ 5 menit",
    popular: false,
    reflectionPrompt: "Saat bekerja dalam tim, peran apa yang paling membuat Anda merasa nyaman?",
    education: "Model DISC membantu mengidentifikasi gaya komunikasi dan kerja seseorang, yang sangat berguna untuk membangun tim yang efektif dan harmonis.",
    actionableSteps: [
      "Pahami gaya komunikasi rekan kerja Anda untuk kolaborasi yang lebih baik",
      "Sesuaikan gaya kepemimpinan Anda berdasarkan profil DISC tim Anda",
      "Gunakan hasil ini untuk menempatkan diri pada peran yang paling sesuai"
    ],
    questions: [
      { id: "q1", text: "Saya fokus pada hasil dan suka mengambil tantangan baru.", options: frequencyOptions },
      { id: "q2", text: "Saya senang memotivasi orang lain dan menjadi pusat perhatian.", options: frequencyOptions },
      { id: "q3", text: "Saya menghargai stabilitas dan suka membantu orang lain secara konsisten.", options: frequencyOptions },
      { id: "q4", text: "Saya sangat teliti dengan detail dan mengikuti aturan dengan ketat.", options: frequencyOptions },
    ],
    scoring: [
      { 
        min: 0, 
        max: 4, 
        category: "Profil Adaptif", 
        explanation: "Gaya perilaku Anda cukup fleksibel tergantung situasi. Anda mampu menyesuaikan diri dengan berbagai tuntutan lingkungan kerja.", 
        insights: ["Mampu menyesuaikan diri", "Bisa mengisi berbagai peran", "Fleksibel dalam komunikasi"],
        actionableSteps: [
          "Identifikasi gaya dominan rekan kerja Anda untuk menyesuaikan pendekatan",
          "Gunakan fleksibilitas Anda untuk menyeimbangkan dinamika tim",
          "Waspadai jika adaptasi berlebihan membuat Anda kehilangan gaya asli"
        ]
      },
      { 
        min: 5, 
        max: 8, 
        category: "Profil Jelas", 
        explanation: "Anda memiliki gaya perilaku yang cukup konsisten. Orang lain dapat dengan mudah mengenali gaya kerja dan komunikasi Anda.", 
        insights: ["Kekuatan kerja mulai terlihat", "Gaya komunikasi stabil", "Preferensi peran yang jelas"],
        actionableSteps: [
          "Pelajari kekuatan spesifik dari profil DISC dominan Anda",
          "Cari tahu bagaimana gaya Anda biasanya dipersepsikan oleh profil lain",
          "Latih fleksibilitas untuk situasi yang menuntut gaya di luar zona nyaman"
        ]
      },
      { 
        min: 9, 
        max: 12, 
        category: "Profil Dominan", 
        explanation: "Anda memiliki gaya perilaku yang sangat kuat pada salah satu kuadran DISC. Ini memberikan kejelasan peran yang sangat tinggi.", 
        insights: ["Sangat efektif dalam peran tertentu", "Butuh kesadaran akan gaya komunikasi orang lain", "Kekuatan yang sangat menonjol"],
        actionableSteps: [
          "Gunakan kekuatan dominan Anda untuk memimpin di bidang yang sesuai",
          "Waspadai 'overuse' dari kekuatan Anda (misal: terlalu dominan atau terlalu patuh)",
          "Belajarlah untuk berkomunikasi dengan bahasa yang dimengerti profil DISC lain"
        ]
      },
    ]
  },
  {
    id: "kesiapan-menikah",
    title: "Tes Kesiapan Menikah",
    category: "Hubungan & Asmara",
    iconName: "Gem",
    description: "Evaluasi kesiapan mental, finansial, dan emosional Anda sebelum melangkah ke jenjang pernikahan.",
    duration: "⏱ 5 menit",
    popular: false,
    reflectionPrompt: "Apa alasan utama Anda ingin menikah dalam waktu dekat?",
    education: "Pernikahan bukan hanya tentang cinta, tapi juga tentang komitmen, tanggung jawab, dan kemampuan menyelesaikan konflik bersama.",
    actionableSteps: [
      "Diskusikan nilai-nilai dasar (keuangan, anak, karir) dengan pasangan",
      "Ikuti bimbingan pra-nikah jika diperlukan",
      "Fokus pada pengembangan diri dan kemandirian emosional"
    ],
    questions: [
      { id: "q1", text: "Saya merasa sudah cukup mengenal diri sendiri dan apa yang saya inginkan dalam hidup.", options: frequencyOptions },
      { id: "q2", text: "Saya dan pasangan mampu membicarakan masalah sulit tanpa saling menyalahkan.", options: frequencyOptions },
      { id: "q3", text: "Saya merasa stabil secara emosional dan finansial untuk membangun rumah tangga.", options: frequencyOptions },
      { id: "q4", text: "Saya siap mengorbankan kepentingan pribadi demi kepentingan bersama.", options: frequencyOptions },
    ],
    scoring: [
      { 
        min: 0, 
        max: 4, 
        category: "Tahap Persiapan", 
        explanation: "Anda masih perlu banyak berdiskusi dan mempersiapkan diri lebih matang sebelum melangkah ke jenjang pernikahan.", 
        insights: ["Butuh komunikasi lebih dalam", "Fokus pada kemandirian", "Visi masa depan perlu disinkronkan"],
        actionableSteps: [
          "Mulailah diskusi terbuka tentang nilai-nilai dasar (uang, anak, peran)",
          "Fokus pada penyelesaian masalah pribadi sebelum menyatukan hidup",
          "Baca buku atau ikuti seminar tentang dinamika hubungan jangka panjang"
        ]
      },
      { 
        min: 5, 
        max: 8, 
        category: "Cukup Siap", 
        explanation: "Anda memiliki fondasi yang cukup baik, namun masih ada beberapa aspek yang perlu diperkuat untuk ketahanan jangka panjang.", 
        insights: ["Komunikasi sudah berjalan", "Perlu penyamaan visi", "Kematangan emosional mulai terbentuk"],
        actionableSteps: [
          "Identifikasi area mana yang paling sering memicu konflik dan cari solusinya",
          "Diskusikan rencana finansial dan karir pasca menikah secara mendetail",
          "Lakukan aktivitas yang menguji kerjasama tim Anda dan pasangan"
        ]
      },
      { 
        min: 9, 
        max: 12, 
        category: "Sangat Siap", 
        explanation: "Anda menunjukkan kematangan emosional dan kesiapan yang kuat untuk berkomitmen dalam ikatan pernikahan.", 
        insights: ["Visi misi sejalan", "Kematangan emosional tinggi", "Siap menghadapi tantangan bersama", "Komunikasi yang sangat sehat"],
        actionableSteps: [
          "Pertahankan kualitas komunikasi yang sudah baik ini",
          "Mulai rencanakan detail teknis masa depan dengan tetap fleksibel",
          "Jadilah support system yang kuat bagi satu sama lain selama proses transisi"
        ]
      },
    ]
  },
  {
    id: "ekstrovert-test",
    title: "Tes Ekstrovert",
    category: "Kepribadian",
    iconName: "Sun",
    description: "Ukur seberapa besar kecenderungan ekstrovert dalam diri Anda dan bagaimana Anda mendapatkan energi dari interaksi sosial.",
    duration: "⏱ 3 menit",
    popular: false,
    reflectionPrompt: "Bagaimana perasaan Anda setelah menghabiskan waktu di pesta yang ramai?",
    education: "Ekstrovert cenderung mendapatkan energi dari dunia luar, interaksi sosial, dan aktivitas yang dinamis. Mereka seringkali lebih ekspresif secara verbal.",
    actionableSteps: [
      "Manfaatkan kemampuan sosial Anda untuk membangun jaringan yang luas",
      "Cari lingkungan kerja yang kolaboratif dan dinamis",
      "Ingatlah untuk tetap meluangkan waktu untuk refleksi diri secara mandiri"
    ],
    questions: [
      { id: "q1", text: "Saya merasa bersemangat saat berada di tengah banyak orang.", options: frequencyOptions },
      { id: "q2", text: "Saya lebih suka berbicara daripada mendengarkan dalam sebuah diskusi.", options: frequencyOptions },
      { id: "q3", text: "Saya merasa bosan atau kesepian jika terlalu lama sendirian.", options: frequencyOptions },
      { id: "q4", text: "Saya mudah memulai percakapan dengan orang yang baru dikenal.", options: frequencyOptions },
    ],
    scoring: [
      { 
        min: 0, 
        max: 4, 
        category: "Ambivert", 
        explanation: "Anda memiliki keseimbangan yang baik antara sifat ekstrovert dan introvert. Anda fleksibel dalam interaksi sosial.", 
        insights: ["Bisa menyesuaikan diri di berbagai situasi", "Nyaman dalam keramaian maupun kesendirian", "Adaptif dalam mengisi energi"],
        actionableSteps: [
          "Gunakan kemampuan adaptasi Anda untuk masuk ke berbagai lingkaran sosial",
          "Kenali kapan Anda butuh stimulasi luar dan kapan butuh ketenangan",
          "Jangan merasa tertekan untuk selalu tampil ekstrovert atau introvert"
        ]
      },
      { 
        min: 5, 
        max: 8, 
        category: "Ekstrovert Moderat", 
        explanation: "Anda cukup menikmati interaksi sosial dan aktif dalam lingkungan luar. Anda senang berkolaborasi dengan orang lain.", 
        insights: ["Suka berkolaborasi", "Energik dalam tim", "Mudah bergaul"],
        actionableSteps: [
          "Ambil peran yang melibatkan banyak koordinasi atau kerja tim",
          "Manfaatkan energi sosial Anda untuk memotivasi orang di sekitar",
          "Pastikan Anda tetap memiliki waktu untuk refleksi diri agar tidak 'burnout' sosial"
        ]
      },
      { 
        min: 9, 
        max: 12, 
        category: "Ekstrovert Kuat", 
        explanation: "Anda adalah 'social butterfly' yang mendapatkan energi maksimal dari interaksi sosial. Anda sangat ekspresif dan dinamis.", 
        insights: ["Sangat ekspresif", "Suka tantangan sosial", "Butuh stimulasi eksternal tinggi", "Pemimpin alami dalam situasi sosial"],
        actionableSteps: [
          "Cari karir atau hobi yang memungkinkan Anda bertemu banyak orang baru",
          "Gunakan kemampuan komunikasi Anda untuk menginspirasi dan memimpin",
          "Belajarlah untuk memberikan ruang bagi orang yang lebih introvert dalam diskusi"
        ]
      },
    ]
  },
  {
    id: "minat-bakat-umum",
    title: "Tes Minat Bakat Umum",
    category: "Karir & Pendidikan",
    iconName: "Sparkles",
    description: "Gambaran umum tentang potensi diri Anda di berbagai bidang kehidupan.",
    duration: "⏱ 5 menit",
    popular: false,
    reflectionPrompt: "Aktivitas apa yang membuat Anda lupa waktu saat melakukannya?",
    education: "Tes minat bakat umum memberikan gambaran luas tentang kecenderungan alami Anda, membantu Anda mengenali potensi yang mungkin belum tergali.",
    actionableSteps: [
      "Eksplorasi hobi baru yang sesuai dengan hasil tes Anda",
      "Gunakan kekuatan alami Anda untuk membantu orang lain",
      "Teruslah belajar dan berkembang di bidang yang Anda minati"
    ],
    questions: [
      { id: "q1", text: "Saya senang mempelajari hal-hal baru yang menantang.", options: frequencyOptions },
      { id: "q2", text: "Saya memiliki kemampuan untuk melihat pola atau hubungan antar hal.", options: frequencyOptions },
      { id: "q3", text: "Saya senang membantu orang lain mencapai tujuan mereka.", options: frequencyOptions },
      { id: "q4", text: "Saya memiliki ketertarikan pada seni dan kreativitas.", options: frequencyOptions },
    ],
    scoring: [
      { 
        min: 0, 
        max: 4, 
        category: "Potensi Tersembunyi", 
        explanation: "Anda masih dalam tahap awal mengenali potensi diri. Banyak bakat yang mungkin belum Anda sadari sepenuhnya.", 
        insights: ["Teruslah bereksperimen", "Jangan takut mencoba hal baru", "Banyak ruang untuk pertumbuhan"],
        actionableSteps: [
          "Cobalah satu hobi baru setiap bulan untuk melihat apa yang membuat Anda antusias",
          "Tanyakan pada teman dekat apa yang menurut mereka menjadi kelebihan Anda",
          "Jangan batasi diri pada apa yang sudah Anda ketahui sekarang"
        ]
      },
      { 
        min: 5, 
        max: 8, 
        category: "Potensi Terarah", 
        explanation: "Anda memiliki beberapa bidang keunggulan yang mulai terlihat jelas. Fokus pada hal ini akan membuahkan hasil besar.", 
        insights: ["Fokus pada pengembangan diri mulai terarah", "Asah bakat alami Anda", "Kecenderungan minat mulai stabil"],
        actionableSteps: [
          "Pilih satu atau dua minat utama dan mulailah mendalaminya secara serius",
          "Cari kursus atau pelatihan yang bisa mengasah bakat alami tersebut",
          "Mulai terapkan bakat Anda dalam proyek nyata atau pekerjaan"
        ]
      },
      { 
        min: 9, 
        max: 12, 
        category: "Potensi Unggul", 
        explanation: "Anda memiliki bakat yang sangat kuat di bidang tertentu. Ini adalah aset berharga yang bisa menjadi keunggulan kompetitif Anda.", 
        insights: ["Sangat potensial untuk sukses di bidang tersebut", "Teruslah mengasah keahlian Anda", "Keahlian yang menonjol dibanding rata-rata"],
        actionableSteps: [
          "Berikan waktu dan energi maksimal untuk menjadi yang terbaik di bidang ini",
          "Cari peluang untuk menunjukkan bakat Anda kepada audiens yang lebih luas",
          "Gunakan keunggulan ini untuk memberikan dampak positif bagi orang lain"
        ]
      },
    ]
  },
  {
    id: "kesehatan-pernikahan",
    title: "Tes Kesehatan Hubungan Pernikahan",
    category: "Hubungan & Asmara",
    iconName: "HeartPulse",
    description: "Ukur tingkat keharmonisan dan kesehatan komunikasi dalam kehidupan pernikahan Anda.",
    duration: "⏱ 5 menit",
    popular: false,
    reflectionPrompt: "Kapan terakhir kali Anda dan pasangan berbicara mendalam tanpa gangguan gadget?",
    education: "Kesehatan pernikahan bergantung pada komunikasi yang terbuka, rasa saling percaya, dan kemampuan untuk bertumbuh bersama meskipun ada perbedaan.",
    actionableSteps: [
      "Jadwalkan 'date night' rutin tanpa gangguan pekerjaan atau anak",
      "Praktikkan apresiasi harian terhadap hal-hal kecil yang dilakukan pasangan",
      "Cari bantuan konselor pernikahan jika konflik terasa buntu"
    ],
    questions: [
      { id: "q1", text: "Saya merasa pasangan saya adalah sahabat terbaik saya.", options: frequencyOptions },
      { id: "q2", text: "Kami mampu menyelesaikan konflik dengan cara yang menghormati satu sama lain.", options: frequencyOptions },
      { id: "q3", text: "Saya merasa didukung oleh pasangan dalam mengejar impian pribadi saya.", options: frequencyOptions },
      { id: "q4", text: "Kami memiliki waktu berkualitas yang cukup untuk dihabiskan bersama.", options: frequencyOptions },
    ],
    scoring: [
      { 
        min: 0, 
        max: 4, 
        category: "Butuh Perhatian", 
        explanation: "Hubungan Anda sedang menghadapi tantangan yang cukup serius. Rekoneksi emosional menjadi prioritas utama saat ini.", 
        insights: ["Komunikasi mulai terhambat", "Butuh upaya ekstra untuk rekoneksi", "Rasa saling percaya perlu dipulihkan"],
        actionableSteps: [
          "Hentikan saling menyalahkan dan mulailah mendengarkan tanpa interupsi",
          "Cari waktu khusus untuk berbicara dari hati ke hati tanpa gangguan",
          "Jangan ragu untuk mencari bantuan profesional (konselor pernikahan) sejak dini"
        ]
      },
      { 
        min: 5, 
        max: 8, 
        category: "Harmonis", 
        explanation: "Hubungan Anda berjalan dengan baik, namun tetap perlu dipelihara agar tidak terjebak dalam rutinitas yang membosankan.", 
        insights: ["Komunikasi berjalan lancar", "Saling mendukung", "Fondasi hubungan yang stabil"],
        actionableSteps: [
          "Teruslah memberikan apresiasi kecil setiap hari kepada pasangan",
          "Coba aktivitas baru bersama untuk menjaga percikan dalam hubungan",
          "Pastikan tetap ada waktu berkualitas di tengah kesibukan harian"
        ]
      },
      { 
        min: 9, 
        max: 12, 
        category: "Sangat Sehat", 
        explanation: "Anda memiliki hubungan yang sangat kuat, penuh rasa syukur, dan saling menguatkan. Ini adalah contoh hubungan yang resilien.", 
        insights: ["Koneksi emosional mendalam", "Tim yang solid", "Ketahanan hubungan tinggi", "Saling menghargai pertumbuhan pribadi"],
        actionableSteps: [
          "Bagikan rahasia keharmonisan Anda kepada pasangan lain yang membutuhkan inspirasi",
          "Teruslah bertumbuh bersama dan dukung impian masing-masing",
          "Jangan pernah berhenti untuk saling belajar tentang satu sama lain"
        ]
      },
    ]
  },
  {
    id: "analisis-psikodinamika-tebbetts",
    title: "Analisis Akar Masalah (7 Psikodinamika Tebbetts)",
    category: "Kesehatan Mental",
    iconName: "Brain",
    description: "Gali kemungkinan akar masalah Anda berdasarkan 7 Psikodinamika Simtom Charles Tebbetts dalam hipnoterapi.",
    duration: "⏱ 20 menit",
    popular: true,
    reflectionPrompt: "Apa simtom yang paling mengganggu Anda saat ini dan kapan pertama kali Anda merasakannya?",
    education: "Charles Tebbetts mengidentifikasi 7 psikodinamika simtom yang sering menjadi akar masalah emosional: Primary Gain, Secondary Gain, Identification, Symbolism, Guilt, Regression, dan Fear.",
    actionableSteps: [
      "Identifikasi simtom yang paling dominan",
      "Renungkan apakah simtom tersebut memberikan keuntungan tersembunyi bagi Anda",
      "Cari tahu apakah simtom tersebut terkait dengan pengalaman masa lalu atau tokoh penting dalam hidup Anda",
      "Diskusikan temuan Anda dengan hipnoterapis profesional"
    ],
    questions: [
      // Primary Gain
      { id: "q1", text: "Apakah keluhan ini membuat Anda merasa lebih aman dari rasa minder?", options: frequencyOptions },
      { id: "q2", text: "Apakah keluhan ini membantu Anda menghindari pikiran yang menyakitkan?", options: frequencyOptions },
      { id: "q3", text: "Apakah keluhan ini membuat Anda merasa punya kendali, padahal sebenarnya itu merugikan?", options: frequencyOptions },
      // Secondary Gain
      { id: "q4", text: "Apakah keluhan ini membuat orang lain lebih perhatian pada Anda?", options: frequencyOptions },
      { id: "q5", text: "Apakah keluhan ini jadi alasan Anda untuk menghindari tugas atau tanggung jawab?", options: frequencyOptions },
      { id: "q6", text: "Apakah keluhan ini membuat Anda mendapatkan perlakuan khusus yang biasanya tidak didapat?", options: frequencyOptions },
      // Identification
      { id: "q7", text: "Apakah keluhan ini mirip dengan masalah orang tua atau orang penting dalam hidup Anda?", options: frequencyOptions },
      { id: "q8", text: "Apakah Anda merasa sedang menjalani masalah yang sebenarnya milik orang lain (seperti orang tua)?", options: frequencyOptions },
      { id: "q9", text: "Apakah Anda sering meniru cara orang lain menghadapi masalah, padahal itu tidak membantu?", options: frequencyOptions },
      // Symbolism
      { id: "q10", text: "Apakah keluhan fisik Anda terasa seperti beban emosional yang sedang Anda tanggung?", options: frequencyOptions },
      { id: "q11", text: "Apakah bagian tubuh yang sakit terasa berkaitan dengan hal yang sedang Anda hindari?", options: frequencyOptions },
      { id: "q12", text: "Jika keluhan Anda bisa bicara, apa pesan yang ingin disampaikannya tentang perasaan Anda?", options: frequencyOptions },
      // Guilt
      { id: "q13", text: "Apakah Anda merasa layak menderita karena kesalahan Anda di masa lalu?", options: frequencyOptions },
      { id: "q14", text: "Apakah keluhan ini muncul sebagai cara Anda menghukum diri sendiri karena merasa tidak cukup baik?", options: frequencyOptions },
      { id: "q15", text: "Apakah Anda merasa bersalah saat bahagia, sehingga keluhan ini muncul untuk merusak kebahagiaan itu?", options: frequencyOptions },
      // Regression
      { id: "q16", text: "Apakah keluhan ini membuat Anda merasa tidak berdaya dan butuh perlindungan seperti saat masih kecil?", options: frequencyOptions },
      { id: "q17", text: "Apakah keluhan ini muncul saat Anda harus menghadapi tanggung jawab besar?", options: frequencyOptions },
      { id: "q18", text: "Apakah Anda ingin kembali ke cara-cara lama yang lebih aman, padahal Anda sudah dewasa sekarang?", options: frequencyOptions },
      // Fear
      { id: "q19", text: "Apakah keluhan ini muncul untuk mencegah Anda melakukan sesuatu yang Anda takuti di masa depan?", options: frequencyOptions },
      { id: "q20", text: "Apakah keluhan ini melindungi Anda dari kemungkinan gagal atau ditolak?", options: frequencyOptions },
      { id: "q21", text: "Apakah keluhan ini membuat Anda tetap di zona nyaman dan menghindari tantangan baru?", options: frequencyOptions },
    ],
    scoring: [
      {
        min: 0,
        max: 21,
        category: "Perlu Eksplorasi Lebih Lanjut",
        explanation: "Simtom Anda mungkin memiliki akar yang lebih kompleks yang memerlukan eksplorasi mendalam.",
        insights: ["Akar masalah mungkin tersembunyi", "Perlu refleksi lebih lanjut", "Hipnoterapi dapat membantu menggali lebih dalam"],
        actionableSteps: ["Lakukan sesi konsultasi dengan hipnoterapis", "Tulis jurnal emosi setiap hari", "Identifikasi pola pemicu simtom"]
      },
      {
        min: 22,
        max: 42,
        category: "Indikasi Psikodinamika Kuat",
        explanation: "Terdapat indikasi kuat bahwa simtom Anda terkait dengan salah satu dari 7 psikodinamika Tebbetts.",
        insights: ["Pola emosional mulai terlihat", "Simtom memiliki fungsi tertentu", "Akar masalah mungkin terkait masa lalu"],
        actionableSteps: ["Fokus pada salah satu dinamika yang paling relevan", "Gunakan teknik relaksasi untuk mengurangi intensitas simtom", "Cari dukungan profesional untuk memproses dinamika tersebut"]
      },
      {
        min: 43,
        max: 63,
        category: "Dinamika Kompleks",
        explanation: "Simtom Anda kemungkinan besar berakar dari dinamika psikologis yang kompleks dan saling berkaitan.",
        insights: ["Dinamika yang saling tumpang tindih", "Memerlukan pendekatan komprehensif", "Penting untuk memproses akar masalah secara sistematis"],
        actionableSteps: ["Segera jadwalkan sesi hipnoterapi mendalam", "Lakukan teknik pelepasan emosi secara teratur", "Berikan diri Anda waktu dan ruang untuk penyembuhan"]
      }
    ]
  },
  {
    id: "ikp-12",
    title: "Instrumen Kesiapan Pernikahan (IKP-12)",
    category: "Hubungan & Asmara",
    iconName: "HeartHandshake",
    description: "Berdasarkan Adaptasi Klinis Marriage Readiness Questionnaire (MRQ). Ukur kesiapan mental dan emosional Anda sebelum melangkah ke jenjang pernikahan.",
    duration: "⏱ 8 menit",
    popular: true,
    showWeaknesses: true,
    reflectionPrompt: "Apa ketakutan terbesar Anda jika membayangkan kehidupan setelah menikah nanti?",
    education: "Kesiapan pernikahan bukan hanya soal usia atau materi, tapi tentang kemandirian emosional, kemampuan berkomunikasi, dan kesiapan untuk berkompromi demi pertumbuhan bersama.",
    actionableSteps: [
      "Diskusikan hasil tes ini dengan pasangan Anda secara terbuka",
      "Fokus pada perbaikan diri di area yang skornya masih rendah",
      "Pertimbangkan mengikuti kelas pranikah atau konseling untuk persiapan lebih matang"
    ],
    questions: [
      { id: "q1", text: "Saya tetap merasa utuh dan punya kegiatan yang menyenangkan meskipun sedang tidak memiliki pasangan.", options: ikpOptions },
      { id: "q2", text: "Saya merasa masalah di masa lalu (dengan keluarga atau mantan) tidak lagi mengganggu emosi saya secara berlebihan saat ini.", options: ikpOptions },
      { id: "q3", text: "Saat merasa stres atau sedih, saya tahu cara menenangkan diri sendiri tanpa harus selalu bergantung pada orang lain.", options: ikpOptions },
      { id: "q4", text: "Saya sudah paham betul apa kelebihan, kekurangan, dan prinsip hidup yang tidak bisa saya kompromikan.", options: ikpOptions },
      { id: "q5", text: "Jika sedang marah, saya lebih memilih mengambil jeda untuk tenang daripada langsung meledak atau mendiamkan orang berhari-hari.", options: ikpOptions },
      { id: "q6", text: "Saya tidak mudah merasa tersinggung atau 'diserang' saat orang terdekat memberikan masukan jujur tentang sifat saya.", options: ikpOptions },
      { id: "q7", text: "Saat terjadi perbedaan pendapat, fokus saya adalah menyelesaikan masalah bersama, bukan membuktikan siapa yang benar.", options: ikpOptions },
      { id: "q8", text: "Saya berani mengungkapkan perasaan atau keberatan saya secara jujur dan tenang, meskipun situasinya terasa canggung.", options: ikpOptions },
      { id: "q9", text: "Saya ingin menikah karena siap berbagi hidup dan bertumbuh, bukan karena tekanan umur atau sekadar takut kesepian.", options: ikpOptions },
      { id: "q10", text: "Saya sudah mampu mengelola kebutuhan harian dan keuangan pribadi tanpa harus terus-menerus dibantu orang tua.", options: ikpOptions },
      { id: "q11", text: "Saya punya gambaran nyata (bukan khayalan) tentang cara mengatur uang dan pembagian tugas rumah tangga setelah menikah nanti.", options: ikpOptions },
      { id: "q12", text: "Saya sadar bahwa dalam pernikahan tidak semua keinginan saya harus dituruti, dan saya siap berdiskusi untuk mencari jalan tengah.", options: ikpOptions },
    ],
    scoring: [
      { 
        min: 12, 
        max: 30, 
        category: "Fase Penguatan Diri", 
        explanation: "Fokuslah pada penyembuhan luka lama atau kemandirian emosional. Anda disarankan menyelesaikan 'urusan dengan diri sendiri' sebelum melangkah ke komitmen besar.", 
        insights: ["Butuh kemandirian emosional lebih tinggi", "Masalah masa lalu masih membayangi", "Regulasi emosi perlu diperkuat"],
        actionableSteps: [
          "Selesaikan konflik batin atau trauma masa lalu dengan bantuan profesional",
          "Belajar untuk bahagia dengan diri sendiri sebelum mencari kebahagiaan dari orang lain",
          "Latih teknik regulasi emosi saat menghadapi tekanan"
        ]
      },
      { 
        min: 31, 
        max: 48, 
        category: "Fase Persiapan", 
        explanation: "Anda memiliki fondasi yang cukup baik. Fokus selanjutnya adalah memperdalam komunikasi asertif dan menyamakan ekspektasi detail dengan pasangan.", 
        insights: ["Fondasi mental sudah cukup stabil", "Komunikasi asertif perlu ditingkatkan", "Ekspektasi peran perlu diperjelas"],
        actionableSteps: [
          "Mulai bicarakan hal-hal teknis pernikahan (keuangan, anak, tempat tinggal) dengan pasangan",
          "Latih cara menyampaikan keberatan tanpa menyakiti perasaan",
          "Perdalam pemahaman tentang bahasa kasih pasangan"
        ]
      },
      { 
        min: 49, 
        max: 60, 
        category: "Siap Secara Mental", 
        explanation: "Selamat! Anda menunjukkan tingkat kematangan emosional dan kesiapan mental yang sangat baik untuk membangun kehidupan pernikahan.", 
        insights: ["Kematangan emosional tinggi", "Siap untuk komitmen jangka panjang", "Kemandirian diri sangat baik", "Kemampuan resolusi konflik yang sehat"],
        actionableSteps: [
          "Terus pertahankan keterbukaan dan kejujuran dengan pasangan",
          "Jadikan diri Anda sebagai support system yang sehat bagi pasangan",
          "Siapkan diri untuk terus belajar dan beradaptasi dalam perjalanan pernikahan"
        ]
      },
    ]
  }
];
