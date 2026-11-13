import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, X, Users, Award, CheckCircle, Sunrise, HandHeart } from 'lucide-react';
import { audio } from '../utils/audio';
import { Language } from '../types';

interface CollectiveBlessingModalProps {
  lang: Language;
  onClose: () => void;
  onDistributeThekua?: () => void;
}

type TabType = 'charan_sparsh' | 'sindoor_daan' | 'prasad_vitran' | 'paran';

export const CollectiveBlessingModal: React.FC<CollectiveBlessingModalProps> = ({
  lang,
  onClose,
  onDistributeThekua,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('charan_sparsh');

  // Charan Sparsh states
  const [touchedVrati, setTouchedVrati] = useState(false);
  const [touchedDada, setTouchedDada] = useState(false);
  const [touchedDadi, setTouchedDadi] = useState(false);

  // Sindoor Daan states
  const [sindoorAppliedCount, setSindoorAppliedCount] = useState(0);

  // Prasad Vitran states
  const [prasadSharedCount, setPrasadSharedCount] = useState(0);

  // Paran completed
  const [isParanDone, setIsParanDone] = useState(false);

  // Touching Elder feet handler
  const handleTouchFeet = (who: 'vrati' | 'dada' | 'dadi') => {
    audio.playBlessingChime();
    audio.playBell();

    if (who === 'vrati') setTouchedVrati(true);
    if (who === 'dada') setTouchedDada(true);
    if (who === 'dadi') setTouchedDadi(true);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#FFB703', '#F37021', '#E63946', '#FFE494'],
    });
  };

  // Applying Sindoor handler
  const handleApplySindoor = () => {
    audio.playBlessingChime();
    setSindoorAppliedCount((prev) => prev + 1);

    confetti({
      particleCount: 65,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF5400', '#FF7900', '#FFB703', '#D90429'],
    });
  };

  // Distribute Prasad handler
  const handleDistributePrasad = () => {
    audio.playCollect();
    audio.playBell();
    setPrasadSharedCount((prev) => prev + 12);
    if (onDistributeThekua) onDistributeThekua();

    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#D4A373', '#FFB703', '#FAEDCD', '#E76F51'],
    });
  };

  // Complete Paran handler
  const handleCompleteParan = () => {
    audio.playShankh();
    audio.playBell();
    setIsParanDone(true);

    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#FFB703', '#F37021', '#E63946', '#FFFFFF', '#70E000'],
    });
  };

  const isAllFeetTouched = touchedVrati && touchedDada && touchedDadi;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-md animate-fadeIn select-none">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto glass-panel-glow rounded-3xl p-5 md:p-8 border border-amber-500/50 text-amber-50 shadow-2xl flex flex-col justify-between">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-amber-950/70 hover:bg-amber-800 text-amber-300 transition-colors z-10"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {lang === 'en'
                ? 'Sacred Climax: Universal Blessings & Fellowship'
                : lang === 'bho'
                ? 'महापर्व के समापन: गोड़ लागल, आशीष आ पारन'
                : 'महापर्व की पूर्णता: सामूहिक आशीर्वाद, सुहाग सिन्दूर व पारण'}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold font-rozha text-amber-300">
            {lang === 'en'
              ? 'Community Blessings & Elder Reverence'
              : lang === 'bho'
              ? 'सभकर गोड़ लागल आ परसाद बाँटब'
              : 'सभी का एक-दूजे को आशीर्वाद व महाप्रसाद वितरण'}
          </h2>

          <p className="text-xs md:text-sm text-amber-200/80 mt-1 max-w-lg mx-auto">
            {lang === 'en'
              ? 'At the end of the puja, the entire ghat vibrates with unconditional love. Younger devotees touch the feet of vratis and elders, women apply orange sindoor, and thekua prasad is shared with everyone.'
              : lang === 'bho'
              ? 'अरघ के बाद घाटे मौजूद हर इंसान एक दोसरा के गोड़ लागेला, व्रती माई के चरन छूवेला, माई-बहिन एक दोसरा के नाक से मांग ले सेनुर लगावेली आ ठेकुआ बँटाएला।'
              : 'अर्घ्य के उपरांत घाट पर उपस्थित सभी 100-200 श्रद्धालु एक-दूसरे के चरण स्पर्श करते हैं, व्रती माताओं का आशीष लेते हैं, सिन्दूर दान होता है और महाप्रसाद बंटता है।'}
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          <button
            onClick={() => setActiveTab('charan_sparsh')}
            className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
              activeTab === 'charan_sparsh'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-amber-950 border-amber-300 shadow-md scale-102'
                : 'bg-amber-950/40 text-amber-300/80 border-amber-500/30 hover:bg-amber-950/70'
            }`}
          >
            <HandHeart className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Charan Sparsh' : lang === 'bho' ? 'गोड़ लागब' : 'चरण स्पर्श'}</span>
            {isAllFeetTouched && <CheckCircle className="w-3 h-3 text-emerald-300" />}
          </button>

          <button
            onClick={() => setActiveTab('sindoor_daan')}
            className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
              activeTab === 'sindoor_daan'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-amber-950 border-amber-300 shadow-md scale-102'
                : 'bg-amber-950/40 text-amber-300/80 border-amber-500/30 hover:bg-amber-950/70'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Matiya Sindoor' : lang === 'bho' ? 'सेनुर दान' : 'सुहाग सिन्दूर'}</span>
            {sindoorAppliedCount > 0 && <span className="text-[10px] bg-amber-950/60 px-1.5 rounded">+{sindoorAppliedCount}</span>}
          </button>

          <button
            onClick={() => setActiveTab('prasad_vitran')}
            className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
              activeTab === 'prasad_vitran'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-amber-950 border-amber-300 shadow-md scale-102'
                : 'bg-amber-950/40 text-amber-300/80 border-amber-500/30 hover:bg-amber-950/70'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Share Prasad' : lang === 'bho' ? 'परसाद बाँटब' : 'प्रसाद वितरण'}</span>
            {prasadSharedCount > 0 && <span className="text-[10px] bg-amber-950/60 px-1.5 rounded">{prasadSharedCount}</span>}
          </button>

          <button
            onClick={() => setActiveTab('paran')}
            className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
              activeTab === 'paran'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-amber-950 border-amber-300 shadow-md scale-102'
                : 'bg-amber-950/40 text-amber-300/80 border-amber-500/30 hover:bg-amber-950/70'
            }`}
          >
            <Sunrise className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Paran (Fast End)' : lang === 'bho' ? 'पारण व्रत अंत' : 'पारण (व्रत पूर्ण)'}</span>
            {isParanDone && <CheckCircle className="w-3 h-3 text-emerald-300" />}
          </button>
        </div>

        {/* Tab 1: Charan Sparsh (Touching Feet of Vrati, Dada & Dadi) */}
        {activeTab === 'charan_sparsh' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-3 rounded-2xl bg-amber-950/50 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed">
              <strong className="text-amber-300">
                {lang === 'en'
                  ? 'Touching the Feet of Elders & Vratis: '
                  : lang === 'bho'
                  ? 'बुजुर्ग आ व्रती के चरन स्पर्श: '
                  : 'बुजुर्गों और व्रती माताओं का चरण स्पर्श: '}
              </strong>
              {lang === 'en'
                ? 'In Bihar and Eastern UP culture, touching the feet of the Vrati who stood 36 hours fasting in freezing water brings unconditional peace, longevity, and solar grace.'
                : lang === 'bho'
                ? '३६ घंटा के निर्जला उपवास के बाद व्रती माई आ घर-गाँव के बुजुर्गन के गोड़ लागे से जीवन के सब कष्ट दूर हो जाला आ सुरुज भगवान के सीधा आशीष मिलेला।'
                : '36 घंटे के निर्जला उपवास के बाद गंगाजल में खड़ी व्रती माता और घर-गांव के बुजुर्गों के चरण छूने से साक्षात सूर्य देव और छठी मइया की कृपा प्राप्त होती है।'}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Vrati Mother Card */}
              <div
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  touchedVrati
                    ? 'bg-gradient-to-b from-amber-900/60 to-orange-950/60 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)]'
                    : 'bg-amber-950/40 border-amber-500/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">🙏</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                      व्रती माता (Vrati)
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-amber-200">छठी व्रती माँ</h4>
                  <p className="text-xs text-amber-100/70 italic mt-1.5">
                    "जुग जुग जिया बबुआ! छठी मइया तोहार सब मनोरथ सिद्ध करसु, कोख-माथ सलामत रखसु!"
                  </p>
                </div>
                <button
                  onClick={() => handleTouchFeet('vrati')}
                  className={`mt-4 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow ${
                    touchedVrati
                      ? 'bg-emerald-600/80 text-emerald-100 border border-emerald-400'
                      : 'bg-gradient-to-r from-amber-500 to-orange-600 text-amber-950 hover:brightness-110 active:scale-95'
                  }`}
                >
                  {touchedVrati ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>आशीर्वाद प्राप्त (Blessed)</span>
                    </>
                  ) : (
                    <>
                      <HandHeart className="w-3.5 h-3.5" />
                      <span>चरण स्पर्श करें</span>
                    </>
                  )}
                </button>
              </div>

              {/* Dada Ji Card */}
              <div
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  touchedDada
                    ? 'bg-gradient-to-b from-amber-900/60 to-orange-950/60 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)]'
                    : 'bg-amber-950/40 border-amber-500/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">👴</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                      दादा जी (Dada Ji)
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-amber-200">बुजुर्ग दादा जी</h4>
                  <p className="text-xs text-amber-100/70 italic mt-1.5">
                    "माई के किरपा से तोहार कुल-खानदान आवे वाला सात पीढ़ी ले खुशहाल रहे! दीर्घायु भव!"
                  </p>
                </div>
                <button
                  onClick={() => handleTouchFeet('dada')}
                  className={`mt-4 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow ${
                    touchedDada
                      ? 'bg-emerald-600/80 text-emerald-100 border border-emerald-400'
                      : 'bg-gradient-to-r from-amber-500 to-orange-600 text-amber-950 hover:brightness-110 active:scale-95'
                  }`}
                >
                  {touchedDada ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>आशीर्वाद प्राप्त (Blessed)</span>
                    </>
                  ) : (
                    <>
                      <HandHeart className="w-3.5 h-3.5" />
                      <span>चरण स्पर्श करें</span>
                    </>
                  )}
                </button>
              </div>

              {/* Dadi Ji Card */}
              <div
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  touchedDadi
                    ? 'bg-gradient-to-b from-amber-900/60 to-orange-950/60 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)]'
                    : 'bg-amber-950/40 border-amber-500/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">👵</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                      दादी जी (Dadi Ji)
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-amber-200">दादी जी व चाची</h4>
                  <p className="text-xs text-amber-100/70 italic mt-1.5">
                    "दूधो नहाओ, पूतो फलो! छठी मइया तोहार घर-अंगना सदा धन-धान्य और हँसी से भरल रखसु!"
                  </p>
                </div>
                <button
                  onClick={() => handleTouchFeet('dadi')}
                  className={`mt-4 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow ${
                    touchedDadi
                      ? 'bg-emerald-600/80 text-emerald-100 border border-emerald-400'
                      : 'bg-gradient-to-r from-amber-500 to-orange-600 text-amber-950 hover:brightness-110 active:scale-95'
                  }`}
                >
                  {touchedDadi ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>आशीर्वाद प्राप्त (Blessed)</span>
                    </>
                  ) : (
                    <>
                      <HandHeart className="w-3.5 h-3.5" />
                      <span>चरण स्पर्श करें</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Matiya Sindoor Daan (Nose to Parting) */}
        {activeTab === 'sindoor_daan' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-amber-950/50 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed">
              <strong className="text-orange-400">
                {lang === 'en'
                  ? 'Sacred Orange Matiya Sindoor (From Nose to Hairline): '
                  : lang === 'bho'
                  ? 'नाक से मांग ले नारंगी मटिया सेनुर: '
                  : 'नाक के अग्रभाग से मांग तक गहरा नारंगी सिन्दूर: '}
              </strong>
              {lang === 'en'
                ? 'A vibrant hallmark of Chhath Puja! Devotee women apply this thick orange vermilion to one another. The bold line symbolizes the direct solar meridian, pure marital devotion, and universal sisterhood without ego.'
                : lang === 'bho'
                ? 'छठ महापर्व में व्रती माई-बहिन एक दोसरा के नाक के कोना से ललाट के मांग ले गाढ़ नारंगी सेनुर लगावेली। ई अमर सुहाग, सुरुज देव के तेज आ कुल के खुशहाली के साक्षात परतीक ह।'
                : 'छठ महापर्व में महिलाएं एक-दूसरे को नाक के छोर से सिर की मांग तक गाढ़ा नारंगी सिन्दूर लगाती हैं। यह सूर्य नाड़ी के जागरण, अखंड सुहाग और निष्कपट प्रेम का पावन प्रतीक है।'}
            </div>

            {/* Interactive Sindoor Simulation Card */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-b from-orange-950/70 to-red-950/70 border border-orange-500/40 text-center flex flex-col items-center">
              <div className="relative w-24 h-28 mb-3 flex items-center justify-center">
                {/* Face silhouette representation */}
                <div className="w-20 h-24 rounded-[40px] bg-amber-100/10 border-2 border-orange-400/40 relative overflow-hidden flex items-center justify-center">
                  {/* Glowing orange vermilion vertical trail */}
                  <div
                    className="w-2 bg-gradient-to-t from-orange-600 via-amber-400 to-red-500 shadow-[0_0_15px_#ff5400] transition-all duration-500"
                    style={{
                      height: `${Math.min(100, (sindoorAppliedCount + 1) * 25)}%`,
                    }}
                  />
                </div>
              </div>

              <h4 className="text-base font-bold text-amber-200">
                {lang === 'en'
                  ? 'Share Sacred Suhag Sindoor'
                  : lang === 'bho'
                  ? 'माई-बहिन के सेनुर लगाईं'
                  : 'घाट पर उपस्थित माताओं-बहनों को सिन्दूर दान करें'}
              </h4>

              <p className="text-xs text-amber-300/80 mt-1 max-w-sm">
                {lang === 'en'
                  ? 'Tap below to apply the sacred orange vermilion to fellow women devotees on the ghat.'
                  : lang === 'bho'
                  ? 'सुहाग के सिन्दूरा अमर रखिहे हे छठी मइया! नीचे बटन दबा के सेनुर दान करीं।'
                  : 'नीचे दिए बटन को दबाकर घाट पर एकत्रित सभी श्रद्धालुओं को पावन सिन्दूर का आशीष दें।'}
              </p>

              <button
                onClick={handleApplySindoor}
                className="mt-4 py-2.5 px-6 rounded-full bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 text-amber-950 font-bold text-sm shadow-[0_0_20px_rgba(255,84,0,0.5)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-950" />
                <span>
                  {lang === 'en'
                    ? `Apply Sindoor (${sindoorAppliedCount} Blessed)`
                    : `सिन्दूर दान करें (${sindoorAppliedCount} बार लगाया)`}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Prasad Vitran (Sharing Thekua with 100+ Crowd) */}
        {activeTab === 'prasad_vitran' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-amber-950/50 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed">
              <strong className="text-amber-300">
                {lang === 'en'
                  ? 'Universal Mahaprasad Sharing (No One Leaves Empty-Handed): '
                  : lang === 'bho'
                  ? 'महाप्रसाद ठेकुआ के खुला वितरण: '
                  : 'महाप्रसाद ठेकुआ का खुला वितरण: '}
              </strong>
              {lang === 'en'
                ? 'On the Chhath Ghat, thekua is distributed to strangers, friends, rich and poor equally. Asking for prasad ("छठी मइया के परसाद हे") is regarded with highest honor and humility.'
                : lang === 'bho'
                ? 'छठ घाटे जात-पात, अमीर-गरीब के भेद मिट जाला। जे भी हाथ फैला के कहेला "छठी मइया के परसाद दीं", ओकरा आदर से ठेकुआ दिहल जाला।'
                : 'छठ घाट पर अमीर, गरीब, अपरिचित या मित्र — सभी को समान आदर से ठेकुआ महाप्रसाद दिया जाता है। कोई भी खाली हाथ नहीं लौटता।'}
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-950/80 to-[#2a1306] border border-amber-500/40 text-center flex flex-col items-center">
              <span className="text-4xl mb-2">🍪</span>
              <h4 className="text-base font-bold text-amber-200">
                {lang === 'en'
                  ? 'Distribute Pure Ghee Thekua to Devotees'
                  : lang === 'bho'
                  ? 'सभके हाथ में छठी मइया के परसाद थमाईं'
                  : 'घाट पर उपस्थित 100+ श्रद्धालुओं को ठेकुआ बाँटें'}
              </h4>

              <div className="my-3 flex items-center justify-center gap-3">
                <div className="text-xs text-amber-300 font-semibold bg-amber-900/60 px-3.5 py-1.5 rounded-full border border-amber-500/30">
                  {lang === 'en'
                    ? `Devotees Blessed: ${prasadSharedCount} / 120`
                    : `प्रसाद ग्रहण करने वाले श्रद्धालु: ${prasadSharedCount} / 120`}
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full max-w-md h-3 bg-amber-950 rounded-full border border-amber-500/30 overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                  style={{ width: `${Math.min(100, (prasadSharedCount / 120) * 100)}%` }}
                />
              </div>

              <button
                onClick={handleDistributePrasad}
                className="py-2.5 px-6 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 text-amber-950 font-bold text-sm shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-amber-950" />
                <span>
                  {lang === 'en'
                    ? 'Share Thekua (+12 People)'
                    : 'श्रद्धालुओं को ठेकुआ बाँटें (+12 लोग)'}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Paran (Concluding the 36-hr Fast) */}
        {activeTab === 'paran' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-amber-950/50 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed">
              <strong className="text-emerald-400">
                {lang === 'en'
                  ? 'The Sacred Paran (Breaking 36 Hours of Waterless Fasting): '
                  : lang === 'bho'
                  ? 'पारण — ३६ घंटा के निर्जला तप के पूर्णाहुति: '
                  : 'पारण — 36 घंटे के निर्जला तप की पूर्णाहुति: '}
              </strong>
              {lang === 'en'
                ? 'After offering the morning Usha Arghya to the rising sun, the Vrati concludes the intense fast right at the riverbank by sipping holy Gangajal, raw cow milk, and a taste of ginger with jaggery.'
                : lang === 'bho'
                ? 'उषा अरघ के बाद घाटे पर ही व्रती गंगाजल, काँच दूध आ आदि-गुड़ के टुकड़ा खा के आपन ३६ घंटा के कठोर निर्जला व्रत खोलेली।'
                : 'उषा अर्घ्य के उपरांत घाट पर ही व्रती माताएं गंगाजल, कच्चा गाय का दूध और अदरक-गुड़ का टुकड़ा ग्रहण कर 36 घंटे के कठोर व्रत का पारण करती हैं।'}
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-950/80 to-[#12281a] border border-emerald-500/40 text-center flex flex-col items-center">
              <span className="text-4xl mb-2">🥛</span>
              <h4 className="text-base font-bold text-emerald-200">
                {lang === 'en'
                  ? 'Conclude the Fast with Gangajal & Raw Milk'
                  : lang === 'bho'
                  ? 'गंगाजल आ कच्चा दूध से पारण करीं'
                  : 'पवित्र गंगाजल, कच्चा दूध व गुड़ से पारण'}
              </h4>

              <p className="text-xs text-amber-100/70 mt-1 max-w-sm">
                {isParanDone
                  ? 'छठ महापर्व संपूर्ण भईल! छठी मइया रउआ सभ परिवार पर अपन कृपा बनवले रखसु!'
                  : 'व्रत की पूर्णाहुति के लिए नीचे क्लिक करें और शंखनाद के साथ पारण संपन्न करें।'}
              </p>

              {isParanDone ? (
                <div className="mt-4 p-3 rounded-2xl bg-emerald-950/80 border border-emerald-400 text-xs md:text-sm text-emerald-200 font-bold flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span>
                    {lang === 'en'
                      ? 'Paran Successfully Completed! Mahaparv Concluded with Divine Grace.'
                      : 'पारण संपन्न! सूर्य देव व छठी मइया की अनंत कृपा आप पर बनी रहे।'}
                  </span>
                </div>
              ) : (
                <button
                  onClick={handleCompleteParan}
                  className="mt-4 py-2.5 px-6 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-emerald-950 font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Sunrise className="w-4 h-4 text-emerald-950" />
                  <span>
                    {lang === 'en' ? 'Conclude Paran Fast' : 'पारण संपन्न करें (Conclude Fast)'}
                  </span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="mt-6 pt-4 border-t border-amber-500/30 flex items-center justify-between">
          <div className="text-xs text-amber-300/80 font-medium flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span>छठी मइया की जय • हर हर गंगे</span>
          </div>

          <button
            onClick={onClose}
            className="py-2 px-5 rounded-full bg-amber-900/60 hover:bg-amber-800 text-amber-200 text-xs font-bold border border-amber-500/30 transition-all"
          >
            {lang === 'en' ? 'Return to Ghat' : 'घाट पर वापस जाएं'}
          </button>
        </div>
      </div>
    </div>
  );
};
