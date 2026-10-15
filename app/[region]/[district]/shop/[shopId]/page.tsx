import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    region?: string;
    district?: string;
    dong?: string;
    id?: string;
    shopId?: string;
  }>;
}

const SITE_URL = "https://oneclick-massage.netlify.app";

function getRegionFullName(region?: string): string {
  switch (region?.toLowerCase()) {
    case "seoul":
      return "서울";
    case "gyeonggi":
      return "경기";
    case "incheon":
      return "인천";
    default:
      return region || "";
  }
}

function safeDecode(str?: string): string {
  if (!str) return "";
  let decoded = str;
  try {
    decoded = decodeURIComponent(decodeURIComponent(str));
  } catch {
    try {
      decoded = decodeURIComponent(str);
    } catch {
      decoded = str;
    }
  }
  return decoded.trim();
}

function parseLocationText(region?: string, district?: string, dong?: string): string {
  const regionName = getRegionFullName(region);
  const decodedDistrict = safeDecode(district);
  const decodedDong = safeDecode(dong);
  return `${regionName} ${decodedDistrict} ${decodedDong}`.replace(/\s+/g, " ").trim();
}

const shopData: Record<string, {
  name: string;
  cleanName: string;
  phone: string;
  badge: string;
  image: string;
  desc: string;
  courses: { name: string; time: string; price: string; desc: string }[];
  features: string[];
}> = {
  "1": {
    name: "원클릭안심테라피",
    cleanName: "원클릭안심테라피",
    phone: "0507-1280-3140",
    badge: "원클릭 추천 제휴점",
    image: "/shop1.jpg",
    desc: "서울 전체 마사지 추천 총정리! 숙련된 테라피스트의 정성 어린 스웨디시 및 아로마 테라피 코스와 투명한 요금을 원클릭에서 확인하세요.",
    courses: [
      { name: "건식 타이 마사지 (기본)", time: "60분", price: "90,000원", desc: "전신 스트레칭과 지압을 통해 굳은 근육을 시원하게 풀어주는 정통 코스" },
      { name: "아로마 마사지 (순환)", time: "90분", price: "110,000원", desc: "천연 에센셜 오일로 전신 혈액순환과 피로 해소를 돕는 프리미엄 코스" },
      { name: "스웨디시 감성 테라피", time: "60분", price: "130,000원", desc: "부드러운 오일 터칭으로 심신의 깊은 이완과 숙면을 유도하는 코스" }
    ],
    features: ["투명한 정찰제 요금", "24시간 365일 연중무휴", "수도권 전지역 신속 안내", "철저한 위생 및 소독 관리"]
  },
  "2": {
    name: "오늘밤원클릭케어",
    cleanName: "오늘밤원클릭케어",
    phone: "0507-1280-3199",
    badge: "재방문율 최우수",
    image: "/shop2.jpg",
    desc: "지친 하루의 피로를 말끔히 풀어드리는 1:1 맞춤 홈케어! 타이 마사지부터 아로마 마사지까지 원하는 장소에서 편안하게 정통 힐링을 누려보세요.",
    courses: [
      { name: "타이 마사지 (베이직)", time: "60분", price: "60,000원", desc: "전신 근육을 시원하게 스트레칭하여 가볍고 개운한 몸을 만드는 베이직 코스" },
      { name: "아로마 마사지 (소프트)", time: "60분", price: "70,000원", desc: "향기로운 천연 오일과 부드러운 압으로 신체 긴장을 완화하는 아로마 코스" }
    ],
    features: ["정직한 정찰제", "친절 마인드 전문 힐러 상주", "간편 예약 지원"]
  },
  "3": {
    name: "주주원클릭홈타이",
    cleanName: "주주원클릭홈타이",
    phone: "0507-1280-3197",
    badge: "24시 정찰제 매칭",
    image: "/shop3.jpg",
    desc: "재방문율 1위 만족도! 정통 타이 마사지와 림프 순환을 돕는 아로마 마사지로 굳어있던 몸을 유연하고 활력 넘치게 회복시켜 드립니다.",
    courses: [
      { name: "스탠다드 정통 타이 마사지", time: "60분", price: "60,000원", desc: "머리부터 발끝까지 뭉친 근육을 시원하게 풀어주는 정통 타이 코스" },
      { name: "프리미엄 딥티슈 아로마 마사지", time: "90분", price: "90,000원", desc: "근육 결을 따라 부드럽게 속근육 깊은 곳까지 풀어주는 아로마 코스" }
    ],
    features: ["투명한 정찰제 운영", "신속한 매칭 보장", "개인정보 완벽 보호"]
  },
  "4": {
    name: "골든원클릭테라피",
    cleanName: "골든원클릭테라피",
    phone: "0507-1280-3360",
    badge: "베테랑 힐러진",
    image: "/shop4.jpg",
    desc: "베테랑 테라피스트들의 1:1 케어! 릴렉스 마사지와 전신 아로마 마사지로 수도권 전지역 어디서나 품격 있는 힐링을 선사합니다.",
    courses: [
      { name: "릴렉스 마사지 (건식)", time: "60분", price: "60,000원", desc: "원하는 피로 부위를 집중적으로 시원하게 풀어주는 맞춤형 릴렉스 코스" },
      { name: "천연 순환 아로마 마사지", time: "60분", price: "70,000원", desc: "천연 아로마 오일로 전신 혈액순환과 피부 보습을 돕는 아로마 코스" }
    ],
    features: ["세련된 감성 테라피", "정찰제 요금 적용", "24시간 상시 대기"]
  },
  "5": {
    name: "퀸즈원클릭홈케어",
    cleanName: "퀸즈원클릭홈케어",
    phone: "0507-1280-3296",
    badge: "만족도 1위",
    image: "/shop5.jpg",
    desc: "수도권 전지역 신속 안내! 타이 마사지, 아로마 마사지, 릴렉스 마사지를 정직한 정찰제 가격으로 편안하게 받아보세요.",
    courses: [
      { name: "컨디션 케어 타이 마사지", time: "60분", price: "60,000원", desc: "지친 몸의 피로를 시원한 스트레칭으로 해소하는 정통 타이 코스" },
      { name: "스페셜 릴렉스 아로마 마사지", time: "60분", price: "70,000원", desc: "향긋한 아로마 오일과 부드러운 손길로 진행되는 전신 아로마 코스" }
    ],
    features: ["투명한 정찰제", "수도권 전지역 빠른 안내", "고객 만족도 최상"]
  }
};

