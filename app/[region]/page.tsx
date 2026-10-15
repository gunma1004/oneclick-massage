import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const SITE_URL = "https://oneclick-massage.netlify.app";

interface PageProps {
  params: Promise<{
    region: string;
  }>;
}

// 권역별 메타데이터 및 타이틀 설정
const regionMetaInfo: Record<string, { name: string; title: string; desc: string; count: string }> = {
  seoul: {
    name: "서울",
    title: "서울 전체 마사지 추천 총정리｜후기 좋은 마사지샵 안내 ｜원클릭마사지",
    desc: "서울 출장마사지·스웨디시 업체를 원클릭에서 확인하세요. 시·군·구별로 나눠 코스와 이용 요금, 운영 시간을 정리했습니다. 예약은 각 업체에 직접 하시면 됩니다.",
    count: "25개 자치구",
  },
  gyeonggi: {
    name: "경기",
    title: "경기 전체 마사지 추천 총정리｜후기 좋은 마사지샵 안내 ｜원클릭마사지",
    desc: "경기 출장마사지·스웨디시 업체를 원클릭에서 확인하세요. 시·군·구별로 나눠 코스와 이용 요금, 운영 시간을 정리했습니다. 예약은 각 업체에 직접 하시면 됩니다.",
    count: "31개 시·군",
  },
  incheon: {
    name: "인천",
    title: "인천 전체 마사지 추천 총정리｜후기 좋은 마사지샵 안내 ｜원클릭마사지",
    desc: "인천 출장마사지·스웨디시 업체를 원클릭에서 확인하세요. 시·군·구별로 나눠 코스와 이용 요금, 운영 시간을 정리했습니다. 예약은 각 업체에 직접 하시면 됩니다.",
    count: "10개 군·구",
  },
};

// 권역별 하위 구/시/군 목록 데이터
const regionDistricts: Record<string, { key: string; name: string }[]> = {
  seoul: [
    { key: "dobong", name: "도봉구" }, { key: "dongdaemun", name: "동대문구" }, { key: "dongjak", name: "동작구" },
    { key: "eunpyeong", name: "은평구" }, { key: "gangbuk", name: "강북구" }, { key: "gangdong", name: "강동구" },
    { key: "gangnam", name: "강남구" }, { key: "gangseo", name: "강서구" }, { key: "geumcheon", name: "금천구" },
    { key: "guro", name: "구로구" }, { key: "gwanak", name: "관악구" }, { key: "gwangjin", name: "광진구" },
    { key: "jongno", name: "종로구" }, { key: "jung", name: "중구" }, { key: "jungnang", name: "중랑구" },
    { key: "mapo", name: "마포구" }, { key: "nowon", name: "노원구" }, { key: "seocho", name: "서초구" },
    { key: "seodaemun", name: "서대문구" }, { key: "seongbuk", name: "성북구" }, { key: "seongdong", name: "성동구" },
    { key: "songpa", name: "송파구" }, { key: "yangcheon", name: "양천구" }, { key: "yeongdeungpo", name: "영등포구" },
    { key: "yongsan", name: "용산구" }
  ],
  gyeonggi: [
    { key: "ansan", name: "안산시" }, { key: "anseong", name: "안성시" }, { key: "anyang", name: "안양시" },
    { key: "bucheon", name: "부천시" }, { key: "dongducheon", name: "동두천시" }, { key: "gapyeong", name: "가평군" },
    { key: "gimpo", name: "김포시" }, { key: "goyang", name: "고양시" }, { key: "gunpo", name: "군포시" },
    { key: "guri", name: "구리시" }, { key: "gwacheon", name: "과천시" }, { key: "gwangju", name: "광주시" },
    { key: "gwangmyeong", name: "광명시" }, { key: "hanam", name: "하남시" }, { key: "hwaseong", name: "화성시" },
    { key: "icheon", name: "이천시" }, { key: "namyangju", name: "남양주시" }, { key: "osan", name: "오산시" },
    { key: "paju", name: "파주시" }, { key: "pocheon", name: "포천시" }, { key: "pyeongtaek", name: "평택시" },
    { key: "seongnam", name: "성남시" }, { key: "siheung", name: "시흥시" }, { key: "suwon", name: "수원시" },
    { key: "uijeongbu", name: "의정부시" }, { key: "uiwang", name: "의왕시" }, { key: "yangju", name: "양주시" },
    { key: "yangpyeong", name: "양평군" }, { key: "yeoju", name: "여주시" }, { key: "yeoncheon", name: "연천군" },
    { key: "yongin", name: "용인시" }
  ],
  incheon: [
    { key: "bupyeong", name: "부평구" }, { key: "dong", name: "동구" }, { key: "ganghwa", name: "강화군" },
    { key: "gyeyang", name: "계양구" }, { key: "jung-incheon", name: "중구" }, { key: "michuhol", name: "미추홀구" },
    { key: "namdong", name: "남동구" }, { key: "ongjin", name: "옹진군" }, { key: "seo", name: "서구" },
    { key: "yeonsu", name: "연수구" }
  ]
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const regionKey = resolvedParams.region?.toLowerCase();
  const info = regionMetaInfo[regionKey];

  if (!info) return {};

  const canonicalUrl = `${SITE_URL}/${regionKey}`;

  return {
    title: { absolute: info.title },
    description: info.desc,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true, maxImagePreview: "large" },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: canonicalUrl,
      siteName: "원클릭마사지",
      title: info.title,
      description: info.desc,
      images: [
        {
          url: `${SITE_URL}/banner.jpg`,
          width: 1200,
          height: 630,
          alt: `${info.name} 출장 프라이빗케어 마사지 - 원클릭마사지`,
        },
      ],
    },
  };
}

