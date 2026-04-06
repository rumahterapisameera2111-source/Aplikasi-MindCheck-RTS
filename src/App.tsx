import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HeartPulse, 
  ArrowRight, 
  ChevronLeft, 
  CheckCircle2, 
  AlertCircle, 
  Brain, 
  Sparkles,
  MessageCircleHeart,
  Activity,
  ShieldCheck,
  Flame,
  Moon,
  Sun,
  Search,
  History,
  Clock,
  LayoutGrid,
  Filter,
  Wind,
  Zap,
  ShieldAlert,
  User,
  Heart,
  Baby,
  Fingerprint,
  Briefcase,
  Compass,
  HeartHandshake,
  GraduationCap,
  PieChart,
  Gem,
  CloudRain,
  Phone
} from 'lucide-react';
import { tests, Test, Question, ScoringRule } from './data/tests';
import { GoogleGenAI } from '@google/genai';

type Screen = 'landing' | 'selection' | 'pre-test' | 'testing' | 'analyzing' | 'result' | 'history' | 'payment';

interface TestHistory {
  id: string;
  testId: string;
  testTitle: string;
  category: string;
  score: number;
  resultCategory: string;
  date: string;
}

const IconMap: Record<string, any> = {
  HeartPulse, Brain, Sparkles, Activity, ShieldCheck, Flame, Moon, Sun, Search, History, Clock, LayoutGrid, Filter, Wind, Zap, ShieldAlert, User, Heart, Baby, Fingerprint, Briefcase, Compass, HeartHandshake, GraduationCap, PieChart, Gem, CloudRain, Phone
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [testHistory, setTestHistory] = useState<TestHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [unlockedTests, setUnlockedTests] = useState<string[]>([]);
  const [accessCode, setAccessCode] = useState('');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  // Result state
  const [score, setScore] = useState(0);
  const [resultRule, setResultRule] = useState<ScoringRule | null>(null);
  
  // AI Reflection state
  const [reflectionInput, setReflectionInput] = useState('');
  const [isSubmittingReflection, setIsSubmittingReflection] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  useEffect(() => {
    const savedHistory = localStorage.getItem('mindcheck_history');
    if (savedHistory) {
      setTestHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveToHistory = (historyItem: TestHistory) => {
    const newHistory = [historyItem, ...testHistory];
    setTestHistory(newHistory);
    localStorage.setItem('mindcheck_history', JSON.stringify(newHistory));
  };

  const categories = ['Semua', 'Tes Berbayar', ...Array.from(new Set(tests.map(t => t.category)))];

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         test.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesCategory = false;
    if (selectedCategory === 'Semua') {
      matchesCategory = true;
    } else if (selectedCategory === 'Tes Berbayar') {
      matchesCategory = !!test.isPaid;
    } else {
      matchesCategory = test.category === selectedCategory;
    }
    
    return matchesSearch && matchesCategory;
  });

  const handleStartTest = (test: Test) => {
    if (test.isPaid && !unlockedTests.includes(test.id)) {
      setSelectedTest(test);
      setCurrentScreen('payment');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setSelectedTest(test);
      setCurrentScreen('pre-test');
      setIsLoading(false);
    }, 500);
  };

  const handleUnlockTest = () => {
    // For demo purposes, any 6-digit code works, or just a simulation
    if (accessCode.length >= 4) {
      setUnlockedTests([...unlockedTests, selectedTest?.id || '']);
      setCurrentScreen('pre-test');
      setAccessCode('');
    } else {
      alert('Silakan masukkan kode akses yang valid setelah melakukan transfer.');
    }
  };

  const handleBeginQuestions = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setCurrentScreen('testing');
  };

  const handleAnswer = (scoreValue: number) => {
    const newAnswers = [...answers, scoreValue];
    setAnswers(newAnswers);

    if (currentQuestionIndex < (selectedTest?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult(newAnswers);
      setCurrentScreen('analyzing');
    }
  };

  const calculateResult = (finalAnswers: number[]) => {
    if (!selectedTest) return;
    const totalScore = finalAnswers.reduce((a, b) => a + b, 0);
    setScore(totalScore);
    
    const rule = selectedTest.scoring.find(r => totalScore >= r.min && totalScore <= r.max);
    if (rule) {
      setResultRule(rule);
      saveToHistory({
        id: Math.random().toString(36).substr(2, 9),
        testId: selectedTest.id,
        testTitle: selectedTest.title,
        category: selectedTest.category,
        score: totalScore,
        resultCategory: rule.category,
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
      });
    }
  };

  const [analyzingText, setAnalyzingText] = useState('Memproses pola respons...');

  useEffect(() => {
    if (currentScreen === 'analyzing') {
      const texts = [
        'Memproses pola respons...',
        'Mengekstrak fitur psikologis...',
        'Mencocokkan dengan database klinis...',
        'Menyusun insight personal...'
      ];
      let i = 0;
      const interval = setInterval(() => {
        i = (i + 1);
        if (i < texts.length) {
          setAnalyzingText(texts[i]);
        }
      }, 750);
      
      const timer = setTimeout(() => {
        setCurrentScreen('result');
      }, 3000);
      
      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [currentScreen]);

  const handleSubmitReflection = async () => {
    if (!reflectionInput.trim() || !selectedTest || !resultRule) return;
    
    setIsSubmittingReflection(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Pengguna baru saja menyelesaikan tes kesehatan mental "${selectedTest.title}" dan mendapatkan hasil "${resultRule.category}". 
      Pertanyaan refleksi: "${selectedTest.reflectionPrompt}"
      Jawaban pengguna: "${reflectionInput}"
      
      Berikan respon yang sangat empatik, hangat, dan tidak menghakimi (maksimal 3 kalimat pendek). 
      Jangan memberikan diagnosis medis. Validasi perasaan mereka dan berikan dorongan lembut bahwa mencari bantuan profesional adalah langkah yang berani dan tepat. Gunakan bahasa Indonesia yang santai tapi sopan.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      
      setAiResponse(response.text || 'Terima kasih telah berbagi. Perasaan Anda sangat valid, dan Anda tidak harus menghadapinya sendirian.');
    } catch (error) {
      console.error("Error generating AI response:", error);
      setAiResponse('Terima kasih telah berbagi dengan jujur. Mengakui perasaan ini adalah langkah pertama yang sangat berani. Ingatlah bahwa mencari bantuan profesional selalu menjadi pilihan yang baik.');
    } finally {
      setIsSubmittingReflection(false);
    }
  };

  const resetApp = () => {
    setCurrentScreen('selection');
    setSelectedTest(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScore(0);
    setResultRule(null);
    setReflectionInput('');
    setAiResponse('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans selection:bg-teal-100 dark:selection:bg-teal-900/50 selection:text-teal-900 dark:selection:text-teal-100 transition-colors duration-300">
      <div className="max-w-md mx-auto min-h-screen bg-white dark:bg-slate-900 shadow-xl overflow-hidden relative flex flex-col transition-colors duration-300">
        
        {/* Global Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[100] bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-12 h-12 border-4 border-teal-200 dark:border-teal-800 border-t-teal-600 dark:border-t-teal-400 rounded-full mb-4"
              />
              <p className="text-teal-600 dark:text-teal-400 font-bold animate-pulse">Menyiapkan Tes...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header - Only show if not landing */}
        {currentScreen !== 'landing' && (
          <header className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-10 transition-colors duration-300">
            <button 
              onClick={() => {
                if (currentScreen === 'testing' && currentQuestionIndex > 0) {
                  setCurrentQuestionIndex(prev => prev - 1);
                  setAnswers(prev => prev.slice(0, -1));
                } else if (currentScreen === 'pre-test') {
                  setCurrentScreen('selection');
                } else if (currentScreen === 'selection') {
                  setCurrentScreen('landing');
                } else if (currentScreen === 'result') {
                  resetApp();
                } else {
                  setCurrentScreen('selection');
                }
              }}
              className="p-2 -ml-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-full hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-medium">
              <Brain className="w-5 h-5" />
              <span>MindCheck</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentScreen('history')}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-full hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <History className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 -mr-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-full hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </header>
        )}

        <main className="flex-1 flex flex-col relative overflow-y-auto overflow-x-hidden">
          <AnimatePresence mode="wait">
            
            {/* 1. LANDING SCREEN */}
            {currentScreen === 'landing' && (
              <motion.div 
                key="landing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-1 flex flex-col items-center justify-center p-8 text-center relative"
              >
                <div className="absolute top-4 right-4">
                  <button 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-full hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                </div>
                <div className="w-24 h-24 bg-teal-50 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-8 text-teal-600 dark:text-teal-400">
                  <HeartPulse className="w-12 h-12" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                  Kenali Kondisi Kesehatan Mental Anda
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                  Tes singkat ini membantu Anda memahami kondisi emosi dan pikiran Anda saat ini.
                </p>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 p-4 rounded-2xl flex items-start gap-3 mb-8 text-left text-xs border border-amber-100 dark:border-amber-800/30">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                  <div>
                    <p className="font-bold mb-1">PENTING: Disclaimer Kode Etik</p>
                    <p>Platform ini bersifat <strong>SKREENING MANDIRI</strong> saja. Hasil tes bukan merupakan diagnosis klinis resmi. Untuk diagnosis dan penanganan medis/psikologis yang akurat, silakan berkonsultasi dengan tenaga profesional.</p>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 p-4 rounded-2xl flex items-start gap-3 mb-10 text-left text-xs border border-transparent dark:border-blue-800/30">
                  <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
                  <p>Jawaban Anda bersifat pribadi dan hanya digunakan untuk analisis tes. Tidak ada data yang disimpan secara permanen di server kami.</p>
                </div>

                <button 
                  onClick={() => setCurrentScreen('selection')}
                  className="w-full bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-medium py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-teal-600/20 dark:shadow-teal-900/40"
                >
                  Mulai Tes <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {/* 2. SELECTION SCREEN */}
            {currentScreen === 'selection' && (
              <motion.div 
                key="selection"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Pilih Jenis Tes</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Pilih area yang ingin Anda pahami.</p>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text"
                    placeholder="Cari alat tes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-teal-500 dark:text-slate-200"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 overflow-x-auto pb-4 mb-4 no-scrollbar">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                        selectedCategory === cat 
                        ? 'bg-teal-600 text-white shadow-md' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                
                <div className="grid gap-3 pb-8">
                  {filteredTests.length > 0 ? (
                    filteredTests.map((test) => {
                      const Icon = IconMap[test.iconName] || Brain;
                      return (
                        <button
                          key={test.id}
                          onClick={() => handleStartTest(test)}
                          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-500 hover:shadow-md p-4 rounded-2xl text-left transition-all group relative overflow-hidden flex gap-4 items-center"
                        >
                          <div className="w-12 h-12 bg-teal-50 dark:bg-teal-900/30 rounded-xl flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0 group-hover:scale-110 transition-transform">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-0.5">
                              <h3 className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors truncate">
                                {test.title}
                              </h3>
                              {test.isPaid && (
                                <span className="text-[9px] font-bold uppercase bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded">
                                  Berbayar
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                              <span className="flex items-center gap-1">
                                <Activity className="w-3 h-3" /> {test.questions.length} Soal
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {test.duration}
                              </span>
                              {test.popular && (
                                <span className="flex items-center gap-0.5 text-orange-500">
                                  <Flame className="w-3 h-3" /> Populer
                                </span>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                        <Search className="w-8 h-8" />
                      </div>
                      <p className="text-slate-500 dark:text-slate-400">Tidak ada tes yang ditemukan.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* HISTORY SCREEN */}
            {currentScreen === 'history' && (
              <motion.div 
                key="history"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 p-6"
              >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Riwayat Tes</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">Lihat kembali hasil tes yang pernah Anda lakukan.</p>
                
                <div className="grid gap-4 pb-8">
                  {testHistory.length > 0 ? (
                    testHistory.map((item) => (
                      <div 
                        key={item.id}
                        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl shadow-sm"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-slate-800 dark:text-slate-200">{item.testTitle}</h3>
                            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{item.category}</p>
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium">{item.date}</span>
                        </div>
                        <div className="flex items-center justify-between mt-4 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl">
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-bold mb-0.5">Hasil</p>
                            <p className="text-sm font-bold text-teal-600 dark:text-teal-400">{item.resultCategory}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-slate-400 uppercase font-bold mb-0.5">Skor</p>
                            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{item.score}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                        <History className="w-8 h-8" />
                      </div>
                      <p className="text-slate-500 dark:text-slate-400">Belum ada riwayat tes.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* PAYMENT SCREEN */}
            {currentScreen === 'payment' && selectedTest && (
              <motion.div 
                key="payment"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="flex-1 p-6 flex flex-col"
              >
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-2xl mb-6 border border-amber-100 dark:border-amber-800/30">
                  <div className="flex items-center gap-3 text-amber-700 dark:text-amber-400 mb-2">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-bold">Tes Berbayar</span>
                  </div>
                  <p className="text-xs text-amber-800 dark:text-amber-300">
                    Tes ini memerlukan akses khusus. Silakan lakukan pembayaran untuk melanjutkan.
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm mb-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Instruksi Pembayaran</h3>
                  <div className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl">
                      <p className="text-xs text-slate-400 uppercase font-bold mb-1">Bank Transfer (BSI)</p>
                      <p className="text-lg font-mono font-bold text-teal-600 dark:text-teal-400 tracking-wider">7087439326</p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">a/n Satria Siddik</p>
                    </div>
                    
                    <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                      <p>1. Lakukan transfer sesuai nominal yang ditentukan.</p>
                      <p>2. Kirim bukti transfer ke WhatsApp admin.</p>
                      <p>3. Admin akan memberikan <strong>Kode Akses</strong> untuk membuka tes ini.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mt-auto">
                  <div className="relative">
                    <input 
                      type="text"
                      placeholder="Masukkan Kode Akses..."
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      className="w-full bg-slate-100 dark:bg-slate-800 border-2 border-transparent focus:border-teal-500 rounded-2xl py-4 px-6 text-center font-bold tracking-widest dark:text-white"
                    />
                  </div>
                  
                  <button 
                    onClick={handleUnlockTest}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-teal-600/20 transition-all active:scale-[0.98]"
                  >
                    Buka Akses Tes
                  </button>
                  
                  <a 
                    href={`https://wa.me/628992666096?text=Halo%20Admin%20MindCheck,%20saya%20sudah%20melakukan%20transfer%20untuk%20akses%20tes%20${selectedTest.title}.%20Berikut%20bukti%20transfernya.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 no-underline"
                  >
                    <Phone className="w-5 h-5 text-green-500" /> Konfirmasi via WhatsApp
                  </a>
                </div>
              </motion.div>
            )}

            {/* 3. PRE-TEST SCREEN */}
            {currentScreen === 'pre-test' && selectedTest && (
              <motion.div 
                key="pre-test"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col p-6"
              >
                <div className="flex-1 flex flex-col justify-center">
                  <div className="w-20 h-20 bg-teal-50 dark:bg-teal-900/30 rounded-3xl flex items-center justify-center mb-6 text-teal-600 dark:text-teal-400 shadow-inner">
                    {(() => {
                      const Icon = IconMap[selectedTest.iconName] || Brain;
                      return <Icon className="w-10 h-10" />;
                    })()}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-400 px-2 py-1 rounded-md">
                      {selectedTest.category}
                    </span>
                    {selectedTest.isPaid && (
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-md">
                        Berbayar
                      </span>
                    )}
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">{selectedTest.title}</h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed text-lg">
                    {selectedTest.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl w-fit">
                      <Clock className="w-5 h-5" />
                      <span className="font-medium">{selectedTest.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl w-fit">
                      <Activity className="w-5 h-5" />
                      <span className="font-medium">{selectedTest.questions.length} Soal</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleBeginQuestions}
                  className="w-full bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-medium py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-teal-600/20 dark:shadow-teal-900/40 mt-auto"
                >
                  Mulai Pertanyaan <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {/* 4. TESTING SCREEN */}
            {currentScreen === 'testing' && selectedTest && (
              <motion.div 
                key="testing"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col p-6"
              >
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-end text-xs font-medium text-slate-400 dark:text-slate-500 mb-3">
                    <span className="uppercase tracking-wider font-bold">Progress</span>
                    <motion.span 
                      key={currentQuestionIndex}
                      initial={{ scale: 1.5, color: '#0d9488', backgroundColor: '#ccfbf1' }}
                      animate={{ scale: 1, color: isDarkMode ? '#94a3b8' : '#475569', backgroundColor: isDarkMode ? '#1e293b' : '#f1f5f9' }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="px-2.5 py-1 rounded-full font-bold"
                    >
                      {currentQuestionIndex + 1} dari {selectedTest.questions.length}
                    </motion.span>
                  </div>
                  <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative shadow-inner">
                    <motion.div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full overflow-hidden"
                      initial={{ width: `${(currentQuestionIndex / selectedTest.questions.length) * 100}%` }}
                      animate={{ width: `${((currentQuestionIndex + 1) / selectedTest.questions.length) * 100}%` }}
                      transition={{ type: "spring", stiffness: 60, damping: 12 }}
                    >
                      {/* Shimmer Effect */}
                      <motion.div
                        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      />
                    </motion.div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentQuestionIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-8 leading-snug">
                        {selectedTest.questions[currentQuestionIndex].text}
                      </h3>

                      <div className="grid gap-3">
                        {selectedTest.questions[currentQuestionIndex].options.map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleAnswer(option.score)}
                            className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 text-slate-700 dark:text-slate-200 font-medium p-4 rounded-2xl text-left transition-all active:scale-[0.98]"
                          >
                            {option.text}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* 5. ANALYZING SCREEN */}
            {currentScreen === 'analyzing' && (
              <motion.div 
                key="analyzing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden"
              >
                {/* High-tech background grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f766e1a_1px,transparent_1px),linear-gradient(to_bottom,#0f766e1a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0f766e33_1px,transparent_1px),linear-gradient(to_bottom,#0f766e33_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_40%,transparent_100%)]" />

                {/* Floating data particles */}
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-1.5 h-1.5 bg-teal-500 dark:bg-teal-400 rounded-full"
                    initial={{
                      x: Math.random() * 400 - 200,
                      y: Math.random() * 400 - 200,
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      y: [null, Math.random() * -100 - 50],
                      opacity: [0, 0.8, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: Math.random() * 2 + 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "easeInOut",
                    }}
                  />
                ))}

                <div className="relative w-64 h-64 flex items-center justify-center mb-12">
                  {/* Outer rotating dashed ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-teal-200 dark:border-teal-800"
                  />
                  
                  {/* Inner rotating ring with gradient */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-6 rounded-full border-2 border-transparent border-t-teal-500 border-b-emerald-400 opacity-70"
                  />
                  
                  {/* Innermost pulsing ring */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-12 rounded-full border border-teal-300 dark:border-teal-700 bg-teal-50/50 dark:bg-teal-900/20"
                  />

                  {/* Connecting lines to center */}
                  {[0, 60, 120, 180, 240, 300].map((degree) => (
                    <motion.div
                      key={`line-${degree}`}
                      className="absolute w-1/2 h-[2px] bg-gradient-to-r from-transparent via-teal-400 to-transparent origin-right opacity-40"
                      style={{ rotate: `${degree}deg`, right: '50%' }}
                      animate={{
                        opacity: [0.1, 0.6, 0.1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: degree / 360,
                        ease: "easeInOut",
                      }}
                    />
                  ))}

                  {/* Central Brain Core */}
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        "0 0 0px 0px rgba(20, 184, 166, 0)",
                        "0 0 40px 15px rgba(20, 184, 166, 0.2)",
                        "0 0 0px 0px rgba(20, 184, 166, 0)"
                      ]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 w-28 h-28 bg-white dark:bg-slate-800 border-4 border-teal-50 dark:border-teal-900/50 rounded-2xl flex items-center justify-center text-teal-600 dark:text-teal-400 shadow-xl overflow-hidden"
                    style={{ borderRadius: '2rem' }}
                  >
                    {/* Scanning line effect */}
                    <motion.div
                      animate={{ top: ['-20%', '120%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-8 bg-gradient-to-b from-transparent via-teal-100 dark:via-teal-900/50 to-transparent z-20 opacity-70"
                    />
                    <Brain className="w-12 h-12 relative z-10" />
                    
                    {/* Sparkles inside brain core */}
                    <motion.div
                      animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="absolute top-4 right-4 text-emerald-400 z-10"
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                  </motion.div>

                  {/* Orbiting data nodes */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    <div className="absolute top-0 left-1/2 w-4 h-4 bg-white dark:bg-slate-800 border-2 border-teal-500 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(20,184,166,0.5)] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-6"
                  >
                    <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-emerald-400 rounded-full -translate-x-1/2 translate-y-1/2 shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
                  </motion.div>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 relative z-10">Menganalisis Jawaban...</h2>
                
                <div className="h-6 overflow-hidden relative w-full flex justify-center z-10">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={analyzingText}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-teal-600 dark:text-teal-400 text-sm font-semibold absolute tracking-wide uppercase"
                    >
                      {analyzingText}
                    </motion.p>
                  </AnimatePresence>
                </div>
                
                {/* Progress bar at bottom */}
                <div className="w-48 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-8 overflow-hidden relative z-10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-teal-400 to-emerald-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "linear" }}
                  />
                </div>
              </motion.div>
            )}

            {/* 6. RESULT SCREEN */}
            {currentScreen === 'result' && selectedTest && resultRule && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col p-6 pb-12"
              >
                {/* Score Card */}
                <div className="bg-gradient-to-br from-teal-500 to-emerald-600 dark:from-teal-600 dark:to-emerald-700 rounded-3xl p-6 text-white shadow-lg shadow-teal-500/20 dark:shadow-teal-900/40 mb-6">
                  <p className="text-teal-100 text-sm font-medium mb-1 uppercase tracking-wider">Hasil {selectedTest.title}</p>
                  <h2 className="text-3xl font-bold mb-4">{resultRule.category}</h2>
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <p className="text-sm leading-relaxed">{resultRule.explanation}</p>
                  </div>
                </div>

                {/* Insights */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-teal-600 dark:text-teal-400" /> Insight Psikologis
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Orang dengan skor seperti ini biasanya mengalami:</p>
                  <div className="flex flex-wrap gap-2">
                    {resultRule.insights.map((insight, idx) => (
                      <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700">
                        {insight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Reflection Feature */}
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl p-6 mb-8 border border-indigo-100 dark:border-indigo-800/50">
                  <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-2 flex items-center gap-2">
                    <MessageCircleHeart className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Refleksi Diri
                  </h3>
                  <p className="text-sm text-indigo-700 dark:text-indigo-300/80 mb-4 font-medium">
                    {selectedTest.reflectionPrompt}
                  </p>
                  
                  {!aiResponse ? (
                    <div className="space-y-3">
                      <textarea 
                        value={reflectionInput}
                        onChange={(e) => setReflectionInput(e.target.value)}
                        placeholder="Ceritakan sedikit di sini..."
                        className="w-full bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-700 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 min-h-[100px] resize-none dark:text-slate-200 dark:placeholder-slate-500"
                      />
                      <button 
                        onClick={handleSubmitReflection}
                        disabled={!reflectionInput.trim() || isSubmittingReflection}
                        className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 px-4 rounded-xl transition-colors w-full flex justify-center items-center gap-2"
                      >
                        {isSubmittingReflection ? (
                          <motion.div 
                            animate={{ rotate: 360 }} 
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                        ) : 'Bagikan Perasaan Anda'}
                      </button>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-indigo-100 dark:border-indigo-800/50 shadow-sm"
                    >
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">"{aiResponse}"</p>
                    </motion.div>
                  )}
                </div>

                {/* Top 3 Weaknesses (Specific for IKP-12 or tests with showWeaknesses) */}
                {selectedTest.showWeaknesses && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" /> Top 3 Area Perbaikan
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Berdasarkan jawaban Anda, berikut adalah 3 poin yang paling perlu Anda perhatikan dan tingkatkan:</p>
                    <div className="space-y-3">
                      {answers
                        .map((score, index) => ({ score, question: selectedTest.questions[index].text }))
                        .sort((a, b) => a.score - b.score)
                        .slice(0, 3)
                        .map((item, idx) => (
                          <div key={idx} className="bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800/50 p-4 rounded-2xl">
                            <div className="flex items-start gap-3">
                              <div className="bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-400 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                                !
                              </div>
                              <p className="text-sm text-rose-900 dark:text-rose-300 font-medium leading-relaxed">
                                {item.question}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Mini Education */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Memahami Kondisi Anda</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                    {selectedTest.education}
                  </p>
                </div>

                {/* Actionable Steps */}
                <div className="mb-10">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Langkah Awal yang Bisa Dicoba</h3>
                  <div className="space-y-3">
                    {(resultRule.actionableSteps || selectedTest.actionableSteps).map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3.5 rounded-xl shadow-sm">
                        <div className="bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-400 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-300">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-6 text-center text-white mt-auto border border-transparent dark:border-slate-700">
                  <h3 className="text-xl font-bold mb-2">Butuh Teman Cerita?</h3>
                  <p className="text-slate-300 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                    Banyak orang merasa jauh lebih lega setelah membicarakan apa yang mereka rasakan dengan <strong>Hipnoterapis profesional</strong> yang memahami.
                  </p>
                  <a 
                    href="https://wa.me/628992666096?text=Halo%20Admin%20MindCheck,%20saya%20ingin%20konsultasi%20lebih%20lanjut%20dengan%20Hipnoterapis%20mengenai%20hasil%20tes%20saya."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-6 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 no-underline"
                  >
                    <Phone className="w-5 h-5" /> Konsultasi dengan Hipnoterapis
                  </a>
                  <button 
                    onClick={resetApp}
                    className="w-full mt-3 text-slate-400 hover:text-white text-sm font-medium py-2 transition-colors"
                  >
                    Kembali ke Beranda
                  </button>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
