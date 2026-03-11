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
      { id: "q1", text: "Kurang berminat atau bergairah dalam melakukan apapun?", options: standardOptions },
      { id: "q2", text: "Merasa murung, sedih, atau putus asa?", options: standardOptions },
      { id: "q3", text: "Sulit tidur, sering terbangun, atau justru tidur terlalu lama?", options: standardOptions },
      { id: "q4", text: "Merasa lelah atau kurang bertenaga?", options: standardOptions },
      { id: "q5", text: "Kurang nafsu makan atau justru makan terlalu banyak?", options: standardOptions },
      { id: "q6", text: "Merasa buruk tentang diri sendiri, merasa gagal, atau mengecewakan keluarga?", options: standardOptions },
      { id: "q7", text: "Sulit berkonsentrasi pada sesuatu, misalnya membaca atau menonton TV?", options: standardOptions },
      { id: "q8", text: "Bergerak atau berbicara sangat lambat sehingga orang lain menyadarinya? Atau sebaliknya, sangat gelisah?", options: standardOptions },
      { id: "q9", text: "Berpikir bahwa lebih baik mati atau ingin melukai diri sendiri dengan cara apapun?", options: standardOptions },
    ],
    scoring: [
      { min: 0, max: 4, category: "Depresi Minimal", explanation: "Skor Anda menunjukkan gejala depresi yang minimal atau tidak ada.", insights: ["Kondisi mood stabil", "Fungsi harian normal"] },
      { min: 5, max: 9, category: "Depresi Ringan", explanation: "Anda mungkin mengalami gejala depresi ringan. Disarankan untuk memantau kondisi Anda.", insights: ["Sering merasa lelah", "Motivasi kadang menurun"] },
      { min: 10, max: 14, category: "Depresi Sedang", explanation: "Gejala yang Anda alami cukup mengganggu. Pertimbangkan untuk berkonsultasi dengan profesional.", insights: ["Kehilangan minat", "Perubahan pola tidur/makan", "Sering merasa bersalah"] },
      { min: 15, max: 19, category: "Depresi Sedang-Berat", explanation: "Kondisi ini sangat membebani Anda. Sangat disarankan untuk mencari bantuan profesional.", insights: ["Rasa putus asa", "Kehilangan energi signifikan", "Isolasi diri"] },
      { min: 20, max: 27, category: "Depresi Berat", explanation: "Anda mengalami gejala depresi berat. Mohon segera hubungi tenaga profesional kesehatan mental.", insights: ["Penderitaan emosional mendalam", "Gangguan fungsi harian total", "Risiko krisis"] },
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
      { id: "q1", text: "Merasa gugup, cemas, atau tegang?", options: standardOptions },
      { id: "q2", text: "Tidak mampu menghentikan atau mengendalikan kekhawatiran?", options: standardOptions },
      { id: "q3", text: "Terlalu khawatir tentang berbagai hal yang berbeda?", options: standardOptions },
      { id: "q4", text: "Merasa sulit untuk bersantai?", options: standardOptions },
      { id: "q5", text: "Merasa sangat gelisah sehingga sulit untuk duduk diam?", options: standardOptions },
      { id: "q6", text: "Menjadi mudah marah atau jengkel?", options: standardOptions },
      { id: "q7", text: "Merasa takut seolah-olah sesuatu yang buruk akan terjadi?", options: standardOptions },
    ],
    scoring: [
      { min: 0, max: 4, category: "Kecemasan Minimal", explanation: "Tingkat kecemasan Anda saat ini berada dalam batas normal dan dapat dikelola dengan baik.", insights: ["Mampu mengelola stres harian", "Kondisi emosional stabil"] },
      { min: 5, max: 9, category: "Kecemasan Ringan", explanation: "Anda mungkin mengalami tingkat kecemasan ringan yang kadang mengganggu fokus Anda.", insights: ["Kadang merasa tegang", "Pikiran sedikit berlomba"] },
      { min: 10, max: 14, category: "Kecemasan Sedang", explanation: "Tingkat kecemasan Anda cukup mengganggu aktivitas sehari-hari. Konsultasi klinis disarankan.", insights: ["Overthinking", "Ketegangan fisik", "Kesulitan relaksasi"] },
      { min: 15, max: 21, category: "Kecemasan Berat", explanation: "Tingkat kecemasan yang tinggi. Sangat disarankan untuk mencari bantuan profesional segera.", insights: ["Kewalahan oleh rasa takut", "Gangguan tidur signifikan", "Gejala fisik nyata"] },
    ]
  },
  {
    id: "stres",
    title: "Tes Stres (PSS-4)",
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
      { id: "q1", text: "Dalam sebulan terakhir, seberapa sering Anda merasa kesal karena sesuatu yang terjadi secara tidak terduga?", options: frequencyOptions },
      { id: "q2", text: "Dalam sebulan terakhir, seberapa sering Anda merasa tidak mampu mengendalikan hal-hal penting dalam hidup Anda?", options: frequencyOptions },
      { id: "q3", text: "Dalam sebulan terakhir, seberapa sering Anda merasa gelisah dan tertekan?", options: frequencyOptions },
      { id: "q4", text: "Dalam sebulan terakhir, seberapa sering Anda merasa yakin dengan kemampuan Anda untuk menangani masalah pribadi?", options: frequencyOptions },
      { id: "q5", text: "Dalam sebulan terakhir, seberapa sering Anda merasa bahwa segala sesuatunya berjalan sesuai keinginan Anda?", options: frequencyOptions },
      { id: "q6", text: "Dalam sebulan terakhir, seberapa sering Anda merasa tidak mampu mengatasi semua hal yang harus Anda lakukan?", options: frequencyOptions },
      { id: "q7", text: "Dalam sebulan terakhir, seberapa sering Anda mampu mengendalikan rasa jengkel dalam hidup Anda?", options: frequencyOptions },
      { id: "q8", text: "Dalam sebulan terakhir, seberapa sering Anda merasa bahwa Anda berada di puncak segalanya?", options: frequencyOptions },
      { id: "q9", text: "Dalam sebulan terakhir, seberapa sering Anda merasa marah karena hal-hal yang terjadi di luar kendali Anda?", options: frequencyOptions },
      { id: "q10", text: "Dalam sebulan terakhir, seberapa sering Anda merasa kesulitan menumpuk begitu tinggi sehingga Anda tidak bisa mengatasinya?", options: frequencyOptions },
    ],
    scoring: [
      { min: 0, max: 13, category: "Stres Rendah", explanation: "Anda mampu mengelola tekanan hidup dan merasa memegang kendali dengan baik.", insights: ["Merasa memegang kendali", "Mampu beradaptasi"] },
      { min: 14, max: 26, category: "Stres Sedang", explanation: "Anda sedang menghadapi tekanan yang cukup terasa, namun masih berusaha mengatasinya.", insights: ["Kadang merasa kewalahan", "Kapasitas mental menurun"] },
      { min: 27, max: 40, category: "Stres Tinggi", explanation: "Tingkat stres Anda sangat tinggi dan berisiko menyebabkan kelelahan fisik maupun mental (burnout).", insights: ["Merasa kehilangan kendali", "Kelelahan mental", "Rentan sakit fisik"] },
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
      { id: "q1", text: "Dalam sebulan terakhir, apakah Anda mengalami mimpi buruk tentang kejadian traumatis di masa lalu atau memikirkannya saat Anda tidak ingin?", options: yesNoOptions },
      { id: "q2", text: "Apakah Anda berusaha keras untuk tidak memikirkan kejadian tersebut atau menghindari situasi yang mengingatkan Anda padanya?", options: yesNoOptions },
      { id: "q3", text: "Apakah Anda terus-menerus merasa waspada, berjaga-jaga, atau mudah terkejut?", options: yesNoOptions },
      { id: "q4", text: "Apakah Anda merasa mati rasa atau terputus dari orang-orang, aktivitas, atau lingkungan sekitar Anda?", options: yesNoOptions },
      { id: "q5", text: "Apakah Anda merasa bersalah atau menyalahkan diri sendiri/orang lain atas kejadian tersebut?", options: yesNoOptions },
    ],
    scoring: [
      { min: 0, max: 2, category: "Risiko PTSD Rendah", explanation: "Gejala trauma yang Anda alami saat ini berada di bawah ambang batas klinis.", insights: ["Mampu memproses emosi", "Merasa cukup aman di masa kini"] },
      { min: 3, max: 5, category: "Risiko PTSD Tinggi", explanation: "Skor ini mengindikasikan kemungkinan adanya PTSD. Sangat disarankan untuk melakukan asesmen lanjutan dengan profesional.", insights: ["Flashback yang mengganggu", "Hypervigilance (kewaspadaan berlebih)", "Penghindaran emosional"] },
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
      { min: 0, max: 3, category: "Energi Terjaga", explanation: "Anda masih memiliki antusiasme dan energi yang baik untuk rutinitas Anda.", insights: ["Motivasi stabil", "Work-life balance cukup baik"] },
      { min: 4, max: 7, category: "Gejala Burnout", explanation: "Anda mulai merasakan kelelahan kronis. Waspadai agar kondisi ini tidak memburuk.", insights: ["Kelelahan di akhir hari", "Mulai merasa sinis", "Butuh istirahat"] },
      { min: 8, max: 12, category: "Burnout Berat", explanation: "Anda mengalami kelelahan ekstrem yang berdampak serius pada kesehatan dan performa Anda.", insights: ["Kehilangan motivasi total", "Kelelahan kronis", "Perasaan tidak berdaya"] },
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
      { min: 0, max: 3, category: "Self Esteem Sehat", explanation: "Anda memiliki pandangan yang positif, realistis, dan menghargai diri Anda sendiri.", insights: ["Menerima kelebihan dan kekurangan", "Percaya diri"] },
      { min: 4, max: 7, category: "Self Esteem Rendah", explanation: "Anda cenderung meragukan nilai diri Anda dan sering mengkritik diri sendiri secara tidak adil.", insights: ["Sering merasa kurang", "Sensitif terhadap kritik"] },
      { min: 8, max: 12, category: "Self Esteem Sangat Rendah", explanation: "Pandangan negatif yang kuat terhadap diri sendiri menghambat potensi dan kebahagiaan Anda.", insights: ["Perasaan tidak berharga", "Self-sabotage", "Takut mencoba hal baru"] },
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
      { id: "q2", text: "Saya cenderung memikirkan skenario terburuk dari suatu kejadian (catastrophizing).", options: frequencyOptions },
      { id: "q3", text: "Saya sering memikirkan kembali kesalahan masa lalu berulang-ulang.", options: frequencyOptions },
      { id: "q4", text: "Saya sulit menghentikan pikiran yang mengganggu saat mencoba untuk tidur.", options: frequencyOptions },
    ],
    scoring: [
      { min: 0, max: 3, category: "Pola Pikir Praktis", explanation: "Anda cenderung berpikir berorientasi solusi dan tidak mudah terjebak dalam pikiran sendiri.", insights: ["Fokus pada solusi", "Mudah melepaskan masa lalu"] },
      { min: 4, max: 7, category: "Overthinking Ringan", explanation: "Anda kadang terjebak dalam siklus pikiran, terutama saat menghadapi ketidakpastian.", insights: ["Sering menganalisis berlebih", "Kadang sulit tidur"] },
      { min: 8, max: 12, category: "Overthinking Berat", explanation: "Pikiran Anda sangat menguras energi mental dan menghambat Anda untuk bertindak.", insights: ["Kelelahan mental", "Terjebak di masa lalu/masa depan", "Kelumpuhan analisis"] },
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
      { min: 0, max: 3, category: "Regulasi Baik", explanation: "Anda mampu memproses dan mengelola emosi Anda dengan cara yang sehat dan adaptif.", insights: ["Mampu menenangkan diri", "Respon proporsional"] },
      { min: 4, max: 7, category: "Kesulitan Ringan", explanation: "Anda kadang kesulitan mengendalikan emosi saat berada di bawah tekanan tinggi.", insights: ["Mudah terpancing", "Kadang reaktif"] },
      { min: 8, max: 12, category: "Kesulitan Signifikan", explanation: "Emosi seringkali mengambil alih kendali diri Anda, berdampak pada hubungan dan kesejahteraan.", insights: ["Ledakan emosi", "Kesulitan menenangkan diri", "Merasa dikuasai perasaan"] },
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
      { id: "q3", text: "Seberapa sering Anda merasa harus berhati-hati (walking on eggshells) agar tidak memicu kemarahannya?", options: frequencyOptions },
      { id: "q4", text: "Seberapa sering Anda merasa harus menyembunyikan perasaan atau pikiran asli Anda dari pasangan?", options: frequencyOptions },
    ],
    scoring: [
      { min: 0, max: 3, category: "Hubungan Sehat", explanation: "Hubungan Anda secara umum memiliki dinamika yang positif, aman, dan saling mendukung.", insights: ["Komunikasi asertif", "Merasa aman (secure)"] },
      { min: 4, max: 7, category: "Hubungan Tegang", explanation: "Ada pola komunikasi atau konflik yang perlu diperbaiki agar tidak merusak hubungan jangka panjang.", insights: ["Kurang komunikasi", "Sering salah paham"] },
      { min: 8, max: 12, category: "Indikasi Toksik", explanation: "Dinamika hubungan Anda saat ini sangat menguras emosi dan berpotensi merugikan kesehatan mental Anda.", insights: ["Merasa tidak aman", "Konflik destruktif", "Kebutuhan emosional terabaikan"] },
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
      { min: 0, max: 3, category: "Luka Batin Terkelola", explanation: "Anda tampaknya memiliki fondasi emosional yang cukup aman dari masa kecil Anda.", insights: ["Mampu menetapkan batasan", "Merasa cukup berharga (secure attachment)"] },
      { min: 4, max: 7, category: "Luka Batin Aktif", explanation: "Beberapa pola dari masa kecil (schema) masih mempengaruhi cara Anda berelasi dan memandang diri.", insights: ["Kecenderungan people-pleasing", "Takut penolakan"] },
      { min: 8, max: 12, category: "Luka Batin Mendalam", explanation: "Luka masa kecil sangat mendikte reaksi emosional, memicu kecemasan relasional yang tinggi.", insights: ["Reaktivitas emosional tinggi", "Takut ditinggalkan (Abandonment anxiety)", "Perfeksionisme ekstrem"] },
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
      { min: 0, max: 3, category: "Terkendali", explanation: "Kebiasaan Anda tampaknya tidak mengganggu fungsi kehidupan sehari-hari secara signifikan.", insights: ["Bukan sebagai pelarian utama", "Mampu mengendalikan dorongan"] },
      { min: 4, max: 7, category: "Ketergantungan Ringan", explanation: "Anda mulai menggunakan kebiasaan ini sebagai cara utama mengatasi emosi negatif. Waspadai siklusnya.", insights: ["Sering merasa bersalah", "Mulai mengganggu fokus"] },
      { min: 8, max: 12, category: "Indikasi Kecanduan", explanation: "Kebiasaan ini telah menjadi kompulsi yang sulit dihentikan dan berdampak negatif pada hidup Anda.", insights: ["Siklus kecanduan aktif", "Pelarian emosional utama", "Kehilangan kendali (Loss of control)"] },
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
      { min: 0, max: 3, category: "Eksplorasi Awal", explanation: "Anda baru mulai menyentuh permukaan dari tipe kepribadian Anda.", insights: ["Butuh observasi diri lebih lanjut", "Motivasi mungkin masih tersembunyi"] },
      { min: 4, max: 8, category: "Kecenderungan Kuat", explanation: "Anda menunjukkan pola yang konsisten dengan tipe kepribadian tertentu.", insights: ["Pola perilaku mulai terbaca", "Motivasi dasar mulai terlihat"] },
      { min: 9, max: 12, category: "Tipe Dominan", explanation: "Anda memiliki profil yang sangat kuat pada salah satu spektrum Enneagram.", insights: ["Motivasi dasar sangat jelas", "Ketakutan inti mendikte perilaku", "Potensi pertumbuhan spesifik"] },
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
      { min: 0, max: 4, category: "Eksplorasi Karir", explanation: "Minat Anda masih tersebar di berbagai bidang.", insights: ["Coba berbagai pengalaman baru", "Identifikasi nilai-nilai kerja Anda"] },
      { min: 5, max: 8, category: "Spesialisasi Potensial", explanation: "Anda memiliki kecenderungan kuat pada bidang tertentu.", insights: ["Fokus pada pengembangan skill", "Mulai bangun jejaring"] },
      { min: 9, max: 12, category: "Panggilan Karir", explanation: "Anda memiliki minat yang sangat spesifik dan kuat pada bidang tertentu.", insights: ["Sangat cocok untuk peran spesialis", "Potensi kepuasan kerja tinggi"] },
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
      { min: 0, max: 4, category: "Profil Seimbang", explanation: "Anda memiliki profil kepribadian yang cukup fleksibel di berbagai dimensi.", insights: ["Adaptif dalam berbagai situasi", "Keseimbangan antara logika dan emosi"] },
      { min: 5, max: 8, category: "Profil Terarah", explanation: "Anda memiliki kecenderungan yang jelas pada beberapa dimensi utama.", insights: ["Kekuatan karakter terlihat jelas", "Gaya interaksi konsisten"] },
      { min: 9, max: 12, category: "Profil Ekstrem", explanation: "Anda memiliki skor yang sangat menonjol pada dimensi tertentu.", insights: ["Karakter yang sangat khas", "Potensi kekuatan besar di bidang tertentu"] },
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
      { min: 0, max: 4, category: "Tipe Fleksibel", explanation: "Anda memiliki preferensi yang tidak terlalu kaku antara berbagai dimensi.", insights: ["Mampu beralih peran dengan mudah", "Open-minded"] },
      { min: 5, max: 8, category: "Tipe Konsisten", explanation: "Anda menunjukkan preferensi yang cukup jelas pada tipe tertentu.", insights: ["Gaya kerja yang terprediksi", "Nilai-nilai yang stabil"] },
      { min: 9, max: 12, category: "Tipe Dominan", explanation: "Anda memiliki profil kepribadian yang sangat kuat dan khas.", insights: ["Kekuatan kognitif yang sangat terfokus", "Gaya kepemimpinan yang unik"] },
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
      { min: 0, max: 4, category: "Multilingual", explanation: "Anda menghargai berbagai bentuk ekspresi cinta secara seimbang.", insights: ["Mudah merasa dicintai", "Fleksibel dalam memberi kasih sayang"] },
      { min: 5, max: 8, category: "Bahasa Dominan", explanation: "Anda memiliki satu atau dua bahasa cinta yang sangat menonjol.", insights: ["Kebutuhan emosional yang spesifik", "Peka terhadap tindakan tertentu"] },
      { min: 9, max: 12, category: "Bahasa Utama", explanation: "Anda memiliki satu cara utama yang sangat krusial untuk merasa dicintai.", insights: ["Sangat sensitif jika kebutuhan ini tidak terpenuhi", "Kunci utama kebahagiaan hubungan"] },
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
      { min: 0, max: 4, category: "Eksplorasi Akademik", explanation: "Minat akademik Anda masih cukup luas.", insights: ["Pertimbangkan jurusan interdisipliner", "Cari tahu lebih banyak bidang ilmu"] },
      { min: 5, max: 8, category: "Kecenderungan Rumpun", explanation: "Anda memiliki minat yang mulai mengerucut pada rumpun ilmu tertentu.", insights: ["Fokus pada persiapan ujian masuk", "Perdalam materi terkait"] },
      { min: 9, max: 12, category: "Minat Spesifik", explanation: "Anda memiliki passion yang sangat kuat pada bidang ilmu tertentu.", insights: ["Sangat direkomendasikan untuk jurusan terkait", "Potensi prestasi akademik tinggi"] },
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
      { min: 0, max: 4, category: "Ambivert", explanation: "Anda memiliki keseimbangan antara sifat introvert dan ekstrovert.", insights: ["Fleksibel dalam situasi sosial", "Bisa menikmati keramaian maupun kesendirian"] },
      { min: 5, max: 8, category: "Introvert Moderat", explanation: "Anda cenderung lebih nyaman dalam lingkungan yang tenang dan terkendali.", insights: ["Butuh waktu sendiri secara teratur", "Pendengar yang baik"] },
      { min: 9, max: 12, category: "Introvert Kuat", explanation: "Dunia internal Anda sangat kaya dan Anda sangat menghargai kesendirian.", insights: ["Sangat mandiri", "Pemikir mendalam", "Butuh banyak waktu pemulihan sosial"] },
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
      { min: 0, max: 4, category: "Profil Adaptif", explanation: "Gaya perilaku Anda cukup fleksibel tergantung situasi.", insights: ["Mampu menyesuaikan diri", "Bisa mengisi berbagai peran"] },
      { min: 5, max: 8, category: "Profil Jelas", explanation: "Anda memiliki gaya perilaku yang cukup konsisten.", insights: ["Kekuatan kerja mulai terlihat", "Gaya komunikasi stabil"] },
      { min: 9, max: 12, category: "Profil Dominan", explanation: "Anda memiliki gaya perilaku yang sangat kuat pada salah satu kuadran DISC.", insights: ["Sangat efektif dalam peran tertentu", "Butuh kesadaran akan gaya komunikasi orang lain"] },
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
      { min: 0, max: 4, category: "Tahap Persiapan", explanation: "Anda masih perlu banyak berdiskusi dan mempersiapkan diri lebih matang.", insights: ["Butuh komunikasi lebih dalam", "Fokus pada kemandirian"] },
      { min: 5, max: 8, category: "Cukup Siap", explanation: "Anda memiliki fondasi yang cukup baik, namun masih ada beberapa aspek yang perlu diperkuat.", insights: ["Komunikasi sudah berjalan", "Perlu penyamaan visi"] },
      { min: 9, max: 12, category: "Sangat Siap", explanation: "Anda menunjukkan kematangan emosional dan kesiapan yang kuat untuk berkomitmen.", insights: ["Visi misi sejalan", "Kematangan emosional tinggi", "Siap menghadapi tantangan bersama"] },
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
      { min: 0, max: 4, category: "Ambivert", explanation: "Anda memiliki keseimbangan yang baik antara sifat ekstrovert dan introvert.", insights: ["Bisa menyesuaikan diri di berbagai situasi", "Nyaman dalam keramaian maupun kesendirian"] },
      { min: 5, max: 8, category: "Ekstrovert Moderat", explanation: "Anda cukup menikmati interaksi sosial dan aktif dalam lingkungan luar.", insights: ["Suka berkolaborasi", "Energik dalam tim"] },
      { min: 9, max: 12, category: "Ekstrovert Kuat", explanation: "Anda adalah 'social butterfly' yang mendapatkan energi maksimal dari interaksi sosial.", insights: ["Sangat ekspresif", "Suka tantangan sosial", "Butuh stimulasi eksternal tinggi"] },
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
      { min: 0, max: 4, category: "Potensi Tersembunyi", explanation: "Anda masih dalam tahap awal mengenali potensi diri.", insights: ["Teruslah bereksperimen", "Jangan takut mencoba hal baru"] },
      { min: 5, max: 8, category: "Potensi Terarah", explanation: "Anda memiliki beberapa bidang keunggulan yang mulai terlihat.", insights: ["Fokus pada pengembangan diri", "Asah bakat alami Anda"] },
      { min: 9, max: 12, category: "Potensi Unggul", explanation: "Anda memiliki bakat yang sangat kuat di bidang tertentu.", insights: ["Sangat potensial untuk sukses di bidang tersebut", "Teruslah mengasah keahlian Anda"] },
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
      { min: 0, max: 4, category: "Butuh Perhatian", explanation: "Hubungan Anda sedang menghadapi tantangan yang cukup serius.", insights: ["Komunikasi mulai terhambat", "Butuh upaya ekstra untuk rekoneksi"] },
      { min: 5, max: 8, category: "Harmonis", explanation: "Hubungan Anda berjalan dengan baik, namun tetap perlu dipelihara.", insights: ["Komunikasi berjalan lancar", "Saling mendukung"] },
      { min: 9, max: 12, category: "Sangat Sehat", explanation: "Anda memiliki hubungan yang sangat kuat, penuh rasa syukur, dan saling menguatkan.", insights: ["Koneksi emosional mendalam", "Tim yang solid", "Ketahanan hubungan tinggi"] },
    ]
  }
];