const SHOP_SEO_PATTERNS = [
  {
    titleSuffix: "마사지샵 추천 및 코스·요금 안내",
    desc: (r: string, s: string) => `${r} 마사지샵 제휴처 ${s}. 스웨디시·아로마·타이 코스와 투명한 정찰제 요금을 원클릭마사지에서 확인하세요.`
  },
  {
    titleSuffix: "스웨디시 및 아로마 마사지 안내",
    desc: (r: string, s: string) => `${r} 프리미엄 마사지 추천. 천연 에센셜 오일과 릴렉싱 케어로 일상의 피로를 ${s}에서 부드럽게 비워보세요.`
  },
  {
    titleSuffix: "마사지 가격 및 운영 시간 총정리",
    desc: (r: string, s: string) => `${r} 마사지샵 제휴 안내. 정직한 정찰제 요금과 검증된 전문 테라피스트 ${s}의 맞춤형 힐링 코스를 확인합니다.`
  }
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const targetId = resolvedParams.id || resolvedParams.shopId || "1";
  const shop = shopData[targetId] || shopData["1"];

  const currentRegion = parseLocationText(resolvedParams.region, resolvedParams.district, resolvedParams.dong);
  const districtName = safeDecode(resolvedParams.district);
  const dongName = safeDecode(resolvedParams.dong);

  const charSum = (currentRegion + shop.cleanName + targetId + "oneclick_salt").split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const patternIndex = Math.abs(charSum) % SHOP_SEO_PATTERNS.length;
  const pattern = SHOP_SEO_PATTERNS[patternIndex];

  const finalTitle = `${currentRegion} ${shop.cleanName} ${pattern.titleSuffix} ｜원클릭마사지`;
  const finalDescription = pattern.desc(currentRegion, shop.cleanName);

  const canonicalPath = dongName
    ? `/${resolvedParams.region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}/shop/${targetId}`
    : `/${resolvedParams.region}/${encodeURIComponent(districtName)}/shop/${targetId}`;

  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  return {
    title: { absolute: finalTitle },
    description: finalDescription,
    alternates: { canonical: canonicalUrl },
    keywords: [
      `${currentRegion} 마사지`,
      `${districtName} 마사지샵`,
      dongName ? `${dongName} 마사지` : `${districtName} 홈타이`,
      `${shop.cleanName}`,
      "스웨디시 추천",
      "마사지 가격 및 코스",
      "원클릭마사지"
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true }
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: canonicalUrl,
      siteName: "원클릭마사지",
      locale: "ko_KR",
      type: "article",
      images: [
        {
          url: `${SITE_URL}${shop.image}`,
          width: 800,
          height: 600,
          alt: `${currentRegion} 마사지 - ${shop.cleanName}`,
        },
      ],
    },
  };
}