export default async function RegionPage({ params }: PageProps) {
  const resolvedParams = await params;
  const regionKey = resolvedParams.region?.toLowerCase();
  const info = regionMetaInfo[regionKey];
  const districts = regionDistricts[regionKey];

  if (!info || !districts) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: info.title,
    url: `${SITE_URL}/${regionKey}`,
    description: info.desc,
    isPartOf: {
      "@type": "WebSite",
      name: "원클릭마사지",
      url: SITE_URL,
    },
    about: {
      "@type": "Service",
      name: `${info.name} 출장 프라이빗케어 마사지`,
      areaServed: info.name,
      telephone: "0507-1280-3360",
    },
  };

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3.5 shadow">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-black text-lg">
              원
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                원클릭마사지
              </span>
              <span className="text-[9px] text-gray-400 tracking-tighter">ONECLICK MASSAGE</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-gray-300">
            <Link href="/seoul" className="hover:text-amber-400 transition-colors">서울</Link>
            <Link href="/gyeonggi" className="hover:text-amber-400 transition-colors">경기</Link>
            <Link href="/incheon" className="hover:text-amber-400 transition-colors">인천</Link>
          </nav>

          <a
            href="tel:050712803360"
            className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-extrabold text-xs px-3.5 py-2 rounded-xl shadow transition-all active:scale-95"
          >
            📞 24시간 상담
          </a>
        </div>
      </header>

      <main className="flex-1 space-y-16">
        {/* 히어로 섹션 */}
        <section className="pt-12 pb-8 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold text-xs tracking-wider">
                {info.name.toUpperCase()} · 24H 큐레이션
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                <span>{info.name} 전체</span><br />
                <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                  출장 마사지 추천
                </span>
              </h1>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {info.desc}
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold text-amber-400">
                <span className="bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg">24시간 상담</span>
                <span className="bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg">60 · 90 · 120분 코스</span>
                <span className="bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg">타이 · 아로마 · 스웨디시</span>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl h-80 md:h-96">
              <img
                src="/banner.jpg"
                alt={`${info.name} 출장 마사지 메인 이미지`}
                width={920}
                height={1280}
                className="w-full h-full object-cover filter brightness-[0.7]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 font-black text-white text-lg drop-shadow">
                원클릭마사지 {info.name} 제휴 센터
              </div>
            </div>
          </div>
        </section>

        {/* 세부 지역(시·군·구 / 자치구) 칩 선택 그리드 섹션 */}
        <section className="max-w-5xl mx-auto px-4 w-full space-y-6">
          <div className="bg-[#121215] border border-amber-500/30 p-6 md:p-10 rounded-3xl shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">{info.count}</span>
                <h2 className="text-xl md:text-2xl font-black text-white">{info.name} 세부 지역 선택</h2>
              </div>
              <p className="text-xs text-gray-400">원하시는 시·군·구를 선택하시면 상세 동별 안내로 이동합니다.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
              {districts.map((item) => (
                <Link
                  key={item.key}
                  href={`/${regionKey}/${encodeURIComponent(item.name)}`}
                  className="bg-black/60 hover:bg-amber-500 hover:text-black text-gray-200 border border-white/10 hover:border-amber-400 p-3 rounded-xl text-xs font-extrabold flex justify-between items-center transition-all group"
                >
                  <span>{item.name}</span>
                  <span className="text-amber-400 group-hover:text-black text-sm">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 코스 안내 섹션 */}
        <section className="max-w-5xl mx-auto px-4 w-full space-y-6">
          <div className="text-center space-y-2">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">COURSE INFO</span>
            <h2 className="text-2xl font-black text-white">{info.name} 제휴 마사지 표준 코스 및 요금</h2>
            <p className="text-xs text-gray-400">시간별 프로그램과 투명한 정찰제 가격을 비교해 보세요.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#121215] border border-white/10 p-6 rounded-3xl space-y-3">
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-md font-bold">THAI COURSE</span>
              <h3 className="text-lg font-black text-white">타이 마사지</h3>
              <p className="text-xs text-gray-300 leading-relaxed">오일 없이 깔끔한 관리를 원하실 때 전신을 부드럽게 스트레칭하고 눌러주며 긴장을 덜어냅니다.</p>
              <ul className="text-xs space-y-1.5 pt-2 border-t border-white/5 text-gray-300">
                <li className="flex justify-between"><span>60분 코스</span><strong className="text-amber-400">60,000원~</strong></li>
                <li className="flex justify-between"><span>90분 코스</span><strong className="text-amber-400">90,000원~</strong></li>
                <li className="flex justify-between"><span>120분 코스</span><strong className="text-amber-400">120,000원~</strong></li>
              </ul>
            </div>

            <div className="bg-[#121215] border border-white/10 p-6 rounded-3xl space-y-3">
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-md font-bold">AROMA COURSE</span>
              <h3 className="text-lg font-black text-white">아로마마사지</h3>
              <p className="text-xs text-gray-300 leading-relaxed">천연 오일을 사용하여 강한 자극보다 편안한 터치로 신체 긴장을 낮추고 깊은 휴식을 선사합니다.</p>
              <ul className="text-xs space-y-1.5 pt-2 border-t border-white/5 text-gray-300">
                <li className="flex justify-between"><span>60분 코스</span><strong className="text-amber-400">70,000원~</strong></li>
                <li className="flex justify-between"><span>90분 코스</span><strong className="text-amber-400">100,000원~</strong></li>
                <li className="flex justify-between"><span>120분 코스</span><strong className="text-amber-400">130,000원~</strong></li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="bg-[#040406] border-t border-white/10 py-10 text-center text-gray-500 text-xs mt-20">
        <div className="max-w-5xl mx-auto px-4 space-y-3">
          <p className="text-gray-400 font-medium">
            원클릭마사지는 {info.name} 및 수도권 마사지 제휴 정보를 투명하게 안내하는 플랫폼입니다.
          </p>
          <p className="text-[11px] text-gray-600">
            COPYRIGHT &copy; ONECLICK-MASSAGE ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}