export default async function ShopDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const targetId = resolvedParams.id || resolvedParams.shopId || "1";
  const shop = shopData[targetId] || shopData["1"];

  const currentRegion = parseLocationText(resolvedParams.region, resolvedParams.district, resolvedParams.dong);
  const districtName = safeDecode(resolvedParams.district);
  const dongName = safeDecode(resolvedParams.dong);
  const regionFullName = getRegionFullName(resolvedParams.region);

  const charSum = (currentRegion + shop.cleanName + targetId + "oneclick_salt").split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const patternIndex = Math.abs(charSum) % SHOP_SEO_PATTERNS.length;
  const pattern = SHOP_SEO_PATTERNS[patternIndex];

  const canonicalPath = dongName
    ? `/${resolvedParams.region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}/shop/${targetId}`
    : `/${resolvedParams.region}/${encodeURIComponent(districtName)}/shop/${targetId}`;

  const currentUrl = `${SITE_URL}${canonicalPath}`;

  const backUrl = dongName
    ? `/${resolvedParams.region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}`
    : `/${resolvedParams.region}/${encodeURIComponent(districtName)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
        "@id": `${currentUrl}/#business`,
        name: `${shop.cleanName} (${currentRegion})`,
        description: pattern.desc(currentRegion, shop.cleanName),
        url: currentUrl,
        telephone: shop.phone,
        image: `${SITE_URL}${shop.image}`,
        priceRange: "60,000원~180,000원",
        currenciesAccepted: "KRW",
        paymentAccepted: "Cash, Credit Card",
        address: {
          "@type": "PostalAddress",
          streetAddress: dongName || districtName,
          addressLocality: districtName,
          addressRegion: regionFullName,
          addressCountry: "KR",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: currentRegion,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "마사지 프로그램",
          itemListElement: shop.courses.map((c) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: c.name,
              description: c.desc,
            },
            price: c.price.replace(/[^0-9]/g, ""),
            priceCurrency: "KRW",
            availability: "https://schema.org/InStock",
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${currentUrl}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: `${shop.cleanName} 예약은 어떻게 하나요?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "하단의 전화 예약 또는 문자 상담 버튼을 통해 샵으로 직접 연결되며, 코스 및 방문 시간을 바로 조율하실 수 있습니다.",
            },
          },
          {
            "@type": "Question",
            name: "이용 요금과 코스는 어디서 확인하나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "본 페이지에서 제휴 샵의 상세 코스, 이용 요금 및 운영 시간을 한눈에 비교하실 수 있습니다.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${currentUrl}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: `${districtName} 마사지`, item: `${SITE_URL}/${resolvedParams.region}/${encodeURIComponent(districtName)}` },
          ...(dongName
            ? [{ "@type": "ListItem", position: 3, name: `${dongName} 마사지`, item: `${SITE_URL}/${resolvedParams.region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}` }]
            : []),
          { "@type": "ListItem", position: dongName ? 4 : 3, name: shop.cleanName, item: currentUrl },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="sticky top-0 z-50 bg-[#050505]/85 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3.5 shadow-[0_4px_20px_rgba(245,158,11,0.1)]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-black text-lg shadow-[0_0_12px_rgba(245,158,11,0.4)] group-hover:scale-105 transition-transform">
              원
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                원클릭마사지
              </span>
              <span className="text-[9px] text-gray-400 tracking-tighter">ONECLICK PARTNER</span>
            </div>
          </Link>

          <Link
            href={backUrl}
            className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all"
          >
            ← {dongName || districtName} 목록
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
        <nav aria-label="Breadcrumb" className="text-xs text-gray-400 flex items-center gap-2">
          <Link href="/" className="hover:text-amber-400">홈</Link>
          <span>&gt;</span>
          <Link href={`/${resolvedParams.region}/${encodeURIComponent(districtName)}`} className="hover:text-amber-400">{districtName}</Link>
          {dongName && (
            <>
              <span>&gt;</span>
              <Link href={`/${resolvedParams.region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}`} className="hover:text-amber-400">{dongName}</Link>
            </>
          )}
          <span>&gt;</span>
          <span className="text-amber-400 font-bold">{shop.cleanName}</span>
        </nav>

        <section className="bg-[#121214] border border-amber-500/30 rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <div className="relative h-64 md:h-80 w-full overflow-hidden bg-neutral-900">
            <img
              src={shop.image}
              alt={`${currentRegion} 마사지 제휴점 - ${shop.cleanName}`}
              width={800}
              height={600}
              className="w-full h-full object-cover filter brightness-[0.7]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-black/30"></div>
            <span className="absolute top-4 left-4 bg-amber-500 text-black text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg">
              {shop.badge}
            </span>
          </div>

          <div className="p-6 md:p-8 space-y-4 -mt-8 relative z-10">
            <div className="inline-block bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-xl text-amber-400 text-xs font-bold">
              📍 {currentRegion} 마사지 제휴 샵 안내
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-white">
              {currentRegion} 마사지 안내 - <span className="text-amber-400">{shop.cleanName}</span>
            </h1>

            <p className="text-xs md:text-sm text-gray-300 leading-relaxed bg-black/50 p-4 rounded-2xl border border-white/5">
              {shop.desc}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {shop.features.map((feat, idx) => (
                <div key={idx} className="bg-black/60 border border-amber-500/20 px-3 py-2 rounded-xl text-center text-[11px] font-bold text-amber-300">
                  ✓ {feat}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0d0d0f] border border-amber-500/20 p-6 md:p-8 rounded-3xl space-y-6">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">PROGRAM & PRICE</span>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              💎 {currentRegion} 코스 및 이용 요금표
            </h2>
          </div>

          <div className="space-y-4">
            {shop.courses.map((course, idx) => (
              <div key={idx} className="bg-black/60 border border-white/10 hover:border-amber-500/40 p-5 rounded-2xl flex flex-col md:flex-row justify-between md:items-center gap-3 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-500/20 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded border border-amber-500/30">
                      {course.time}
                    </span>
                    <h3 className="font-extrabold text-white text-base md:text-lg">{course.name}</h3>
                  </div>
                  <p className="text-xs text-gray-400">{course.desc}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-amber-400 bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/20 inline-block">
                    {course.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-black/80 p-5 rounded-2xl border border-white/10">
          <h3 className="text-amber-400 font-bold text-sm mb-2 flex items-center gap-1.5">
            <span>📌</span> 이용 안내 및 예약 방법
          </h3>
          <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
            <li>예약은 하단의 <strong>전화 예약</strong> 또는 <strong>문자 상담</strong> 버튼을 통해 제휴 샵으로 직접 진행하실 수 있습니다.</li>
            <li>정확한 운영 시간 및 코스별 상세 상담은 각 업체 담당 매니저에게 문의해 주세요.</li>
          </ul>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#08080a]/95 backdrop-blur-xl border-t border-amber-500/30 p-3 md:p-4 shadow-[0_-10px_25px_rgba(0,0,0,0.8)]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-3">
          <a
            href={`tel:${shop.phone}`}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-black py-3.5 rounded-2xl text-xs md:text-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-transform active:scale-95"
          >
            <span className="text-lg">📞</span> 전화로 예약하기
          </a>
          <a
            href={`sms:${shop.phone}?body=${encodeURIComponent(`[${currentRegion}]${shop.cleanName} 마사지 예약 문의드립니다. (원클릭마사지 보고 연락드렸어요)`)}`}
            className="flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-black py-3.5 rounded-2xl text-xs md:text-sm border border-white/10 hover:border-amber-500/40 transition-transform active:scale-95"
          >
            <span className="text-lg">💬</span> 간편 문자상담
          </a>
        </div>
      </div>
    </div>
  );
}